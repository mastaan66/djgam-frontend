// --- LIGHTBOX MODAL ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeBtn = document.getElementById('close-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentImages = [];
let currentCaptions = [];
let currentIndex = 0;

function openLightbox(images, captions, index = 0) {
    currentImages = images;
    currentCaptions = captions;
    currentIndex = index;
    updateLightboxImage();
    lightbox.classList.remove('lightbox-hidden');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.add('lightbox-hidden');
    document.body.style.overflow = 'auto';
}

function updateLightboxImage() {
    lightboxImg.src = currentImages[currentIndex];
    lightboxCaption.textContent = "";
}

function showPrev() {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    updateLightboxImage();
}

function showNext() {
    currentIndex = (currentIndex + 1) % currentImages.length;
    updateLightboxImage();
}

if(lightbox) {
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPrev);
    nextBtn.addEventListener('click', showNext);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

// --- DYNAMIC GALLERY, INFO MODAL ---

document.addEventListener('DOMContentLoaded', () => {

    // --- GALLERY LOADER ---
    const galleryGrid = document.getElementById('gallery-grid');
    const loadingMessage = document.getElementById('gallery-loading-message');

    if (galleryGrid && loadingMessage) {
        const loadGalleryWithRetries = async (retries = 3, delay = 2000) => {
            try {
                const response = await fetch('https://jgam-api.onrender.com/api/gallery');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const albums = await response.json();
                console.log("ITR");
                loadingMessage.style.display = 'none';
                
                galleryGrid.innerHTML = ''; 
                if (albums.length === 0) {
                     galleryGrid.innerHTML = '<p class="text-center signature-text col-span-full text-white">No albums found. Add folders with images to the `frontend/images` directory.</p>';
                     return;
                }
                buildGallery(albums);

            } catch (error) {
                console.error("Gallery fetch failed. See details below:", error);
                
                if (retries > 1) {
                    setTimeout(() => loadGalleryWithRetries(retries - 1, delay), delay);
                } else {
                    loadingMessage.style.display = 'none';
                    galleryGrid.innerHTML = '<p class="text-center text-red-400 font-bold col-span-full">Could not load the gallery. Please ensure the backend server is running and check the browser console for more details.</p>';
                }
            }
        };

        const buildGallery = (albums) => {
            albums.forEach(album => {
                const albumEl = document.createElement('div');
                albumEl.className = 'album-cover';
                albumEl.innerHTML = `
                    <img src="${album.coverImage}" alt="${album.albumName} Cover">
                    <div class="album-title">${album.albumName}</div>
                `;
                albumEl.addEventListener('click', () => {
                    openLightbox(album.images, album.captions);
                });
                galleryGrid.appendChild(albumEl);
            });
        };

        loadGalleryWithRetries();
    }

    // --- INFO MODAL ---
    const infoModal = document.getElementById('info-modal');
    const infoModalBody = document.getElementById('info-modal-body');
    const infoModalCloseBtn = document.getElementById('info-modal-close-btn');
    const modalTriggers = document.querySelectorAll('.modal-trigger-card');

    function openInfoModal(content) {
        if (infoModal && infoModalBody) {
            infoModalBody.innerHTML = content;
            infoModal.classList.remove('modal-hidden');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeInfoModal() {
        if (infoModal) {
            infoModal.classList.add('modal-hidden');
            document.body.style.overflow = 'auto';
        }
    }
    
    if (infoModal) {
        infoModalCloseBtn.addEventListener('click', closeInfoModal);
        infoModal.addEventListener('click', (e) => {
            // This is the "click outside" logic
            if (e.target === infoModal) {
                closeInfoModal();
            }
        });
    }

    modalTriggers.forEach(card => {
        const header = card.querySelector('.modal-trigger-header');
        const contentEl = card.querySelector('.modal-source-content');
        
        if (header && contentEl) {
            header.addEventListener('click', () => {
                const titleEl = header.querySelector('h4').cloneNode(true);
                titleEl.classList.add('mb-4'); 
                const contentHTML = contentEl.innerHTML;
                
                const fullContent = titleEl.outerHTML + contentHTML;
                openInfoModal(fullContent);
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const logoLink = document.getElementById('logo-link');
    const eventModal = document.getElementById('event-modal');
    const closeModal = document.getElementById('close-modal');

    logoLink.addEventListener('click', (e) => {
        e.preventDefault();
        eventModal.classList.remove('hidden');
    });

    closeModal.addEventListener('click', () => {
        eventModal.classList.add('hidden');
    });

    eventModal.addEventListener('click', (e) => {
        if (e.target === eventModal) {
            eventModal.classList.add('hidden');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const hamburgerButton = document.getElementById('hamburger-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const logo = document.getElementById('logo');

    hamburgerButton.addEventListener('click', () => {
        const isExpanded = hamburgerButton.getAttribute('aria-expanded') === 'true';
        hamburgerButton.setAttribute('aria-expanded', !isExpanded);
        mobileMenu.classList.toggle('hidden');
    });

    logo.addEventListener('click', () => {
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({
                ...defaults,
                particleCount,
                origin: { x: Math.random(), y: Math.random() - 0.2 }
            });
        }, 250);
    });

    // Preloader logic
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        if (preloader) {
            preloader.classList.add('preloader-hidden');
            preloader.addEventListener('transitionend', () => {
                preloader.style.display = 'none';
            });
        }
    }, 1500);
});

document.getElementById("logo").addEventListener("click", function () {
    // Burst confetti (macOS style)
    confetti({
        particleCount: 200,
        spread: 90,
        startVelocity: 45,
        gravity: 0.7,
        origin: { y: 0.6 }
    });

    // Additional burst (like macOS celebration)
    setTimeout(() => {
        confetti({
            particleCount: 150,
            spread: 120,
            startVelocity: 55,
            gravity: 0.6,
            origin: { y: 0.4 }
        });
    }, 300);

    // small sparkle shots
    let duration = 1200; 
    let end = Date.now() + duration;

    (function randomShot() {
        confetti({
            particleCount: 10,
            angle: Math.random() * 360,
            spread: 360,
            origin: { x: Math.random(), y: Math.random() * 0.5 }
        });

        if (Date.now() < end) requestAnimationFrame(randomShot);
    })();
});
