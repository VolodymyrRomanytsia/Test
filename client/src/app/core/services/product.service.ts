import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Product, Products} from '../interfaces'
import {Observable} from 'rxjs'
import { Store } from '@ngrx/store';
import { AppState } from '../redux/app.state';
import { LoadProducts } from '../redux/product.action';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient, private store: Store<AppState>) {
  }

  fetch(): void {
    this.http.get('/api/products')
    .subscribe((products: Product[]) => {
      this.store.dispatch(new LoadProducts(products));
    })  
  }

}
