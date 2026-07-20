const initMobileMenu = () => {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (!mobileMenuBtn || !mobileMenu) return;

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    document.addEventListener('click', (event) => {
        if (!mobileMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
            mobileMenu.classList.add('hidden');
        }
    });
};

const initSmoothScrolling = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (event) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                event.preventDefault();
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });
};

const initActiveNavLinks = () => {
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
            link.classList.remove('active', 'text-primary', 'font-semibold');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active', 'text-primary', 'font-semibold');
            }
        });
    });
};

const initScrollAnimations = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-element').forEach(element => {
        fadeObserver.observe(element);
    });

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.skill-bar').forEach(bar => {
                    const targetWidth = bar.dataset.width;
                    setTimeout(() => {
                        bar.style.width = `${targetWidth}%`;
                    }, 100);
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.skill-card, .bg-white.p-6.rounded-lg.shadow-md').forEach(element => {
        if (element.querySelector('.skill-bar')) {
            skillObserver.observe(element);
        }
    });
};

const initScrollTopButton = () => {
    const button = document.createElement('button');
    button.id = 'scroll-top-btn';
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.style.cssText = 'position:fixed;bottom:2rem;right:2rem;width:3rem;height:3rem;border-radius:50%;color:#fff;display:none;align-items:center;justify-content:center;z-index:50;border:none;cursor:pointer;font-size:1rem;';
    document.body.appendChild(button);

    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.style.display = 'flex';
        } else {
            button.style.display = 'none';
        }
    });
};

const typingEffect = (element, texts, speed = 100) => {
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const type = () => {
        const currentText = texts[textIndex];
        if (isDeleting) {
            element.textContent = currentText.substring(0, charIndex - 1);
            charIndex -= 1;
        } else {
            element.textContent = currentText.substring(0, charIndex + 1);
            charIndex += 1;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(type, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, isDeleting ? speed / 2 : speed);
        }
    };

    type();
};

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    const loadingOverlay = document.querySelector('.loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.style.opacity = '0';
        setTimeout(() => loadingOverlay.remove(), 300);
    }
});

const initLazyLoadImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
};

const trackEvent = (category, action, label) => {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
};

const initAnalyticsTracking = () => {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', () => trackEvent('Navigation', 'Click', link.textContent));
    });

    document.querySelectorAll('a[href^="http"]').forEach(link => {
        link.addEventListener('click', () => trackEvent('External Link', 'Click', link.href));
    });
};

const debugLog = () => {
    console.log('%c👋 Hello Developer!', 'color: #2563eb; font-size: 20px; font-weight: bold;');
    console.log('%cInterested in the code? Check out my GitHub!', 'color: #6b7280; font-size: 14px;');
    console.log('%c🚀 Built with Tailwind CSS', 'color: #8b5cf6; font-size: 14px;');
};

const setSkillBars = () => {
    document.querySelectorAll('.skill-bar').forEach(bar => {
        const value = bar.dataset.width;
        bar.style.width = `${value}%`;
    });
};

