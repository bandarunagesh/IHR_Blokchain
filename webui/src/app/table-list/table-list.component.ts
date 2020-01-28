import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CommonService } from 'app/services/common.service';
import { StorageService } from 'app/services/storage.service';
declare var $: any;
export interface DialogData {
  type: string
}
@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  checkedRecords: any = [];
  medicalRecords: any = [];
  type: any;
  // providers: any = [{ 'providerId': 1, 'provider': 'ABC' }, { 'providerId': 2, 'provider': 'ABC' }]
  // custodians: any = [{ 'custodianId': 1, 'custodian': 'CDE' }, { 'custodianId': 2, 'custodian': 'CDE' }]
  /*constructor(public dialog: MatDialog, private commonService: CommonService, private checkStorage: StorageService) {
    this.checkStorage.getNavChangeEmitter().subscribe(() => this.ngOnInit());
  }*/
  providers: any = [];
  selectedProvider: any;
  selectedCustodian: any;
  custodians: any = [];
  constructor(public dialog: MatDialog, private commonService: CommonService, private checkStorage: StorageService) {
    this.checkStorage.getNavChangeEmitter().subscribe(() => this.ngOnInit());
  }

  ngOnInit() {
    this.getDoctors();
    this.getPatients();
    this.getMedicalRecordsByPatientId();
  }
  getMedicalRecordsByPatientId() {
    this.commonService.getMedicalRecordsByPatientId().subscribe((result: any) => {
      this.medicalRecords = result;
    });
  }
  getDoctors() {
    this.commonService.getAllDoctors().subscribe((result: any) => {
      this.providers = result;
    });
  }
  getPatients() {
    this.commonService.getAllPatients().subscribe((result: any) => {
      this.custodians = result;
    });
  }

  allowDoctorWriteAccess(objId) {
    this.commonService.allowDoctorWrite(objId).subscribe((result: any) => {
      this.allowOtherDoctorsRead(objId);
    });
  }

  allowOtherDoctorsRead(objId) {
    this.checkedRecords.forEach(async (value, key) => {
      const obj = { id: value, doctor2: objId }
      this.commonService.allowOtherDoctorsRead(obj).subscribe((result: any) => {
        this.showNotification('top', 'center', 'success');
      });

    });

  }

  checkCheckbox(e) {
    if (e.target.checked) {
      this.checkedRecords.push(e.target.value);
    }
    else {
      const index = this.checkedRecords.indexOf(e.target.value, 0);
      if (index > -1) {
        this.checkedRecords.splice(index, 1);
      }
    }
    console.log(this.checkedRecords);
  }

  shareWithCustodian() {
    if (this.checkedRecords.length != 0) {
      // open custodian model
      this.type = 'custodian';
      this.openDialog();
    }
    else {
      this.showNotification('top', 'center', 'fail');
    }
  }

  shareWithProvider() {
    if (this.checkedRecords.length != 0) {
      // open custodian model
      this.type = 'provider';
      this.openDialog();
    }
    else {
      this.showNotification('top', 'center', 'fail');
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ProviderListDialog, {
      width: '250px',
      data: { type: this.type, providers: this.providers, custodians: this.custodians }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (this.type === 'provider') {
        this.allowDoctorWriteAccess(result);
      }
      if (this.type === 'custodian') {
        this.allowDoctorWriteAccess(result);
      }
    });
  }

  showNotification(from, align, type) {
    // const type = ['', 'info', 'success', 'warning', 'danger'];

    const color = Math.floor((Math.random() * 4) + 1);
    if (type == "success") {
      $.notify({
        icon: "notifications",
        message: "Records shared successfully."

      }, {
          //type: type[color],
          type: 'success',
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
    else {
      $.notify({
        icon: "notifications",
        message: "Please select atleast one record before share."

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


}

@Component({
  selector: 'provider-list',
  templateUrl: 'provider-list.html',
})
export class ProviderListDialog {
  selectedProvider: any;
  selectedCustodian: any;
  constructor(
    public dialogRef: MatDialogRef<ProviderListDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  onNoClick(): void {
    this.dialogRef.close();
  }

}