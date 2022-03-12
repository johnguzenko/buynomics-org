import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TuiValidationError } from '@taiga-ui/cdk';

@Component({
  selector: 'buynomics-org-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddFormComponent {
  form = this.fb.group({
    name: '',
    order: null,
    type: 'Range',
    rangeForm: this.fb.group({
      from: null,
      to: null,
      step: null,
    }),
    dropdownForm: this.fb.array([]),
  });

  types = ['Range', 'Dropdown'];

  error = new TuiValidationError('An error');

  get computedError(): TuiValidationError | null {
    return this.error;
  }

  get rangeForm(): FormGroup {
    return this.form.controls['rangeForm'] as FormGroup;
  }

  get dropdownForm(): FormArray {
    return this.form.controls['dropdownForm'] as FormArray;
  }

  constructor(private readonly fb: FormBuilder) {
    console.log(this.form);
  }

  addDropdownOption() {
    this.dropdownForm.push(
      this.fb.group({
        option: null,
        value: null,
      })
    );
  }

  onDeleteDropdownOption(i: number) {
    this.dropdownForm.removeAt(i);
  }
}
