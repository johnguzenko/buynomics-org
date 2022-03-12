import { HttpClient } from '@angular/common/http';
import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { TuiValidationError } from '@taiga-ui/cdk';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { catchError, EMPTY, tap } from 'rxjs';

@Component({
  selector: 'buynomics-org-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddFormComponent {
  readonly form = this.fb.group({
    name: [null, [Validators.required, Validators.maxLength(255)]],
    order: [null, [Validators.required, Validators.min(1)]],
    type: 'Range',
  });

  readonly rangeForm = this.fb.group({
    from: [null, [Validators.required, Validators.min(0.000001)]],
    to: [null, [Validators.required, Validators.min(0.000001)]],
    step: [null, [Validators.required, Validators.min(0.000001)]],
  });

  readonly dropdownForm = this.fb.group({
    options: this.fb.array([], Validators.required),
  });

  types = ['Range', 'Dropdown'];

  error = new TuiValidationError('An error');
  dropdownInvalidError = new TuiValidationError(
    'Options should be specified and filled correctly'
  );

  serverError: TuiValidationError | null = null;

  get computedError(): TuiValidationError | null {
    return this.error;
  }

  get computedDropdownEmptyError(): TuiValidationError | null {
    return !this.dropdownOptions.controls.length || this.dropdownForm.invalid
      ? this.dropdownInvalidError
      : null;
  }

  get isFormDisabled(): boolean {
    return this.form.invalid || this.selectedType === 'Range'
      ? this.rangeForm.invalid
      : this.dropdownForm.invalid;
  }

  get selectedType(): string {
    return this.form.controls['type'].value;
  }

  get dropdownOptions(): FormArray {
    return this.dropdownForm.get('options') as FormArray;
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly httpClient: HttpClient,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<void, void>
  ) {}

  addDropdownOption() {
    this.dropdownOptions.push(
      this.fb.group({
        option: [null, [Validators.required]],
        value: [null, [Validators.required, Validators.min(0.000001)]],
      })
    );
  }

  onDeleteDropdownOption(i: number) {
    this.dropdownOptions.removeAt(i);
  }

  onSubmit(event: Event) {
    event.preventDefault();

    this.httpClient
      .post('/api/intermediary', {
        name: this.form.controls['name'].value,
        order: this.form.controls['order'].value,
        type: this.form.controls['type'].value,
        typeInfo:
          this.form.controls['type'].value === 'Range'
            ? this.rangeForm.value
            : { options: this.dropdownOptions.value },
      })
      .pipe(
        tap(() => {
          this.context.completeWith();
        }),
        catchError((errorResponse) => {
          this.serverError = new TuiValidationError(
            errorResponse.error.message
          );
          return EMPTY;
        })
      )
      .subscribe();
  }
}
