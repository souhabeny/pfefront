import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultDevisClientComponent } from './consult-devis-client.component';

describe('ConsultDevisClientComponent', () => {
  let component: ConsultDevisClientComponent;
  let fixture: ComponentFixture<ConsultDevisClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultDevisClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultDevisClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
