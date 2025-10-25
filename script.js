// ============================================
// ANIMAÇÃO DA LOGO INICIAL
// ============================================
window.addEventListener('DOMContentLoaded', () => {
    const logoIntro = document.getElementById('logo-intro');
    const header = document.getElementById('header');

    // Esconder a logo inicial após 2.5 segundos
    setTimeout(() => {
        logoIntro.classList.add('hidden');
        
        // Mostrar o header fixo após a animação
        setTimeout(() => {
            header.classList.add('visible');
        }, 300);
    }, 2500);
});

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, observerOptions);

// Observar todos os elementos com a classe scroll-reveal
document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach(element => {
        observer.observe(element);
    });
});

// ============================================
// CARROSSEL DE DEPOIMENTOS
// ============================================
let currentSlide = 0;
const carousel = document.querySelector('.carousel');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const totalSlides = testimonialCards.length;

function moveCarousel(direction) {
    currentSlide += direction;
    
    // Loop infinito
    if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    } else if (currentSlide >= totalSlides) {
        currentSlide = 0;
    }
    
    // Mover o carrossel
    const offset = -currentSlide * 100;
    carousel.style.transform = `translateX(${offset}%)`;
}

// Auto-play do carrossel (opcional)
let carouselInterval = setInterval(() => {
    moveCarousel(1);
}, 5000);

// Pausar o auto-play quando o usuário interagir
document.querySelectorAll('.carousel-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        clearInterval(carouselInterval);
        
        // Reiniciar o auto-play após 10 segundos de inatividade
        carouselInterval = setInterval(() => {
            moveCarousel(1);
        }, 10000);
    });
});

// ============================================
// FAQ ACCORDION
// ============================================
function toggleFaq(button) {
    const faqItem = button.parentElement;
    const allFaqItems = document.querySelectorAll('.faq-item');
    
    // Fechar todos os outros itens
    allFaqItems.forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('active');
        }
    });
    
    // Toggle do item clicado
    faqItem.classList.toggle('active');
}

// ============================================
// SMOOTH SCROLL PARA ÂNCORAS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// ANIMAÇÃO DO HEADER NO SCROLL
// ============================================
let lastScroll = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Esconder/mostrar header baseado na direção do scroll
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// ============================================
// PARALLAX SUAVE NO HERO
// ============================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroContent && window.innerWidth > 768) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
    }
});

// ============================================
// CONTADOR REGRESSIVO (OPCIONAL)
// ============================================
function startCountdown(duration) {
    const urgencyElement = document.querySelector('.urgency p');
    if (!urgencyElement) return;
    
    let timer = duration;
    const interval = setInterval(() => {
        const hours = Math.floor(timer / 3600);
        const minutes = Math.floor((timer % 3600) / 60);
        const seconds = timer % 60;
        
        // Atualizar apenas se o elemento urgency existir
        if (urgencyElement.textContent.includes('⚡')) {
            urgencyElement.innerHTML = `⚡ Oferta expira em: ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ⚡`;
        }
        
        if (--timer < 0) {
            timer = duration; // Reiniciar o contador
        }
    }, 1000);
}

// Iniciar contador de 2 horas (7200 segundos)
// Descomente a linha abaixo para ativar o contador
// startCountdown(7200);

// ============================================
// EFEITO DE PARTÍCULAS (OPCIONAL)
// ============================================
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 3 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'rgba(255, 215, 0, 0.5)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${Math.random() * 10 + 5}s infinite ease-in-out`;
        particle.style.pointerEvents = 'none';
        
        hero.appendChild(particle);
    }
}

// Adicionar animação float ao CSS dinamicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) translateX(${Math.random() * 50 - 25}px);
        }
    }
`;
document.head.appendChild(style);

// Descomente para ativar partículas
// createParticles();

// ============================================
// DETECÇÃO DE MOBILE PARA OTIMIZAÇÕES
// ============================================
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if (isMobile) {
    // Desabilitar algumas animações pesadas em mobile
    document.body.classList.add('mobile-device');
}

// ============================================
// LAZY LOADING DE IMAGENS (quando adicionar imagens reais)
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
});

// ============================================
// TRACKING DE EVENTOS (para integração futura com analytics)
// ============================================
function trackEvent(eventName, eventData = {}) {
    // Aqui você pode adicionar integração com Google Analytics, Facebook Pixel, etc.
    console.log('Event Tracked:', eventName, eventData);
    
    // Exemplo de integração com Google Analytics (descomente quando configurar)
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', eventName, eventData);
    // }
    
    // Exemplo de integração com Facebook Pixel (descomente quando configurar)
    // if (typeof fbq !== 'undefined') {
    //     fbq('track', eventName, eventData);
    // }
}

// Rastrear cliques nos CTAs
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', () => {
        trackEvent('CTA_Click', {
            button_text: button.textContent,
            button_location: button.closest('section')?.id || 'unknown'
        });
    });
});

// Rastrear abertura de FAQs
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        trackEvent('FAQ_Opened', {
            question_text: question.textContent.trim()
        });
    });
});

// Rastrear clique no WhatsApp
document.querySelector('.whatsapp-button')?.addEventListener('click', () => {
    trackEvent('WhatsApp_Click');
});

// ============================================
// PRELOADER ADICIONAL (OPCIONAL)
// ============================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ============================================
// PROTEÇÃO CONTRA SCROLL DURANTE ANIMAÇÃO INICIAL
// ============================================
(function() {
    const logoIntro = document.getElementById('logo-intro');
    
    // Prevenir scroll durante a animação inicial
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        document.body.style.overflow = 'auto';
    }, 2500);
})();

// ============================================
// ANIMAÇÃO DE DIGITAÇÃO NO TÍTULO (OPCIONAL)
// ============================================
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Descomente para ativar o efeito de digitação
// document.addEventListener('DOMContentLoaded', () => {
//     setTimeout(() => {
//         const heroTitle = document.querySelector('.hero-title');
//         if (heroTitle) {
//             const originalText = heroTitle.textContent;
//             typeWriter(heroTitle, originalText, 30);
//         }
//     }, 2800);
// });

// ============================================
// CURSOR PERSONALIZADO (OPCIONAL - MUITO LUXUOSO)
// ============================================
function customCursor() {
    const cursor = document.createElement('div');
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    cursor.style.border = '2px solid var(--gold)';
    cursor.style.borderRadius = '50%';
    cursor.style.position = 'fixed';
    cursor.style.pointerEvents = 'none';
    cursor.style.zIndex = '99999';
    cursor.style.transition = 'transform 0.2s ease';
    cursor.style.transform = 'translate(-50%, -50%)';
    
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Aumentar cursor ao passar por elementos clicáveis
    document.querySelectorAll('a, button, .cta-button').forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.background = 'rgba(255, 215, 0, 0.2)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.background = 'transparent';
        });
    });
}

// Descomente para ativar cursor personalizado (apenas desktop)
// if (!isMobile) {
//     customCursor();
//     document.body.style.cursor = 'none';
//     document.querySelectorAll('a, button').forEach(el => el.style.cursor = 'none');
// }

// ============================================
// CONSOLE LOG ESTILIZADO (BRANDING)
// ============================================
console.log('%c🚀 Venda Silenciosa Start ', 'background: #000; color: #FFD700; font-size: 20px; font-weight: bold; padding: 10px;');
console.log('%c💎 Desenvolvido com excelência ', 'background: #FFD700; color: #000; font-size: 14px; font-weight: bold; padding: 5px;');
console.log('%cDeseja saber mais? Entre em contato! ', 'color: #00ff88; font-size: 12px;');
