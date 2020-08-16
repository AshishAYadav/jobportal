import { Component, OnInit, SimpleChanges, OnChanges, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnChanges {

  active: string;
  modalRef: BsModalRef;
  message: string;
  collapsed = false;
  constructor(private modalService: BsModalService,private router: Router) { }

  ngOnInit(): void {

    this.active = this.router.url;
    console.log(this.active);
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
      console.log(changes.active);
  }

  checkLogin(){
    if(sessionStorage.getItem('jwt')){
      return false;
    } else {
      return true;
    }
  }

  isRecruiter(){
    if(sessionStorage.getItem('jwt')){
      const token = JSON.parse(atob(sessionStorage.jwt.split('.')[1]));
      // console.log(token);
      if (token.type === 1 ){
        return true;
      } else {
        return false;
      }
    }
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.message = 'Confirmed!';
    this.modalRef.hide();
    this.logout();
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }

  collapse(){
    this.collapsed = !this.collapsed;
  }
}
