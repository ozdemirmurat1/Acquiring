import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelLoadingButtonComponent } from './excel-loading-button.component';

describe('ExcelLoadingButtonComponent', () => {
  let component: ExcelLoadingButtonComponent;
  let fixture: ComponentFixture<ExcelLoadingButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ExcelLoadingButtonComponent]
    });
    fixture = TestBed.createComponent(ExcelLoadingButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
