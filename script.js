const GITHUB_API =
    "https://api.github.com/repos/TheBagomes/Random-Pinterest-Widget/contents/images";

const PINTEREST_BOARD =
    "https://br.pinterest.com/vitorb4rret0gomes/art/";

const img = document.getElementById("art");
const pin = document.getElementById("pin");
const title = document.getElementById("title");
const counter = document.getElementById("counter");

const shuffle = document.getElementById("shuffle");
const next = document.getElementById("next");

let IMAGES = [];
let current = Number(
    localStorage.getItem("daily-art-current")
);

let savedDate = localStorage.getItem(
    "daily-art-date"
);

const today = new Date().toDateString();

async function loadImages() {
    try {
        const response = await fetch(GITHUB_API);

        if (!response.ok) {
            throw new Error(
                `Erro ao acessar GitHub: ${response.status}`
            );
        }

        const files = await response.json();

        IMAGES = files
            .filter(file =>
                file.type === "file" &&
                /\.(jpg|jpeg|png|webp|gif)$/i.test(file.name)
            )
            .map(file => ({
                src: file.download_url,
                title: createTitle(file.name),
                pin: PINTEREST_BOARD
            }));

        if (IMAGES.length === 0) {
            throw new Error(
                "Nenhuma imagem encontrada na pasta images."
            );
        }

        loadDailyArt();

    } catch (error) {
        console.error(error);

        title.textContent =
            "Não foi possível carregar as artes.";

        counter.textContent =
            "Verifique a conexão com o GitHub.";

        img.classList.add("loaded");
    }
}

function createTitle(filename) {
    const name = filename
        .replace(/\.[^/.]+$/, "")
        .replace(/[-_]+/g, " ")
        .replace(/\b\w/g, letter =>
            letter.toUpperCase()
        );

    return name;
}

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

    localStorage.setItem(
        "daily-art-date",
        today
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

    img.alt =
        item.title || "Arte";

    title.textContent =
        item.title || "Uma coisa bonita pra hoje.";

    counter.textContent =
        `Imagem ${index + 1} de ${IMAGES.length}`;

    pin.href =
        item.pin || PINTEREST_BOARD;
}

function pickRandom() {
    if (IMAGES.length === 0) {
        return;
    }

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
        const index = getRandomIndex();

        showArt(index);

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

loadImages();