const zookeeper = require('node-zookeeper-client'); // Utiliser le module zookeeper

const client = zookeeper.createClient('localhost:2181'); // Créer un client zookeeper
const path = '/happy'; // Indiqué le path du znode à surveiller

function listChildren(client, path) { // Fonction qui liste les enfants du znode
    client.getChildren( // Récupérer les enfants du znode
        path,
        function (event) {
            console.log('Got watcher event: %s', event);
            listChildren(client, path);
        },
        function (error, children, stat) { // Si il y a une erreur
            if (error) {
                console.log(
                    'Failed to list children of %s due to: %s.',
                    path,
                    error
                );
                return;
            }

            console.log('Children of %s are: %j.', path, children); // Afficher les enfants du znode
        }
    );
}

client.once('connected', function () { // Si le client est connecté
    console.log('Connected to ZooKeeper.');
    listChildren(client, path); // Liste les enfants du znode
});

client.connect(); // Connecter le client
