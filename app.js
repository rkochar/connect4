var express = require("express");
var http = require("http");
var websocket = require("ws");

var port = process.argv[2];
var app = express();

app.use(express.static(__dirname + "/public"));
http.createServer(app).listen(port);



var indexRouter = require("./routes/index");
// var messages = require("./public/javascripts/messages");

// var gameStatus = require("./statTracker");
// var Game = require("./game");


app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/play", indexRouter);
const wss = new websocket.Server({ server });
var websockets = {};
var server = http.createServer(app);
let gamesStarted = 0
let gamesOngoing = function () {
    let glen = games.length
    let count = 0
    for (let i = 0; i < glen; i++) {
        if (games[i].state === "ongoing")
            count++;
    }
    return count
}
let gamesCompleted = 0
var games = [];

wss.on("connection", function (ws) {
    console.log("Connection Made");

    ws.on("close", function () {
        let gameId
        let player
        for (let index = 0; index < games.length; index++) {
            const game = games[index];
            if (game.playerA === ws) {
                gameId = index;
                player = "A"
                break
            } else if (game.playerB === ws) {
                gameId = index;
                player = "B"
                break
            }
        }
        if (games[gameId].state !== "ended") {
            if (player === "A" && games[gameId].playerB) {
                games[gameId].playerB.send(JSON.stringify({
                    type: "abort"
                }))
            }
            else if (player === "B" && games[gameId].playerA) {
                games[gameId].playerA.send(JSON.stringify({
                    type: "abort"
                }))
            }
            gamesCompleted++
            games[gameId].state = "ended"
        }
    })

    ws.on("message", function (json_msg) {
        let message = JSON.parse(json_msg)

        switch (message.type) {
            case "playerJoin":
                let gameFound
                for (let gameIndex = 0; gameIndex < games.length; gameIndex++) {
                    let game = games[gameIndex]
                    if (game.state === "waiting") {
                        gameFound = game
                        if (!game.playerA) {
                            game.playerA = ws
                            ws.send(JSON.stringify({
                                type: "playerAdded",
                                data: {
                                    gameId: gameIndex,
                                    playerType: "A"
                                }
                            }))
                        }
                        else if (!game.playerB) {
                            game.playerB = ws
                            ws.send(JSON.stringify({
                                type: "playerAdded",
                                data: {
                                    gameId: gameIndex,
                                    playerType: "B"
                                }
                            }))
                            game.state = "ongoing"

                            game.playerA.send(JSON.stringify({
                                type: "gameStart"
                            }))
                            game.playerB.send(JSON.stringify({
                                type: "gameStart"
                            }))

                            gamesStarted++;
                        }
                    }
                }
                if (!gameFound) {
                    games.push({
                        state: "waiting",
                        playerA: ws,
                        playerB: null,
                        playerAPos: 1,
                        playerBPos: 1,
                        currentTurn: "A"
                    })
                    ws.send(JSON.stringify({
                        type: "playerAdded",
                        data: {
                            gameId: games.length - 1,
                            playerType: "A"
                        }
                    }))
                }
                break

        }
    })
});
