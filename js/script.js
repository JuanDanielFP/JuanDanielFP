// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Close mobile menu when clicking a link
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenu.classList.add('hidden');
    }
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link on Scroll
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

    // Update active state for both desktop and mobile nav
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
        link.classList.remove('active', 'text-primary', 'font-semibold');
        
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active', 'text-primary', 'font-semibold');
        }
    });
});

// Intersection Observer for Fade In Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in-element').forEach(element => {
    observer.observe(element);
});

// Skill Bar Animation
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-bar');
            
            skillBars.forEach(bar => {
                const targetWidth = bar.getAttribute('data-width');
                
                // Animate the width
                setTimeout(() => {
                    bar.style.width = targetWidth + '%';
                }, 100);
            });
            
            // Unobserve after animation
            skillObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe skill sections
document.querySelectorAll('.bg-white.p-6.rounded-lg.shadow-md').forEach(element => {
    if (element.querySelector('.skill-bar')) {
        skillObserver.observe(element);
    }
});

// Add scroll-to-top button
const createScrollTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'fixed bottom-8 right-8 bg-primary hover:bg-secondary text-white w-12 h-12 rounded-full shadow-lg hidden items-center justify-center transition transform hover:scale-110 z-50';
    button.id = 'scroll-top-btn';
    document.body.appendChild(button);

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.classList.remove('hidden');
            button.classList.add('flex');
        } else {
            button.classList.add('hidden');
            button.classList.remove('flex');
        }
    });
};

// Initialize scroll-to-top button
createScrollTopButton();

// Typing Effect for Hero Section (Optional)
const typingEffect = (element, texts, speed = 100) => {
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    const type = () => {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            element.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            element.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(type, 2000); // Pause before deleting
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

// Uncomment to enable typing effect on hero subtitle
// const heroSubtitle = document.querySelector('#home h2');
// if (heroSubtitle) {
//     const texts = [
//         'QA Engineer | Manual & Automation Testing Specialist',
//         'Banking & Financial Applications Expert',
//         '3+ Years of Quality Assurance Experience'
//     ];
//     typingEffect(heroSubtitle, texts);
// }

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Remove any loading overlays if present
    const loadingOverlay = document.querySelector('.loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.style.opacity = '0';
        setTimeout(() => {
            loadingOverlay.remove();
        }, 300);
    }
});

// Lazy Loading Images (if you add images)
const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    
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
    
    images.forEach(img => imageObserver.observe(img));
};

lazyLoadImages();

// Form Validation (if you add a contact form)
const validateForm = (formId) => {
    const form = document.getElementById(formId);
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            let isValid = true;
            
            Object.keys(data).forEach(key => {
                if (!data[key].trim()) {
                    isValid = false;
                    const input = form.querySelector(`[name="${key}"]`);
                    input.classList.add('border-red-500');
                } else {
                    const input = form.querySelector(`[name="${key}"]`);
                    input.classList.remove('border-red-500');
                }
            });
            
            if (isValid) {
                // Submit form or send data
                console.log('Form submitted:', data);
                alert('Thank you for your message! I will get back to you soon.');
                form.reset();
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }
};

// Initialize form validation if form exists
validateForm('contact-form');

// Copy to Clipboard Function
const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
        // Show success message
        const message = document.createElement('div');
        message.textContent = 'Copied to clipboard!';
        message.className = 'fixed top-20 right-8 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.style.opacity = '0';
            setTimeout(() => message.remove(), 300);
        }, 2000);
    });
};

// Add copy functionality to email/phone (optional)
document.querySelectorAll('[data-copy]').forEach(element => {
    element.style.cursor = 'pointer';
    element.addEventListener('click', () => {
        const textToCopy = element.dataset.copy || element.textContent;
        copyToClipboard(textToCopy);
    });
});

// Analytics Event Tracking (if you add Google Analytics)
const trackEvent = (category, action, label) => {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
};

// Track button clicks
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', () => {
        trackEvent('Navigation', 'Click', link.textContent);
    });
});

// Track external links
document.querySelectorAll('a[href^="http"]').forEach(link => {
    link.addEventListener('click', () => {
        trackEvent('External Link', 'Click', link.href);
    });
});

// Performance Optimization: Debounce scroll events
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Apply debounce to scroll handler
const handleScroll = debounce(() => {
    // Your scroll handling code here
    console.log('Scrolling...');
}, 100);

// window.addEventListener('scroll', handleScroll);

// Console message (optional - for fun!)
console.log('%c👋 Hello Developer!', 'color: #2563eb; font-size: 20px; font-weight: bold;');
console.log('%cInterested in the code? Check out my GitHub!', 'color: #6b7280; font-size: 14px;');
console.log('%c🚀 Built with Tailwind CSS', 'color: #8b5cf6; font-size: 14px;');

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio website loaded successfully! ✨');
});

// const darkModeToggle = document.getElementById('dark-mode-toggle');
// darkModeToggle.addEventListener('click', () => {
//     document.documentElement.classList.toggle('dark');
// });


