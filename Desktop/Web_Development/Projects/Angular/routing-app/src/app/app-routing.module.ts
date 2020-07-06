import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './test/test.component';
import { DealersComponent } from './dealers/dealers.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { SalesComponent } from './sales/sales.component';
import { PostDealersComponent } from './post-dealers/post-dealers.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: TestComponent },
  { path: 'home', component: TestComponent },
  { path: 'dealers', component: DealersComponent },
  { path: 'sales', component: SalesComponent },
  { path: 'post-dealers', component: PostDealersComponent },
  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponents = [
  TestComponent,
  DealersComponent,
  PagenotfoundComponent,
  SalesComponent,
  PostDealersComponent,
];
