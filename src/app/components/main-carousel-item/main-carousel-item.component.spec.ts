import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCarouselItemComponent } from './main-carousel-item.component';

describe('MainCarouselItemComponent', () => {
  let component: MainCarouselItemComponent;
  let fixture: ComponentFixture<MainCarouselItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainCarouselItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainCarouselItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
