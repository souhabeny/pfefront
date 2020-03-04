import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboredClientComponent } from './dashbored-client.component';

describe('DashboredClientComponent', () => {
  let component: DashboredClientComponent;
  let fixture: ComponentFixture<DashboredClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboredClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboredClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
