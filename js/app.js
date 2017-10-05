// Randomize positions for enemies
var getPosition = function() {
    var number = Math.floor((Math.random() * 3) + 1);
    return number;
};

// Enemies our player must avoid
var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = (getPosition()) * 70;
    this.speed = (getPosition()) * 150;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if (this.x >= 500) {
        this.x = 0;
        this.y = (getPosition()) * 70;
    }
    this.x += this.speed * dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function() {
    this.sprite = 'images/char-cat-girl.png';
    this.x = 200;
    this.y = 300;
    this.speed = 40;
    this.win = 0;
    this.life = 5;
    this.game = true;
};

// Now instantiate your objects.
var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();

// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1, enemy2, enemy3];

// Place the player object in a variable called player
var player = new Player();

// Default player position
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 300;
};

// When player loses, decrement score
Player.prototype.score_lost = function() {
    this.win -= 1;
    this.life -= 1;
};

// When player wins, increment score
Player.prototype.score_won = function() {
    this.win += 1;
    alert('WINNER!');
    this.reset();
};

// Reset after losing all lives
Player.prototype.gameReset = function() {
    this.life = 5;
    this.win = 0;
    this.game = true;
    this.reset();
};

// Check for clashing and alert user
Player.prototype.checkClashing = function() {
    var len = allEnemies.length;
    for (var i = 0; i < len; i++) {
        if ((allEnemies[i].x) <= this.x + 30 &&
            (allEnemies[i].x + 30) >= (this.x) &&
            (allEnemies[i].y) <= this.y + 30 &&
            (allEnemies[i].y + 30) >= (this.y)) {
            this.score_lost();
            alert('Oops! Try again!');
            this.reset();
        }
    }

};

Player.prototype.checkWinner = function() {
    if (this.y <= 10) {
        this.score_won();
    }
};

Player.prototype.checkBorder = function() {
    if (this.x <= 0 || this.x >= 420 || this.y <= 0 || this.y >= 420) {
        this.reset();
    }
};


// Checks if player has any lives left
Player.prototype.checkGameOver = function() {
    if (this.life == 0) {
        alert('Game Over!!!');
        this.game = false;
        this.gameReset();
    }
}

// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function() {
    this.checkClashing();
    this.checkBorder();
    this.checkWinner();

    if (this.game == true) {
        this.checkGameOver();
    }
    if (this.y <= 5) {
        this.reset();
        this.score()
    }
};

Player.prototype.handleInput = function(action_p) {
    if (action_p == 'left') {
        this.x -= this.speed;
    }
    if (action_p == 'right') {
        this.x += this.speed;
    }

    if (action_p == 'up') {
        this.y -= this.speed;
    }
    if (action_p == 'down') {
        this.y += this.speed;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    }
    player.handleInput(allowedKeys[e.keyCode]);
});
