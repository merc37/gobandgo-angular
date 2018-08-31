import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
    selector: 'app-downloads',
    templateUrl: './downloads.component.html',
    styleUrls: ['./downloads.component.css']
})
export class DownloadsComponent implements OnInit {

    @HostBinding('class.flex-grow-1') flexGrow1 = 'flex-grow-1';
    @HostBinding('class.d-flex') dFlex = 'd-flex';
    @HostBinding('class.flex-column') flexColumn = 'flex-column';

    garageSaleMapDownloadUrl: string = null;

    constructor(private storage: AngularFireStorage) {
        storage.ref('garageSaleMap.pdf').getDownloadURL().toPromise().then((downloadUrl) => {
            this.garageSaleMapDownloadUrl = downloadUrl;
        });
    }

    ngOnInit() {
    }

}
