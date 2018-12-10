// var elem = document.getElementById('canvas');
// var canvas = elem.getContext('2d');
//
// function getRandomColor() {
//   var letters = '0123456789ABCDEF';
//   var color = '#';
//   for (var i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }
//   return color;
// }
// /***********/
// var n1=0,n2=0,m1=0,m2=0;
// var niz1=new Array();
// var niz2=new Array();
// var b=0;
// function funsi() {
//
//
// for (var i = 1; i < 10; i++) {
//   for (var j = 1; j < 10; j++) {
//     //var c = Math.round(Math.random());
//     var t1=Math.floor((Math.random() * n2) + n1);
//     var t2=Math.floor((Math.random() * m2) + m1);
//     niz1.push(t1);
//     niz2.push(t2);
//     m1 += 25;
//     m2 += 25;
//     b++;
//     }
//   n1 += 25;
//   n2 += 25;
//   m1 = 0;
//   m2 = 25;
//   }
// }
// /***********/
//
// var speed=0.3;
// function initiate() {
//   requestAnimationFrame(initiate);
//
//   canvas.clearRect(0,0,innerWidth,innerHeight);
//   var c = Math.round(Math.random());
//   canvas.beginPath();
//   for (var i = 0; i < niz1.length; i++) {
//     if (c==0) {
//       canvas.moveTo(niz1[i]+speed,niz2[i]);
//       canvas.lineTo(niz1[i],niz2[i]);
//     }
//     else {
//       canvas.moveTo(niz1[i],niz2[i]);
//       canvas.lineTo(niz1[i]+speed,niz2[i]);
//     }
//   }
//   speed++;
//   if(speed>=50){speed=0;funsi();}
//   canvas.stroke();
// }








// Initial Setup
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

// Variables
const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init()
})

// Utility Functions
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
}

function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1
    const yDist = y2 - y1

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

// Objects
function Particle(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.radians = Math.random() * Math.PI * 2;
    this.velocity = 0.05;
    this.distanceFromCenter = randomIntFromRange(50, 120);
    this.lastMouse = {x: this.x, y: this.y};

    this.update = () => {
        const lastPoint = {x: this.x, y: this.y};
        this.radians += this.velocity;
        this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
        this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;
        this.x = this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter;
        this.y = this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter;
        this.draw(lastPoint)
    }

    this.draw = lastPoint => {
        c.beginPath()
        c.strokeStyle = this.color;
        c.lineWidth = this.radius;
        c.moveTo(lastPoint.x, lastPoint.y);
        c.lineTo(this.x, this.y);
        c.stroke();
        c.closePath()
    }
}

// Implementation
let particles
function init() {
    particles = []

    for (let i = 0; i < 50; i++) {
        const radius = (Math.random() * 2) + 1;
        particles.push(new Particle(canvas.width/2,canvas.height/2,radius,randomColor(colors)));
    }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'rgba(255, 255, 255, 0.1)'
    c.fillRect(0, 0, canvas.width, canvas.height)

    //c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)
    particles.forEach(particle => {
     particle.update();
    });
}

init()
animate()
