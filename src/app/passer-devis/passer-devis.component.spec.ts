import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasserDevisComponent } from './passer-devis.component';

describe('PasserDevisComponent', () => {
  let component: PasserDevisComponent;
  let fixture: ComponentFixture<PasserDevisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasserDevisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasserDevisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
