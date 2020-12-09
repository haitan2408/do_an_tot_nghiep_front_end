import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TokenStorageService} from '../auth/token-storage.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  httpOptions: any;
  baseURL = "http://localhost:8080/"
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ` + this.tokenStorage.getToken() })
      , 'Access-Control-Allow-Origin': 'http://localhost:4201', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  addComment(value: any, id: number):Observable<any>{
    return this.http.post(this.baseURL+"post/"+id+"/comments",value,this.httpOptions)
  }

  deleteCommentByUser(id: number): Observable<any> {
    return this.http.delete(this.baseURL+"comment/"+id, this.httpOptions);
  }

  updateComment(id: number, content: string): Observable<any> {
    return this.http.put(this.baseURL+"comment",{id: id, body: content}, this.httpOptions);
  }

  getAllCommentByIdPost(idPost: number, page: number, size: number): Observable<any> {
    console.log(this.httpOptions)
    return this.http.get(this.baseURL+"admin/post/comment/"+idPost + '?page=' + page + '&size=' + size, this.httpOptions)
  }

  deleteCommentByAdmin(id: number): Observable<any> {
    return this.http.delete(this.baseURL+"admin/post/comment/"+id,this.httpOptions);
  }
}
