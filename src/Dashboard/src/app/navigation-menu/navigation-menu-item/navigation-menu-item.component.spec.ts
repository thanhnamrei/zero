import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationMenuItemComponent } from './navigation-menu-item.component';

describe('NavigationMenuItemComponent', () => {
  let component: NavigationMenuItemComponent;
  let fixture: ComponentFixture<NavigationMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationMenuItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavigationMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
