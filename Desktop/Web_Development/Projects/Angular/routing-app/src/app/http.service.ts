import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  dealers = [];
  public _dealersUrl = 'http://localhost:3000/dealers-data';
  public _salesUrl = 'http://localhost:3000/sales-data';
  constructor(private http: HttpClient) {}

  getDealers(): Observable<[]> {
    return this.http.get<[]>(this._dealersUrl);
  }

  getSales(): Observable<[]> {
    return this.http.get<[]>(this._salesUrl);
  } 
}
