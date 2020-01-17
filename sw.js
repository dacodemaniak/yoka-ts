let cacheName = "v1";

// (1) Installation
self.addEventListener("install", event => {
    console.log("SW: Installation en cours.");

    // Un Service Worker a fini d'être
    // installé quand la promesse dans
    // `event.waitUntil` est résolue
    event.waitUntil(
        event.waitUntil((async () => {
            let cache = await caches.open(cacheName);
            await cache.addAll([
                "./index.html",
                "./assets/css/vendors~main.css",
                "./assets/css/vendors~main.css.map",
                "./assets/css/custom.css",
                "./assets/css/custom.css.map",
                "./assets/icons/android-icon-36x36.png",
                "./assets/icons/android-icon-48x48.png",
                "https://fonts.googleapis.com/icon?family=Material+Icons"
            ]);
        })())
    );
});

// (2) Activation
self.addEventListener("activate", event => {
    console.log("SW: Activation en cours.");

    // Un Service Worker a fini d'être
    // activé quand la promesse dans
    // `event.waitUntil` est résolue
    event.waitUntil(
        // Création d'une promesse
        // factice qui est résolue au
        // bout d'une seconde.
        // Nous verrons dans l'article
        // suivant par quoi remplacer
        // cette promesse
        new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log("SW: Activé.");
                resolve();
            }, 1000);
        })
    );
});


 

 
self.addEventListener("fetch", event => {
  event.respondWith(
    (async () => {
      let cache = await caches.open(cacheName);
      try {
        await cache.add(event.request);
      } catch (e) {
        //Echec de l'ajout dans le cache (hors connection)
      }
      let response = await cache.match(event.request);
      //Si la réponse n'est pas dans le cache, fallback sur une page d'information
      if (!response) {
        response = await cache.match("offline.html");
      }
      return response;
    })()
  );
});