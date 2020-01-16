import * as $ from 'jquery';

import { ProductModel } from "./../models/product-model";

export class ProductService {
    private readonly api: string = 'https://world.openfoodfacts.org/api/v0/product/';
    private httpVerb: string = 'get';
    private ean: string;

    public set code(ean: string) {
        this.ean = ean;
    }

    public processApi(): Promise<ProductModel> {
        return new Promise<ProductModel>((resolve) => {
            const uri: string = this.api + this.ean + '.json';

            $.ajax({
                url: uri, // URI to reach (route to a server)
                method: this.httpVerb, // How to talk to the server
                dataType: 'json', // What kind of data is expected
                success: (response: any) => {
                    const serverStatus: string = response.status_verbose; // Some response attribute
                    if (serverStatus == 'product not found') {
                        resolve(null); // Promise taken with a null value
                    } else {
                        const productModel: ProductModel = new ProductModel().deserialize(response.product);
                        resolve(productModel);
                    }
                }, // Callback invoked if call is sucessfull i.e response.status <> 200
                error: (xhr: any, error: any) => {
                    resolve(null);
                } // If the server is a bad boy
            });
        })
    }
}