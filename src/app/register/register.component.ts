import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  fname: string;
  email: string;
  password: string;
  type: number;

  constructor( private service: BackendService, private router: Router) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('jwt')){
      this.type = JSON.parse(atob(sessionStorage.jwt.split('.')[1]))['type'];
      if (this.type === 1){
        this.router.navigate(['dashboard']);
      } else {
        this.router.navigate(['jobs']);
      }
    }
  }

  onRegister(form){
    if (form.form.status === 'VALID'){
        this.service.addUser(
          Object.assign({fname: this.fname, email: this.email, password: this.password, type: this.type}))
          .subscribe(res => {
        console.log(res);
        this.router.navigate(['login']);
      });
    }
    console.log(Object.assign({fname: this.fname, email: this.email, password: this.password, type: this.type}));


  }

}
