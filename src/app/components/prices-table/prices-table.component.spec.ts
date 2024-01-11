import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricesTableComponent } from './prices-table.component';

describe('PricesComponent', () => {
  let component: PricesTableComponent;
  let fixture: ComponentFixture<PricesTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PricesTableComponent]
    });
    fixture = TestBed.createComponent(PricesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
