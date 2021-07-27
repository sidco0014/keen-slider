window.addEventListener('DOMContentLoaded', ()=>{
    let imageList = [
        '1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg','7.jpg','8.jpg','9.jpg',
    ]
    createSliderBody(imageList, loadSliderWithData)
})


let createSliderBody = function(imageList, callback){
    let sliderContainer = document.getElementById('my-keen-slider');
    let slideLen = imageList.length;
    for(let i=0; i<slideLen; i++){
        let slide = document.createElement('div');
        slide.classList.add('keen-slider__slide','lazy__slide');
        let slideImg = document.createElement('div');
        slide.appendChild(slideImg)
        sliderContainer.appendChild(slide)
    }
    callback(imageList);
}

let loadSliderWithData = function (images){
    let elements = document.querySelectorAll(".lazy__slide div")
    let loaded = [];
    let slider = new KeenSlider("#my-keen-slider", {
        afterChange: (s) => {
            const slideIdx = s.details().relativeSlide
            loaded[slideIdx] = true
            elements.forEach((element, idx) => {
                if (loaded[idx]) element.style.backgroundImage = `url(${images[idx]})`
            })
        },
        loop: true,
        initial: 0,
    })
}