import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LadiesshoesComponent } from './ladiesshoes.component';

describe('LadiesshoesComponent', () => {
  let component: LadiesshoesComponent;
  let fixture: ComponentFixture<LadiesshoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LadiesshoesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LadiesshoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
