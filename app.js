var express = require("express");
var http = require("http");
var websocket = require("ws");
let ejs = require('ejs')

var port = process.argv[2];
var app = express();

app.use(express.static(__dirname + "/public"));

app.set('view engine', 'ejs')
app.get('/', function(req, res) {
    //example of data to render; here gameStatus is an object holding this information
    res.render('splash.ejs', {gamesCompleted: gamesCompleted,gameInitialized: gameInitialized});
})
var Game = require("./game");

var indexRouter = require("./routes/index");

// var messages = require("./public/javascripts/messages");

// var gameStatus = require("./statTracker");
// var Game = require("./game");

app.set("view engine", "ejs");

app.get("/play", indexRouter);

var server = http.createServer(app);
server.listen(port);

const wss = new websocket.Server({server});

var websockets = {};
var players = {};

let gamesStarted = 0
// let gamesOngoing = function () {
//     let glen = games.length
//     let count = 0
//     for (let i = 0; i < glen; i++) {
//         if (games[i].state === "ongoing")
//             count++;
//     }
//     return count
// }
let gamesCompleted = 0
var games = [];
var gameInitialized = 0;
var connectionID = 0; //each websocket receives a unique ID
var currentGame = new Game(1);
wss.on("connection", function (ws) {
    if (connectionID % 2 == 0) {
        currentGame = new Game(gameInitialized++);
    }
    let con = ws;
    con.id = connectionID++;
    let playerType = currentGame.addPlayer(con);
    players[con.id] = con;
    websockets[con.id] = currentGame;
    console.log("connection made ");
    var msg = {
        type: "board",
        id: currentGame.transitionMatrix,
    };
    if (playerType == 'B') {
        let gameObj = websockets[con.id];
        var waiting1 = {
            type: "waiting",
            player: "A"
        };
        var waiting2 = {
            type: "waiting",
            player: "B"
        };
        gameObj.playerA.send(JSON.stringify(waiting1));
        gameObj.playerB.send(JSON.stringify(waiting2));
    }
    con.send(JSON.stringify(msg));
    ws.on("message", function incoming(message) {
        let gameObj = websockets[con.id];
        var msg = JSON.parse(message)
        if (msg.type.localeCompare("turn") == 0) {
            currentGame.transitionMatrix = msg.id
            if (playerType == 'A') {
                console.log(con.id + "idj")
                var board2 = {
                    type: "board",
                    id: currentGame.transitionMatrix,
                };
                var chal = {
                    type: "chal",
                    player: "B"
                };
                gameObj.playerB.send(JSON.stringify(chal));
                gameObj.playerB.send(JSON.stringify(board2));
            } else {
                var board2 = {
                    type: "board",
                    id: currentGame.transitionMatrix,
                    player: con.id
                };
                var chal = {
                    type: "chal",
                    player: "A"
                };
                console.log(currentGame.playerA.id + " " + currentGame.playerB.id)
                gameObj.playerA.send(JSON.stringify(chal));
                gameObj.playerA.send(JSON.stringify(board2));
            }
        }
        if (msg.type.localeCompare("win") == 0) {
            if (msg.id.localeCompare("A") == 0) {
                var lose = {
                    type: "lose",
                };
                gameObj.playerB.send(JSON.stringify(lose));
            } else {
                var lose = {
                    type: "lose",
                };
                gameObj.playerA.send(JSON.stringify(lose));

            }
            gamesCompleted++;
        }


    });


    ws.on("close", function (code) {
        let gameObj = websockets[con.id];
        if (playerType == 'A') {
            var close = {
                type: "close",
                player: "A"
            };
            if(gameObj.playerB!=null)
            gameObj.playerB.send(JSON.stringify(close));
        } else {
            var close = {
                type: "close",
                player: "B"
            };
            if(gameObj.playerA!=null)
            gameObj.playerA.send(JSON.stringify(close));
        }
    });
});


// wss.on("connection", function (ws) {
//     console.log("Connection Made");

//     ws.on("close", function () {
//         let gameId
//         let player
//         for (let index = 0; index < games.length; index++) {
//             const game = games[index];
//             if (game.playerA === ws) {
//                 gameId = index;
//                 player = "A"
//                 break
//             } else if (game.playerB === ws) {
//                 gameId = index;
//                 player = "B"
//                 break
//             }
//         }
//         if (games[gameId].state !== "ended") {
//             if (player === "A" && games[gameId].playerB) {
//                 games[gameId].playerB.send(JSON.stringify({
//                     type: "abort"
//                 }))
//             }
//             else if (player === "B" && games[gameId].playerA) {
//                 games[gameId].playerA.send(JSON.stringify({
//                     type: "abort"
//                 }))
//             }
//             gamesCompleted++
//             games[gameId].state = "ended"
//         }
//     })

//     ws.on("message", function (json_msg) {
//         let message = JSON.parse(json_msg)

//         switch (message.type) {
//             case "playerJoin":
//                 let gameFound
//                 for (let gameIndex = 0; gameIndex < games.length; gameIndex++) {
//                     let game = games[gameIndex]
//                     if (game.state === "waiting") {
//                         gameFound = game
//                         if (!game.playerA) {
//                             game.playerA = ws
//                             ws.send(JSON.stringify({
//                                 type: "playerAdded",
//                                 data: {
//                                     gameId: gameIndex,
//                                     playerType: "A"
//                                 }
//                             }))
//                         }
//                         else if (!game.playerB) {
//                             game.playerB = ws
//                             ws.send(JSON.stringify({
//                                 type: "playerAdded",
//                                 data: {
//                                     gameId: gameIndex,
//                                     playerType: "B"
//                                 }
//                             }))
//                             game.state = "ongoing"

//                             game.playerA.send(JSON.stringify({
//                                 type: "gameStart"
//                             }))
//                             game.playerB.send(JSON.stringify({
//                                 type: "gameStart"
//                             }))

//                             gamesStarted++;
//                         }
//                     }
//                 }
//                 if (!gameFound) {
//                     games.push({
//                         state: "waiting",
//                         playerA: ws,
//                         playerB: null,
//                         playerAPos: 1,
//                         playerBPos: 1,
//                         currentTurn: "A"
//                     })
//                     ws.send(JSON.stringify({
//                         type: "playerAdded",
//                         data: {
//                             gameId: games.length - 1,
//                             playerType: "A"
//                         }
//                     }))
//                 }
//                 break

//         }
//     })
// });


