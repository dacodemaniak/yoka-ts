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

        // Registering service worker
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker
                .register('./sw.js', { scope: './' })
                .then((reg) => {
                    // suivre l'état de l'enregistrement du Service Worker : `installing`, `waiting`, `active`
                    console.log(reg.active ? 'sw is active' : 'sw not active yet');
                });
        } else {
            console.log('No service worker available... No PWA!');
        }

        new EanFormModule();
    }
}

// App bootstraping with jQuery
// Create a new instance of the Main class
// after the document was completely loaded

$(document).ready(() => {
    materialize.AutoInit();
   const app: Main = new Main();
   
});
