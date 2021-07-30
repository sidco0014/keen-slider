window.addEventListener('DOMContentLoaded', () => {
    let imageList = [
        '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg',
    ]
    createSliderBody(imageList, loadSliderWithData)
})


let createSliderBody = function (imageList, callback) {
    let sliderContainer = document.getElementById('my-keen-slider');
    let slideLen = imageList.length;
    for (let i = 0; i < slideLen; i++) {
        let slide = document.createElement('div');
        slide.classList.add('keen-slider__slide', 'lazy__slide');
        let slideImg = document.createElement('div');
        slide.appendChild(slideImg)
        sliderContainer.appendChild(slide)
    }
    callback(imageList);
}

/*
Loading slider with images and initializing KeenSlider object
@params: list of images
@return: none

*/
let loadSliderWithData = function (images) {
    let elements = document.querySelectorAll(".lazy__slide div")
    let loaded = [];
    let isAutoplay = true;
    let interval = 0;
    let slider = new KeenSlider("#my-keen-slider", {
        created: function (instance) {
            document
                .getElementById("arrow-left")
                .addEventListener("click", function () {
                    instance.prev()
                })
            document
                .getElementById("arrow-right")
                .addEventListener("click", function () {
                    instance.next()
                })
            let dots_wrapper = document.getElementById("dots")
            let slides = document.querySelectorAll(".keen-slider__slide")
            slides.forEach(function (t, idx) {
                let dot = document.createElement("button")
                dot.classList.add("dot")
                dots_wrapper.appendChild(dot)
                dot.addEventListener("click", function () {
                    instance.moveToSlide(idx)
                })
            })
            updateClasses(instance)
        },
        slideChanged(instance) {
            updateClasses(instance)
        },
        afterChange: (s) => {
            const slideIdx = s.details().relativeSlide
            const size = s.details().size;
            if(slideIdx < size){
                loaded[slideIdx] = true
                loaded[slideIdx+1] = true //keep next slide loaded!
            }
            elements.forEach((element, idx) => {
                if (loaded[idx]) {
                    element.style.backgroundImage = `url(${images[idx]})`
                }
            })
        },
        loop: true,
        initial: 0,
    })
    // disable autoplay and destroy controls if there is only one slide
    if(slider.details().size === 1){
        isAutoplay = false;
        slider.destroy();
    }
    autoplay(interval, isAutoplay, slider) // true / false means to make autoplay true or false;
}

/*
Adding arrow and dots to slider
@params: instance of the slide
@return: none

*/
let updateClasses = function (instance) {
    let slide = instance.details().relativeSlide;
    let arrowLeft = document.getElementById("arrow-left")
    let arrowRight = document.getElementById("arrow-right")
    slide === 0
        ? arrowLeft.classList.add("arrow--disabled")
        : arrowLeft.classList.remove("arrow--disabled")
    slide === instance.details().size - 1
        ? arrowRight.classList.add("arrow--disabled")
        : arrowRight.classList.remove("arrow--disabled")

    let dots = document.querySelectorAll(".dot")
    dots.forEach(function (dot, idx) {
        idx === slide
            ? dot.classList.add("dot--active")
            : dot.classList.remove("dot--active")
    })
}


/*
Custom function to autoplay slide
@params: interval timer, boolean to autoplay or not, slider object
@return: none

*/
function autoplay(interval, run, slider) {
    clearInterval(interval);
    interval = setInterval(() => {
        if (run && slider) {
            slider.next();
        }
    }, 3000);
}