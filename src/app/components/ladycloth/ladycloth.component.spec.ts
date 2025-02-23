import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LadyclothComponent } from './ladycloth.component';

describe('LadyclothComponent', () => {
  let component: LadyclothComponent;
  let fixture: ComponentFixture<LadyclothComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LadyclothComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LadyclothComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
