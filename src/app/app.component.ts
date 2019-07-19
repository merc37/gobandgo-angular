import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { ScreenChangeObserverService } from './size-change-observer.service';
import { MatSidenav } from '@angular/material/sidenav';
import { AngularFireAuth } from 'angularfire2/auth';
import { Breakpoints } from '@angular/cdk/layout';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [AngularFireAuth]
})
export class AppComponent implements OnInit, OnDestroy {

    @ViewChild('sidenav', { read: MatSidenav, static: false }) sidenavRef: MatSidenav;

    mobile: boolean;
    showGarageSaleSubMenu = false;

    constructor(private screenChangeObserverService: ScreenChangeObserverService, private afAuth: AngularFireAuth) {
        afAuth.auth.signInAnonymously();
    }

    ngOnInit() {
        this.screenChangeObserverService.mobileSizeObservable.subscribe((result) => {
            if (result.matches) {
                this.mobile = true;
                if (this.sidenavRef) {
                    this.sidenavRef.mode = 'over';
                    if (this.sidenavRef.opened) {
                        this.sidenavRef.close();
                    }
                }
            }

            if (!result.matches) {
                this.mobile = false;
                if (this.sidenavRef) {
                    this.sidenavRef.mode = 'side';
                    if (!this.sidenavRef.opened) {
                        this.sidenavRef.open();
                    }
                }
            }
        });
    }

    ngOnDestroy() {
        this.afAuth.auth.signOut();
    }

    openSidenav() {
        if (this.sidenavRef && this.mobile && !this.sidenavRef.opened) {
            this.sidenavRef.open();
        }
    }

    closeSidenav() {
        if (this.sidenavRef && this.mobile && this.sidenavRef.opened) {
            this.sidenavRef.close();
        }
    }

    swipeSideNavLeft() {
        if (this.sidenavRef && this.mobile && this.sidenavRef.opened) {
            this.sidenavRef.close();
        }
    }
}
