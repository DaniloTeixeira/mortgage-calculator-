import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';
import { LoaderComponent } from './core/components/loader/loader.component';
import { NavigationTrackerComponent } from './core/components/navigation-tracker/navigation-tracker.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterOutlet, NavigationTrackerComponent, LoaderComponent, AppComponent],
    }).compileComponents();
    
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render the router outlet', () => {
    fixture.detectChanges();
    const routerOutlet = fixture.debugElement.query(By.directive(RouterOutlet));
    expect(routerOutlet).toBeTruthy();
  });

  it('should display the loader initially', () => {
    component.loadingApp = true;
    fixture.detectChanges();
    
    const loaderElement = fixture.debugElement.query(By.directive(LoaderComponent));
    expect(loaderElement).toBeTruthy();
  });

  it('should change loadingApp to false after 2 seconds', () => {
    jest.useFakeTimers(); 
    
    component.ngOnInit();

    expect(component.loadingApp).toBe(true);

    jest.advanceTimersByTime(2000);

    expect(component.loadingApp).toBe(false);
 });
});
