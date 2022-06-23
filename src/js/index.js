let deg = 0,
    wind = 0;
const divFire = document.querySelector("main .fire");

function generateSpray(radius, angle, wind) {
    let x = 0,
        y = Math.floor(Math.random() * radius) + 5,
        radRandom = (Math.PI / 180) * Math.floor(Math.random() * 360),
        cosRandom = Math.cos(radRandom),
        sinRandom = Math.sin(radRandom),
        radDir = (Math.PI / 180) * (-angle + 180),
        cosDir = Math.cos(radDir),
        sinDir = Math.sin(radDir),
        xDir = (cosDir * x) + (sinDir * y),
        yDir = (cosDir * y) - (sinDir * x),
        xRand = (cosRandom * x) + (sinRandom * y),
        yRand = (cosRandom * y) - (sinRandom * x),
        xRand2 = xRand  + xDir + Math.floor(Math.random() * radius*0.2) + wind,
        yRand2 = yRand  + yDir + Math.floor(Math.random() * radius*0.2),
        xRand3 = xRand2 + xDir + Math.floor(Math.random() * radius*0.2) + wind,
        yRand3 = yRand2 + yDir + Math.floor(Math.random() * radius*0.2),
        xRand4 = xRand3 + xDir + Math.floor(Math.random() * radius*0.2) + wind,
        yRand4 = yRand3 + yDir + Math.floor(Math.random() * radius*0.2),
        xRand5 = xRand4 + xDir + Math.floor(Math.random() * radius*0.2) + wind,
        yRand5 = yRand4 + yDir + Math.floor(Math.random() * radius*0.2);
    return [
        {transform: 'translate('+Math.floor(xRand )+'px,'+Math.floor(yRand )+'px)', background : 'rgb(250 200 150/.2)', zIndex : '0'}, 
        {transform: 'translate('+Math.floor(xRand2)+'px,'+Math.floor(yRand2)+'px)', background : 'rgb(200 150 50 /.2)', zIndex : '1'}, 
        {transform: 'translate('+Math.floor(xRand3)+'px,'+Math.floor(yRand3)+'px)', background : 'rgb(150 100 0  /.2)', zIndex : '2'}, 
        {transform: 'translate('+Math.floor(xRand4)+'px,'+Math.floor(yRand4)+'px)', background : 'rgb(150 50  0  /.2)', zIndex : '3'}, 
        {transform: 'translate('+Math.floor(xRand5)+'px,'+Math.floor(yRand5)+'px)', background : 'rgb(100 0   0  /.2)', zIndex : '4'}
    ];
}

const fire = {
    generate(embers) {
        for(let i = 0; i < embers; i++) {
            const ember = document.createElement("span");
            ember.classList.add("ember");
            divFire.appendChild(ember);
        }
    },
    alive() {
        let embers = [...document.querySelectorAll("main .ember")];
        embers.map(
            (ember,i) => {
                ember.getAnimations().map(anim => anim.cancel());
                ember.animate(
                    generateSpray(100, deg, wind)
                    ,{ duration: 1000, iterations: Infinity, delay: 1000*i/embers.length }
                );
            }
        );
    },
    dead() {
        let embers = [...document.querySelectorAll("main .ember")];
        embers.map( (ember,i) => ember.getAnimations().map(anim => anim.cancel()) );
    }
}

// Move fire by click
let isDown = true,
    offset = [];

divFire.addEventListener( "mousedown", function(event) {
    isDown = true;
    offset = [divFire.offsetLeft-event.clientX, divFire.offsetTop-event.clientY];
} );

document.addEventListener( "mouseup", function() { isDown = false; } );

document.addEventListener( "mousemove", function(event) { if (isDown) {
    divFire.style.left = ( event.clientX + offset[0] ) + 'px';
    divFire.style.top = ( event.clientY + offset[1] ) + 'px';
} } );

window.addEventListener("wheel", function(event) {
    deg = event.deltaY > 0 ? deg + 20 : deg - 20;
    fire.alive();
}, false );

document.getElementById("wind").addEventListener("change", function(event) {
    wind = parseInt(event.target.value);
    fire.alive();
})

fire.generate(100);
fire.alive();