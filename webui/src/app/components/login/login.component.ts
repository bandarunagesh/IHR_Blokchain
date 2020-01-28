import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  submitted = false;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  login() {

    if (this.username == 'PT273635521') {
      if (this.password == '123') {
        this.submitted = true;
        sessionStorage.setItem('patientId', 'PT273635521');
        sessionStorage.setItem('dependentId', 'PT273635521');
        sessionStorage.setItem('usertype', 'member');
        this.router.navigate(['/user/dashboard']);
      } else {
        this.showNotification('top', 'right');
      }
    }
    else if (this.username == 'PT273097539') {
      if (this.password == '123') {
        this.submitted = true;
        sessionStorage.setItem('patientId', 'PT273097539');
        sessionStorage.setItem('dependentId', 'PT273635521');
        sessionStorage.setItem('usertype', 'member');
        this.router.navigate(['/user/dashboard']);
      } else {
        this.showNotification('top', 'right');
      }
    }
    else if (this.username == '41905220') {
      if (this.password == '123') {
        this.submitted = true;
        sessionStorage.setItem('providerId', '41905220');
        sessionStorage.setItem('usertype', 'provider');
        this.router.navigate(['/pro/prodashboard']);
      } else {
        this.showNotification('top', 'right');
      }
    }
    else {
      this.showNotification('top', 'right');
      sessionStorage.clear();
    }
  }

  showNotification(from, align) {

    this.submitted = false;
    const type = ['', 'info', 'success', 'warning', 'danger'];

    const color = Math.floor((Math.random() * 4) + 1);

    $.notify({
      icon: "notifications",
      message: "Invalid Credentials"

    }, {
        //type: type[color],
        type: 'danger',
        timer: 4000,
        placement: {
          from: from,
          align: align
        },
        template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>'
      });
  }

}
