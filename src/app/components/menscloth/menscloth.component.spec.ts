import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensclothComponent } from './menscloth.component';

describe('MensclothComponent', () => {
  let component: MensclothComponent;
  let fixture: ComponentFixture<MensclothComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MensclothComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MensclothComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
