import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { MapsAPILoader } from '@agm/core';

declare var google: any;

@Injectable({
    providedIn: 'root'
})
export class GeocodeService {

    geocoder: any;

    constructor(mapsApiLoader: MapsAPILoader) {
        mapsApiLoader.load().then(() => {
            this.geocoder = new google.maps.Geocoder();
        });
    }

    codeAddress(address: string) {
        return Observable.create((observer) => {
            // Invokes geocode method of Google Maps API geocoding.
            this.geocoder.geocode({ address: address, componentRestrictions: { country: 'US', postalCode: '07603' } }, (
                (results, status) => {
                    if (status === google.maps.GeocoderStatus.OK) {
                        observer.next(results);
                        observer.complete();
                    } else {
                        // console.log('Geocoding service: geocode was not successful for the following reason: ' + status);
                        observer.error(status);
                    }
                })
            );
        });
    }
}
