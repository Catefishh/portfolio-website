const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100; 
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(currentSection)) {
            link.classList.add('active');
        }
    });
});


const themeToggle = document.getElementById('theme-toggle');

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    let theme = 'light-theme';
    if (document.body.classList.contains('dark-theme')) {
        theme = 'dark-theme';
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    themeToggle.classList.add('rotate');
    setTimeout(() => themeToggle.classList.remove('rotate'), 300);
    localStorage.setItem('theme', theme);
}

themeToggle.addEventListener('click', toggleTheme);

const sections = document.querySelectorAll('section, header');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.6 });

sections.forEach(section => {
    observer.observe(section);
});

const skillsSection = document.getElementById('skills');
const progressBars = document.querySelectorAll('.progress');

const skillsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            progressBars.forEach(bar => {
                const targetWidth = bar.getAttribute('data-progress');
                bar.style.width = targetWidth;

                const level = bar.getAttribute('data-level');
                bar.classList.remove('progress-low', 'progress-medium', 'progress-high');
                if (level === 'low') {
                    bar.classList.add('progress-low');
                } else if (level === 'medium') {
                    bar.classList.add('progress-medium');
                } else if (level === 'high') {
                    bar.classList.add('progress-high');
                }
            });
            skillsObserver.unobserve(skillsSection);
        }
    });
}, { threshold: 0.5 });

skillsObserver.observe(skillsSection);

