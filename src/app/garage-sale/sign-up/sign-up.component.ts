// tslint:disable:max-line-length
import { Component, HostBinding, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
import { GeocodeService } from '../../geocode.service';
import { MatDialog } from '@angular/material/dialog';
import { MatVerticalStepper } from '@angular/material/stepper';
import { InfoDialogComponent } from '../../info-dialog/info-dialog.component';
import { FormGroup, FormBuilder, Validators, ValidationErrors, AbstractControl, FormControl } from '@angular/forms';
import { ScreenChangeObserverService } from '../../size-change-observer.service';
import { Marker } from '../../marker';

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

    @ViewChild('stepper', { read: MatVerticalStepper, static: false }) stepperRef: MatVerticalStepper;

    mobile: boolean;

    photoPreviewUrl: string;

    nameFormGroup: FormGroup;
    emailFormGroup: FormGroup;
    addressFormGroup: FormGroup;
    messageFormGroup: FormGroup;
    photoFormGroup: FormGroup;
    photo: File = null;

    private geocodeResult: any;

    constructor(private db: AngularFireDatabase, private storage: AngularFireStorage, private geocodeService: GeocodeService,
        private dialog: MatDialog, private formBuilder: FormBuilder, private screenChangeObservableService: ScreenChangeObserverService) {
        this.defaultImageUrl = 'https://firebasestorage.googleapis.com/v0/b/gobandgo-1344.appspot.com/o/default%2FgarageSaleSign.png?alt=media&token=e83d55e2-6e35-4d92-9b0c-60f0f7e9d6c8';
        this.photoPreviewUrl = this.defaultImageUrl;

        screenChangeObservableService.mobileSizeObservable.subscribe((result) => {
            this.mobile = result.matches;
        });
    }

    addressValidate(ctrl: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
        return new Promise((resolve, reject) => {
            if (!ctrl.value.match(/\d+/g)) {
                return resolve({ notValid: "Not a valid address" });
            }
            return this.geocodeService.codeAddress(ctrl.value).toPromise().then((geocodeResult) => {
                const addressKey = geocodeResult[0].formatted_address.slice(0, geocodeResult[0].formatted_address.indexOf(',')).replace(/\s+/g, '');
                return this.db.object('addressesAdded/' + addressKey).valueChanges().pipe(take(1)).subscribe((value) => {
                    if (!value) {
                        this.geocodeResult = geocodeResult;
                        return resolve(null);
                    }
                    return resolve({ addressCheck: 'Address already exists' });
                });
            }).catch((err) => {
                return resolve({ geocode: 'Address could not be found' });
            });
        });
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
            addressInput: new FormControl('', {
                validators: Validators.required,
                asyncValidators: this.addressValidate.bind(this),
                updateOn: 'submit'
            })
        });

        const addressFormStatusSubscription = this.addressFormGroup.statusChanges.subscribe((status) => {
            if (status === 'VALID') {
                addressFormStatusSubscription.unsubscribe();
                this.stepperRef.next();
            }
        });

        this.messageFormGroup = this.formBuilder.group({
            messageInput: ['', Validators.maxLength(200)]
        });
    }

    onFilesChange(event) {
        if (event.target.files && event.target.files.length) {
            this.photo = event.target.files[0];
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                this.photoPreviewUrl = fileReader.result.toString();
            };
            fileReader.readAsDataURL(this.photo);
        }
    }

    reset() {
        this.nameFormGroup.reset();
        this.emailFormGroup.reset();
        this.addressFormGroup.reset();
        this.messageFormGroup.reset();
        this.photo = null;
        this.geocodeResult = null;
        this.stepperRef.reset();
    }

    onSubmit() {
        const marker = new Marker(this.geocodeResult[0].formatted_address.slice(0, this.geocodeResult[0].formatted_address.indexOf(',')),
            new Date(Date.now()).toISOString(),
            this.defaultImageUrl,
            this.emailFormGroup.value.emailInput,
            this.nameFormGroup.value.firstNameInput,
            this.nameFormGroup.value.lastNameInput,
            this.geocodeResult[0].geometry.location.lat(),
            this.geocodeResult[0].geometry.location.lng(),
            this.messageFormGroup.value.messageInput || 'Various Items For Sale',
            false,
            Date.now());
        const markerKey = this.db.createPushId();
        this.db.object<Marker>('markers/' + markerKey).set(marker).then(() => {
            if (this.photo) {
                const photoPath = markerKey + '/garageSalePhoto' + this.photo.name.slice(this.photo.name.lastIndexOf('.'), this.photo.name.length);
                this.storage.upload(photoPath, this.photo);
            }
            const addressKey = marker.address.replace(/\s+/g, '');
            this.db.object('addressesAdded/' + addressKey).set(true).then(() => {
                this.dialog.open(InfoDialogComponent, {
                    data: {
                        title: 'Map Marker Submitted!',
                        content: 'Marker will display on map when paid for, see info page for details',
                    }
                });
                this.reset();
            });
        });

    }
}
