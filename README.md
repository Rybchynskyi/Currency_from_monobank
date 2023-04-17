## For deploying:
1. Download the app
2. Install composer dependencies `composer install`
3. Install npm dependencies `npm install`
4. Build project `vite build` or start in dev-mode `vite`
5. Start laralel serve `php artisan serve`
6. Run WebSocket `php artisan ws:run`
7. Shedule cron: `php artisan schedule:work`
8. For starting project in docker: `docker-compose up --build`

## Main task
The goal of this project is to develop an app using Dockerfile which implements a REST API that forwards to a public WebSocket channel and updates all connected clients as soon as some information on https://api.monobank.ua/bank/currency is updated. Additionally, a frontend will be developed that will subscribe to this WebSocket channel and show the currency table from web sockets.

## Backend implementation (Laravel):
Since the API does not accept more than one request per minute, it is not advisable to send a request to the bank API immediately as the number of users increases. Therefore, requests to the bank side are sent via a cron scheduler every 5 minutes. The result is written to a file called currency.json, and when a user connects via the WebSocket protocol (using the Ratchet library), they receive the result from reading currency.json, which is updated every 5 minutes.

## Frontend implementation (React):
For convenience and understanding, the user receives information about the connection status to the WebSocket using UseState. When clicked, the user initiates a handshake with the WebSocket port that is implemented using the Ratchet library and receives a response from the WebSocket protocol.
