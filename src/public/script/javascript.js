
console.log('javascript is running!')
const slides = document.querySelectorAll('.slide');
const rightButton = document.querySelector('.fa-angle-right');
const leftButton = document.querySelector('.fa-angle-left');

let currentIndex = 0

const initSlides = () => {
  slides[currentIndex].classList.add('initSlide');
}
//classList adds style to elements

slideManager = (slideDirection) => {
 let prevSlideIndex, nextSlideIndex

  if( currentIndex === 0 && slideDirection === -1 ){
    currentIndex = slides.length-1
    nextSlideIndex = 0;
    prevSlideIndex = currentIndex-1;

    console.log('previous', prevSlideIndex)
    console.log('current', currentIndex )
    console.log('next', nextSlideIndex)

  }
  else if(currentIndex === slides.length -1 && slideDirection === 1){
    prevSlideIndex = currentIndex;
    currentIndex = 0;
    nextSlideIndex = currentIndex + 1;

    // prevSlideIndex = currentIndex - 1;

    console.log('previous', prevSlideIndex)
    console.log('current', currentIndex )
    console.log('next', nextSlideIndex)
  } else {

    currentIndex += slideDirection;
    nextSlideIndex = currentIndex +1;
    prevSlideIndex = currentIndex -1;
    // slides[currentIndex].classList.add('current-slide-transition')
    // slides[prevSlideIndex].classList.add('previous-slide-transition')
  }
  if(slideDirection < 0) {
    slides[nextSlideIndex].classList.remove('initSlide')
  }else{
    slides[prevSlideIndex].classList.remove('initSlide')
  }
 slides[currentIndex].classList.add('initSlide')
}



rightButton.addEventListener('click', function(){
  return slideManager(1);
})

leftButton.addEventListener('click', function(){
  return slideManager(-1);
})

document.body.onload = initSlides();
