import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AngularFireAuth]
})
export class AppComponent implements OnDestroy {

  @ViewChild('sidenav') sidenavRef: MatSidenav;

  mobile: boolean;

  constructor(private breakpointObserver: BreakpointObserver, private afAuth: AngularFireAuth) {
    breakpointObserver.observe([
      Breakpoints.Handset,
      Breakpoints.Tablet
    ]).subscribe(result => {
      if (result.matches) {
        this.mobile = true;
        if (this.sidenavRef) {
          if (this.sidenavRef.opened) {
            this.sidenavRef.close();
          }
          this.sidenavRef.mode = 'over';
        }
      }
    });

    breakpointObserver.observe([
      Breakpoints.Web
    ]).subscribe(result => {
      if (result.matches) {
        this.mobile = false;
        if (this.sidenavRef) {
          if (!this.sidenavRef.opened) {
            this.sidenavRef.open();
          }
          this.sidenavRef.mode = 'side';
        }
      }
    });

    afAuth.auth.signInAnonymously();
  }

  ngOnDestroy() {
    this.afAuth.auth.signOut();
  }

  onActivate(element: any) {

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
