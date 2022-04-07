const zookeeper = require('node-zookeeper-client'); //utilise le module zookeeper

const client = zookeeper.createClient('localhost:2181'); //crée un client zookeeper
const path = '/happy/db'; //crée un path

client.once('connected', function () { //quand le client est connecté
    console.log('Connected to the server.');

    client.create(path, function (error) { //crée le path
        if (error) { //si il y a une erreur
            console.log('Failed to create node: %s due to: %s.', path, error);
        } else {
            console.log('Node: %s is successfully created.', path);
        }

        client.close(); //ferme le client
    });
});

client.connect(); //connecte le client
