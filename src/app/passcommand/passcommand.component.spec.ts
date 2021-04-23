import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasscommandComponent } from './passcommand.component';

describe('PasscommandComponent', () => {
  let component: PasscommandComponent;
  let fixture: ComponentFixture<PasscommandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasscommandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasscommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
