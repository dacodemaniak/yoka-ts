import * as $ from 'jquery';

/**
 * @name EanFormModule
 * @author Aélion - Jan. 2020
 * @version 1.0.0
 *  Manage EAN form with some constraints :
 *      - only digits are allowed in the field,
 *      - Trigger API call when 13 digits are entered
 */
export class EanFormModule {
    private readonly eanField: JQuery = $('#ean');
    private authorizedChars: number[] = new Array(
        8, 37, 46, 16
    );

    public constructor() {
        this.userEntryHandler();
    }

    private userEntryHandler(): void {
        this.eanField.on(
            'keyup',
            (event: any): void => {
                console.log(`Event : ${JSON.stringify(event.which)}`);
                if (
                    (event.which >= 96 && event.which <= 105) || 
                    (event.which >= 48 && event.which <= 57)
                ) {
                    // My stuff here!
                    if (this.eanField.val().toString().length == 13) {
                        console.log('Have to do something!');
                    }
                } else {
                    if (this.authorizedChars.indexOf(event.which, 0) == -1) {
                        const valLength: number = this.eanField.val().toString().length;
                        if (valLength > 1) {
                            this.eanField.val(this.eanField.val().toString().substring(valLength - 1));
                        } else {
                            this.eanField.val('');
                        }
                    }
                }
            }
        );
    }
}