import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatTooltipModule } from '@angular/material/tooltip';

import { debounceTime, delay, distinctUntilChanged, filter, tap, timer } from 'rxjs';
import { Mortgage } from '../../interfaces/mortgage.interface';
import { LoaderService } from '../../services/loader';
import { MortgageService } from '../../services/mortgage';
import { CardCalculationComponent } from '../card-calculation';
import { InputComponent } from '../input';
import { NavigationTrackerComponent } from '../navigation-tracker';
import { SelectComponent } from '../select';

const MODULES = [CommonModule, MatTooltipModule, FormsModule, ReactiveFormsModule];

const COMPONENTS = [InputComponent, SelectComponent, CardCalculationComponent, NavigationTrackerComponent];

@Component({
  selector: 'app-card-inputs',
  standalone: true,
  imports: [...MODULES, ...COMPONENTS,],
  templateUrl: './card-inputs.component.html',
  styleUrl: './card-inputs.component.scss'
})
export class CardInputsComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly loaderService = inject(LoaderService);

  public readonly mortgageService = inject(MortgageService);
  public readonly form = this.buildForm();

  public shouldBlurCaculationValues = true;
  public selectedOption: string | null = null;

  public readonly timer$ = timer(1000);

  ngOnInit(): void {
    this.loadCalculation();
    this.formChangesListener();
  }

  private formChangesListener(): void {
    this.form.valueChanges.pipe(
      filter(() => this.form.valid),
      debounceTime(500),
      distinctUntilChanged((prev, curr) => {
        return (
          prev.borrowingAmount === curr.borrowingAmount &&
          prev.purchasePrice === curr.purchasePrice &&
          prev.repaymentPeriod === curr.repaymentPeriod &&
          prev.grossIncome === curr.grossIncome &&
          prev.interestRate === curr.interestRate
        );
      }),
      tap(() => this.loaderService.setIsLoading(true)),
      delay(1000)
    ).subscribe((control) => {
      this.setMortgageValues();

      const blurValues = !(control.borrowingAmount && control.purchasePrice && control.repaymentPeriod && control.grossIncome && control.interestRate);

      this.shouldBlurCaculationValues = blurValues;

      this.loaderService.setIsLoading(false);
    });
  }

  private setMortgageValues(): void {
    const formValue = this.form.getRawValue();

    this.mortgageService.setValues(formValue as Mortgage);
  }

  private buildForm() {
    return this.fb.group({
      borrowingAmount: [826800, Validators.required],
      purchasePrice: [910000, Validators.required],
      repaymentPeriod: [30, Validators.required],
      grossIncome: [225000, Validators.required],
      interestRate: [3.65, Validators.required],
    });
  }

  private loadCalculation() {
    this.timer$.subscribe(() => {
      this.shouldBlurCaculationValues = false;
    });
  }

  setpreferredRepaymentPeriod(period: number) {
    this.form.controls.repaymentPeriod.setValue(period);
  }
}
