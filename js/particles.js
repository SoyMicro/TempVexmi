// Efecto de partículas para el fondo
document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.particles-container');
    const canvas = document.createElement('canvas');
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    
    let width = container.clientWidth;
    let height = container.clientHeight;
    const particles = [];
    
    // Configuración de partículas
    const particleCount = 50;
    const colors = ['#00ffff', '#fbff00', '#00a2ff', '#ff00d0'];
    
    // Ajustar el tamaño del canvas
    function resizeCanvas() {
        width = container.clientWidth;
        height = container.clientHeight;
        canvas.width = width;
        canvas.height = height;
    }
    
    // Clase de partícula
    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 3 + 1;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.speed = Math.random() * 2 + 0.5;
            this.angle = Math.random() * 360;
            this.pulse = Math.random() * 2;
        }
        
        update() {
            // Mover partícula
            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed;
            
            // Rebote en los bordes
            if (this.x < 0 || this.x > width) this.angle = 180 - this.angle;
            if (this.y < 0 || this.y > height) this.angle = 360 - this.angle;
            
            // Efecto de pulso
            this.pulse += 0.05;
            const pulseSize = this.size + Math.sin(this.pulse) * 0.5;
            
            // Dibujar partícula
            ctx.beginPath();
            ctx.arc(this.x, this.y, pulseSize, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = 0.7;
            ctx.fill();
            
            // Crear estela
            ctx.beginPath();
            ctx.arc(this.x, this.y, pulseSize * 2, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = 0.1;
            ctx.fill();
        }
    }
    
    // Inicializar partículas
    function initParticles() {
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    // Animación
    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        particles.forEach(particle => {
            particle.update();
        });
        
        requestAnimationFrame(animate);
    }
    
    // Inicializar
    resizeCanvas();
    initParticles();
    animate();
    
    // Reajustar en resize
    window.addEventListener('resize', resizeCanvas);
});