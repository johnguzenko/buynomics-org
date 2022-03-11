import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ProductPageComponent } from './product-page.component';

const routes: Route[] = [
  {
    path: '',
    component: ProductPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductPageRoutingModule {}
