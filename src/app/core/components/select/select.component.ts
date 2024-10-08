import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OPTIONS } from '@constants/options';
import { Option } from '@interfaces/option.interface';

@Component({
  host: {
    '(document:click)': 'trackClick($event)'
  },
  selector: 'app-select',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class SelectComponent {
  public optionChosen = output<number>();

  public options = OPTIONS;
  public showOption = false;
  public selectedOption = this.options[1];

  public trackClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (!target.closest('#za6e0804_2bd0_4672-b79d_d97027f9071a')) {
      this.showOption = false;
    }

    event.stopPropagation();
  }

  public toggleShowOption(): void {
    this.showOption = !this.showOption;
  }

  public selectOption(option: Option): void {
    if (option === this.selectedOption) {
      return;
    }

    this.options.forEach((opt, index) => {
      if (option.id === opt.id) {
        this.options[index].selected = true;
      } else {
        this.options[index].selected = false;
      }
    });

    this.selectedOption = option;
    this.optionChosen.emit(option.value);
  }
}

