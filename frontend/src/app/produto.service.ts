import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Produto as Produto } from "./produto";

@Injectable({
  providedIn: "root",
})
export class ProdutoService {
  private baseUrl = "http://localhost:8080/api/produtos";

  constructor(private http: HttpClient) {}

  getProduto(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createProduto(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(`${this.baseUrl}`, produto);
  }

  updateProduto(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteProduto(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: "text" });
  }

  getProdutosList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
