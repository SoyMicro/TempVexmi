document.addEventListener('DOMContentLoaded', function() {
    // Fecha objetivo: 23 de agosto de 2025, 10:00 AM (hora de Colombia)
    const targetDate = new Date('August 23, 2025 12:00:00 GMT-0500');
    const tickSound = document.getElementById('tick-sound');
    let lastSecond = null;
    
    // Inicializar los círculos de progreso
    const rings = document.querySelectorAll('.progress-ring-circle');
    const radius = 52;
    const circumference = 2 * Math.PI * radius;
    
    rings.forEach(ring => {
        ring.style.strokeDasharray = `${circumference} ${circumference}`;
        ring.style.strokeDashoffset = circumference;
    });
    
    function setProgress(ring, percent) {
        const offset = circumference - (percent / 100) * circumference;
        ring.style.strokeDashoffset = offset;
    }
    
    function updateCountdown() {
        const now = new Date();
        const difference = targetDate - now;
        
        if (difference <= 0) {
            // Si la fecha ya pasó
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            
            // Mostrar mensaje de cuenta regresiva finalizada
            if (!document.querySelector('.expired-message')) {
                const expiredMessage = document.createElement('div');
                expiredMessage.className = 'expired-message';
                expiredMessage.textContent = '¡Vexmi Network está oficialmente abierto!';
                document.querySelector('.container').appendChild(expiredMessage);
            }
            
            return;
        }
        
        // Cálculos
        const totalDays = Math.floor(difference / (1000 * 60 * 60 * 24));
        const totalHours = Math.floor(difference / (1000 * 60 * 60));
        const totalMinutes = Math.floor(difference / (1000 * 60));
        const totalSeconds = Math.floor(difference / 1000);
        
        const days = totalDays;
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        // Actualizar el DOM
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        
        // Actualizar los círculos de progreso
        setProgress(rings[0], (days % 30) * 3.33); // Progreso de días (asumiendo 30 días/mes)
        setProgress(rings[1], (hours / 24) * 100); // Progreso de horas
        setProgress(rings[2], (minutes / 60) * 100); // Progreso de minutos
        setProgress(rings[3], (seconds / 60) * 100); // Progreso de segundos
        
        // Reproducir sonido cada segundo
        if (seconds !== lastSecond) {
            // Reiniciar y reproducir el sonido (solo si ha cambiado el segundo)
            tickSound.currentTime = 0;
            tickSound.play().catch(e => console.log("La reproducción automática de audio fue prevenida:", e));
            lastSecond = seconds;
        }
    }
    
    // Actualizar cada segundo
    updateCountdown();
    setInterval(updateCountdown, 1000);

});
