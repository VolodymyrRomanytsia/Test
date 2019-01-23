import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Product, Products} from '../interfaces'
import {Observable} from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {
  }

  fetch(): Observable<Products> {
    return this.http.get<Products>('/api/products')
  }

}
