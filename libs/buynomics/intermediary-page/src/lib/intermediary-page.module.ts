import { TuiInputModule } from '@taiga-ui/kit';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IntermediaryPageRoutingModule } from './intermediary-page-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntermediaryPageComponent } from './intermediary-page.component';
import { TuiButtonModule, TuiLinkModule, TuiErrorModule } from '@taiga-ui/core';

@NgModule({
  imports: [
    CommonModule,
    IntermediaryPageRoutingModule,
    TuiButtonModule,
    RouterModule,
    TuiLinkModule,
    ReactiveFormsModule,
    FormsModule,
    TuiErrorModule,
    TuiInputModule,
  ],
  declarations: [IntermediaryPageComponent],
})
export class IntermediaryPageModule {}
