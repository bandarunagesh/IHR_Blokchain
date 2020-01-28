import { Injectable, OnDestroy, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { share } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class StorageService implements OnDestroy {
  patientChange: EventEmitter<any> = new EventEmitter();
  private onSubject = new Subject<{ key: string; value: any }>();
  private changes = this.onSubject.asObservable().pipe(share());

  constructor(private route: Router) {
    // this.start();
  }

  ngOnDestroy() {
    //  this.stop();
  }

  public store(key: string, data: any): void {
    sessionStorage.setItem(key, data);
    // this.onSubject.next({ key: key, value: data });
    this.emitChangeEvent();
  }

  public emitChangeEvent() {
    this.patientChange.emit();
  }

  public getNavChangeEmitter() {
    return this.patientChange;
  }
}
