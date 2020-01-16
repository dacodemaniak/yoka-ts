import * as $ from 'jquery';
import * as materialize from 'materialize-css';

import { EanFormModule } from './modules/ean-form-module';

import './../node_modules/materialize-css/sass/materialize.scss';
import './scss/main.scss';

/**
 * @name Main
 * @author Aélion - Jan. 2020 - jla.webprojet@gmail.com
 * @package
 * @version 1.1.0
 */
export class Main {
    public constructor() {
        materialize.AutoInit();
        $('.sidenav').sidenav();
        new EanFormModule();
    }
}

// App bootstraping with jQuery
// Create a new instance of the Main class
// after the document was completely loaded
$(document).ready(() => {
   const app: Main = new Main();
   
});
