import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [
  {
    path: 'intermediary',
    loadChildren: () =>
      import('@buynomics-org/buynomics/intermediary-page').then(
        (m) => m.IntermediaryPageModule
      ),
  },
  {
    path: 'product',
    loadChildren: () =>
      import('@buynomics-org/buynomics/product-page').then(
        (m) => m.ProductPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: false,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
