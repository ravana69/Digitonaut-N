// By Roni Kaufman
// inspired by https://www.openprocessing.org/sketch/833093
// and by https://twitter.com/BendotK/status/1168267236219469825?s=09

let particles = [];
let n = 1000;
let colors;
let squiggliness;
let maxSize = 1;
let minSize = 0.1;
let size;
let t;
let interval;
let margin = -30;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 1);
  noStroke();
  
  background(0.6, 0.75, 0.25);
	size = maxSize;
	squiggliness = random(1/600, 1/700);
	n = width*height/1000;
	
  //updateParticles();
  interval = setInterval(updateParticles, 1000);
}

function draw() {
  for (let p of particles) {
    p.draw();
    p.move();
  }
}

function updateParticles() {
	t = map(size, maxSize, minSize, 0, 1);
  particles = [];
  for (let i = 0; i < n; i++) {
    let x_ = random(margin, width - margin);
    let y_ = random(margin, height - margin);
    let c_ = interpolateColor(t);
    particles.push(new Particle(x_, y_, 1.5, c_));
  }
	size -= 0.02;
	if (size <= minSize) {
		clearInterval(interval);
		setTimeout(noLoop, 1000);
	}
}

function interpolateColor(t) {
	let hue;
	if (t < 0.5)  {
		hue = (t/5+0.5)%1;
	} else {
		hue = (t/3+0.84)%1;
	}
	let sat = 0.75;
	let val = 1;
	return color(hue, sat, val);
}

function Particle(x_, y_, s_, c_) {
  this.x = x_;
  this.y = y_;
  this.size = s_;
  this.c = c_;
	
  this.dist = size;
  
  this.move = function() {
    let theta = noise(this.x * squiggliness, this.y * squiggliness)*PI*4;
    let v = p5.Vector.fromAngle(theta, this.dist);
    this.x += v.x;
    this.y += v.y;
		
		/*
		if (this.x < margin || this.x > width - margin || this.y < margin || this.y > height - margin) {
			this.dist *= 1.01;
		}
		*/
  }
  
  this.draw = function() {
    fill(this.c);
    circle(this.x, this.y, this.size);
  }
}