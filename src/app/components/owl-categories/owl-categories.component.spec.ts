import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwlCategoriesComponent } from './owl-categories.component';

describe('OwlCategoriesComponent', () => {
  let component: OwlCategoriesComponent;
  let fixture: ComponentFixture<OwlCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwlCategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwlCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
