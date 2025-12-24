/**
 * Andrea Herrera - Script Principal
 * Encargado de la interactividad, navegación y experiencia de usuario.
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initPersonalizationForm();
    initScrollEffects();
});

/**
 * Inicializa la navegación y efectos de scroll
 */
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const logoImg = document.getElementById('logo-img');
    const logoText = document.querySelector('.logo-text');

    // Cambiar estilo del navbar al hacer scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY > 50;

        if (scrolled) {
            navbar.style.background = 'rgba(255, 250, 240, 0.95)'; // Cream con transparencia
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.05)';
            navbar.style.padding = '15px 0'; // Compactar ligeramente
        } else {
            navbar.style.background = 'transparent';
            navbar.style.backdropFilter = 'none';
            navbar.style.boxShadow = 'none';
            navbar.style.padding = '20px 0';
        }
    });

    // Smooth Scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Maneja la lógica del formulario de personalización
 */
function initPersonalizationForm() {
    const form = document.querySelector('.custom-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const occasion = document.getElementById('occasion');
        const flavor = document.getElementById('flavor');
        const vision = document.getElementById('vision');
        const btn = form.querySelector('button');

        // Validación simple
        if (!occasion.value || !flavor.value) {
            showToast('Por favor selecciona una ocasión y un sabor 🍰', 'error');
            return;
        }

        // Construir mensaje de WhatsApp
        const phoneNumber = "14242058039"; // Número de teléfono configurado
        const message = `¡Hola Andy Detalles! 🎂\n\nMe gustaría cotizar un pedido especial:\n\n🎉 *Ocasión:* ${occasion.options[occasion.selectedIndex].text}\n🍰 *Sabor:* ${flavor.options[flavor.selectedIndex].text}\n✨ *Mi Idea:* ${vision.value.trim() || "Sorpréndeme"}\n\n¡Quedo atento a su respuesta!`;

        // Crear URL y Redireccionar
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        // Feedback visual rápido antes de abrir
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fab fa-whatsapp"></i> Abriendo WhatsApp...';
        btn.style.opacity = '0.8';

        setTimeout(() => {
            window.open(whatsappUrl, '_blank');

            // Resetear botón y form
            btn.innerHTML = originalText;
            btn.style.opacity = '1';
            form.reset();
            showToast('¡Te estamos redirigiendo a WhatsApp! 📲', 'success');
        }, 800);
    });
}

/**
 * Inicializa efectos visuales adicionales
 */
function initScrollEffects() {
    // Animación de aparición simple para elementos al hacer scroll (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Seleccionar elementos a animar
    const animatedElements = document.querySelectorAll('.category-item, .gallery-img, .section-title');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(el);
    });
}

/**
 * Muestra una notificación tipo "Toast" personalizada
 * @param {string} message - El mensaje a mostrar
 * @param {string} type - 'success' o 'error'
 */
function showToast(message, type = 'success') {
    // Crear elemento si no existe
    let toast = document.querySelector('.toast-notification');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast-notification';
        document.body.appendChild(toast);
    }

    // Icono según tipo
    const icon = type === 'success' ? '<i class="fas fa-check-circle toast-icon"></i>' : '<i class="fas fa-exclamation-circle toast-icon"></i>';

    // Contenido
    toast.innerHTML = `${icon} <span>${message}</span>`;

    // Mostrar
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    // Ocultar después de 4 segundos
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}