const allProjectsData = {
    project1: {
        title: 'Qlola Platform',
        details: 'Validated UI/UX, Customer Data Security, Payment Processing, Transaction Limits, Midnight Batch Processing, and Negative Scenarios. Verified complete website redesign from Figma specifications ensuring functional integrity.',
        technologies: ['Manual Testing', 'Postman', 'MySQL', 'Jira'],
        images: [
            { src: 'images/BRI/Dashboard-Qlola-1.jpeg', caption: 'Dashboard Overview' },
            { src: 'images/BRI/Dashboard-Qlola-2.jpeg', caption: 'Payment Processing Interface' },
            { src: 'images/BRI/Test-Case-1.jpg', caption: 'Test Case' },
            { src: 'images/BRI/Bug-List-1.jpg', caption: 'Bug List' },
            { src: 'images/BRI/Jira-Issue-1.jpg', caption: 'Report Bug' },
            { src: 'images/BRI/Confluence-1.jpg', caption: 'Evidence' },
            { src: 'images/BRI/Figma-1.jpg', caption: 'Figma' }
        ]
    },
    project2: {
        title: 'U-Infinity Web',
        details: 'Validated tax payment and BIFAST features using NIK/NPWP with real-time transaction history. Modern E2E testing framework for web applications with comprehensive test coverage and reporting.',
        technologies: ['Manual Testing', 'MySQL', 'AS400'],
        images: [
            { src: 'images/UOB/Dashboard-1.png', caption: 'Dashboard Overview' },
            { src: 'images/UOB/Dashboard-3.png', caption: 'Payment Processing Interface' },
            { src: 'images/UOB/Status-Trx-PSIAP-1.png', caption: 'History Transaction' },
            { src: 'images/UOB/Log-AS400-1.png', caption: 'Dashboard Check Log' },
            { src: 'images/UOB/Log-AS400-2.png', caption: 'Menu Log' }
        ]
    },
    project3: {
        title: 'U-4Trade Core Banking',
        details: 'Developed test scenarios for payment gateway and enhanced test coverage. Tested payment transactions via FTP/FTPS, analyzing processing capacity and performance.',
        technologies: ['Manual Testing', 'MySQL', 'AS400'],
        images: [
            { src: 'images/UOB/Dashboard-2.png', caption: 'Dashboard Overview' },
            { src: 'images/UOB/BI-FAST-3.png', caption: 'Payment Processing Interface' },
            { src: 'images/UOB/Status-Trx-PSIAP-1.png', caption: 'History Transaction' },
            { src: 'images/UOB/Log-AS400-1.png', caption: 'Dashboard Check Log' },
            { src: 'images/UOB/Log-AS400-2.png', caption: 'Menu Log' }
        ]
    },
    project4: {
        title: 'Credit Card/ATM Simulator',
        details: 'Test cases for electronic money system including reader validation and transaction flow testing.',
        technologies: ['Manual Testing', 'ATM Simulator', 'Excel'],
        images: [
            { src: 'images/BNI/ATM-1.jpg', caption: 'Dashboard ATM Simulator' },
            { src: 'images/BNI/ATM-2.jpg', caption: 'Process Topup E-Money' },
            { src: 'images/BNI/ATM-4.jpg', caption: 'Card Testing E-Money' },
            { src: 'images/BNI/ATM-Struk-1.jpg', caption: 'Transaction ATM Struck Success' },
            { src: 'images/BNI/Defect-1.jpg', caption: 'Defect List' }
        ]
    },
    project5: {
        title: 'Tapcash/E-Money',
        details: 'Validated NFC e-money chip payment and Tapcash GO integration.',
        technologies: ['Manual Testing', 'E-Money', 'EDC'],
        images: [
            { src: 'images/BNI/EDC-2.jpg', caption: 'Tap Card E-Money' },
            { src: 'images/BNI/EDC-3.jpg', caption: 'Balance Card' },
            { src: 'images/BNI/EDC-4.jpg', caption: 'Process Purchase' },
            { src: 'images/BNI/EDC-1.jpg', caption: 'Purchase Success' }
        ]
    },
    project6: {
        title: 'Mobile Banking BNI',
        details: 'Ensured real-time feature updates and data synchronization for cross-platform testing (Android, iOS, Huawei).',
        technologies: ['Manual Testing', 'Excel', 'E-Money', 'Mobile Banking'],
        images: [
            { src: 'images/BNI/Mbanking-2.jpg', caption: 'Dashboard Mobile Banking' },
            { src: 'images/BNI/Mbanking-1.jpg', caption: 'Last History E-Money' },
            { src: 'images/BNI/Test-Case-1.jpg', caption: 'Test Case Mbanking' },
            { src: 'images/BNI/Test-Case-1-Mbanking.jpg', caption: 'Test Case Mbanking' },
            { src: 'images/BNI/Defect-1-Mbanking.jpg', caption: 'Defect Mbanking' },
            { src: 'images/BNI/Defect-2.jpg', caption: 'Defect Mbanking' }
        ]
    },
    project7: {
        title: 'Web Automation',
        details: 'Selenium Webdriver testing using Mocha with Mochawesome reports. Login, Sort Items, Used Hooks, Cross Browser, Generate Reports (.html), Configurate Credential (.env).',
        technologies: ['Selenium', 'Mocha', 'Javascript'],
        images: [
            { src: 'images/BRI/Dashboard-Qlola-1.jpeg', caption: 'Dashboard Overview' },
            { src: 'images/BRI/Dashboard-Qlola-2.jpeg', caption: 'Payment Processing Interface' },
            { src: 'images/BRI/Test-Case-1.jpg', caption: 'Test Case' },
            { src: 'images/BRI/Bug-List-1.jpg', caption: 'Bug List' },
            { src: 'images/BRI/Jira-Issue-1.jpg', caption: 'Report Bug' },
            { src: 'images/BRI/Confluence-1.jpg', caption: 'Evidence' },
            { src: 'images/BRI/Figma-1.jpg', caption: 'Figma' }
        ]
    }
};

const openImageFullscreen = (src) => {
    const fullscreenDiv = document.createElement('div');
    fullscreenDiv.className = 'fullscreen-overlay fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-[60] p-4 cursor-pointer';
    fullscreenDiv.innerHTML = `
        <button class="absolute top-4 right-4 text-white text-4xl font-bold hover:text-gray-300 hover:rotate-90 transition-all duration-300 bg-gray-800 bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center">&times;</button>
        <img src="${src}" class="max-w-full max-h-full object-contain rounded-lg shadow-2xl" alt="Fullscreen Image">
        <p class="absolute bottom-4 text-white text-sm bg-black bg-opacity-50 px-4 py-2 rounded-full">Click anywhere to close</p>
    `;

    fullscreenDiv.addEventListener('click', () => {
        fullscreenDiv.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => document.body.removeChild(fullscreenDiv), 300);
    });

    document.body.appendChild(fullscreenDiv);
};

