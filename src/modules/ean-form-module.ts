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

    public constructor() {
        this.userEntryHandler();
    }

    private userEntryHandler(): void {
        this.eanField.on(
            'keyup',
            (event: any): void => {
                // My stuff here!
                console.log('Some user input was triggered');
            }
        );
    }
}