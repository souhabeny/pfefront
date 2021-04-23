import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterDevisComponent } from './consulter-devis.component';

describe('ConsulterDevisComponent', () => {
  let component: ConsulterDevisComponent;
  let fixture: ComponentFixture<ConsulterDevisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsulterDevisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulterDevisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
