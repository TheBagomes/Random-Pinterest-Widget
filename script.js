const IMAGES = [
    {
        src: "images/art-01.jpg",
        pin: "https://pin.it/3WwRAOVuG",
        title: "Uma coisa bonita pra hoje."
    },
    {
        src: "images/art-02.jpg",
        pin: "https://pin.it/COLOQUE-O-LINK-AQUI",
        title: "Só uma arte pra deixar o dia melhor."
    },
    {
        src: "images/art-03.jpg",
        pin: "https://pin.it/1LYdZ5u16",
        title: "Algo bonito no meio da rotina."
    }
];

const img = document.getElementById("art");
const pin = document.getElementById("pin");
const title = document.getElementById("title");
const counter = document.getElementById("counter");

const shuffle = document.getElementById("shuffle");
const next = document.getElementById("next");

let current = Number(
    localStorage.getItem("daily-art-current")
);

let savedDate = localStorage.getItem(
    "daily-art-date"
);

const today = new Date().toDateString();

function getRandomIndex() {
    if (IMAGES.length === 1) {
        return 0;
    }

    let index;

    do {
        index = Math.floor(
            Math.random() * IMAGES.length
        );
    } while (index === current);

    return index;
}

function showArt(index) {
    const item = IMAGES[index];

    current = index;

    localStorage.setItem(
        "daily-art-current",
        current
    );

    img.classList.remove("loaded");

    img.onload = function () {
        img.classList.add("loaded");
    };

    img.onerror = function () {
        console.error(
            "Não foi possível carregar:",
            item.src
        );

        img.classList.add("loaded");
    };

    img.src = item.src;

    img.alt = item.title || "Arte";

    title.textContent =
        item.title || "Uma coisa bonita pra hoje.";

    counter.textContent =
        `Imagem ${index + 1} de ${IMAGES.length}`;

    pin.href =
        item.pin || "#";
}

function pickRandom() {
    const index = getRandomIndex();

    showArt(index);
}

function loadDailyArt() {
    if (
        !Number.isInteger(current) ||
        current < 0 ||
        current >= IMAGES.length ||
        savedDate !== today
    ) {
        current = getRandomIndex();

        localStorage.setItem(
            "daily-art-date",
            today
        );

        showArt(current);

        return;
    }

    showArt(current);
}

shuffle.addEventListener(
    "click",
    pickRandom
);

next.addEventListener(
    "click",
    pickRandom
);

loadDailyArt();