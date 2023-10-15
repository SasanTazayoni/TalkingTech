const buttons = document.querySelectorAll("[data-carousel-button");
const tabs = document.querySelectorAll('.carousel__tab');
const slides = document.querySelectorAll('.slide');
const titles = document.querySelectorAll('.slide__title');
const nextCarouselButton = document.querySelector('[data-carousel-button="next"]');
const testimonialButtons = document.querySelectorAll('[data-testimonial-button]');
const nextTestimonialButton = document.querySelector('[data-testimonial-button="next"]');
const testimonialTabs = document.querySelectorAll('.testimonial__tab');
let nextInterval;
let nextTestimonialInterval;
let intervalDelay;

// Interval delays between carousel slides

function initialiseCarouselAutoAdvance() {
    nextInterval = setInterval(function() {
        clickButton(nextCarouselButton, true);
    }, 4000);
}

// Functions to select multiple data attributes

function selectElement(element) {
    const dataSlides = element.closest("[data-carousel]").querySelector("[data-slides]");
    const dataTitles = element.closest("[data-carousel]").querySelector("[data-titles]");
    const dataTabs = element.closest("[data-carousel]").querySelector("[data-tabs]");
    return [dataSlides, dataTitles, dataTabs];
}

function activeElement(dataSlides, dataTitles, dataTabs) {
    const activeSlide = dataSlides.querySelector("[data-active]");
    const activeTitle = dataTitles.querySelector("[data-active]");
    const activeTab = dataTabs.querySelector("[data-active]");

    return [activeSlide, activeTitle, activeTab];
}

// Carousel buttons (next and prev)

function clickButton(button, auto) {
    if (!auto) {
        resetAutoAdvance();
    }

    // if (!button) return;

    const offset = button.dataset.carouselButton === "next" ? 1 : -1;
    const [dataSlides, dataTitles, dataTabs] = selectElement(button);
    const [activeSlide, activeTitle, activeTab] = activeElement(dataSlides, dataTitles, dataTabs);

    // Picture index

    let newIndex = [...dataSlides.children].indexOf(activeSlide) + offset;
    if (newIndex < 0) newIndex = dataSlides.children.length - 1;
    if (newIndex >= dataSlides.children.length) newIndex = 0;

    dataSlides.children[newIndex].dataset.active = true;
    delete activeSlide.dataset.active;

    // Title index

    let titleIndex = [...dataTitles.children].indexOf(activeTitle) + offset;
    if (titleIndex < 0) titleIndex = dataTitles.children.length - 1;
    if (titleIndex >= dataTitles.children.length) titleIndex = 0;

    dataTitles.children[titleIndex].dataset.active = true;
    delete activeTitle.dataset.active;

    // Tab index

    let tabIndex = [...dataTabs.children].indexOf(activeTab) + offset;
    if (tabIndex < 0) tabIndex = dataTabs.children.length - 1;
    if (tabIndex >= dataTabs.children.length) tabIndex = 0;

    dataTabs.children[tabIndex].dataset.active = true;
    delete activeTab.dataset.active;
}

// Add listener for click to trigger a delay

buttons.forEach(button => {
    button.addEventListener("click", () => {
        clickButton(button, false);
    });
});

// Navigate carousel tabs

tabs.forEach(tab => {
    tab.addEventListener("click", function(e) {
        resetAutoAdvance();

        let index = parseInt(e.target.dataset.index);
        const [dataSlides, dataTitles, dataTabs] = selectElement(tab);
        const [activeSlide, activeTitle, activeTab] = activeElement(dataSlides, dataTitles, dataTabs);

        if (index != undefined) {
            if (!dataTabs.children[index].dataset.active) {
                dataTabs.children[index].dataset.active = true;
                delete activeTab.dataset.active;
            }
            if (!dataTitles.children[index].dataset.active) {
                dataTitles.children[index].dataset.active = true;
                delete activeTitle.dataset.active;
            }
            if (!dataSlides.children[index].dataset.active) {
                dataSlides.children[index].dataset.active = true;
                delete activeSlide.dataset.active;
            }
        }
    });
});

