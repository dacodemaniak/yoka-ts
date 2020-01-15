import * as $ from 'jquery';

/**
 * @name Main
 * @author Aélion - Jan. 2020 - jla.webprojet@gmail.com
 * @package
 * @version 1.1.0
 */
export class Main {
    public constructor() {

    }
}

// App bootstraping with jQuery
// Create a new instance of the Main class
// after the document was completely loaded
$(document).ready(() => {
   const app: Main = new Main(); 
});
