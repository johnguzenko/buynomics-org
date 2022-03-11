import { RouterModule } from '@angular/router';
import { IntermediaryPageRoutingModule } from './intermediary-page-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntermediaryPageComponent } from './intermediary-page.component';
import { TuiButtonModule, TuiLinkModule } from '@taiga-ui/core';

@NgModule({
  imports: [
    CommonModule,
    IntermediaryPageRoutingModule,
    TuiButtonModule,
    RouterModule,
    TuiLinkModule,
  ],
  declarations: [IntermediaryPageComponent],
})
export class IntermediaryPageModule {}
