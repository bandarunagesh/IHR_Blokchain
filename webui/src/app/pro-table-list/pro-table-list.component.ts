import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StorageService } from 'app/services/storage.service';
import { CommonService } from 'app/services/common.service';
declare var $: any;
export interface DialogData {
  type: string
}

@Component({
  selector: 'app-pro-table-list',
  templateUrl: './pro-table-list.component.html',
  styleUrls: ['./pro-table-list.component.scss']
})
export class ProTableListComponent implements OnInit {
  checkedRecords: any = [];
  type: any;
  providers: any = [{ 'providerId': 1, 'provider': 'ABC' }, { 'providerId': 2, 'provider': 'ABC' }];
  custodians: any = [{ 'custodianId': 1, 'custodian': 'CDE' }, { 'custodianId': 2, 'custodian': 'CDE' }];
  patients: any[];
  medicalRecords: any[];
  constructor(public dialog: MatDialog, private storage: StorageService, private commonService: CommonService) { }

  ngOnInit() {
    this.getProviderPatients();
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
  writePrescription() {
    if (sessionStorage.getItem('dependentId') != '') {
      this.openDialog();
    }
    else {
      this.showNotification('top', 'center', 'fail');
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreatePrescriptionDialog, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.commonService.updateMedicalRecord(result).subscribe((result: any) => {
        this.showNotification('top', 'center', 'success');
        this.getProviderPatientMedicalRecords();
      });
    });
  }

  showNotification(from, align, res) {
    const type = ['', 'info', 'success', 'warning', 'danger'];

    const color = Math.floor((Math.random() * 4) + 1);
    if (res == 'fail') {
      $.notify({
        icon: "notifications",
        message: "Please select a patient."

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
    else {
      $.notify({
        icon: "notifications",
        message: "Prescription added successfully"

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
  }

  changePatient(e) {
    if (e.target.value != '') {
      sessionStorage.setItem('dependentId', e.target.value);
      this.getProviderPatientMedicalRecords();
    }
    else {
      sessionStorage.setItem('dependentId', e.target.value);
      this.showNotification('top', 'center', 'fail');
    }

  }

  getProviderPatients() {
    let providerId = sessionStorage.getItem('providerId');
    this.commonService.getAllPatients().subscribe((result: any) => {
      this.patients = result;
    });
  }

  getProviderPatientMedicalRecords() {
    let patientId = sessionStorage.getItem('dependentId');
    let providerId = sessionStorage.getItem('providerId');
    this.commonService.getMedicalRecordsByDoctorIdAndPatientId(providerId, patientId).subscribe((result: any) => {
      console.log(result);
      this.medicalRecords = result;
    });
  }

}


@Component({
  selector: 'create-prescription',
  templateUrl: 'create-prescription.html',
})
export class CreatePrescriptionDialog {
  selectedProvider: any;
  selectedCustodian: any;
  constructor(
    public dialogRef: MatDialogRef<CreatePrescriptionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
