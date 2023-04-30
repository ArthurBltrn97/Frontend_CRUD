import { Injectable } from '@angular/core';
import { Productoservice } from './productoservice.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoserviceService {


  constructor(private http:HttpClient) { }
  

  readonly baseURL = 'https://localhost:44300/api/Producto'
  formData:Productoservice = new Productoservice();
  list: Productoservice[] = [];

  postProducto(){
    return this.http.post(this.baseURL, this.formData);
  } 

  putProducto(){
    return this.http.put(`${this.baseURL}/${this.formData.id}`, this.formData);
  }  

  deleteProducto(id:number){
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  refreshList(){
    this.http.get(this.baseURL).
    toPromise().
    then(res => this.list = res as Productoservice[])
  }
}
