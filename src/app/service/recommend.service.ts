import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TokenStorageService} from '../auth/token-storage.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecommendService {
  httpOptions: any;
  baseURL = "http://localhost:8080/"
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ` + this.tokenStorage.getToken() })
      , 'Access-Control-Allow-Origin': 'http://localhost:4201', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  recommendations(value: any): Observable<any> {
    return this.http.post(this.baseURL+"recommendations",value, this.httpOptions);
  }

  updateDataRecommend(): Observable<any> {
    return this.http.post(this.baseURL+"update-data", null,this.httpOptions);
  }
}
