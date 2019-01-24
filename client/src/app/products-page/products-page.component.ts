import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Product, Products, OrderProduct } from '../core/interfaces';
import { ProductService } from '../core/services/product.service';
import { MaterialService, MaterialInstance } from '../core/classes/material.service';
import { AddProduct, DeleteProduct, AddViewedProduct, FilterMinMaxProduct } from '../core/redux/product.action';
import { Store } from '@ngrx/store';
import { AppState } from '../core/redux/app.state';
import { AuthServise } from '../core/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('modal') modalRef: ElementRef
  @ViewChild('select') selectRef: ElementRef
  instance: MaterialInstance
  inst: MaterialInstance
  oSub: Subscription
  productsPage: Product[]
  productsState: OrderProduct[]
  viewedProducts: Product[]
  price: number = 0
  p: number = 1
  form: FormGroup
  filter = false

  constructor(private productService: ProductService,
              private store: Store<AppState>,
              private auth: AuthServise,
              private router: Router) { }

  ngOnInit() {
    this.productService.fetch() 
    this.store.select('productsOrder').subscribe(({products}) => {
      this.productsPage = products
    })

    this.store.select('productsOrder').subscribe(({orderproducts}) => {
      this.productsState =  orderproducts
    })
    this.store.select('productsOrder').subscribe(({viewproducts}) => {
      this.viewedProducts = viewproducts
    })

    this.form = new FormGroup({
      min: new FormControl(null),
      max: new FormControl(null)
    })
  
  }

  ngOnDestroy() {
    this.instance.destroy()
    if (this.oSub) {
      this.oSub.unsubscribe()
    }
  }

  ngAfterViewInit() {
    this.instance = MaterialService.initModal(this.modalRef)
    this.inst = MaterialService.select(this.selectRef)
  }

  open() {
    this.instance.open()
  }

  cancel() {
    this.instance.close()
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

  addRevised(product: Product) {
    this.store.dispatch(new AddViewedProduct(product))
    
  }

  minMaxFilter() {
    if (this.form.value.max === null) {
      this.form.value.max = 999999
    }
    this.store.dispatch(new FilterMinMaxProduct(this.form.value))
    this.filter = true
  }

  canselFilter() {
    this.form.patchValue({min: null, max: null})
    this.productService.fetch() 
    this.filter = false
  }


}
