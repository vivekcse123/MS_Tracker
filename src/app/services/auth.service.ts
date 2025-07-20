import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = "http://localhost:3000";
  private departments: string = `${this.baseUrl}/departments`;
  private users: string = `${this.baseUrl}/users`;
  private admins: string = `${this.baseUrl}/admins`;
  private notes: string = `${this.baseUrl}/notes`;
  private uesrnotes: string = `${this.baseUrl}/usernotes`;
  private wfhURL: string = `${this.baseUrl}/wfh`;

  constructor(private http: HttpClient) {}

  //departments
  getAllDepartments() {
    return this.http.get(this.departments).pipe(
      
    );
  }

  signUp(obj: any) {
    return this.http.post(this.admins, obj).pipe(
      
    );
  }

  //admin section
  getAllAdmins() {
    return this.http.get(this.admins).pipe(
      
    );
  }

  adminId: any;
  setAdminId(id: any) {
    this.adminId = id;
  }

  getAdminId() {
    return this.adminId;
  }

  getAdminByEmail(email: any){
    return this.http.get(`${this.admins}?email=${email}`);
  }

  getAdminById(id: string): Observable<any> {
    return this.http.get(`${this.admins}/${id}`);
  }

  //user section
  getAllUsers() {
      return this.http.get(this.users).pipe(
        
      );
  }
  getuserById(id: any){
    return this.http.get(`${this.users}/${id}`);
  }

  
  createUser(obj: any){
    return this.http.post(this.users + "/" ,obj);
  }

  updateUser(id: any, obj: any) {
    return this.http.put(`${this.users}/${id}`, obj);
 }

  deleteUserById(id: any){
    this.deleteUserNoteById(id);
    return this.http.delete(this.users + "/" + id);
 }
  

 //Notes section....
  createNote(obj: any){
    return this.http.post(this.notes + "/", obj);
  }

  getAllNotes(){
    return this.http.get(this.notes);
  }

  deleteNoteById(id: any):Observable<any>{
    return this.http.delete(this.notes + "/" + id);
  }


  createUserNote(obj: any){
    return this.http.post(this.uesrnotes + "", obj);
  }

  getAllUserNotes(){
    return this.http.get(this.uesrnotes);
  }

  getUserNoteById(userid: any){
    return this.http.get(`${this.uesrnotes}?userid=${userid}`);
  }

  deleteUserNoteById(id: any){
    return this.http.delete(this.uesrnotes + "/" + id);
  }

  //forgot password...

  forgotPassword(id: any, newPassword: any) {
    return this.http.patch(`${this.admins}/${id}`, { password: newPassword, cpassword: newPassword });
  }

  changePassword(id: any, newPassword: any){
    return this.http.patch(`${this.users}/${id}`, {password: newPassword});
  }
  

  //work from home section

  apply(obj: any){
    return this.http.post(this.wfhURL + "/", obj);
  }

   getAllWFH(){
    return this.http.get(this.wfhURL);
   }

   //wfh

   approved(user: any) {
    return this.http.put(`${this.wfhURL}/${user.id}`, user);
  }

   reject(user: any){
    return this.http.put(`${this.wfhURL}/${user.id}`, user);
   }

}
