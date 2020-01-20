/* every game has two players, identified by their WebSocket */
var game = function(gameID) {
  this.playerA = null;
  this.playerB = null;
  this.id = gameID;
  console.log(this.id);
  this.gameState = "0 JOINT"; //"A" means A won, "B" means B won, "ABORTED" means the game was aborted
};

/*
 * The game can be in a number of different states.
 */
game.prototype.transitionStates = {};
game.prototype.transitionStates["0 JOINT"] = 0;
game.prototype.transitionStates["1 JOINT"] = 1;
game.prototype.transitionStates["2 JOINT"] = 2;
game.prototype.transitionStates["A"] = 4; //A won
game.prototype.transitionStates["B"] = 5; //B won
game.prototype.transitionStates["ABORTED"] = 6;

/*
 * Not all game states can be transformed into each other;
 * the matrix contains the valid transitions.
 * They are checked each time a state change is attempted.
 */


game.prototype.transitionMatrix = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0]]


game.prototype.addPlayer = function(p) {


  /*
   * revise the game state
   */

  if (this.playerA == null) {
    console.log("player A connected")
    this.playerA = p;
    return "A";
  } else {
    console.log("player B connected")

    this.playerB = p;
    return "B";
  }
};

module.exports = game;
