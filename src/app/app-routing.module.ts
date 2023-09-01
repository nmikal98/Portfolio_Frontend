import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { NasaComponent } from './pages/nasa/nasa.component';
import { CountriesComponent } from './pages/countries/countries.component';
import { ClipboardComponent } from './pages/tools/clipboard/clipboard.component';
import { OnlineTransferComponent } from './pages/tools/online-transfer/online-transfer.component';
import { QrComponent } from './pages/tools/qr/qr.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'nasa',
        component: NasaComponent,
      },

      {
        path: 'countries',
        component: CountriesComponent,
      },
      {
        path: 'contact',
        component: ContactComponent,
      },

      {
        path: 'clipboard',
        component: ClipboardComponent,
      },

      {
        path: 'onlineTransfer',
        component: OnlineTransferComponent,
      },

      {
        path: 'qrgenerator',
        component: QrComponent,
      },

      { path: '**', component: PageNotFoundComponent },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
