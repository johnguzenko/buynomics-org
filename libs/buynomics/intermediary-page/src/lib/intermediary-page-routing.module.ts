import { AddFormModule } from './add-form/add-form.module';
import { IntermediaryPageComponent } from './intermediary-page.component';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [
  {
    path: '',
    component: IntermediaryPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), AddFormModule],
  exports: [RouterModule],
})
export class IntermediaryPageRoutingModule {}
