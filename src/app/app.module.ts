import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from '../environments/firebase.config';
import { googleMapsConfig } from '../environments/google-maps.config';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import {
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatStepperModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { InformationComponent } from './garage-sale/information/information.component';
import { MapComponent } from './garage-sale/map/map.component';
import { PrintableMapComponent } from './garage-sale/printable-map/printable-map.component';
import { SignUpComponent } from './garage-sale/sign-up/sign-up.component';
import { DownloadsComponent } from './downloads/downloads.component';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';

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
    entryComponents: [
        InfoDialogComponent
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        InformationComponent,
        MapComponent,
        PrintableMapComponent,
        SignUpComponent,
        DownloadsComponent,
        InfoDialogComponent
    ],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        LayoutModule,
        RouterModule.forRoot(appRoutes),
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireDatabaseModule,
        AngularFireStorageModule,
        AgmCoreModule.forRoot({ apiKey: googleMapsConfig.apiKey }),
        AgmSnazzyInfoWindowModule,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        MatStepperModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
