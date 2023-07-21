import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IProduct } from '../models/iProudct';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'any',
})
export class ProductService {
  private baseURL: string = environment.baseURL + '/products';
  constructor(private http: HttpClient) {}

  addProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(this.baseURL, product);
  }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.baseURL);
  }

  getOneProduct(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.baseURL}/${id}`);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseURL}/categories`);
  }

  editingSubject: Subject<IProduct> = new Subject<IProduct>();
  editProudct(product: IProduct) {
    this.editingSubject.next(product);
  }

  updateProduct(product: IProduct): Observable<IProduct> {
    return this.http.patch<IProduct>(`${this.baseURL}/${product.id}`, product);
  }

  deleteProduct(id: number): Observable<IProduct> {
    return this.http.delete<IProduct>(`${this.baseURL}/${id}`);
  }
}
