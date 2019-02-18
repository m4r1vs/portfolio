const scrollChecker = () => {
    if (document.body.scrollTop > 128) {
        document.getElementById('profile-card').style.opacity = 0
    } else {
        document.getElementById('profile-card').style.opacity = 1
    }
    if (document.body.scrollTop > 512) {
        document.getElementById('profile-card').style.display = 'none'
    } else {
        document.getElementById('profile-card').style.display = 'block '
    }
}

document.addEventListener('scroll', scrollChecker)

scrollChecker()

document.querySelectorAll('.secondary-card').forEach(element => {
    element.addEventListener('mouseover', () => {
        document.documentElement.style.setProperty('--background-color', element.getAttribute("hoverColor"))
    })
    element.addEventListener('mouseout', () => {
        document.documentElement.style.removeProperty('--background-color')
    })
})

function Particle(a, b, c) {
    this.init(a, b, c)
}
Particle.prototype = {
    init: function(a, b, c) {
        this.alive = !0;
        this.radius = c || 10;
        this.wander = .15;
        this.theta = random(TWO_PI);
        this.drag = .92;
        this.color = "#fff";
        this.x = a || 0;
        this.y = b || 0;
        this.vy = this.vx = 0
    },
    move: function() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= this.drag;
        this.vy *= this.drag;
        this.theta += random(-.5, .5) * this.wander;
        this.vx += .1 * sin(this.theta);
        this.vy += .1 * cos(this.theta);
        this.radius *= .96;
        this.alive = .5 < this.radius
    },
    draw: function(a) {
        a.beginPath();
        a.arc(this.x, this.y, this.radius, 0, TWO_PI);
        a.fillStyle = this.color;
        a.fill()
    }
};
var MAX_PARTICLES = 320,
    COLOURS = "#ffbc16 #c3185c #0e1460 #00af56 #673ab7".split(" "),
    particles = [],
    pool = [],
    canvas = Sketch.create({
        container: document.getElementById("particles")
    });
canvas.setup = function() {
    var a, b, c;
    setTimeout(function() {
        for (a = 0; 87 > a; a++) b = canvas.width / 2 + random(-320, 320), c = .4 * canvas.height + random(-300, 300), canvas.spawn(b, c)
    }, 400)
};
canvas.spawn = function(a, b) {
    particles.length >= MAX_PARTICLES && pool.push(particles.shift());
    particle = pool.length ? pool.pop() : new Particle;
    particle.init(a, b, random(5, 40));
    particle.wander = random(.5, 2);
    particle.color = random(COLOURS);
    particle.drag = random(.9, .99);
    theta = random(TWO_PI);
    force = random(2, 8);
    particle.vx = sin(theta) * force;
    particle.vy = cos(theta) * force;
    particles.push(particle)
};
canvas.update = function() {
    var a;
    for (a = particles.length - 1; 0 <= a; a--) {
        var b = particles[a];
        b.alive ? b.move() : pool.push(particles.splice(a, 1)[0])
    }
};
canvas.draw = function() {
    canvas.globalCompositeOperation = "lighter";
    for (var a = particles.length - 1; 0 <= a; a--) particles[a].draw(canvas)
};

document.onmousemove =

canvas.mousemove = function() {
    var particle, theta, force, touch, max, i, j, n;
    for ( i = 0, n = canvas.touches.length; i < n; i++ ) {
        touch = canvas.touches[i], max = random( 1, 4 );
        for ( j = 0; j < max; j++ ) {
          canvas.spawn( touch.x, touch.y );
        }
    }
};