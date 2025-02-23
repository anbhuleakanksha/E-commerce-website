import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LadieswatchComponent } from './ladieswatch.component';

describe('LadieswatchComponent', () => {
  let component: LadieswatchComponent;
  let fixture: ComponentFixture<LadieswatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LadieswatchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LadieswatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
