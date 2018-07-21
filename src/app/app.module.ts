import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { Routes, RouterModule } from '@angular/router';
import {
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { InformationComponent } from './garage-sale/information/information.component';
import { MapComponent } from './garage-sale/map/map.component';
import { PrintableMapComponent } from './garage-sale/printable-map/printable-map.component';
import { SignUpComponent } from './garage-sale/sign-up/sign-up.component';
import { DownloadsComponent } from './downloads/downloads.component';
import { RouterOutletDirective } from './directives/router-outlet.directive';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'information', component: InformationComponent },
  { path: 'map', component: MapComponent },
  { path: 'printable-map', component: PrintableMapComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'downloads', component: DownloadsComponent },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InformationComponent,
    MapComponent,
    PrintableMapComponent,
    SignUpComponent,
    DownloadsComponent,
    RouterOutletDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    RouterModule.forRoot(appRoutes),
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
