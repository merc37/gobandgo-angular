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
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { InformationComponent } from './garage-sale/information/information.component';
import { MapComponent } from './garage-sale/map/map.component';
import { SignUpComponent } from './garage-sale/sign-up/sign-up.component';
import { DownloadsComponent } from './downloads/downloads.component';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';
import { AdminComponent } from './admin/admin.component';
import { PrintableMapComponent } from './garage-sale/printable-map/printable-map.component';
import { InputDialogComponent } from './input-dialog/input-dialog.component';

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'information', component: InformationComponent },
    { path: 'map', component: MapComponent },
    { path: 'printable-map', component: PrintableMapComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'downloads', component: DownloadsComponent },
    { path: 'admin', component: AdminComponent },
    { path: '**', redirectTo: '/home' }
];

@NgModule({
    entryComponents: [
        InfoDialogComponent,
        InputDialogComponent
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        InformationComponent,
        MapComponent,
        SignUpComponent,
        DownloadsComponent,
        InfoDialogComponent,
        AdminComponent,
        PrintableMapComponent,
        InputDialogComponent
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
        MatStepperModule,
        MatRippleModule,
        MatDividerModule,
        MatTableModule,
        MatSortModule,
        MatCheckboxModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
