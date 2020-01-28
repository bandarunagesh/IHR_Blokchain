import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
declare var $: any;
export interface DialogData {
  type: string
}
import * as Chartist from 'chartist';
import { StorageService } from 'app/services/storage.service';
import { CommonService } from 'app/services/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  patient: any;
  type: any;

  shareWithProviderRecords: any[] = [];
  vitals: any[] = [];
  allergies: any[] = [];
  providers: any[] = [{ provider_id: 1, provider_name: 'James', datetime: '07/10/2019', location: 'NJ' }, { provider_id: 1, provider_name: 'James', datetime: '07/10/2019', location: 'NJ' }]
  constructor(private checkStorage: StorageService, public dialog: MatDialog, private commonService: CommonService) {
    this.patient = this.checkStorage.getNavChangeEmitter().subscribe(() => this.ngOnInit());

  }
  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on('draw', function (data) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq = 0;
  };
  startAnimationForBarChart(chart) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', function (data) {
      if (data.type === 'bar') {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq2 = 0;
  };
  ngOnInit() {
    this.getPatientDoctors();
    let user: any = sessionStorage.getItem('currentUser');

    let dataDailySalesChart: any;
    let dataCompletedTasksChart: any;
    let datawebsiteViewsChart: any;
    if (user == 1) {
      // pulse rate
      dataCompletedTasksChart = {
        labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
        series: [
          [72, 80, 81, 65, 71, 79, 90, 85]
        ]
      };
      // daily steps
      dataDailySalesChart = {
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        series: [
          [4300, 5500, 4500, 3000, 2800, 2400, 2000]
        ]
      };
      // slep time
      datawebsiteViewsChart = {
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        series: [
          [420, 439, 410, 470, 520, 420, 350]
        ]
      };
    }
    else if (sessionStorage.getItem('currentUser') == '2') {
      // pulse rate
      dataCompletedTasksChart = {
        labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
        series: [
          [76, 70, 69, 80, 84, 79, 81, 86,]
        ]
      };
      // daily steps
      dataDailySalesChart = {
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        series: [
          [3900, 5500, 6600, 4400, 5500, 6003, 5200]
        ]
      };
      // slep time
      datawebsiteViewsChart = {
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        series: [
          [480, 500, 430, 500, 490, 390, 540]
        ]
      };
    }
    else if (sessionStorage.getItem('currentUser') == '3') {
      // pulse rate
      dataCompletedTasksChart = {
        labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
        series: [
          [72, 80, 81, 65, 71, 79, 90, 85]
        ]
      };
      // daily steps
      dataDailySalesChart = {
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        series: [
          [3500, 4500, 3000, 2800, 2400, 2000, 1900]
        ]
      };
      // slep time
      datawebsiteViewsChart = {
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        series: [
          [420, 439, 410, 470, 520, 420, 350]
        ]
      };
    }
    else if (sessionStorage.getItem('currentUser') == '4') {
      // pulse rate
      dataCompletedTasksChart = {
        labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
        series: [
          [70, 60, 65, 59, 69, 70, 65, 59]
        ]
      };
      // daily steps
      dataDailySalesChart = {
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        series: [
          [4500, 2200, 3000, 4600, 3900, 4400, 3000]
        ]
      };
      // slep time
      datawebsiteViewsChart = {
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        series: [
          [400, 390, 430, 540, 450, 490, 390]
        ]
      };
    }
    else {
      // pulse rate
      dataCompletedTasksChart = {
        labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
        series: [
          [87, 79, 85, 72, 70, 87, 90, 76]
        ]
      };
      // daily steps
      dataDailySalesChart = {
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        series: [
          [3490, 3208, 4390, 3289, 4390, 2980, 4390]
        ]
      };
      // slep time
      datawebsiteViewsChart = {
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        series: [
          [500, 520, 490, 410, 510, 500, 450]
        ]
      };
    }
    /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */



    const optionsDailySalesChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 6000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    }

    var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

    this.startAnimationForLineChart(dailySalesChart);


    /* ----------==========     Completed Tasks Chart initialization    ==========---------- */



    const optionsCompletedTasksChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 100, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
    }

    var websiteViewsChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

    // start animation for the Completed Tasks Chart - Line Chart
    this.startAnimationForLineChart(websiteViewsChart);



    /* ----------==========     Emails Subscription Chart initialization    ==========---------- */


    var optionswebsiteViewsChart = {
      axisX: {
        showGrid: false
      },
      low: 0,
      high: 700,
      chartPadding: { top: 0, right: 5, bottom: 0, left: 0 }
    };
    var responsiveOptions: any[] = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ];
    var completedTasksChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

    //start animation for the Emails Subscription Chart
    this.startAnimationForBarChart(completedTasksChart);
  }

  openMedicalRecords(recordId: string, authorized: any) {
    const dialogRef = this.dialog.open(MedicalRecordsDialog, {
      width: '250px',
      data: { type: 'provider', doctors: authorized }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.commonService.revokeDoctorAccess(result).subscribe((result3: any) => {
        authorized.forEach(async (value, key) => {
          const obj = { id: recordId, doctor2: value }
          this.commonService.revokedoctorWrite(obj).subscribe((result2: any) => {
            this.getPatientDoctors();
          });
        });
      });
    });

  }

  getPatientDoctors() {
    this.commonService.getMedicalRecordsByPatientId().subscribe((result: any) => {
      this.shareWithProviderRecords = [];
      this.shareWithProviderRecords = result.filter(x => x.authorized.length > 0);
    });
  }
}

@Component({
  selector: 'medical-records',
  templateUrl: 'medical-records.html',
})
export class MedicalRecordsDialog {
  selectedDoctor: any;
  constructor(
    public dialogRef: MatDialogRef<MedicalRecordsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}