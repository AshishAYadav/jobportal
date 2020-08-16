import { Component, OnInit, TemplateRef } from '@angular/core';
import { BackendService } from '../backend.service';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  oneAtATime = true;
  jobs: any;
  list: any;
  info: any;
  user: any;
  modalRef: BsModalRef;
  title: string;
  description: string;
  invalid: boolean;

  constructor(private modalService: BsModalService, private service: BackendService, private router: Router ) {
    if (!sessionStorage.jwt){
      this.router.navigate(['login']);
    }
   }

  ngOnInit(): void {

    this.service.getUser().subscribe(res => {
      console.log(res);
      this.user = res;
      if (this.user['type']===0){
        this.router.navigate(['jobs']);
      }
    });

    this.service.getJob().subscribe(res => {
      console.log(res);
      this.jobs = res;
    });

    this.service.getList().subscribe(res => {
      console.log(res);
      this.list = res;
    });

    this.service.getCandidateInfo().subscribe(res => {
      console.log(res);
      this.info = res;
    });

  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  getCandidates(job){
    const temp = [];
    this.info.map(b => {
      this.list.find( element => {
        if (element.candidate === b.id && element.job === job){
          const user = {id: b.id, name: b.fname, email: b.email, date: element.date };
          temp.push(user);
        }
      });
    });
    return temp;
  }

  onSubmit(job){
    if (job.form.status === 'VALID'){
      console.log(job.value);
      if (this.title.trim()){
        this.invalid = false;
        this.service.addJob(job.value).subscribe(res => {
          if (res['msg'] === 'success'){
            this.modalRef.hide();
            this.service.getJob().subscribe(res => {
              console.log(res);
              this.jobs = res;
            });
          } else {
          }
        });
      } else {
        this.invalid = true;
      }
    }

  }
}
