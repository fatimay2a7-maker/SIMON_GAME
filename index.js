let allTheButtons = document.querySelectorAll(".btn");

const buttons = ["red", "blue", "yellow", "green"];

let computerSequence = [];
let playerSequence = [];

let isComputerPlaying = false;

const gameOverSound = new Audio("sounds/game-over.mp3");


function computerChoose() {

    let randomNum = Math.floor(Math.random() * buttons.length);

    let computerChoice = buttons[randomNum];

    computerSequence.push(computerChoice);

    playSequence();
}


function playSequence() {

    isComputerPlaying = true;

    computerSequence.forEach(function(color, index) {

        setTimeout(function() {

            let button = document.getElementById(color);

            button.classList.add("pressed");

            setTimeout(function() {

                button.classList.remove("pressed");

                // وقتی آخرین رنگ پخش شد
                if (index === computerSequence.length - 1) {
                    isComputerPlaying = false;
                }

            }, 300);

        }, index * 700);

    });
}


function userChoose() {

    allTheButtons.forEach(function(button) {

        button.addEventListener("click", function(event) {

            // اگر کامپیوتر در حال پخش sequence است
            // بازیکن نباید بتواند کلیک کند
            if (isComputerPlaying) {
                return;
            }

            let playerChoice = event.target.id;

            // افکت دکمه
            button.classList.add("pressed");

            setTimeout(function() {
                button.classList.remove("pressed");
            }, 100);


            // اضافه کردن انتخاب بازیکن
            playerSequence.push(playerChoice);

            let index = playerSequence.length - 1;


            // بررسی انتخاب بازیکن
            if (playerSequence[index] !== computerSequence[index]) {

                gameOverSound.play();

                document.querySelector("h1").textContent = "GAME OVER!";

                document.body.classList.add("game-over");

                return;
            }


            // اگر کل sequence درست زده شده
            if (playerSequence.length === computerSequence.length) {

                // sequence بازیکن برای level بعد خالی می‌شود
                playerSequence = [];

                // کمی صبر، بعد level بعد
                setTimeout(function() {
                    computerChoose();
                }, 500);
            }

        });

    });
}


// شروع بازی
computerChoose();
userChoose();