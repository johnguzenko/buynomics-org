import {
  TuiDataListWrapperModule,
  TuiInputModule,
  TuiInputNumberModule,
  TuiSelectModule,
} from '@taiga-ui/kit';
import { AddFormComponent } from './add-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  TuiDataListModule,
  TuiErrorModule,
  TuiButtonModule,
} from '@taiga-ui/core';

@NgModule({
  declarations: [AddFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TuiErrorModule,
    TuiInputModule,
    TuiInputNumberModule,
    TuiSelectModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiButtonModule,
  ],
  exports: [AddFormComponent],
})
export class AddFormModule {}