// Trigger delay timer for carousel when button or tab clicked

function resetAutoAdvance() {
    if (nextInterval) {
        clearInterval(nextInterval);
    }
    if (intervalDelay) {
        clearTimeout(intervalDelay);
    }
    initialiseCarouselAdvanceDelay();
};

// Carousel delay timer

function initialiseCarouselAdvanceDelay() {
    intervalDelay = setTimeout(function() {
        initialiseTestimonialAutoAdvance();
    }, 6000);
};

// Interval delays between testimonial slides

function initialiseTestimonialAutoAdvance() {
    nextTestimonialInterval = setInterval(function() {
        clickTestimonialButton(nextTestimonialButton, true);
    }, 12000);
}

// Testimonials buttons (next and prev)

function clickTestimonialButton(button, auto) {
    if (!auto) {
        resetTestimonialAutoAdvance();
    }

    const offset = button.dataset.testimonialButton === "next" ? 1 : -1;
    const testimonials = button.closest("[data-testimonials]").querySelector("[data-testimonials-content]");
    const tabs = button.closest("[data-testimonials]").querySelector("[data-testimonial-tabs]");
    const activeTestimonial = testimonials.querySelector("[data-active]");
    const activeTab = tabs.querySelector("[data-active]");

    // Testimonial index

    let testimonialsIndex = [...testimonials.children].indexOf(activeTestimonial) + offset;
    if (testimonialsIndex < 0) testimonialsIndex = testimonials.children.length - 1;
    if (testimonialsIndex >= testimonials.children.length) testimonialsIndex = 0;

    testimonials.children[testimonialsIndex].dataset.active = true;
    delete activeTestimonial.dataset.active;

    // Tab index

    let tabIndex = [...tabs.children].indexOf(activeTab) + offset;
    if (tabIndex < 0) tabIndex = tabs.children.length - 1;
    if (tabIndex >= tabs.children.length) tabIndex = 0;

    tabs.children[tabIndex].dataset.active = true;
    delete activeTab.dataset.active;
}

// Add listener for click to trigger a delay

testimonialButtons.forEach(button => {
    button.addEventListener("click", () => {
        clickTestimonialButton(button, false);
    });
});

// Navigate testimonials tabs

testimonialTabs.forEach(tab => {
    tab.addEventListener("click", function(e) {
        resetTestimonialAutoAdvance();

        let index = parseInt(e.target.dataset.index);
        
        const testimonials = tab.closest("[data-testimonials]").querySelector("[data-testimonials-content]");
        const tabs = tab.closest("[data-testimonials]").querySelector("[data-testimonial-tabs]");
        const activeTestimonial = testimonials.querySelector("[data-active]");
        const activeTab = tabs.querySelector("[data-active]");

        if (index != undefined) {
            if (!testimonials.children[index].dataset.active) {
                testimonials.children[index].dataset.active = true;
                delete activeTestimonial.dataset.active;
            }
            if (!tabs.children[index].dataset.active) {
                tabs.children[index].dataset.active = true;
                delete activeTab.dataset.active;
            }
        }
    });
});

// Trigger delay timer for testimonial when button or tab clicked

function resetTestimonialAutoAdvance() {
    if (nextTestimonialInterval) {
        clearInterval(nextTestimonialInterval);
    }
    if (intervalDelay) {
        clearTimeout(intervalDelay);
    }
    initialiseTestimonialAdvanceDelay();
};

// Testimonials delay timer

function initialiseTestimonialAdvanceDelay() {
    intervalDelay = setTimeout(function() {
        initialiseTestimonialAutoAdvance();
    }, 8000);
}

initialiseCarouselAutoAdvance();
initialiseTestimonialAutoAdvance();