const openProjectModal = (projectId) => {
    const modal = document.getElementById('universalProjectModal');
    const modalContent = document.getElementById('universalModalContent');
    const project = allProjectsData[projectId];

    if (!modal || !modalContent || !project) return;

    const imagesHTML = project.images.map((image) => `
        <div class="mb-6 modal-fade-in">
            <img src="${image.src}" alt="${image.caption}" class="project-image w-full rounded-lg cursor-pointer transition-all duration-300" style="border:1px solid rgba(139,92,246,0.18);box-shadow:0 4px 20px rgba(0,0,0,0.4);" data-src="${image.src}" onmouseover="this.style.opacity='0.88';this.style.transform='scale(1.01)'" onmouseout="this.style.opacity='1';this.style.transform='scale(1)'">
            <p style="text-align:center;color:#64748b;font-size:0.82rem;margin-top:8px;">${image.caption}</p>
        </div>
    `).join('');

    const technologiesHTML = project.technologies.map((tech) => `
        <span style="background:rgba(59,130,246,0.14);color:#3b82f6;border:1px solid rgba(59,130,246,0.3);border-radius:99px;padding:4px 14px;font-size:0.78rem;font-weight:600;margin-right:8px;margin-bottom:8px;display:inline-block;" class="modal-fade-in">${tech}</span>
    `).join('');

    modalContent.innerHTML = `
        <h2 style="font-size:1.8rem;font-weight:800;font-family:'Space Grotesk',sans-serif;background:linear-gradient(135deg,#3b82f6,#8b5cf6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:12px;" class="modal-fade-in">${project.title}</h2>
        <p style="color:#94a3b8;line-height:1.8;text-align:justify;margin-bottom:24px;" class="modal-fade-in">${project.details}</p>
        <div style="margin-bottom:24px;" class="modal-fade-in">
            <h3 style="color:#f1f5f9;font-weight:700;font-size:1rem;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:12px;opacity:0.7;">Technologies Used</h3>
            <div style="display:flex;flex-wrap:wrap;gap:4px;">${technologiesHTML}</div>
        </div>
        <div class="modal-fade-in">
            <h3 style="color:#f1f5f9;font-weight:700;font-size:1rem;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:16px;opacity:0.7;">Project Evidence</h3>
            <div>${imagesHTML}</div>
        </div>
    `;

    requestAnimationFrame(() => {
        modal.classList.remove('hidden', 'closing');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    });
};

const closeProjectModal = () => {
    const modal = document.getElementById('universalProjectModal');
    const modalContent = document.getElementById('universalModalContent');
    if (!modal) return;

    modal.classList.add('closing');
    
    setTimeout(() => {
        // Clear all content immediately
        modalContent.innerHTML = '';
        modal.classList.add('hidden');
        modal.classList.remove('flex', 'closing');
        document.body.style.overflow = 'auto';
    }, 300);
};

const initProjectModal = () => {
    const universalProjectModal = document.getElementById('universalProjectModal');
    const modalContent = document.getElementById('universalModalContent');
    const projectOpenButtons = document.querySelectorAll('[data-project-id]');
    const modalCloseButtons = document.querySelectorAll('[data-close-modal]');

    projectOpenButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const projectId = button.dataset.projectId;
            if (projectId) openProjectModal(projectId);
        });
    });

    modalCloseButtons.forEach((button) => {
        button.addEventListener('click', closeProjectModal);
    });

    if (universalProjectModal) {
        universalProjectModal.addEventListener('click', (event) => {
            if (event.target === universalProjectModal) closeProjectModal();
        });
    }

    // Event delegation for image clicks - single listener instead of many
    if (modalContent) {
        modalContent.addEventListener('click', (event) => {
            const img = event.target.closest('.project-image');
            if (img && img.dataset.src) {
                openImageFullscreen(img.dataset.src);
            }
        });
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && universalProjectModal && !universalProjectModal.classList.contains('hidden')) {
            closeProjectModal();
        }
    });
};

const initPortfolio = () => {
    initMobileMenu();
    initSmoothScrolling();
    initActiveNavLinks();
    initScrollAnimations();
    initScrollTopButton();
    initLazyLoadImages();
    initAnalyticsTracking();
    setSkillBars();
    debugLog();
    initProjectModal();

    // Typing effect in hero
    const typedEl = document.getElementById('typed-role');
    if (typedEl) {
        typingEffect(typedEl, [
            'QA Engineer',
            'Manual Tester',
            'Automation Specialist',
            'API Testing Expert',
            'Banking QA Expert'
        ], 80);
    }

    // Hide loading overlay
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 0.5s ease';
        setTimeout(() => overlay.remove(), 500);
    }
};

document.addEventListener('DOMContentLoaded', initPortfolio);
