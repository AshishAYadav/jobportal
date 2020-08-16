import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BackendService } from '../backend.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class JobsComponent implements OnInit {

  jobs: any;
  oneAtATime = true;
  applied: any;
  user: any;
  constructor( private service: BackendService, private router: Router ) {

    if (sessionStorage.jwt){
      this.service.getUser().subscribe(res => {
        console.log(res);
        this.user = res;
      });

      this.service.getJobs().subscribe(res => {
        this.applied = res;
        console.log(this.applied);
      });
    }

    this.service.getAllJobs().subscribe(res => {
      console.log(res);
      this.jobs = res;
    });
  }

  ngOnInit(): void {

  }

  checkIfApplied(id){
    if (sessionStorage.jwt && this.applied){
      for (let i = 0; i < this.applied.length; i++){
        if (this.applied[i].job === id) {
          console.log(this.applied[i].job, id);
          return true;
        }
      }
    }
  }

  applytojob(id) {
    if (sessionStorage.jwt) {
      const token = JSON.parse(atob(sessionStorage.jwt.split('.')[1]));
      console.log(token);
      if (token['type'] !== 1){
        this.service.applyJob(Object.assign({job: id})).subscribe(res => {
          if (res['msg'] === 'success') {
            console.log('applied for job', id, res);
            this.service.getJobs().subscribe(response => {
              this.applied = response;
              console.log(this.applied);
            });
          }
        }, err => {
          console.log('error occurred', err.error);
          if (err.error === 'Access Denied'){
            console.log('login to apply');
            this.router.navigate(['/login']);
          }
        });
      } else {
        alert('Recruiter cannot apply');
      }

    } else {
      console.log('login to apply');
      this.router.navigate(['/login']);
    }
  }

}
