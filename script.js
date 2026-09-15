// ==========================================
// CONFIGURAÇÃO DAS IMAGENS
// ==========================================

const IMAGES = [

    {
        src: "images/art-01.jpg",
        pin: "https://pin.it/3WwRAOVuG",
        title: "Art 01"
    },

    {
        src: "images/art-02.jpg",
        pin: "https://pin.it/COLOQUE-O-LINK-AQUI",
        title: "Art 02"
    },

    {
        src: "images/art-03.jpg",
        pin: "https://pin.it/1LYdZ5u16",
        title: "Art 03"
    }

];


// ==========================================
// ELEMENTOS DA PÁGINA
// ==========================================

const img = document.getElementById("art");
const pin = document.getElementById("pin");
const title = document.getElementById("title");
const counter = document.getElementById("counter");

const shuffle = document.getElementById("shuffle");
const next = document.getElementById("next");


// ==========================================
// ÚLTIMA IMAGEM
// ==========================================

let current = Number(
    localStorage.getItem("daily-art-current")
);


// Se não existir uma imagem salva,
// começamos com -1.

if (
    !Number.isInteger(current) ||
    current < 0 ||
    current >= IMAGES.length
) {
    current = -1;
}


// ==========================================
// ESCOLHER IMAGEM
// ==========================================

function pick() {

    if (IMAGES.length === 0) {
        console.error("Nenhuma imagem foi configurada.");
        return;
    }


    let index;


    // Se temos mais de uma imagem,
    // garantimos que não seja a mesma anterior.

    if (IMAGES.length > 1) {

        do {

            index = Math.floor(
                Math.random() * IMAGES.length
            );

        } while (index === current);

    } else {

        index = 0;

    }


    current = index;


    // ======================================
    // SALVAR NO NAVEGADOR
    // ======================================

    localStorage.setItem(
        "daily-art-current",
        current
    );


    // ======================================
    // PEGAR DADOS DA IMAGEM
    // ======================================

    const item = IMAGES[index];


    // ======================================
    // ANIMAÇÃO
    // ======================================

    img.classList.remove("loaded");


    img.onload = function () {

        img.classList.add("loaded");

    };


    // ======================================
    // CASO A IMAGEM NÃO EXISTA
    // ======================================

    img.onerror = function () {

        console.error(
            "Não foi possível carregar:",
            item.src
        );

        img.classList.add("loaded");

    };


    // ======================================
    // ATUALIZAR IMAGEM
    // ======================================

    img.src = item.src;


    // ======================================
    // TEXTO
    // ======================================

    img.alt = item.title || "Arte";


    title.textContent =
        item.title || "Uma coisa bonita pra hoje.";


    counter.textContent =
        `Imagem ${index + 1} de ${IMAGES.length}`;


    // ======================================
    // LINK DO PINTEREST
    // ======================================

    pin.href =
        item.pin || "#";

}


// ==========================================
// BOTÕES
// ==========================================

shuffle.addEventListener(
    "click",
    pick
);

next.addEventListener(
    "click",
    pick
);


// ==========================================
// PRIMEIRA IMAGEM
// ==========================================

pick();