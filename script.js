// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile navigation toggle
const mobileNavToggle = document.createElement('button');
mobileNavToggle.className = 'md:hidden p-2';
mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
document.querySelector('nav .flex').appendChild(mobileNavToggle);

const navLinks = document.querySelector('nav .hidden');
mobileNavToggle.addEventListener('click', () => {
    navLinks.classList.toggle('hidden');
});

// Contact form handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Message sent successfully!');
                contactForm.reset();
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            alert('Error sending message. Please try again later.');
            console.error('Error:', error);
        }
    });
}

// Add scroll reveal animation
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            section.classList.add('reveal');
        }
    });
});

// Bubble animation background
const canvas = document.getElementById('bubble-bg');
const ctx = canvas.getContext('2d');
let bubbles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function randomBetween(a, b) {
    return a + Math.random() * (b - a);
}

function createBubble() {
    return {
        x: randomBetween(0, canvas.width),
        y: canvas.height + 20,
        radius: randomBetween(8, 32),
        speed: randomBetween(1, 3),
        alpha: randomBetween(0.2, 0.6),
        color: `rgba(${Math.floor(randomBetween(100,200))},${Math.floor(randomBetween(180,230))},255,` // blueish
    };
}

function drawBubbles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < bubbles.length; i++) {
        const b = bubbles[i];
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, 2 * Math.PI);
        ctx.fillStyle = b.color + b.alpha + ')';
        ctx.fill();
        b.y -= b.speed;
        b.alpha -= 0.0005 * b.radius;
        if (b.y + b.radius < 0 || b.alpha <= 0) {
            bubbles[i] = createBubble();
            bubbles[i].y = canvas.height + bubbles[i].radius;
        }
    }
}

function animateBubbles() {
    if (bubbles.length < 30) {
        for (let i = bubbles.length; i < 30; i++) {
            bubbles.push(createBubble());
        }
    }
    drawBubbles();
    requestAnimationFrame(animateBubbles);
}

animateBubbles(); 