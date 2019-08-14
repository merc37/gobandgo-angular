import { Component, Inject, EventEmitter, ViewChild, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Form } from '@angular/forms';

export interface InputDialogData {
    title: string;
    inputType: string;
    inputPlaceholder: string;
}

@Component({
    selector: 'app-input-dialog',
    templateUrl: './input-dialog.component.html',
    styleUrls: ['./input-dialog.component.css']
})
export class InputDialogComponent implements OnInit {

    form: FormGroup;

    inputType: string = 'text';
    inputPlaceholder: string = 'value';

    onEnter: EventEmitter<string> = new EventEmitter();;

    constructor(@Inject(MAT_DIALOG_DATA) public data: InputDialogData, private formBuilder: FormBuilder) {

        if (data.inputType != '') {
            this.inputType = data.inputType;
        }

        if (data.inputType != '') {
            this.inputPlaceholder = data.inputPlaceholder;
        }
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            input: ''
        });
    }

    onSubmit(form: FormGroup) {
        this.onEnter.emit(form.value.input);
    }

}
