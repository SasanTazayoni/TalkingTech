const buttons = document.querySelectorAll("[data-carousel-button");
const tabs = document.querySelectorAll('.carousel__tab');
const slides = document.querySelectorAll('.slide');
const titles = document.querySelectorAll('.slide__title');
const nextCarouselButton = document.querySelector('[data-carousel-button="next"]');
const testimonialButtons = document.querySelector('[data-testimonials-button]');
let nextInterval;
let intervalDelay;

/* This is the interval that runs from page load until a user clicks; it
automatically advances the slide. Once a user clicks, there will be a delay 
before auto advance starts up again. */
function initializeAutoAdvance() {
    nextInterval = setInterval(function() {
        clickButton(nextCarouselButton, true);
    }, 4000);
}

/* This is the timeout that starts after a person clicks; this creates a gap
between the user clicking, and the auto advancing restarting. */
function initializeAdvanceDelay() {
    intervalDelay = setTimeout(function() {
        initializeAutoAdvance();
    }, 6000);
};

/* Clear any existing intervals/timeouts */
function resetAutoAdvance() {
    if (nextInterval) {
        clearInterval(nextInterval);
    }
    if (intervalDelay) {
        clearTimeout(intervalDelay);
    }
    initializeAdvanceDelay();
};

/* Functions to select multiple data attributes */
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

/* Functionality of next and prev buttons */
function clickButton(button, auto) {
    if (!auto) {
        resetAutoAdvance();
    }

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

buttons.forEach(button => {
    button.addEventListener("click", () => {
        /* Don't hook up the clickButton directly; hook up an anonymous listener 
        so that we can pass the auto parameter, which differentiates between user clicks
        and the auto advance functionality. */
        clickButton(button, false);
    });
});

/* Function to click on tabs to navigate in carousel */
tabs.forEach(tab => {
    tab.addEventListener("click", function(e) {
        resetAutoAdvance();

        let index = parseInt(e.target.dataset.index);
        console.log(index);
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

initializeAutoAdvance();