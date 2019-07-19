import { Component, OnInit, HostBinding, ViewChild, ElementRef, DoCheck, HostListener } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Marker } from '../../marker';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, DoCheck {

    @HostBinding('class.flex-grow-1') flexGrow1 = 'flex-grow-1';
    @HostBinding('class.d-flex') dFlex = 'd-flex';
    @HostBinding('class.flex-column') flexColumn = 'flex-column';

    @ViewChild('mapDiv', { static: true }) mapDivRef: ElementRef;
    private oldMapHeight = 0;
    mapHeightStyle = 0 + 'px';

    markers: Observable<Marker[]>;

    latitude = 40.877116;
    longitude = -74.029771;
    zoom = 15;

    spinnerHidden = false;

    constructor(db: AngularFireDatabase) {
        this.markers = db.list<Marker>('/markers', ref => ref.orderByChild('paid').equalTo(true)).valueChanges();
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        if (this.mapDivRef.nativeElement.offsetHeight !== this.oldMapHeight) {
            this.mapHeightStyle = this.mapDivRef.nativeElement.offsetHeight + 'px';
            this.oldMapHeight = this.mapDivRef.nativeElement.offsetHeight;
        }
    }

    onMapIdle() {
        if (!this.spinnerHidden) {
            this.spinnerHidden = true;
        }
    }

    ngDoCheck() {
        if (this.mapDivRef.nativeElement.offsetHeight !== this.oldMapHeight) {
            this.mapHeightStyle = this.mapDivRef.nativeElement.offsetHeight + 'px';
            this.oldMapHeight = this.mapDivRef.nativeElement.offsetHeight;
        }
    }

    ngOnInit() {

    }

}
