import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  email: string;
  password: string;
  type: number;
  invalid: boolean;
  msg: string;

  constructor(private service: BackendService, private router: Router ) { }

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

  onLogin(form){
    if (form.form.status === 'VALID'){
        this.service.login(Object.assign({email: this.email, password: this.password})).subscribe( res => {
          if (res['msg'] === 'success'){
              this.msg = res['msg'];
              sessionStorage.setItem('jwt', res['jwt']);
              console.log(res['msg']);
              if (this.type === 1){
                this.router.navigate(['dashboard']);
              } else {
                this.router.navigate(['jobs']);
              }
            } else {
              this.invalid = true;
              this.msg = res['msg'];
              console.log(res);
            }
        }, err => {
              this.invalid = true;
              this.msg = err['msg'];
              console.log(err);
        });
    }
  }

}
