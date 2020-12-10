import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TokenStorageService} from '../auth/token-storage.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions: any;
  baseURL = "http://localhost:8080/"
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ` + this.tokenStorage.getToken() })
      , 'Access-Control-Allow-Origin': 'http://localhost:4201', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  createUser(value: any): Observable<any>  {
    return this.http.post(this.baseURL+"register", value);
  }



  getProfile(email :string): Observable<any> {
    return this.http.get(this.baseURL+"profile/"+email)
  }

  getProfileInformation(email :string): Observable<any> {
    return this.http.get(this.baseURL+"profile/information/"+email,this.httpOptions)
  }
  changeImg(email: string, url: string): Observable<any> {
    return this.http.put(this.baseURL+"updateImg/?email="+email+"&url="+url,null,this.httpOptions)
  }

  updateInformation(user: any):Observable<any> {
    return this.http.put(this.baseURL+"update-information",user,this.httpOptions);
  }

  getAllUserByAdmin(page: any, size: number, search: string): Observable<any> {
    return this.http.get(this.baseURL + "admin/user"+ '?page=' + page + '&size=' + size + '&search=' + search, this.httpOptions);
  }

  deleteUserByAdmin(id: number): Observable<any> {
    return this.http.delete(this.baseURL + "admin/user/"+id, this.httpOptions);
  }

  lockUserByAdmin(id: number) {
    return this.http.patch(this.baseURL + "admin/user/"+id,null,this.httpOptions);
  }

  unlockUserByAdmin(id: number) {
    return this.http.patch(this.baseURL + "admin/user/"+id,null,this.httpOptions);
  }

  updatePassword(idUser: number, newPassword: string, currentPassword: string):Observable<any> {
    return this.http.put(this.baseURL+"update-password/"+idUser, { newPassword: newPassword, currentPassword: currentPassword}, this.httpOptions);
  }
}
