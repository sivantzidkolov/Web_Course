document.addEventListener("DOMContentLoaded", function () {

    const animals = [
        {
            key: "C",
            name: "Cow",
            image: "Pictures/Cow.jpg",
            sound: "Sound/Cow.mp3"
        },
        {
            key: "E",
            name: "Eagle",
            image: "Pictures/Eagle.jpg",
            sound: "Sound/Eagle.mp3"
        },
        {
            key: "F",
            name: "Frog",
            image: "Pictures/Frog.jpg",
            sound: "Sound/Frog.mp3"
        },
        {
            key: "M",
            name: "Monkey",
            image: "Pictures/Monkey.jpg",
            sound: "Sound/Monkey.mp3"
        },
        {
            key: "P",
            name: "Pig",
            image: "Pictures/Pig.jpg",
            sound: "Sound/Pig.mp3"
        },
        {
            key: "R",
            name: "Rat",
            image: "Pictures/Rat.jpg",
            sound: "Sound/Rat.mp3"
        },
        {
            key: "S",
            name: "Sheep",
            image: "Pictures/Sheep.jpg",
            sound: "Sound/Sheep.mp3"
        }
    ];

    const set = document.querySelector(".set");

    const message = document.createElement("div");
    message.id = "sound-message";
    document.body.appendChild(message);

    let currentAudio = null;

    // Welcome sound tries to play when the page loads
    let welcomeSoundTried = false;
    const welcomeSound = new Audio("Sound/WELCOME.mp3");
    welcomeSound.volume = 0.5;

    function playWelcomeSoundOnce() {
        if (welcomeSoundTried) {
            return;
        }

        welcomeSoundTried = true;

        welcomeSound.play().catch(function () {
            console.log("Browser blocked welcome sound autoplay");
        });
    }

    window.addEventListener("load", function () {
        playWelcomeSoundOnce();
    });

    animals.forEach(function (animal) {
        const button = document.createElement("button");

        button.classList.add("animal-button");
        button.classList.add(animal.name.toLowerCase());

        button.innerHTML = `
            <img src="${animal.image}" alt="${animal.name}">
            <span>${animal.key}</span>
        `;

        button.addEventListener("click", function () {
            playAnimal(animal, button);
        });

        set.appendChild(button);
    });

    function playAnimal(animal, button) {
        playSound(animal.sound);
        animateButton(button);
    }

    function playSound(soundPath) {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }

        currentAudio = new Audio(soundPath);
        currentAudio.play();
    }

    function animateButton(button) {
        button.classList.add("pressed");

        /*
        Element not learned in class: setTimeout
        setTimeout runs a function after a specific amount of time.
        Here, it removes the "pressed" CSS class after 200 milliseconds,
        so the animal button gets a short click animation and then returns to normal.
        */
        setTimeout(function () {
            button.classList.remove("pressed");
        }, 200);
    }

    function showMessage(text) {
        message.innerHTML = text;
        message.classList.add("show-message");

        setTimeout(function () {
            message.classList.remove("show-message");
            message.innerHTML = "";
        }, 1500);
    }

    document.addEventListener("keydown", function (event) {
        const pressedKey = event.key.toUpperCase();

        const animal = animals.find(function (animal) {
            return animal.key === pressedKey;
        });

        if (animal) {
            const button = document.querySelector("." + animal.name.toLowerCase());
            playAnimal(animal, button);
        } else if (pressedKey.length === 1) {
            showMessage("There is no sound for the key " + pressedKey);
        }
    });

});