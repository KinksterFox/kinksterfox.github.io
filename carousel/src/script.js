// DOM Initialization
const main = document.getElementById('main-container');
const carousal = document.getElementById('slideshow-container');

// Fetch JSON
async function initializeConfig() {
    const requestUserConfig = './userconfig.json';
    const request = new Request(requestUserConfig);

    const response = await fetch(request);
    const userconfig = await response.json();

    populateConfig(userconfig);
}
initializeConfig();

async function initializeImages() {
    const requestImages = './images.json';
    const request = new Request(requestImages);

    const response = await fetch(request);
    const images = await response.json();

    populateCarousel(images);
}
initializeImages();

// Config
const config = {};

function populateConfig(userconfig) {
    Object.assign(config, userconfig);
    addFont();
}

// Add Font Family
function addFont() {
    const head = document.head;
    const fontSheet = document.createElement('link');
    const font = config.caption.text.fontFamily;

    fontSheet.rel = 'stylesheet';
    fontSheet.href = `https://fonts.googleapis.com/css?family=${font}`

    head.appendChild(fontSheet);
}

//Carousel
function populateCarousel(obj) {
    const images = obj.images

    main.classList.add(config.image.position)

    for (const image of images) {
        function isImage(url) {
            return /\.(jpe?g|png|webp|avif|gif|svg)$/.test(url);
        }

        if (isImage(image.file)) {
            const slide = document.createElement('div');
            slide.classList.add('mySlides', config.image.transition);
            slide.style.animationDuration = `${config.duration}s`

            const img = document.createElement('img');
            img.src = `images/${image.file}`;
            img.style.borderRadius = config.image.borderRadius;

            if (config.image.border.visibility == 'on') {
                img.style.outline = `${config.image.border.width} solid ${config.image.border.color}`
            }

            if (config.image.glow.visibility == 'on') {
                const bgGlow = document.createElement('img');
                bgGlow.src = `images/${image.file}`;
                bgGlow.style.borderRadius = config.image.radius;
                bgGlow.classList.add('glow');

                bgGlow.style.filter = `blur(${config.image.glow.size})`;
                bgGlow.style.opacity = config.image.glow.opacity;

                slide.appendChild(bgGlow);
            }

            slide.appendChild(img);

            const capContainer = document.createElement('div');
            capContainer.classList.add('caption-container', 'text-padding', config.caption.text.position);
            capContainer.style.opacity = config.caption.text.opacity;

            slide.appendChild(capContainer);

            const caption = document.createElement('p');
            caption.classList.add('caption', config.caption.text.transition);
            caption.textContent = image.caption;
            caption.style.color = config.caption.text.color;
            caption.style.fontFamily = config.caption.text.fontFamily;
            caption.style.fontSize = config.caption.text.fontSize;
            caption.style.fontWeight = config.caption.text.fontWeight;
            caption.style.animationDuration = `${config.duration}s`;

            if (config.caption.shadow.visibility == 'on') {
                caption.style.textShadow = `${config.caption.shadow.offset} ${config.caption.shadow.offset} ${config.caption.shadow.size} ${config.caption.shadow.color}`
            }

            capContainer.appendChild(caption);

            carousal.appendChild(slide);
        }
    }
    showSlides();
}

// Carousel Functionality
let slideIndex = 0;

function showSlides() {
    let slides = document.getElementsByClassName('mySlides');

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }

    slideIndex++;

    if (slideIndex > slides.length) { slideIndex = 1 }

    slides[slideIndex - 1].style.display = 'block';

    setTimeout(showSlides, config.duration * 1000);
}

window.addEventListener('load', () => {

})