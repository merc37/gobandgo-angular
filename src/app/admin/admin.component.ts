import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

    displayedColumns: string[] = ['address', 'email', 'firstName', 'lastName', 'paid', 'date'];

    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatTable, { read: MatTable, static: true }) table: MatTable<any>;
    markers: Observable<any[]>;

    constructor(db: AngularFireDatabase) {
        this.markers = db.list("/markers").valueChanges();
        // new MatTableDataSource().s
        // this.table.dataSource.sort = sort;
    }

    ngOnInit() {
    }

}
