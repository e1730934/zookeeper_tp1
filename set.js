/**
 * Copyright (c) 2013 Yahoo! Inc. All rights reserved.
 *
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file
 * for terms.
 */

// Tirée de https://github.com/alexguan/node-zookeeper-client/blob/master/examples/set.js
const zookeeper = require('node-zookeeper-client'); // Utiliser le module zookeeper

const client = zookeeper.createClient('localhost:2181'); // Indique l'adresse du serveur zookeeper
const path ='/happy/db' // Ajouter emplacement du znode

const data = Buffer.from('Metastore...'); //Indiquer le contenu du znode

client.once('connected', function () { // Quand le client est connecté
    console.log('Connected to the server.'); // Afficher le message

    client.setData(path, data, function (error, stat) { // Ajouter le znode
        if (error) { // Si erreur
            console.log('Got error when setting data: ' + error);
            return;
        }

        console.log( // Afficher le contenu du znode
            'Set data "%s" on node %s, version: %d.',
            data.toString(),
            path,
            stat.version
        );
        client.close(); // Fermer le client
    });
});

client.connect(); // Connecter le client
