// DOM Initialization
const main = document.getElementById('main-container');
const captions = document.querySelectorAll('.caption-container');

// Fetch JSON
async function initializeConfig() {
    const requestConfig = "config.json";
    const request = new Request(requestConfig);

    const response = await fetch(request);
    const config = await response.json();

    setConfig(config);
}

async function initializeImages() {
    const requestImages = "images.json";
    const request = new Request(requestImages);

    const response = await fetch(request);
    const images = await response.json();

    populateCarousel(images);
}

// Configs
let imgPos;
let glowConfig = {};
let captionConfig = {};

function setConfig(obj) {
    const config = obj;

    imgPos = config.image.position;

    glowConfig.visibility = config.image.glow.visibility;
    glowConfig.size = config.image.glow.size;
    glowConfig.opacity = config.image.glow.opacity;

    captionConfig.position = config.caption.position;
    captionConfig.color = config.caption.color;
    captionConfig.opacity = config.caption.opacity;

    main.classList.add(imgPos)
}

// Populate Carousel
function populateCarousel(obj) {
    const carousal = document.getElementById('slideshow-container');
    const images = obj.images

    for (const image of images) {
        if (image.file != "" || image.caption != "") {
            const slide = document.createElement('div');
            slide.classList.add("mySlides", "fade");

            const img = document.createElement('img');

            if (glowConfig.visibility == "on") {
                const bgGlow = document.createElement('img');
                bgGlow.src = `images/${image.file}`;
                bgGlow.classList.add("glow");
    
                bgGlow.style.filter = `blur(${glowConfig.size})`;
                bgGlow.style.opacity = glowConfig.opacity;

                slide.appendChild(bgGlow);
            }

            img.src = `images/${image.file}`;

            const capContainer = document.createElement("div");
            capContainer.classList.add("caption-container", "text-padding", captionConfig.position);
            capContainer.style.opacity = captionConfig.opacity;

            const caption = document.createElement("p");
            caption.classList.add("caption", "text-slide");
            caption.textContent = image.caption;
            caption.style.color = captionConfig.color;

            slide.appendChild(img);
            slide.appendChild(capContainer);
            capContainer.appendChild(caption);

            carousal.appendChild(slide);
        }
    }
    showSlides();
}

// Carousel Functionality
let slideIndex = 0;

function showSlides() {
    let slides = document.getElementsByClassName("mySlides");

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slideIndex++;

    if (slideIndex > slides.length) { slideIndex = 1 }

    slides[slideIndex - 1].style.display = "block";

    setTimeout(showSlides, 10000); // Change image every 10 seconds
}

initializeConfig();
initializeImages();