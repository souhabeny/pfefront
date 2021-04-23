import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriemenuComponent } from './categoriemenu.component';

describe('CategoriemenuComponent', () => {
  let component: CategoriemenuComponent;
  let fixture: ComponentFixture<CategoriemenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriemenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriemenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
