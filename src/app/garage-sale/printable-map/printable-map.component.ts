import { Component, ViewChild, HostBinding, SecurityContext } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-printable-map',
    templateUrl: './printable-map.component.html',
    styleUrls: ['./printable-map.component.css']
})
export class PrintableMapComponent {

    @HostBinding('class.flex-grow-1') flexGrow1 = 'flex-grow-1';
    @HostBinding('class.d-flex') dFlex = 'd-flex';
    @HostBinding('class.flex-column') flexColumn = 'flex-column';

    pdf: any = null;

    constructor(db: AngularFireDatabase, sanitizer: DomSanitizer) {
        let sub = db.object('mapPDFURL').valueChanges().subscribe((data: string) => {
            this.pdf = sanitizer.bypassSecurityTrustResourceUrl(data);
        });
    }
}
