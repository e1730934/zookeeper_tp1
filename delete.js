/**
 * Copyright (c) 2013 Yahoo! Inc. All rights reserved.
 *
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file
 * for terms.
 */
const zookeeper = require('node-zookeeper-client'); // Utiliser le module zookeeper

const client = zookeeper.createClient('localhost:2181'); // Indique l'adresse du serveur zookeeper
const path ='/happy/db' // Ajouter emplacement du znode

client.on('connected', function (state) { // Si le client est connecté
    console.log('Connected to the server.'); // Afficher le message
    client.remove(path, function (error) { // Supprimer le znode
        if (error) { // Si erreur
            console.log(
                'Failed to delete node: %s due to: %s.',
                path,
                error
            );
            return; // Sortir de la fonction
        }

        console.log('Node: %s is deleted.', path); // Afficher le message
        client.close(); // Fermer le client
    });
});

client.connect(); // Connecter le client
