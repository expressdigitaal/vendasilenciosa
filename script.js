// ============================================
// ANIMAÇÃO DA LOGO INICIAL (VIDRO QUEBRADO - EXPLOSÃO REVERSA)
// ============================================
window.addEventListener('DOMContentLoaded', () => {
    const logoIntro = document.getElementById('logo-intro');
    const header = document.getElementById('header');
    const fragmentsContainer = document.getElementById('fragments-container');
    const logoFinal = document.getElementById('logo-final');

    // Criar fragmentos de vidro quebrado da logo COMPLETA (TikTok + Texto)
    if (fragmentsContainer && logoFinal) {
        const fragmentCount = 30; // Número de fragmentos
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        // Criar canvas para capturar a logo completa
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 400;
        canvas.height = 300;
        
        // Desenhar fundo transparente
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Desenhar logo TikTok (SVG paths)
        const svgData = `
            <svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>
                <g transform="translate(150, 60)">
                    <path fill="#00f2ea" d="M38.4,21.68a13.41,13.41,0,0,1-7.88-2.53v11.4A12.07,12.07,0,1,1,18.94,18.48v6.68a5.38,5.38,0,1,0,3.77,5.13V2.44h5.81a7.6,7.6,0,0,0,7.5,6.55v6.09A13.38,13.38,0,0,1,38.4,21.68Z" transform="scale(2.5)" filter="url(#glow)"/>
                    <path fill="#ff0050" d="M30.52,19.15a13.41,13.41,0,0,0,7.88,2.53V15.09a7.6,7.6,0,0,1-7.5-6.55H28.52V30.69a5.38,5.38,0,1,1-3.77-5.13V18.88A12.07,12.07,0,1,0,36.33,30.55V19.15Z" transform="scale(2.5)" filter="url(#glow)"/>
                </g>
                <text x="200" y="200" font-family="Playfair Display, serif" font-size="42" font-weight="800" fill="#FFD700" text-anchor="middle" filter="url(#glow)">VENDA SILENCIOSA</text>
                <text x="200" y="240" font-family="Montserrat, sans-serif" font-size="24" font-weight="300" fill="#ffffff" text-anchor="middle" letter-spacing="6">START</text>
            </svg>
        `;
        
        const logoDataURL = 'data:image/svg+xml;base64,' + btoa(svgData);

        // Criar fragmentos irregulares
        for (let i = 0; i < fragmentCount; i++) {
            const fragment = document.createElement('div');
            fragment.className = 'glass-fragment';
            
            // Tamanho variado dos fragmentos
            const size = 40 + Math.random() * 80;
            fragment.style.width = size + 'px';
            fragment.style.height = size + 'px';
            
            // Posição inicial ESPALHADA (simulando explosão)
            const angle = (Math.PI * 2 * i) / fragmentCount + (Math.random() - 0.5) * 0.5;
            const distance = 300 + Math.random() * 400;
            const startX = centerX + Math.cos(angle) * distance;
            const startY = centerY + Math.sin(angle) * distance;
            
            fragment.style.left = startX + 'px';
            fragment.style.top = startY + 'px';
            fragment.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 720 - 360}deg)`;
            
            // Criar polígono irregular (fragmento de vidro)
            const points = [];
            const sides = 5 + Math.floor(Math.random() * 3);
            for (let j = 0; j < sides; j++) {
                const a = (Math.PI * 2 * j) / sides + (Math.random() - 0.5) * 0.5;
                const r = 40 + Math.random() * 60;
                points.push(`${50 + Math.cos(a) * r}% ${50 + Math.sin(a) * r}%`);
            }
            
            // Aplicar clip-path e imagem da logo COMPLETA
            fragment.style.clipPath = `polygon(${points.join(', ')})`;
            fragment.style.background = `url("${logoDataURL}") center/cover`;
            fragment.style.backgroundSize = `${400 + i * 10}px ${300 + i * 10}px`;
            fragment.style.backgroundPosition = `${-i * 15}px ${-i * 10}px`;
            
            // Animação: CONVERGE para o centro
            const delay = Math.random() * 0.2;
            const duration = 2 + Math.random() * 0.5;
            
            const keyframes = `
                @keyframes fragmentReverse${i} {
                    0% {
                        transform: translate(-50%, -50%) rotate(${Math.random() * 720 - 360}deg) scale(1.2);
                        opacity: 1;
                        filter: brightness(1.8) drop-shadow(0 0 15px rgba(255,215,0,0.9));
                    }
                    60% {
                        transform: translate(calc(50vw - ${startX}px), calc(50vh - ${startY}px)) rotate(${Math.random() * 360}deg) scale(0.6);
                        opacity: 0.9;
                        filter: brightness(1.5) drop-shadow(0 0 8px rgba(255,215,0,0.6));
                    }
                    85% {
                        transform: translate(calc(50vw - ${startX}px), calc(50vh - ${startY}px)) rotate(0deg) scale(0.2);
                        opacity: 0.5;
                        filter: brightness(2) drop-shadow(0 0 20px rgba(255,215,0,1));
                    }
                    100% {
                        transform: translate(calc(50vw - ${startX}px), calc(50vh - ${startY}px)) rotate(0deg) scale(0);
                        opacity: 0;
                        filter: brightness(3) drop-shadow(0 0 30px rgba(255,215,0,1));
                    }
                }
            `;
            
            const styleSheet = document.createElement('style');
            styleSheet.textContent = keyframes;
            document.head.appendChild(styleSheet);
            
            fragment.style.animation = `fragmentReverse${i} ${duration}s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${delay}s forwards`;
            
            fragmentsContainer.appendChild(fragment);
        }
        
    }

    // Esconder a logo inicial após 3 segundos
    setTimeout(() => {
        logoIntro.classList.add('hidden');
        
        // Mostrar o header fixo após a animação
        setTimeout(() => {
            header.classList.add('visible');
        }, 300);
    }, 3000);
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
// CARROSSEL DE DEPOIMENTOS MOBILE
// ============================================
let currentTestimonialSlide = 0;

function moveTestimonialCarousel(direction) {
    const track = document.getElementById('testimonial-carousel-track');
    const cards = track.querySelectorAll('.testimonial-card-compact');
    const totalSlides = cards.length;
    
    if (!track || totalSlides === 0) return;
    
    currentTestimonialSlide += direction;
    
    // Loop infinito
    if (currentTestimonialSlide < 0) {
        currentTestimonialSlide = totalSlides - 1;
    } else if (currentTestimonialSlide >= totalSlides) {
        currentTestimonialSlide = 0;
    }
    
    // Calcular offset para centralizar os cards
    const containerWidth = track.parentElement.offsetWidth;
    const cardWidth = cards[0] ? cards[0].offsetWidth : 260; // Largura real do card
    const gap = 20;
    const centerOffset = (containerWidth - cardWidth) / 2;
    const offset = -(currentTestimonialSlide * (cardWidth + gap)) + centerOffset - 15;
    
    track.style.transform = `translateX(${offset}px)`;
    
    // Atualizar dots
    updateCarouselDots();
}

function updateCarouselDots() {
    const dotsContainer = document.getElementById('testimonial-carousel-dots');
    if (!dotsContainer) return;
    
    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
        if (index === currentTestimonialSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function initCarouselDots() {
    const track = document.getElementById('testimonial-carousel-track');
    const dotsContainer = document.getElementById('testimonial-carousel-dots');
    
    if (!track || !dotsContainer) return;
    
    const cards = track.querySelectorAll('.testimonial-card-compact');
    const totalSlides = cards.length;
    
    // Criar dots
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot';
        if (i === 0) dot.classList.add('active');
        dot.onclick = () => {
            currentTestimonialSlide = i;
            const containerWidth = track.parentElement.offsetWidth;
            const cardWidth = cards[0].offsetWidth;
            const gap = 20;
            const centerOffset = (containerWidth - cardWidth) / 2;
            const offset = -(i * (cardWidth + gap)) + centerOffset - 15;
            track.style.transform = `translateX(${offset}px)`;
            updateCarouselDots();
            
            stopTestimonialCarousel();
            setTimeout(startTestimonialCarousel, 10000);
        };
        dotsContainer.appendChild(dot);
    }
    
    // Centralizar o primeiro card ao iniciar
    setTimeout(() => {
        const containerWidth = track.parentElement.offsetWidth;
        const cardWidth = cards[0].offsetWidth;
        const centerOffset = (containerWidth - cardWidth) / 2;
        track.style.transform = `translateX(${centerOffset - 15}px)`;
    }, 100);
}

// Auto-play do carrossel mobile
let testimonialCarouselInterval;

function startTestimonialCarousel() {
    testimonialCarouselInterval = setInterval(() => {
        moveTestimonialCarousel(1);
    }, 4000);
}

function stopTestimonialCarousel() {
    clearInterval(testimonialCarouselInterval);
}

// Inicializar carrossel mobile
document.addEventListener('DOMContentLoaded', () => {
    // Verificar se é mobile
    if (window.innerWidth <= 480) {
        initCarouselDots();
        startTestimonialCarousel();
        
        // Pausar ao interagir
        const navButtons = document.querySelectorAll('.carousel-nav-btn');
        navButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                stopTestimonialCarousel();
                setTimeout(startTestimonialCarousel, 10000);
            });
        });

        // Adicionar suporte a swipe
        const track = document.getElementById('testimonial-carousel-track');
        if (track) {
            let touchStartX = 0;
            let touchEndX = 0;

            track.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
                stopTestimonialCarousel();
            });

            track.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
                setTimeout(startTestimonialCarousel, 10000);
});

function handleSwipe() {
    const swipeThreshold = 50;
                const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
                        // Swipe left - próximo
                        moveTestimonialCarousel(1);
        } else {
                        // Swipe right - anterior
                        moveTestimonialCarousel(-1);
                    }
                }
            }
        }
    }
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
    
    // Prevenir scroll durante a animação inicial (explosão reversa)
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        document.body.style.overflow = 'auto';
    }, 3000);
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
