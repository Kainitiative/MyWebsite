/* ============================================================
   PATRICK RYAN WEB DESIGN - MAIN JAVASCRIPT
   ============================================================
   
   This file handles all the interactive features of the website.
   
   FEATURES:
   1. Mobile Menu Toggle
   2. Dark Mode Toggle
   3. Sticky Header Effects
   4. Back to Top Button
   5. Cookie Banner
   6. Contact Form Validation
   7. Portfolio Filtering
   8. Portfolio Modal/Preview
   9. Mobile CTA Bar Visibility
   
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ============================================================
       1. MOBILE MENU TOGGLE
       Shows/hides the navigation menu on mobile devices
       ============================================================ */
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const siteNav = document.querySelector('.site-nav');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            siteNav.classList.toggle('active');
            const isExpanded = siteNav.classList.contains('active');
            mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
        });

        // Close menu when clicking a navigation link
        document.querySelectorAll('.site-nav a').forEach(link => {
            link.addEventListener('click', () => {
                siteNav.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    /* ============================================================
       3. STICKY HEADER EFFECTS
       Adds shadow to header when scrolling
       Highlights active section in navigation
       ============================================================ */
    const header = document.querySelector('.site-header');
    const sections = document.querySelectorAll('section[id]');
    
    function handleScroll() {
        // Add shadow to header when scrolled
        if (window.scrollY > 50) {
            header.style.boxShadow = 'var(--shadow-md)';
        } else {
            header.style.boxShadow = 'none';
        }

        // Highlight active section in navigation
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.site-nav a').forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current) && current !== '') {
                a.classList.add('active');
            }
        });

        // Back to top button visibility
        const backToTop = document.getElementById('back-to-top');
        if (backToTop) {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }
    }

    window.addEventListener('scroll', handleScroll);

    /* ============================================================
       4. BACK TO TOP BUTTON
       Smooth scrolls to top when clicked
       ============================================================ */
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* ============================================================
       5. COOKIE BANNER
       Shows cookie consent banner if no preference saved
       Saves preference to localStorage
       ============================================================ */
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookies = document.getElementById('accept-cookies');
    const rejectCookies = document.getElementById('reject-cookies');

    // Show banner if no preference saved
    if (cookieBanner && !localStorage.getItem('cookies-preference')) {
        cookieBanner.hidden = false;
    }

    if (acceptCookies) {
        acceptCookies.addEventListener('click', () => {
            localStorage.setItem('cookies-preference', 'accepted');
            cookieBanner.hidden = true;
            // You can load analytics scripts here after consent
            // loadAnalytics();
        });
    }

    if (rejectCookies) {
        rejectCookies.addEventListener('click', () => {
            localStorage.setItem('cookies-preference', 'rejected');
            cookieBanner.hidden = true;
        });
    }

    /* ============================================================
       6. CONTACT FORM VALIDATION
       Real-time validation with user-friendly error messages
       ============================================================ */
    const form = document.getElementById('contactForm');
    
    if (form) {
        const nameInput = document.getElementById('name');
        const phoneInput = document.getElementById('phone');
        const emailInput = document.getElementById('email');

        // Validation functions
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

        function validatePhone(phone) {
            // Allow various phone formats (Irish and international)
            const cleaned = phone.replace(/[\s\-\(\)]/g, '');
            return cleaned.length >= 10;
        }

        function showError(input, errorElement) {
            input.classList.add('error');
            if (errorElement) {
                errorElement.classList.add('visible');
            }
        }

        function hideError(input, errorElement) {
            input.classList.remove('error');
            if (errorElement) {
                errorElement.classList.remove('visible');
            }
        }

        // Real-time validation on blur (when leaving field)
        if (nameInput) {
            nameInput.addEventListener('blur', () => {
                const errorEl = document.querySelector('[data-error="name"]');
                if (nameInput.value.trim() === '') {
                    showError(nameInput, errorEl);
                } else {
                    hideError(nameInput, errorEl);
                }
            });
        }

        if (phoneInput) {
            phoneInput.addEventListener('blur', () => {
                const errorEl = document.querySelector('[data-error="phone"]');
                if (!validatePhone(phoneInput.value)) {
                    showError(phoneInput, errorEl);
                } else {
                    hideError(phoneInput, errorEl);
                }
            });
        }

        if (emailInput) {
            emailInput.addEventListener('blur', () => {
                const errorEl = document.querySelector('[data-error="email"]');
                if (!validateEmail(emailInput.value)) {
                    showError(emailInput, errorEl);
                } else {
                    hideError(emailInput, errorEl);
                }
            });
        }

        // Clear error when user starts typing
        [nameInput, phoneInput, emailInput].forEach(input => {
            if (input) {
                input.addEventListener('input', () => {
                    const fieldName = input.id;
                    const errorEl = document.querySelector(`[data-error="${fieldName}"]`);
                    hideError(input, errorEl);
                });
            }
        });

        // Form submission
        form.addEventListener('submit', (e) => {
            let hasErrors = false;

            // Validate name
            const nameError = document.querySelector('[data-error="name"]');
            if (nameInput && nameInput.value.trim() === '') {
                showError(nameInput, nameError);
                hasErrors = true;
            }

            // Validate phone
            const phoneError = document.querySelector('[data-error="phone"]');
            if (phoneInput && !validatePhone(phoneInput.value)) {
                showError(phoneInput, phoneError);
                hasErrors = true;
            }

            // Validate email
            const emailError = document.querySelector('[data-error="email"]');
            if (emailInput && !validateEmail(emailInput.value)) {
                showError(emailInput, emailError);
                hasErrors = true;
            }

            // Prevent submission if errors
            if (hasErrors) {
                e.preventDefault();
                // Scroll to first error
                const firstError = form.querySelector('.error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    firstError.focus();
                }
                return;
            }

            // Form will be submitted to send-mail.php which handles the email
        });
    }

    /* ============================================================
       7. PORTFOLIO FILTERING
       Filters portfolio items by category
       ============================================================ */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Show/hide cards based on filter
            portfolioCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    /* ============================================================
       8. PORTFOLIO MODAL / PREVIEW
       Opens a modal with an iframe preview of portfolio sites
       ============================================================ */
    const modal = document.getElementById('portfolioModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalNewTab = document.getElementById('modalNewTab');
    const modalClose = document.getElementById('modalClose');
    const previewFrame = document.getElementById('previewFrame');
    const iframeLoader = document.getElementById('iframeLoader');
    const iframeError = document.getElementById('iframeError');
    const errorNewTab = document.getElementById('errorNewTab');

    // Open modal with site preview
    function openModal(url, title) {
        modalTitle.textContent = title;
        modalNewTab.href = url;
        errorNewTab.href = url;
        previewFrame.src = '';
        iframeLoader.style.display = 'block';
        iframeError.style.display = 'none';
        previewFrame.style.display = 'none';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Load the iframe
        previewFrame.src = url;
        
        // Handle successful load
        previewFrame.onload = function() {
            iframeLoader.style.display = 'none';
            previewFrame.style.display = 'block';
        };

        // Timeout for sites that block iframe embedding
        setTimeout(() => {
            if (iframeLoader.style.display !== 'none') {
                iframeLoader.style.display = 'none';
                iframeError.style.display = 'block';
            }
        }, 5000);
    }

    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        previewFrame.src = '';
        document.body.style.overflow = '';
    }

    // Click handlers for portfolio cards
    portfolioCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Open modal when clicking preview button or image
            if (e.target.closest('.preview-btn') || e.target.closest('.portfolio-img')) {
                const url = card.dataset.url;
                const title = card.dataset.title;
                openModal(url, title);
            }
        });
    });

    // Close modal handlers
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modal) {
        // Close when clicking outside modal content
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });

    /* ============================================================
       9. MOBILE CTA BAR VISIBILITY
       Hides the mobile CTA bar when at bottom of page
       (optional enhancement)
       ============================================================ */
    const mobileCta = document.getElementById('mobileCta');
    
    if (mobileCta) {
        // Show/hide based on scroll position (optional)
        // Currently always visible on mobile
    }

    /* ============================================================
       SMOOTH SCROLL FOR ANCHOR LINKS
       Ensures smooth scrolling works for all anchor links
       ============================================================ */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    /* ============================================================
       LAZY LOADING IMAGES (Performance)
       Native lazy loading is used via HTML attributes
       This is a fallback for older browsers
       ============================================================ */
    if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading supported
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.src;
        });
    } else {
        // Fallback for older browsers - load dynamically if needed
        // Modern browsers support native lazy loading
    }

});
