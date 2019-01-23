import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Product, Products, OrderProduct } from '../core/interfaces';
import { ProductService } from '../core/services/product.service';
import { MaterialService, MaterialInstance } from '../core/classes/material.service';
import { AddProduct, DeleteProduct, UpdateProduct } from '../core/redux/product.action';
import { Store } from '@ngrx/store';
import { AppState } from '../core/redux/app.state';
import { AuthServise } from '../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('modal') modalRef: ElementRef
  modal: MaterialInstance
  oSub: Subscription
  productsPage$: Observable<Products>
  productsState: OrderProduct[]
  price = 0

  constructor(private productService: ProductService,
              private store: Store<AppState>,
              private auth: AuthServise,
              private router: Router) { }

  ngOnInit() {
    this.productsPage$ = this.productService.fetch()
    this.store.select('productsOrder').subscribe(({products}) => {
      this.productsState =  products
    })
  }

  ngOnDestroy() {
    this.modal.destroy()
    if (this.oSub) {
      this.oSub.unsubscribe()
    }
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  open() {
    this.modal.open()
  }

  cancel() {
    this.modal.close()
  }

  addToCart(product: Product) {
      let orderProduct = Object.assign({}, {
      title: product.title,
      price: product.price,
      quantity: 1,
      _id: product._id
    })

    const candidate = this.productsState.find(p => p._id === orderProduct._id)
    
    if (candidate) {
      candidate.quantity += orderProduct.quantity
    } else {
      this.store.dispatch(new AddProduct(orderProduct))
    }
    this.computePrice()
  }

  addOne(orderProduct: OrderProduct) {
    const candidate = this.productsState.find(p => p._id === orderProduct._id)
    
    if (candidate) {
      candidate.quantity += 1
    }
    this.computePrice()
  }

  removeOne(orderProduct: OrderProduct) {
    const candidate = this.productsState.find(p => p._id === orderProduct._id)
    
    if (candidate.quantity > 1) {
      candidate.quantity -= 1
    } else {
      this.removeProduct(orderProduct)
    }
    this.computePrice()

  }




  removeProduct(orderProduct: OrderProduct) {
    this.store.dispatch(new DeleteProduct(orderProduct));
    this.computePrice()
  }

  private computePrice() {
    this.price = this.productsState.reduce((total, item) => {
      return total += item.quantity * item.price
    }, 0)
  }

  clear() {
    this.productsState = []
    this.price = 0
  }

  exit() {
    this.auth.logout()
    this.router.navigate(['/login'])
  }



}
