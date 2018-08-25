// tslint:disable:max-line-length
import { Component, HostBinding, OnInit, ViewChild, ElementRef } from '@angular/core';
import { take } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
import { GeocodeService } from '../../geocode.service';
import { MatDialog, MatHorizontalStepper } from '@angular/material';
import { InfoDialogComponent } from '../../info-dialog/info-dialog.component';
import { FormGroup, FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

    @HostBinding('class.flex-grow-1') flexGrow1 = 'flex-grow-1';
    @HostBinding('class.d-flex') dFlex = 'd-flex';
    @HostBinding('class.flex-column') flexColumn = 'flex-column';

    private defaultImageUrl: string;

    @ViewChild('stepper') stepperRef: MatHorizontalStepper;

    nameFormGroup: FormGroup;
    emailFormGroup: FormGroup;
    addressFormGroup: FormGroup;
    messageFormGroup: FormGroup;
    photoFormGroup: FormGroup;
    photo: File = null;

    constructor(private db: AngularFireDatabase, private storage: AngularFireStorage, private geocodeService: GeocodeService,
        private dialog: MatDialog, private formBuilder: FormBuilder) {
        this.defaultImageUrl = 'https://firebasestorage.googleapis.com/v0/b/gobandgo-1344.appspot.com/o/default%2FgarageSaleSign.png?alt=media&token=e83d55e2-6e35-4d929b0c-60f0f7e9d6c8';
    }

    ngOnInit() {
        this.nameFormGroup = this.formBuilder.group({
            firstNameInput: ['', Validators.required],
            lastNameInput: ['', Validators.required]
        });

        this.emailFormGroup = this.formBuilder.group({
            emailInput: ['', Validators.email]
        });

        this.addressFormGroup = this.formBuilder.group({
            addressInput: ['', Validators.required]
        });

        this.messageFormGroup = this.formBuilder.group({
            messageInput: ['', Validators.maxLength(200)]
        });
    }

    onFilesChange(event) {
        if (event.target.files && event.target.files.length) {
            this.photo = event.target.files[0];
        }
    }

    reset() {
        this.nameFormGroup.reset();
        this.emailFormGroup.reset();
        this.addressFormGroup.reset();
        this.messageFormGroup.reset();
        this.photo = null;
        this.stepperRef.reset();
    }

    onSubmit() {
        const marker = {
            timestamp: Date.now(),
            date: new Date(Date.now()).toISOString(),
            paid: false,
            message: this.messageFormGroup.value.messageInput || 'Various Items For Sale',
            email: this.emailFormGroup.value.emailInput,
            firstName: this.nameFormGroup.value.firstNameInput,
            lastName: this.nameFormGroup.value.lastNameInput,
        };

        this.geocodeService.codeAddress(this.addressFormGroup.value.addressInput).toPromise().then((geocodeResult) => {

            marker['address'] = geocodeResult[0].formatted_address.slice(0, geocodeResult[0].formatted_address.indexOf(','));

            const addressKey = marker['address'].replace(/\s+/g, '');
            const addressCheck = this.db.object('addressesAdded/' + addressKey).valueChanges().subscribe((value) => {
                addressCheck.unsubscribe();
                if (!value) {
                    marker['latitude'] = geocodeResult[0].geometry.location.lat();
                    marker['longitude'] = geocodeResult[0].geometry.location.lng();

                    const markerKey = this.db.createPushId();
                    console.log(markerKey);
                    marker['downloadUrl'] = this.defaultImageUrl;
                    this.db.object('markers/' + markerKey).set(marker).then(() => {
                        if (this.photo) {
                            const photoPath = markerKey + '/garageSalePhoto' + this.photo.name.slice(this.photo.name.lastIndexOf('.'), this.photo.name.length);
                            this.storage.upload(photoPath, this.photo);
                        }
                        this.dialog.open(InfoDialogComponent, {
                            data: {
                                title: 'Map Marker Added!',
                                content: 'Check out the interactive map',
                            }
                        });
                        this.reset();
                    });
                }

                if (value) {
                    this.dialog.open(InfoDialogComponent, {
                        data: {
                            title: 'Address alerady added',
                            content: 'The address given has already been submitted',
                        }
                    });
                    this.reset();
                }
            });
        });

    }
}
