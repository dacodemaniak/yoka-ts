/**
 * @name ProductModel
 * @author Aélion - Jan. 2020
 * @version 1.0.0
 *  Map the OpenFoodFacts product datas into this class
 */
export class ProductModel {
    private product_name: string;
    private image_url: string;
    private image_front_thumb_url: string;
    private nutrient_levels: any;
    private nova_group: number;
    private nutriscore_grade: string;

    public get title(): string {
        return this.product_name;
    }

    public get image(): string {
        if (this.image_front_thumb_url) {
            return this.image_front_thumb_url;
        }

        return this.image_url;
    }

    public get nova(): any {
        if (this.nova_group == 1) {
            return {
                indice: this.nova_group,
                text: 'Aliment naturel',
                color: 'green',
            };
        }
        if (this.nova_group == 2) {
            return {
                indice: this.nova_group,
                text: 'Aliment peu transformé',
                color: 'darkgreen',
            };
        }

        if (this.nova_group == 3) {
            return {
                indice: this.nova_group,
                text: 'Aliment plutôt transformé',
                color: 'orange',
            }
        }
        if (this.nova_group == 4) {
            return {
                indice: this.nova_group,
                text: 'Chimère totale',
                color: 'red',
            };
        }
    }

    public get nutriscore(): string {
        return this.nutriscore_grade;
    }

    public deserialize(datas: any): ProductModel {
        Object.assign(this, datas);
        return this;
    }
}