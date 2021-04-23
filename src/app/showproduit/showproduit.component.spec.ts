import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowproduitComponent } from './showproduit.component';

describe('ShowproduitComponent', () => {
  let component: ShowproduitComponent;
  let fixture: ComponentFixture<ShowproduitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowproduitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowproduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
