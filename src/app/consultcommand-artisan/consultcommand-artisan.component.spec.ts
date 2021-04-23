import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultcommandArtisanComponent } from './consultcommand-artisan.component';

describe('ConsultcommandArtisanComponent', () => {
  let component: ConsultcommandArtisanComponent;
  let fixture: ComponentFixture<ConsultcommandArtisanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultcommandArtisanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultcommandArtisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
