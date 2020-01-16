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

        this.redoSearch();
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
                            // Activate loader
                            $('div.preloader-wrapper').addClass('active');
                            // Spy product...
                            if (product) { // Promise is not null

                                // Make the input disabled and readonly
                                this.eanField
                                    .attr('readonly', 'readonly');

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

                                // Reveal the card, remove the loader
                                $('div.preloader-wrapper').removeClass('active');
                                $('.card').removeClass('hidden');

                            } else { // Promise is null... tell the user 
                                // Just remove the loader
                                $('div.preloader-wrapper').removeClass('active');
                            }
                        });
                    }
                } else {
                    // J'ai un truc à faire ici, mais je ne sais pas ce que c'est...
                }
            }
        );
    }

    private redoSearch(): void {
        this.eanField.on(
            'click',
            (event: any): void => {
                if (this.eanField.attr('readonly')) {
                    this.eanField.removeAttr('readonly');
                    this.eanField.val('');
                    // Removes the previous card
                    $('div.card').addClass('hidden');
                }
            }
        )
    }
}