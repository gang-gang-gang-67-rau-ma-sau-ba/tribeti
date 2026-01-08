// --- PARTICLES EFFECT (Nền chuyển động) ---
const canvas = document.getElementById("particles");
if (canvas) {
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let particles = [];

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
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
            ctx.fillStyle = "rgba(0, 242, 255, 0.4)"; // Màu xanh sáng hơn
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        particles = [];
        for (let i = 0; i < 80; i++) particles.push(new Particle());
    }
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animate);
    }
    init();
    animate();
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    });
}

// --- TYPEWRITER (Hiệu ứng gõ chữ) ---
const typeTarget = document.querySelector(".typewriter");
if (typeTarget) {
    const roles = ["Web Developer", "Desktop App Dev", "CS Student"];
    let roleIdx = 0, charIdx = 0, isDeleting = false;
    
    function type() {
        const current = roles[roleIdx];
        if (isDeleting) {
            typeTarget.textContent = current.substring(0, charIdx - 1);
            charIdx--;
        } else {
            typeTarget.textContent = current.substring(0, charIdx + 1);
            charIdx++;
        }
        
        let speed = isDeleting ? 50 : 100;
        if (!isDeleting && charIdx === current.length) {
            speed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            roleIdx = (roleIdx + 1) % roles.length;
        }
        setTimeout(type, speed);
    }
    type();
}

// --- GSAP ANIMATION (Chỉ chạy nếu thư viện tải thành công) ---
if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    
    // Xóa style opacity: 1 !important cũ bằng JS để chạy hiệu ứng (nếu cần mượt)
    // Nhưng để an toàn cho bạn lúc này, ta chỉ chạy animation đơn giản
    
    gsap.from(".reveal", {
        y: 30,
        opacity: 0, // Chỉ ẩn và hiện dần nếu JS chạy tốt
        duration: 1,
        stagger: 0.2,
        clearProps: "all" // Xóa thuộc tính sau khi chạy xong để tránh lỗi ẩn luôn
    });
} else {
    console.log("GSAP chưa tải được, hiển thị chế độ tĩnh.");
}