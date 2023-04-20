//Najwyższy wynik
if (localStorage.getItem("bestScore") === null) {
    localStorage.setItem("bestScore", "0");
}

// Tworzenie płótna
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// Utworzenie przycisku reset
var resetButton = document.createElement("button");
resetButton.innerHTML = "Reset wyniku";
document.body.appendChild(resetButton);

//Pozycja przycisku reset 
resetButton.style.position = "fixed";
resetButton.style.top = "9px";
resetButton.style.left = "715px";

// Obsługa kliknięcia na przycisk reset
resetButton.addEventListener("click", function() {
    localStorage.setItem("bestScore", "0");
});

// Inicjalizacja paletki i piłki i pkt
var ballRadius = 10;
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
let score = 0;

// Zmienne przechowujące informacje o liczbie punktów i o tym, czy piłka ma przyśpieszyć
let lscore = 0;
let accelerate = false;

// Imię gracza
let plName = prompt("Podaj swoje imię:");

// Obsługa poruszania się paletki
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

// Rysowanie piłki i paletki
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText(plName + ": " + score, 8, 20);
    ctx.fillText("Rekord: " + localStorage.getItem("bestScore"), 715, 20);
}

// Aktualizacja położenia piłki i paletki, spr pkt
function update() {
    
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    x += dx;
    y += dy;
    
    if (score > localStorage.getItem("bestScore")) {
        localStorage.setItem("bestScore", score);
    }

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
        
        // Sprawdzenie, czy piłka ma przyśpieszyć
if (lscore !== score && score % 2 === 0) {
    accelerate = true;
    lscore = score;
} else {
    accelerate = false;
}
        // Aktualizacja prędkości piłki w osi X w przypadku, gdy ma przyśpieszyć
if (accelerate) {
    if (dx > 0) {
        dx += 1;
    } else {
        dx -= 1;
    }
}
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
            score++;
        } else {
            canvas.style.borderColor = "red";
            ctx.fillText("Koniec gry! Zdobyłeś punktów: " + score+"! Rekord: "+ localStorage.getItem("bestScore"), 220, 220);
            document.location.reload();
        }
    }
}

// Rysowanie gry
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawScore();
    update();
}

setInterval(draw, 10);