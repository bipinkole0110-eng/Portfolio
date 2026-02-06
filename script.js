/*
 * JAVASCRIPT LOGIC
 * Silent Vibe: Parallax Background Interaction
 * Includes: Typing Effect, Scroll Reveal, Active Nav, Form Handling
 */

// --- 1. Interactive Parallax Background (The "Alive" but Silent feel) ---
const bgWrapper = document.getElementById('bg-wrapper');

document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    // Move background slightly opposite to mouse for depth
    // The values (20px, 40px) are small to keep it subtle/silent
    const moveX = (0.5 - x) * 40;
    const moveY = (0.5 - y) * 40;

    bgWrapper.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

// --- 2. Typing Effect (Slowed down for silent vibe) ---
const typingText = document.getElementById('typing-text');
const words = ["Programmer", "Web Developer", "Tech Enthusiast"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];
   
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    // Slower typing speeds for a calmer feel
    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500; // Pause before new word
    }
   
    setTimeout(typeEffect, typeSpeed);
}

document.addEventListener('DOMContentLoaded', typeEffect);

// --- 3. Scroll Reveal Animation ---
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));

// --- 4. Skill Bar Animation ---
const skillSection = document.getElementById('skills');
const progressBars = document.querySelectorAll('.skill-progress');
let animated = false;

const skillObserver = new IntersectionObserver((entries) => {
    if(entries[0].isIntersecting && !animated) {
        progressBars.forEach(bar => {
            const value = bar.getAttribute('data-width');
            bar.style.width = value;
        });
        animated = true;
    }
});

skillObserver.observe(skillSection);

// --- 5. Active Navigation on Scroll ---
const sections = document.querySelectorAll('section');
const navLi = document.querySelectorAll('nav .nav-links li a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLi.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').includes(current)) {
            a.classList.add('active');
        }
    });
});

// --- 6. Mobile Menu Toggle ---
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    hamburger.classList.toggle('toggle');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('nav-active');
    });
});

// --- 7. Form Handling ---
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const toast = document.getElementById('toast');
    toast.className = "show";
   
    setTimeout(() => {
        toast.className = toast.className.replace("show", "");
        this.reset();
    }, 3000);
});
