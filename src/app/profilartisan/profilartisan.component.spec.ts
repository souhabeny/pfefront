import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilartisanComponent } from './profilartisan.component';

describe('ProfilartisanComponent', () => {
  let component: ProfilartisanComponent;
  let fixture: ComponentFixture<ProfilartisanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilartisanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilartisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
