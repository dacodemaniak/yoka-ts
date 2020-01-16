import * as $ from 'jquery';
import * as materialize from 'materialize-css';
import { ProductService } from './../services/product-service';
import { ProductModel } from './../models/product-model';

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

    private productService: ProductService;

    private authorizedChars: number[] = new Array(
        8, 37, 46, 16
    );

    public constructor() {
        materialize.AutoInit();
        
        this.productService = new ProductService(); // Service instanciation i.e Dependency Injection

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
                        
                        this.productService.code = this.eanField.val().toString();

                        this.productService.processApi().then((product: ProductModel) => {
                            // Spy product...
                            if (product) { // Promise is not null
                                let icon: JQuery;
                                    
                                this.image.attr('src', product.image);

                                icon = this.contentTitle.children('i');
                                this.contentTitle.html(product.title).append(icon);

                                icon = this.revealTitle.children('i');
                                this.revealTitle.html(product.title).append(icon);
                                
                                // Nova group
                                const nova: JQuery = $('#nova');
                                nova.children().remove();
                                let badge: JQuery = $('<span>');
                                badge
                                    .addClass('badge')
                                    .css('background-color', product.nova.color)
                                    .css('color', 'white')
                                    .html(product.nova.indice.toString());
                                nova.append(badge);

                                // Nutriscore
                                const nutriscore: JQuery = $('#nutriscore');
                                nutriscore.children().remove();
                                badge = $('<span>')
                                    .addClass('badge').addClass('blue')
                                    .css('color', 'white')
                                    .html(product.nutriscore ? product.nutriscore.toString().toUpperCase() : 'No datas available for nutriscore');
                                nutriscore.append(badge);

                            } else { // Promise is null... tell the user 

                            }
                        });
                    }
                } else {
                    // J'ai un truc à faire ici, mais je ne sais pas ce que c'est...
                }
            }
        );
    }
}