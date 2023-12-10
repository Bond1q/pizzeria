import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigurationComponent } from './pages/configuration/configuration.component';

const routes: Routes = [
  {
    path: 'orders',
    loadComponent: () =>
      import('./pages/orders/orders.component').then((m) => m.OrdersComponent),
  },
  {
    path: 'cooks',
    loadComponent: () =>
      import('./pages/cooks/cooks.component').then((m) => m.CooksComponent),
  },
  {
    path: '',
    loadComponent: () =>
      import('./pages/configuration/configuration.component').then(
        (m) => m.ConfigurationComponent
      ),
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ConfigurationComponent,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
