export class Marker {

    public _key: string = '';

    constructor(public address: string, public date: string, public downloadUrl: string, public email: string, public firstName: string,
        public lastName: string, public latitude: number, public longitude: number, public message: string, public paid: boolean,
        public timestamp: number, public needsSign: boolean) {

    }
}
