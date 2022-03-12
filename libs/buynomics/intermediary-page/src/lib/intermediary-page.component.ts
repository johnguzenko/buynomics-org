import { FormGroup } from '@angular/forms';
import { AddFormComponent } from './add-form/add-form.component';
import { Component, ChangeDetectionStrategy, Injector } from '@angular/core';
import {
  TuiAppearance,
  tuiButtonOptionsProvider,
  TuiDialogService,
} from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';

@Component({
  selector: 'buynomics-org-intermediary-page',
  templateUrl: './intermediary-page.component.html',
  styleUrls: ['./intermediary-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    tuiButtonOptionsProvider({
      shape: 'rounded',
      appearance: TuiAppearance.Outline,
      size: 'm',
    }),
  ],
})
export class IntermediaryPageComponent {
  form = new FormGroup({});
  constructor(
    private injector: Injector,
    private readonly dialogService: TuiDialogService
  ) {}

  onEditClick() {}
  onDeleteClick() {}

  onAddClick() {
    this.dialogService
      .open(new PolymorpheusComponent(AddFormComponent, this.injector))
      .subscribe();
  }
}
