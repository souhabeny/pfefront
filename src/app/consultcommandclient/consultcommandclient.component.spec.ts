import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultcommandclientComponent } from './consultcommandclient.component';

describe('ConsultcommandclientComponent', () => {
  let component: ConsultcommandclientComponent;
  let fixture: ComponentFixture<ConsultcommandclientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultcommandclientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultcommandclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
