document.addEventListener('DOMContentLoaded', function() {
    const slideContainer = document.querySelector('.slide-container');

    // Datos de las slides
    const slidesData = [
        {
            title: '¡Hola, Minina! ❤️',
            text: 'Desliza para ver tu mensaje 💕',
            decoration: `
                <div class="shape circle" style="width: 100px; height: 100px; top: 10%; left: 10%;"></div>
                <div class="shape circle" style="width: 150px; height: 150px; bottom: 20%; right: -20px;"></div>
                <div class="shape circle" style="width: 50px; height: 50px; top: 40%; left: 80%;"></div>
            `
        },
        {
            title: 'Ya esta vez si 😉',
            text: 'Desliza 💖',
            decoration: `
                <div class="shape square" style="width: 80px; height: 80px; top: 15%; right: 15%;"></div>
                <div class="shape square" style="width: 120px; height: 120px; bottom: 10%; left: 10%;"></div>
            `
        },
        {
            title: 'Desliza para saber que 💌',
            text: 'este usuario te ama mucho',
            decoration: `
                <div class="shape heart-shape" style="top: 20%; left: 20%;">💖</div>
                <div class="shape heart-shape" style="bottom: 30%; right: 20%;">💖</div>
            `
        },
        {
            content: `
                <div class="landscape">
                    <div class="sun"></div>
                    <div class="cloud" style="width: 100px; height: 40px; top: 100px; left: 20px;"></div>
                    <div class="cloud" style="width: 140px; height: 60px; top: 60px; right: 50px;"></div>
                    <div class="ground"></div>
                </div>
                <div class="wrapper" onclick="this.classList.toggle('open')">
                    <div class="envelope">
                        <div class="heart">❤️</div>
                        <div class="letter">
                            <p>
                                Hola, mi Gatita GeneLiz 🐱✨<br><br>
                                Sé que estos momentos son difíciles y que a veces prefieres guardar todo el ruido en silencio, pero quiero que recuerdes algo importante: lo que está pasando no es tu culpa.  No tienes que cargar con pesos que no te pertenecen.<br><br>
                                Te admiro muchísimo, no solo por lo que haces, sino por la fuerza que tienes incluso cuando crees que nadie te ve🌟. Eres la persona más fuerte que conozco y, aunque estemos en casas diferentes, aquí me tienes a un <span class="clickable-word" onclick="document.getElementById('surprise-modal').style.display='flex'">click</span> de distancia. 💻🖱️<br><br>
                                No estás sola, nunca lo estarás. 🫂❤️ Te amo mi mujercita preciosa. 💖🌈
                            </p>
                        </div>
                    </div>
                </div>
            `
        }
    ];

    // Crear las slides dinámicamente
    slidesData.forEach(data => {
        const slide = document.createElement('div');
        slide.classList.add('slide');

        if (data.content) {
            slide.innerHTML = data.content;
        } else {
            slide.innerHTML = `
                ${data.decoration || ''}
                <h1>${data.title}</h1>
                <p>${data.text}</p>
            `;
        }

        slideContainer.appendChild(slide);
    });

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

    // Insertar el Modal de Sorpresa en el cuerpo del documento
    const modalHTML = `
    <div id="surprise-modal" class="modal" onclick="if(event.target === this) this.style.display='none'">
        <div class="modal-content">
            <h2>A HOBISITO (NI A MI) NO NOS GUSTA VERTE TRISTE &lt;3 TE AMAMOS (PERO YO TU NOVIO ANDERSON MAS)</h2>
            <img src="hobisitojr.jpg" alt="Hobisito Jr">
            <a href="https://www.youtube.com/watch?v=zyltmHVIPX8&list=RDzyltmHVIPX8&start_radio=1" target="_blank" class="btn-youtube">Ver Video Especial 🎵</a>
            <br>
            <button class="btn-close" onclick="document.getElementById('surprise-modal').style.display='none'">Volver Atrás</button>
        </div>
    </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Música de fondo
    const audio = document.getElementById('bg-music');
    audio.volume = 0.5; // Volumen al 50%

    // Intentar reproducir automáticamente
    const playPromise = audio.play();

    if (playPromise !== undefined) {
        playPromise.catch(error => {
            // Si el navegador bloquea el autoplay, reproducir al primer toque/clic
            const playOnInteraction = () => {
                audio.play();
                document.removeEventListener('click', playOnInteraction);
                document.removeEventListener('touchstart', playOnInteraction);
            };
            document.addEventListener('click', playOnInteraction);
            document.addEventListener('touchstart', playOnInteraction);
        });
    }
});