import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProTableListComponent } from './pro-table-list.component';

describe('ProTableListComponent', () => {
  let component: ProTableListComponent;
  let fixture: ComponentFixture<ProTableListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProTableListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProTableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
