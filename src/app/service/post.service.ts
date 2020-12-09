import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TokenStorageService} from '../auth/token-storage.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  httpOptions: any;
  baseURL = "http://localhost:8080/"
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ` + this.tokenStorage.getToken() })
      , 'Access-Control-Allow-Origin': 'http://localhost:4201', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }
  getAllPost(): Observable<any>  {
    return this.http.get(this.baseURL);
  }

  getPostById(id: number): Observable<any>  {
    return this.http.get(this.baseURL+"post/"+id);
  }

  getAllPostByAdmin(page: number, size: number, search: string):Observable<any> {
    return this.http.get(this.baseURL + "admin/post"+ '?page=' + page + '&size=' + size + '&search=' + search, this.httpOptions);
  }

  deletePost(id: number):Observable<any> {
    return this.http.delete(this.baseURL+"admin/post/"+id, this.httpOptions);
  }

  editPost(post: any):Observable<any> {
    return this.http.put(this.baseURL+"post",post, this.httpOptions);
  }

  deletePostByUser(id: number): Observable<any> {
    return this.http.delete(this.baseURL+"post/"+id, this.httpOptions);
  }

  createPost(value: any) {
    return this.http.post(this.baseURL+"post/submit", value, this.httpOptions);
  }

}
