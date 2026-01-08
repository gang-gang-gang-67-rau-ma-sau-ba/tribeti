// ===== 1. PARTICLES EFFECT (Giữ nguyên vì đẹp) =====
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

// Xử lý resize để không bị méo canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let particles = [];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5; // Nhỏ lại xíu cho tinh tế
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
    }
    draw() {
        // Màu xanh Cyan nhạt
        ctx.fillStyle = "rgba(108, 242, 255, 0.6)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    const particleCount = window.innerWidth < 768 ? 60 : 120; // Giảm số lượng trên mobile
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// ===== 2. TYPEWRITER EFFECT (Gõ chữ) =====
const roles = [
    "Computer Science Student", 
    "Web Developer", 
    "Desktop App Developer", 
    "Open Source Enthusiast"
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeTarget = document.querySelector(".typewriter");

function typeEffect() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
        typeTarget.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typeTarget.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000; // Dừng lại chút khi gõ xong
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
}
// Bắt đầu gõ khi load xong
window.addEventListener("load", typeEffect);


// ===== 3. GSAP ANIMATIONS & SCROLL TRIGGER =====
gsap.registerPlugin(ScrollTrigger);

// Animation cho Hero section khi load
gsap.from(".reveal", {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out"
});

// Animation cho các section khi cuộn xuống
gsap.utils.toArray(".section-hidden").forEach(section => {
    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
            start: "top 80%", // Bắt đầu chạy khi section cách đỉnh 80%
            toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });
});

// Animation cho các thẻ Project và Timeline (chạy so le)
gsap.from(".card, .timeline-item", {
    scrollTrigger: {
        trigger: "#projects",
        start: "top 75%",
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2
});


// ===== 4. MOBILE MENU TOGGLE =====
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');

    // Đổi icon từ bars sang times (x)
    const icon = menuBtn.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Đóng menu khi click vào link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuBtn.querySelector('i').classList.remove('fa-times');
        menuBtn.querySelector('i').classList.add('fa-bars');
    });
});