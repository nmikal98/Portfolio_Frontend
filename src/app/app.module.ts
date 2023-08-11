import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from './shared/material.module';
import { NgxSpinnerModule } from 'ngx-spinner';

import { LayoutComponent } from './layout/layout.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { TimelineItemComponent } from './timeline-item/timeline-item.component';
import { NasaComponent } from './pages/nasa/nasa.component';
import { LargeImageDialogComponent } from './large-image-dialog/large-image-dialog.component';

import { CountriesComponent } from './pages/countries/countries.component';
import { NumberFormatPipe } from './number-format.pipe';

import { ClipboardComponent } from './pages/tools/clipboard/clipboard.component';
import { OnlineTransferComponent } from './pages/tools/online-transfer/online-transfer.component';
import { PopupWindowComponent } from './popup-window/popup-window.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LayoutComponent,
    ContactComponent,
    HomeComponent,
    TimelineItemComponent,
    NasaComponent,
    LargeImageDialogComponent,
    CountriesComponent,
    NumberFormatPipe,
    ClipboardComponent,
    OnlineTransferComponent,
    PopupWindowComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({ positionClass: 'toast-bottom-right' }),
    FlexLayoutModule,
    NgxSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
