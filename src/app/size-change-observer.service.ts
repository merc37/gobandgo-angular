import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ScreenChangeObserverService implements OnInit, OnDestroy {

    mobileSizeObservable: Observable<BreakpointState>;
    webSizeObservable: Observable<BreakpointState>;
    portraitOrientationObservable: Observable<BreakpointState>;
    landscapeOrientationObservable: Observable<BreakpointState>;

    constructor(private breakPointObserver: BreakpointObserver) {
        this.mobileSizeObservable = this.breakPointObserver.observe([
            Breakpoints.Handset,
            Breakpoints.Tablet
        ]);

        this.webSizeObservable = this.breakPointObserver.observe([
            Breakpoints.Web
        ]);

        this.portraitOrientationObservable = this.breakPointObserver.observe([
            Breakpoints.HandsetPortrait,
            Breakpoints.TabletPortrait,
            Breakpoints.WebPortrait
        ]);

        this.landscapeOrientationObservable = this.breakPointObserver.observe([
            Breakpoints.HandsetLandscape,
            Breakpoints.TabletLandscape,
            Breakpoints.WebLandscape
        ]);
    }

    ngOnInit() {

    }

    ngOnDestroy() {
        this.breakPointObserver.ngOnDestroy();
    }

}