document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".skill-bar").forEach(bar => {
     const value = bar.getAttribute("data-width");
        bar.style.width = value + "%";
    });
});

// Fungsi untuk membuka modal dengan animasi smooth
function openProjectModal(projectId) {
    const modal = document.getElementById('projectModal');
    const modalContent = document.getElementById('modalContent');
    const project = projectData[projectId];

    if (!project) return;

    // Generate HTML content dengan stagger animation
    let imagesHTML = '';
    project.images.forEach((image, index) => {
        imagesHTML += `
            <div class="mb-6 opacity-0" style="animation: fadeInUp 0.5s ease-out ${index * 0.1 + 0.3}s forwards;">
                <img src="${image.src}" 
                     alt="${image.caption}" 
                     class="w-full rounded-lg shadow-lg cursor-pointer hover:opacity-90 transition-all duration-300"
                     onclick="openImageFullscreen('${image.src}')"
                     onerror="this.src='https://via.placeholder.com/800x600?text=Image+Not+Found'">
                <p class="text-center text-gray-600 dark:text-gray-400 mt-2 text-sm">${image.caption}</p>
            </div>
        `;
    });

    let technologiesHTML = '';
    project.technologies.forEach((tech, index) => {
        technologiesHTML += `
            <span class="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm mr-2 mb-2 inline-block opacity-0" style="animation: fadeInUp 0.4s ease-out ${index * 0.05 + 0.2}s forwards;">${tech}</span>
        `;
    });

    modalContent.innerHTML = `
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4 opacity-0" style="animation: fadeInUp 0.5s ease-out forwards;">
            ${project.title}
        </h2>
        <p class="text-gray-600 dark:text-gray-300 mb-6 text-justify opacity-0" style="animation: fadeInUp 0.5s ease-out 0.1s forwards;">
            ${project.details}
        </p>
        
        <div class="mb-6 opacity-0" style="animation: fadeInUp 0.5s ease-out 0.15s forwards;">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">Technologies Used</h3>
            <div class="flex flex-wrap">
                ${technologiesHTML}
            </div>
        </div>

        <div class="mb-4 opacity-0" style="animation: fadeInUp 0.5s ease-out 0.2s forwards;">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Project Screenshots</h3>
            <div class="space-y-6">
                ${imagesHTML}
            </div>
        </div>
    `;

    // Show modal with smooth animation
    modal.classList.remove('hidden', 'closing');
    modal.classList.add('flex');
    
    // Trigger animation after a small delay to ensure proper rendering
    requestAnimationFrame(() => {
        modal.classList.add('show');
    });
    
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Fungsi untuk menutup modal dengan animasi smooth
function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    
    // Remove show class and add closing animation
    modal.classList.remove('show');
    modal.classList.add('closing');
    
    // Wait for animation to complete before hiding
    setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('flex', 'closing');
        document.body.style.overflow = 'auto'; // Restore scrolling
    }, 300); // Match with animation duration
}

// Variable to prevent multiple close calls
let isClosing = false;

// Enhanced close function with debounce
function closeProjectModalSmooth() {
    if (isClosing) return; // Prevent multiple calls
    
    isClosing = true;
    const modal = document.getElementById('projectModal');
    
    // Add closing animation
    modal.classList.remove('show');
    modal.classList.add('closing');
    
    // Wait for animation to complete
    setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('flex', 'closing');
        document.body.style.overflow = 'auto';
        isClosing = false; // Reset flag
    }, 350); // Slightly longer for smoother effect
}

// Close modal when clicking outside - IMPROVED
document.getElementById('projectModal').addEventListener('click', function(e) {
    // Only close if clicking the backdrop (not the modal content)
    if (e.target === this && !isClosing) {
        closeProjectModalSmooth();
    }
});

// Close modal with ESC key - IMPROVED
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' || e.key === 'Esc') {
        const modal = document.getElementById('projectModal');
        if (!modal.classList.contains('hidden') && !isClosing) {
            closeProjectModalSmooth();
        }
    }
});

// Prevent closing when clicking inside modal content
document.addEventListener('DOMContentLoaded', function() {
    const modalContent = document.querySelector('#projectModal > div');
    if (modalContent) {
        modalContent.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event bubbling to modal backdrop
        });
    }
});

// const container = document.getElementById('gallery');
// projectData.project1.images.forEach(item => {
//   const div = document.createElement('div');
//   div.innerHTML = `<h3>${item.caption}</h3>`;
  
//   if (Array.isArray(item.src)) {
//     // Jika src adalah array
//     item.src.forEach(imgSrc => {
//       const img = document.createElement('img');
//       img.src = imgSrc;
//       img.alt = item.caption;
//       img.style.width = '300px'; // atur ukuran
//       img.style.margin = '10px';
//       div.appendChild(img);
//     });
//   } else {
//     // Jika src string biasa
//     const img = document.createElement('img');
//     img.src = item.src;
//     img.alt = item.caption;
//     img.style.width = '300px';
//     div.appendChild(img);
//   }
  
//   container.appendChild(div);
// });