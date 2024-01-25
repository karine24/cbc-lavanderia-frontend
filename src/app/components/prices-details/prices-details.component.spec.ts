import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricesDetailsComponent } from './prices-details.component';

describe('PricesComponent', () => {
  let component: PricesDetailsComponent;
  let fixture: ComponentFixture<PricesDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PricesDetailsComponent]
    });
    fixture = TestBed.createComponent(PricesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
