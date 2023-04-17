<?php
namespace App\Helpers;
use Illuminate\Support\Facades\Storage;
use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

class Websocket implements MessageComponentInterface {
    protected $clients;

    public function __construct() {
        $this->clients = new \SplObjectStorage;
    }

    public function onOpen(ConnectionInterface $conn) {
        // Store the new connection to send messages later
        $this->clients->attach($conn);

        // print messages about new connections
        echo "New connection! ({$conn->resourceId})\n";

    }

    public function onMessage(ConnectionInterface $from, $msg) {
        // print messages from users
        echo "Message {$msg} from {$from->resourceId}\n";

        switch ($msg) {
            case "sendRequest":
                foreach ($this->clients as $client) {
                    $contents = Storage::get('currency.json');
                    $client->send($contents);
                }

                break;
        }
    }

    public function onClose(ConnectionInterface $conn) {
        // The connection is closed, remove it, as we can no longer send it messages
        $this->clients->detach($conn);

        echo "Connection {$conn->resourceId} has disconnected\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        echo "An error has occurred: {$e->getMessage()}\n";

        $conn->close();
    }
}
