// --- Preloader / Welcome Intro ---
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.transition = 'opacity 1s ease-in-out, visibility 1s';
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            
            // GSAP Intro Animations
            if (typeof gsap !== 'undefined') {
                const tl = gsap.timeline();
                tl.from('.navbar', { y: -100, opacity: 0, duration: 1, ease: 'power4.out' })
                  .from('.hero-greeting', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' }, '-=0.5')
                  .from('.hero-name', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' }, '-=0.6')
                  .from('.hero-title', { opacity: 0, scale: 0.8, duration: 0.8, ease: 'back.out(1.7)' }, '-=0.6')
                  .from('.hero-tagline', { opacity: 0, duration: 1 }, '-=0.4')
                  .from('.hero-btns', { opacity: 0, y: 20, duration: 0.8, stagger: 0.2 }, '-=0.6')
                  .from('.hero-img-container', { opacity: 0, scale: 0.5, duration: 1.2, ease: 'elastic.out(1, 0.5)' }, '-=1');
            }
        }, 4000); // Wait for SVG animation to complete
    }
});

// --- Initialize AOS (Animate on Scroll) ---
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: false,
    mirror: true
});

// --- Typed.js Animation ---
if (document.getElementById('typed-text')) {
    new Typed('#typed-text', {
        strings: [
            'Aspiring AI Engineer',
            'Python Enthusiast',
            'Full Stack Developer',
            'Machine Learning Specialist',
            'Problem Solver'
        ],
        typeSpeed: 60,
        backSpeed: 40,
        loop: true,
        backDelay: 1500
    });
}

// --- Particles.js Configuration ---
if (document.getElementById('particles-js')) {
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": { "enable": true, "value_area": 800 }
            },
            "color": { "value": ["#00e5ff", "#7000ff"] },
            "shape": { "type": "circle" },
            "opacity": {
                "value": 0.5,
                "random": true,
                "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": { "enable": true, "speed": 4, "size_min": 0.3, "sync": false }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#00e5ff",
                "opacity": 0.2,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": { "enable": true, "mode": "grab" },
                "onclick": { "enable": true, "mode": "push" },
                "resize": true
            },
            "modes": {
                "grab": { "distance": 140, "line_linked": { "opacity": 1 } },
                "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3 },
                "repulse": { "distance": 200, "duration": 0.4 },
                "push": { "particles_nb": 4 },
                "remove": { "particles_nb": 2 }
            }
        },
        "retina_detect": true
    });
}

// --- Scroll Progress & Navbar Behavior ---
const scrollProgress = document.getElementById('scroll-progress');
// --- GSAP Gallery Scroller Animation ---
if (typeof gsap !== 'undefined') {
    // Dynamic 'Peak Zoom', 'Tilt' and 'Depth' Effect on Scroll
    gsap.utils.toArray('.scroller-slide').forEach((slide, i) => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: slide,
                start: "top 110%", // Start when just below viewport
                end: "bottom -10%", // End when just above viewport
                scrub: 1.5
            }
        });

        tl.fromTo(slide, 
            { 
                scale: 0.8, 
                opacity: 1, // Full visibility from start
                y: (i % 2 === 0 ? 80 : -80),
                rotation: -15 
            },
            { 
                scale: 1.35, // Larger peak scale
                opacity: 1,  // Stay bright
                y: 0,
                rotation: 0,
                duration: 0.5 
            }
        ).to(slide, {
            scale: 0.8,
            opacity: 1, // Stay bright till the end
            y: (i % 2 === 0 ? -80 : 80),
            rotation: 15,
            duration: 0.5
        });
    });
    
    // Smooth Tilt of the whole container on scroll
    gsap.to('.scroller-container', {
        rotation: -15, // Dynamic peak angle
        scrollTrigger: {
            trigger: '.gallery-scroller',
            start: "top center", 
            end: "bottom top",   
            scrub: 1.2
        }
    });
}

const navbar = document.querySelector('.navbar');

// --- Mobile Menu Toggle ---
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li a');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
        hamburger.setAttribute('aria-expanded', !expanded);
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('overflow-hidden');
    });
}

navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('overflow-hidden');
    });
});

window.addEventListener('scroll', () => {
    // Progress Bar
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = (window.pageYOffset / totalHeight) * 100;
    scrollProgress.style.width = `${scrollPercentage}%`;

    // Navbar background on scroll
    if (window.scrollY > 50) {
        navbar.classList.add('glass-scrolled');
        navbar.style.height = '65px';
    } else {
        navbar.classList.remove('glass-scrolled');
        navbar.style.height = '80px';
    }
});

// --- Chatbot Logic ---
const chatToggle = document.getElementById('chat-toggle');
const chatWindow = document.getElementById('chat-window');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');
const closeChat = document.getElementById('close-chat');

const botResponses = {
    "hello": "Hello! I'm Gowthama's AI assistant. How can I help you?",
    "projects": "He has worked on several exciting projects including a SIH winning Lunar Crater enhancement tool and an AI Polyglot Dictionary. Which one would you like to know more about?",
    "skills": "Gowthama is proficient in Python, Machine Learning (Pandas, Scikit-learn), Flask, Django, and MERN stack.",
    "experience": "He has completed internships at WebGen Technology, CodeSoft, and Prodigy InfoTech.",
    "education": "He is currently a B.E. student in Computer Science & Technology at SNS College of Engineering (2023-2027).",
    "contact": "You can reach him via the contact form or email at gowthama.shanmugam@example.com",
    "resume": "You can download his resume by clicking the 'Download Resume' button in the Hero section!",
    "default": "That's a great question! For specific inquiries, I recommend using the contact form at the bottom of the page."
};

function appendMessage(sender, text) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    msgDiv.textContent = text;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function handleChat() {
    const input = chatInput.value.toLowerCase().trim();
    if (!input) return;

    appendMessage('user', chatInput.value);
    chatInput.value = '';

    setTimeout(() => {
        let response = botResponses.default;
        for (const key in botResponses) {
            if (input.includes(key)) {
                response = botResponses[key];
                break;
            }
        }
        appendMessage('bot', response);
    }, 600);
}

chatToggle.addEventListener('click', () => {
    chatWindow.classList.toggle('active');
});

closeChat.addEventListener('click', () => {
    chatWindow.classList.remove('active');
});

chatSend.addEventListener('click', handleChat);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleChat();
});

// --- Contact Form Handling (Mock) ---
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const originalText = btn.textContent;
        
        btn.textContent = 'Sending...';
        btn.disabled = true;
 
        setTimeout(() => {
            btn.textContent = 'Message Sent! ✅';
            btn.style.background = '#10b981';
            contactForm.reset();
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                btn.disabled = false;
            }, 3000);
        }, 1500);
    });
}
 
// --- Smooth Scroll for anchor links ---
const smoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
};
smoothScroll();

// --- High Performance Parallax (Apple Style) ---
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            
            const heroContent = document.querySelector('.hero-content');
            if (heroContent && scrolled < window.innerHeight) {
                const fadeFactor = 1 - (scrolled / (window.innerHeight * 0.8));
                const moveFactor = scrolled * 0.35;
                const scaleFactor = 1 - (scrolled / (window.innerHeight * 2));
                
                heroContent.style.opacity = Math.max(fadeFactor, 0);
                heroContent.style.transform = `translate3d(0, ${moveFactor}px, 0) scale(${Math.max(scaleFactor, 0.8)})`;
                heroContent.style.filter = `blur(${scrolled / 50}px)`;
            }

            const statCards = document.querySelectorAll('.stat-card');
            statCards.forEach((card, i) => {
                const rect = card.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const speed = 0.05 + (i * 0.02);
                    const shift = (window.innerHeight - rect.top) * speed;
                    card.style.transform = `translateY(${-shift}px)`;
                }
            });

            ticking = false;
        });
        ticking = true;
    }
});

// --- Skills Animation (Filling Bars & Counting Numbers) ---
const skillSection = document.getElementById('skills');
const progressBars = document.querySelectorAll('.progress');
const skillNumbers = document.querySelectorAll('.skill-number');

