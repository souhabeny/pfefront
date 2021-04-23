import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitCategorieComponent } from './produit-categorie.component';

describe('ProduitCategorieComponent', () => {
  let component: ProduitCategorieComponent;
  let fixture: ComponentFixture<ProduitCategorieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProduitCategorieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduitCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
