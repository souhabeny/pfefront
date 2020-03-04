import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboredArtisanComponent } from './dashbored-artisan.component';

describe('DashboredArtisanComponent', () => {
  let component: DashboredArtisanComponent;
  let fixture: ComponentFixture<DashboredArtisanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboredArtisanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboredArtisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
