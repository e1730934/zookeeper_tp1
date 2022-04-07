/**
 * Copyright (c) 2013 Yahoo! Inc. All rights reserved.
 *
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file
 * for terms.
 */

const zookeeper = require('node-zookeeper-client'); //Utilise le module zookeeper

const client = zookeeper.createClient('localhost:2181'); //Crée un client zookeeper
const path ='/happy/db' //Sélectionne le path

function getData(client, path) { //Fonction qui récupère les données
    client.getData( //Récupère les données
        path,
        function (event) { //Fonction qui est appelée lorsqu'un évènement survient
            console.log('Got event: %s', event);
            getData(client, path);
        },
        function (error, data, stat) { //Fonction qui est appelée lorsqu'une erreur survient
            if (error) {
                console.log('Error occurred when getting data: %s.', error);
                return;
            }

            console.log( //Affiche les données
                'Node: %s has data: %s, version: %d',
                path,
                data ? data.toString() : undefined,
                stat.version
            );
        }
    );
}

client.once('connected', function () { //Fonction qui est appelée lorsque le client est connecté
    console.log('Connected to ZooKeeper.');
    getData(client, path); //Appelle la fonction getData
});

client.connect(); //Connecte le client
