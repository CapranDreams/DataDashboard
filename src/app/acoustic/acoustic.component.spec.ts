import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcousticComponent } from './acoustic.component';

describe('AcousticComponent', () => {
  let component: AcousticComponent;
  let fixture: ComponentFixture<AcousticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcousticComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AcousticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
