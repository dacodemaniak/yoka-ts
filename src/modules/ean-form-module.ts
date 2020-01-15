import * as $ from 'jquery';
import * as materialize from 'materialize-css';

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
    private readonly image: JQuery = $('#product-image');
    private readonly contentTitle: JQuery = $('.card-content .card-title');
    private readonly revealTitle: JQuery = $('.card-reveal .card-title');

    private authorizedChars: number[] = new Array(
        8, 37, 46, 16
    );

    public constructor() {
        materialize.AutoInit();

        this.userEntryHandler();
    }

    private userEntryHandler(): void {
        this.eanField.on(
            'keyup',
            (event: any): void => {
                if (
                    (event.which >= 96 && event.which <= 105) || 
                    (event.which >= 48 && event.which <= 57)
                ) {
                    // My stuff here!
                    if (this.eanField.val().toString().length == 13) {
                        const uri: string = 'https://world.openfoodfacts.org/api/v0/product/' + this.eanField.val() + '.json';
                        const verb: string = 'get';
                        // Transport request to the server and manage response from the server
                        $.ajax({
                            url: uri, // URI to reach (route to a server)
                            method: verb, // How to talk to the server
                            dataType: 'json', // What kind of data is expected
                            success: (response: any) => {
                                const serverStatus: string = response.status_verbose; // Some response attribute
                                if (serverStatus == 'product not found') {
                                    console.log('Sorry guy, try again!');
                                } else {
                                    console.log(`Product found : ${response.product.product_name}`);
                                    let icon: JQuery;
                                    
                                    this.image.attr('src', response.product.image_url);

                                    icon = this.contentTitle.children('i');
                                    this.contentTitle.html(response.product.product_name).append(icon);

                                    icon = this.revealTitle.children('i');
                                    this.revealTitle.html(response.product.product_name).append(icon);
                                }
                            }, // Callback invoked if call is sucessfull
                            error: (xhr: any, error: any) => {
                                alert('Server error returned');
                            } // If the server is a bad boy
                        });
                    }
                } else {
                    // J'ai un truc à faire ici, mais je ne sais pas ce que c'est...
                }
            }
        );
    }
}