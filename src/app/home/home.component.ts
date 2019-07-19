// tslint:disable:max-line-length
import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    @HostBinding('class.flex-grow-1') flexGrow1 = 'flex-grow-1';
    @HostBinding('class.d-flex') dFlex = 'd-flex';
    @HostBinding('class.flex-column') flexColumn = 'flex-column';

    homeBackground = "assets/garageSalePhoto.jpg"

    slideshowImageUrls: Array<string> = [];
    constructor(private db: AngularFireDatabase) {
        db.list('/slideshow').valueChanges().subscribe((imageUrls) => {
            if (imageUrls) {
                this.slideshowImageUrls = imageUrls.map(url => String(url));
            }
        });
    }

    ngOnInit() {
    }

}
