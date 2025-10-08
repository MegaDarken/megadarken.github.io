
function randomUfos()
{
    let ufoImageArray = ["Arrokoth.png", "ProbeCubeDish.png", "Vesta.png", "MarsUfo.png", "Phobos.png", "Rama.png", "Moldy.png", "Teapot.png", "FrozenFate.png", "Fury.png", "Jmc.png"];

    let randomIndex = Math.floor(Math.random() * ufoImageArray.length);
    // let secondIndex = Math.floor(Math.random() * ufoImageArray.length);

    // if (randomIndex == secondIndex)
    // {
    //     secondIndex = (secondIndex + 1) % ufoImageArray.length;
    // }

    let randomTop = 10 + (Math.random() * 80);
    let randomSide = 10 + (Math.random() * 80);

    // let secondTop = 10 + (Math.random() * 80);
    // let secondSide = 1 + (Math.random() * 20);

    document.getElementById("ufoL").innerHTML = `<div class="ufo" style="top:${randomTop}%; left:${randomSide}%;"><img src="/assets/images/${ufoImageArray[randomIndex]}" alt=""></div>`
    // document.getElementById("ufoR").innerHTML = `<div class="ufo" style="top:${secondTop}%; right:${secondSide}%;"><img src="/assets/images/${ufoImageArray[secondIndex]}" alt=""></div>`
}
