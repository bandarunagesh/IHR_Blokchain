import { Component, OnInit } from '@angular/core';
import { StorageService } from 'app/services/storage.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {
  patient: any;
  wife: any;
  wifeAge: any;
  girl: any;
  girlAge: any;
  boy: any;
  boyAge: any;
  grand: any;
  grandAge: any;
  grandImage: any;
  constructor(private storage: StorageService) {
    this.patient = sessionStorage.getItem('currentUser');
  }

  ngOnInit() {
    if (sessionStorage.getItem('patientId') == 'PT273635521') {
      this.wife = 'Rebecca Austin';
      this.wifeAge = '50';
      this.boy = 'Mike Thomas';
      this.boyAge = '10';
      this.girl = 'Sarah  McLaire';
      this.girlAge = '6';
      this.grand = 'Dave Richardson ';
      this.grandAge = '45';
      this.grandImage = 'assets/img/grand.png';
    }
    else if (sessionStorage.getItem('patientId') == 'PT273097539') {
      this.wife = 'Laura Hayden';
      this.wifeAge = '35';
      this.boy = 'Mike Thomas';
      this.boyAge = '10';
      this.girl = 'Sarah  McLaire';
      this.girlAge = '6';
      this.grand = 'Thomas Gilberg';
      this.grandAge = '40';
      this.grandImage = 'assets/img/man.png';
    }
  }

  getDetails(r) {
    this.patient = r;
    sessionStorage.setItem('currentUser', r);
    if (r == 1) {
      this.storage.store('dependentId', 'PT268597843');
    }
    if (r == 2) {
      this.storage.store('dependentId', 'PT269090759');
    }
    if (r == 3) {
      this.storage.store('dependentId', 'PT272847268');
    }
    if (r == 4) {
      this.storage.store('dependentId', 'PT268597843');
    }
  }
}
