import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  TuiAppearance,
  tuiButtonOptionsProvider,
  TuiDialogService,
} from '@taiga-ui/core';

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
  constructor(private readonly dialogService: TuiDialogService) {}

  onEditClick() {}
  onDeleteClick() {}

  onAddClick() {
    this.dialogService.open('Hi').subscribe();
  }
}
