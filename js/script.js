// --- Animação Matrix ---
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

let katakana = 'アァカサタナハマヤラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨロヲゴゾドボポヴッン';
katakana += '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

let font_size = 16;
let columns = canvas.width / font_size;
let drops = [];

// Inicializa 'drops' para cada coluna com uma posição aleatória
for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = canvas.width / font_size;
    drops.length = columns; // Ajusta o array de drops
    for (let x = 0; x < columns; x++) {
        if (drops[x] === undefined) {
            drops[x] = 1; // Inicializa novas colunas
        }
    }
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // Chama no carregamento para definir o tamanho inicial

function drawMatrix() {
    // Fundo semitransparente para o rastro das letras
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0F0'; // Cor verde para as letras
    ctx.font = font_size + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        // Escolhe um caractere aleatório do katakana
        let text = katakana.charAt(Math.floor(Math.random() * katakana.length));
        // Desenha o caractere
        ctx.fillText(text, i * font_size, drops[i] * font_size);

        // Envia a letra de volta para cima se ela cair muito ou aleatoriamente
        if (drops[i] * font_size > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        // Incrementa a posição y da "chuva"
        drops[i]++;
    }
}

// Inicia a animação Matrix
setInterval(drawMatrix, 33); // Aproximadamente 30 frames por segundo

// --- Código Existente do Portfólio (Scroll Reveal, Scroll Top Button) ---

// 1. SCROLL REVEAL ANIMATION
const revealElements = document.querySelectorAll('.reveal');

const options = {
    root: null, // viewport
    threshold: 0.1, // Elemento visível 10%
    rootMargin: "0px"
};

const observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        }
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Para de observar depois de animar
    });
}, options);

revealElements.forEach(element => {
    observer.observe(element);
});


// 2. SCROLL TOP BUTTON
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) { // Mostra o botão após rolar 300px
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Impede o comportamento padrão do link
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 3. Highlight active nav link on scroll (Optional, but good for UX)
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav ul li a');

const highlightNav = () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 100) { // Ajuste o offset conforme necessário
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active-nav');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active-nav');
        }
    });
};

window.addEventListener('scroll', highlightNav);
window.addEventListener('load', highlightNav); // Highlight on page load

// Adicionar estilo para 'active-nav' no CSS
// header nav ul li a.active-nav {
//     color: var(--cor-primaria); /* Ou outra cor que destaque */
//     font-weight: 700;
// }