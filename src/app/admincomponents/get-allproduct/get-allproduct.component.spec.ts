import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllproductComponent } from './get-allproduct.component';

describe('GetAllproductComponent', () => {
  let component: GetAllproductComponent;
  let fixture: ComponentFixture<GetAllproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllproductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetAllproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