const animateSkills = () => {
    progressBars.forEach(bar => {
        bar.style.width = bar.getAttribute('data-width');
    });

    skillNumbers.forEach(num => {
        const target = +num.getAttribute('data-target');
        const updateCount = () => {
            const current = +num.innerText;
            const increment = Math.max(target / 50, 1);
            if (current < target) {
                num.innerText = Math.min(Math.ceil(current + increment), target);
                setTimeout(updateCount, 25);
            }
        };
        updateCount();
    });
};

if (skillSection) {
    const skillObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateSkills();
            skillObserver.unobserve(skillSection);
        }
    }, { threshold: 0.2 });
    skillObserver.observe(skillSection);
}
const cursor = document.getElementById('cursor');
if (cursor) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate(${e.clientX - 12}px, ${e.clientY - 12}px)`;
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => cursor.style.opacity = '0');
    document.addEventListener('mouseenter', () => cursor.style.opacity = '0.6');
}

// --- AI Voice Bio ---
const voiceBtn = document.getElementById('voice-bio');
if (voiceBtn) {
    voiceBtn.addEventListener('click', () => {
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            voiceBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i> AI Voice Intro';
            return;
        }

        const text = "Hi, I am Gowthama Shanmugam V, an aspiring AI Engineer. I build intelligent solutions with real world impact using Python, Machine Learning, and Full Stack technologies. Welcome to my portfolio!";
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Find a professional voice if available
        const voices = window.speechSynthesis.getVoices();
        utterance.voice = voices.find(v => v.name.includes('Google') || v.name.includes('Female')) || voices[0];
        
        utterance.rate = 1;
        utterance.pitch = 1;
        window.speechSynthesis.speak(utterance);
        
        voiceBtn.innerHTML = '<i class="fa-solid fa-microphone-lines"></i> Speaking...';
        utterance.onend = () => {
            voiceBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i> AI Voice Intro';
        };
    });
}
const horizontalSections = document.querySelectorAll('.edu-new-grid, .skills-wrapper, .projects-grid');
horizontalSections.forEach(section => {
    section.addEventListener('wheel', (e) => {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
            const canScrollLeft = section.scrollLeft > 0;
            const canScrollRight = section.scrollLeft < (section.scrollWidth - section.clientWidth - 10);
            
            if ((e.deltaY > 0 && canScrollRight) || (e.deltaY < 0 && canScrollLeft)) {
                e.preventDefault();
                section.scrollBy({ left: e.deltaY * 2.5 });
            }
        }
    }, { passive: false });
});

// --- Dark/Light Mode Toggle ---
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle?.querySelector('i');

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        
        if (themeIcon) {
            themeIcon.classList.toggle('fa-sun', !isLight);
            themeIcon.classList.toggle('fa-moon', isLight);
        }
    });

    // Check preference
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-theme');
        if (themeIcon) {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        }
    }
}

// --- Education Modal / Popup Logic ---
const eduModal = document.getElementById('edu-modal');
const closeEduModal = document.getElementById('close-edu-modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');

document.querySelectorAll('.open-edu-popup, .edu-inst-img').forEach(el => {
    el.style.cursor = 'pointer';
    el.addEventListener('click', () => {
        if (eduModal) {
            eduModal.classList.remove('image-only'); // Reset mode
            
            if (el.classList.contains('edu-inst-img')) {
                // Image-only mode
                eduModal.classList.add('image-only');
                modalImg.src = el.src;
            } else {
                // Details mode (Image left, words right)
                modalTitle.textContent = el.getAttribute('data-title');
                modalDesc.textContent = el.getAttribute('data-details');
                modalImg.src = el.getAttribute('data-img');
            }
            eduModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

if (closeEduModal) {
    closeEduModal.addEventListener('click', () => {
        eduModal.classList.remove('active');
        document.body.style.overflow = '';
    });
}

window.addEventListener('click', (e) => {
    if (e && e.target === eduModal) {
        eduModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});
