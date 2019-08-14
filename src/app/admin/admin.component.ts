import { Component, OnInit, ViewChild, HostBinding } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { Marker } from '../marker';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { InputDialogComponent } from '../input-dialog/input-dialog.component';
import * as crypto from 'crypto-js';
import { Observable, Subscription } from 'rxjs';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatTable, { read: MatTable, static: true }) table: MatTable<any>;

    displayedColumns: string[] = ['select', 'address', 'email', 'firstName', 'lastName', 'paid', 'date', 'needsSign'];
    markers: MatTableDataSource<Marker> = null;
    selection = new SelectionModel<Marker>(true, []);
    angularFireMarkerList: AngularFireList<Marker>;

    constructor(private db: AngularFireDatabase, private dialog: MatDialog) {
        let dialogRef = dialog.open(InputDialogComponent, {
            disableClose: true,
            data: {
                title: "Enter Password:",
                inputType: 'password',
                inputPlaceholder: 'Password'
            }
        });
        let saltUnsub: Subscription;
        let passUnsub: Subscription;
        dialogRef.componentInstance.onEnter.subscribe(value => {
            saltUnsub = db.object('adminPassSalt').valueChanges().subscribe((passSalt: string) => {
                saltUnsub.unsubscribe();
                passUnsub = db.object('adminPassHash').valueChanges().subscribe((passHash: string) => {
                    passUnsub.unsubscribe();
                    if (this.sha3Hash(value, passSalt) != passHash) {
                        return;
                    }
                    this.angularFireMarkerList = db.list<Marker>("/markers");
                    let marker: Marker;
                    this.angularFireMarkerList.snapshotChanges().subscribe((markersSnapshots) => {
                        this.markers = new MatTableDataSource<Marker>(markersSnapshots.map((markersSnapshot) => {
                            marker = markersSnapshot.payload.val();
                            marker._key = markersSnapshot.key;
                            return marker;
                        }));
                        this.markers.sort = this.sort;
                    });
                    dialogRef.close();
                });
            });
        });
    }

    ngOnInit() {

    }

    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.markers.data.length;
        return numSelected === numRows;
    }

    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.markers.data.forEach(row => this.selection.select(row));
    }

    setPaid() {
        this.selection.selected.forEach((marker) => {
            this.db.object<Marker>('/markers/' + marker._key).update({ paid: true });
        });
        this.selection.clear();
    }

    sha3Hash(value: string, salt: string) {
        const algo = crypto.algo.SHA3.create();
        algo.update(value);
        algo.update(salt);
        return algo.finalize().toString();
    }

}
