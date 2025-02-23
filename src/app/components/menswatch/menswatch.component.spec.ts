import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenswatchComponent } from './menswatch.component';

describe('MenswatchComponent', () => {
  let component: MenswatchComponent;
  let fixture: ComponentFixture<MenswatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenswatchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenswatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
