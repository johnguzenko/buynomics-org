import { IntermediaryPageRoutingModule } from './intermediary-page-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntermediaryPageComponent } from './intermediary-page.component';

@NgModule({
  imports: [CommonModule, IntermediaryPageRoutingModule],
  declarations: [IntermediaryPageComponent],
})
export class IntermediaryPageModule {}
