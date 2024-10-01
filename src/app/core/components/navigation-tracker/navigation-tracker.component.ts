import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-navigation-tracker',
  standalone: true,
  imports: [],
  templateUrl: './navigation-tracker.component.html',
  styleUrl: './navigation-tracker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationTrackerComponent {
  selectedNavigationItem = 2;
  readonly navigationTrackerItems = Array.from({ length: 8 });

  // Simulates the navigation tracker
  onSelectedItem(index: number) {
    this.selectedNavigationItem = index;
  }
}
