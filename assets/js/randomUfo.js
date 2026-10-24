
function randomUfos()
{
    let ufoImageArray = ["Arrokoth.png", "ProbeCubeDish.png", "Vesta.png", "MarsUfo.png", "Phobos.png", "Rama.png", "Moldy.png", "Teapot.png", "FrozenFate.png", "Fury.png", "Jmc.png", "Proxima.png", "Cluster.png", "ARobot.png", "MAnchor.png", "MEye.png", "MSnake.png", "MTick.png", "MCross.png", "MArrow.png", "MHeron.png", "MLeaf.png"];
    let randomIndex = Math.floor(Math.random() * ufoImageArray.length);
    let randomTop = 10 + (Math.random() * 80);
    let randomSide = 10 + (Math.random() * 80);
    document.getElementById("ufo").innerHTML = `<div class="ufo" style="top:${randomTop}%; left:${randomSide}%;"><img src="/assets/images/ufo/${ufoImageArray[randomIndex]}" alt=""></div>`
}
