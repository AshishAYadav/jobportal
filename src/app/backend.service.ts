import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BackendService {

  api = 'http://localhost:3000';
  headers = {};
  constructor(private http: HttpClient) {
    this.headers  = new HttpHeaders(Object.assign({'auth-token': sessionStorage.getItem('jwt')}));
  }

  getAllUsers(){
    return this.http.get(this.api + '/users', { headers: this.headers });
  }

  getAllApplications(){
    return this.http.get(this.api + '/applications', { headers: this.headers });
  }

  getAllJobs(){
    return this.http.get(this.api + '/jobs');
  }

  getUser(){
    return this.http.get(this.api + '/user', { headers: this.headers });
  }

  getJob(){
    return this.http.get(this.api + '/job', { headers: this.headers });
  }

  getJobs(){
    return this.http.get(this.api + '/applied', { headers: this.headers });
  }

  getApplication(id){
    return this.http.get(this.api + '/applications/' + id, { headers: this.headers });
  }

  getList(){
    return this.http.get(this.api + '/list' , { headers: this.headers });
  }

  getCandidateInfo(){
    return this.http.get(this.api + '/info' , { headers: this.headers });
  }

  addUser(data){
    return this.http.post(this.api + '/register', data);
  }

  addJob(data){
    return this.http.post(this.api + '/create', data, { headers: this.headers });
  }

  applyJob(data){
    return this.http.post(this.api + '/apply', data, { headers:  this.headers });
  }

  login(data) {
    return this.http.post(this.api + '/auth/login', data);
  }



}
