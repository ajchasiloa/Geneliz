document.addEventListener('DOMContentLoaded', function() {
    const slideContainer = document.querySelector('.slide-container');

    // Contenido final (Carta de éxito)
    const successContent = `
        <div class="success-slide">
            <div class="landscape-container">
                <div class="sun-animated"></div>
                <div class="cloud-animated" style="top: 15%; width: 100px; height: 40px; animation-duration: 25s;"></div>
                <div class="cloud-animated" style="top: 25%; width: 140px; height: 50px; animation-duration: 35s; animation-delay: -10s;"></div>
                <div class="bird-animated" style="top: 20%; animation-duration: 15s;"></div>
                <div class="bird-animated" style="top: 30%; animation-duration: 18s; animation-delay: -5s;"></div>
                <div class="water-waves">
                    <div class="wave"></div>
                    <div class="wave"></div>
                </div>
            </div>
            <div class="flowers-left" id="garden"></div>
            <div class="content-right">
                <h1>¡SABÍA QUE DIRÍAS QUE SÍ! 😻✨</h1>
                <img src="hobisitojr.jpg" alt="Nosotros" class="success-img">
                <div class="success-text">
                    <p>
                        Gracias por hacerme el hombre más feliz.<br>
                        Eres mi San Valentín hoy y siempre. 💖<br>
                        <strong>Te amo mi Gatita GeneLiz. 🫂❤️</strong>
                    </p>
                </div>
            </div>
        </div>
    `;

    // Función para renderizar las etapas del flujo
    function renderStage(stage) {
        slideContainer.innerHTML = ''; // Limpiar contenido anterior
        const slide = document.createElement('div');
        slide.classList.add('slide');
        slide.classList.add(`stage-${stage}`); // Clase para estilos específicos por etapa

        if (stage === 'success') {
            slide.innerHTML = successContent;
            slideContainer.appendChild(slide);
            
            // Crear secuencia de flores
            const garden = slide.querySelector('#garden');
            for(let i = 0; i < 7; i++) {
                createFlower(garden, i * 300); // Retraso escalonado
            }
            return;
        }

        let title = '';
        let isMovingNo = false;

        if (stage === 0) {
            title = '¿QUIERES SER MI SAN VALENTIN ? 🌹';
        } else if (stage === 1) {
            title = 'SEGURA QUE NO :(? 😢';
        } else if (stage === 2) {
            title = 'OK, ACEPTO EL NO SI LOGRAS PRESIONAR EL BOTON DE NO NUEVAMENTE 😈';
            isMovingNo = true;
        }

        slide.innerHTML = `
            <h1>${title}</h1>
            <div class="btn-container">
                <button id="btn-yes" class="btn-valentine yes">SI 💖</button>
                <button id="btn-no" class="btn-valentine no">NO 💔</button>
            </div>
        `;

        slideContainer.appendChild(slide);

        // Lógica de los botones
        document.getElementById('btn-yes').addEventListener('click', () => renderStage('success'));
        
        const btnNo = document.getElementById('btn-no');
        if (isMovingNo) {
            const moveButton = (e) => {
                e.preventDefault();
                // Calcular nueva posición aleatoria
                const x = Math.random() * (window.innerWidth - btnNo.offsetWidth - 20);
                const y = Math.random() * (window.innerHeight - btnNo.offsetHeight - 20);
                
                btnNo.style.position = 'fixed'; // Usar fixed para mover libremente por la pantalla
                btnNo.style.left = `${Math.max(0, x)}px`;
                btnNo.style.top = `${Math.max(0, y)}px`;
            };

            // Mover al intentar hacer click o pasar el mouse
            btnNo.addEventListener('click', moveButton);
            btnNo.addEventListener('mouseover', moveButton);
            btnNo.addEventListener('touchstart', moveButton);
        } else {
            btnNo.addEventListener('click', () => renderStage(stage + 1));
        }
    }

    // Función para crear una flor animada
    function createFlower(container, delay) {
        setTimeout(() => {
            const flower = document.createElement('div');
            flower.classList.add('flower');
            // Posición aleatoria en el ancho del contenedor
            flower.style.left = `${10 + Math.random() * 80}%`; 
            // Altura aleatoria del tallo
            const height = 150 + Math.random() * 200;
            flower.style.setProperty('--stem-height', `${height}px`);

            flower.innerHTML = `
                <div class="flower-head">
                    <div class="petal p1"></div><div class="petal p2"></div>
                    <div class="petal p3"></div><div class="petal p4"></div>
                    <div class="petal p5"></div>
                    <div class="center"></div>
                </div>
                <div class="stem"></div>
            `;
            container.appendChild(flower);
        }, delay);
    }

    // Función para dibujar el corazón matemático
    function drawHeart(canvas) {
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        const cx = width / 2;
        const cy = height / 2;
        const scale = 15; // Tamaño del corazón

        ctx.strokeStyle = '#000000'; // Borde negro
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        let t = 0;
        // Punto inicial
        let prevX = cx; 
        let prevY = cy - (13 * Math.cos(0) - 5 * Math.cos(0) - 2 * Math.cos(0) - Math.cos(0)) * scale;

        function animate() {
            if (t > Math.PI * 2) return; // Detener al completar el ciclo
            
            t += 0.01; // Velocidad de dibujo (más lento)
            
            // Ecuación paramétrica del corazón
            let x = cx + (16 * Math.pow(Math.sin(t), 3)) * scale;
            let y = cy - (13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t)) * scale;
            
            ctx.beginPath();
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(x, y);
            ctx.stroke();
            
            prevX = x;
            prevY = y;
            
            requestAnimationFrame(animate);
        }
        animate();
    }

    // Iniciar animación del corazón una sola vez
    drawHeart(document.getElementById('heart-canvas'));

    // Iniciar el flujo
    renderStage(0);

    // Fondo de corazones
    const heartContainer = document.createElement('div');
    heartContainer.classList.add('heart-container');
    document.body.appendChild(heartContainer);

    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.textContent = '❤️';
        heart.style.setProperty('--random-x', `${Math.random() * 100}vw`);
        heart.style.animationDuration = `${Math.random() * 3 + 2}s`;
        heartContainer.appendChild(heart);
        setTimeout(() => {
            heart.remove();
        }, 5000);
    }, 200);

});