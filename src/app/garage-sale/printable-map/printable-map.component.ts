import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Marker } from '../../marker';

@Component({
    selector: 'app-printable-map',
    templateUrl: './printable-map.component.html',
    styleUrls: ['./printable-map.component.css']
})
export class PrintableMapComponent implements OnInit {

    mapUrl = "https://maps.googleapis.com/maps/api/staticmap?center=40.877116,-74.029771&zoom=15&size=640x640&scale=2&key=AIzaSyAMrM2lVpoHhnf7nSIU02QhrKtbXpMCc2g&markers=";

    constructor(db: AngularFireDatabase) {
        db.list<Marker>('/markers', ref => ref.orderByChild('paid').equalTo(true)).valueChanges().forEach((markers) => {
            markers.forEach((marker) => {
                this.mapUrl = this.mapUrl + (marker.latitude + "," + marker.longitude + "|");
            });
        });
    }

    ngOnInit() {
    }

}
