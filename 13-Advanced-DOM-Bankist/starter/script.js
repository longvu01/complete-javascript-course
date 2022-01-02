'use strict';


const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector('#section--1')

const nav = document.querySelector('.nav')
const tabs = document.querySelectorAll('.operations__tab')
const tabsContainer = document.querySelector('.operations__tab-container')
const tabsContent = document.querySelectorAll('.operations__content')

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click',openModal))

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

////////////////////////////////////
// Cookie message

const message = document.createElement('div')
message.classList.add('cookie-message')
message.innerHTML = "We use cokied for improved functionaylity and analytics <button class ='btn btn--close-cookie'>Got it!</button>"
document.querySelector('.header').append(message)
document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  message.remove()
})
message.style.backgroundColor = '#37383d'
message.style.width = '100vw'
document.querySelector('body').style.overflowX = 'hidden'
message.style.height = parseFloat(getComputedStyle(message).height, 10) + 25 + 'px'

////////////////////////////////////
// btnScrollTo

btnScrollTo.addEventListener('click', (e) => {
  // const s1coords = section1.getBoundingClientRect();
  // Scrolling 
  // console.log(s1coords);

  // window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset)

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth'
  // })

  section1.scrollIntoView({ behavior: 'smooth'})
})

////////////////////////////////////
// Page navigation

// document.querySelectorAll('.nav__link').forEach((nav) => {
//   nav.addEventListener('click', (e) => {
//     e.preventDefault();
//     // document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth'})
//     document.querySelector(e.currentTarget.getAttribute('href')).scrollIntoView({ behavior: 'smooth'})
//   })
// })

// Event delegation
// 1.Add event listener to commonm parent element
// 2. Determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', (e) => {
  e.preventDefault();

  // Matching strategy
  if(e.target.classList.contains('nav__link')) {
    document.querySelector(e.target.getAttribute('href')).scrollIntoView({ behavior: 'smooth'})
  }
})

///////////////////////////////////////
// Tabbed component

tabsContainer.addEventListener('click' , (e) => {
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  if(!clicked) return;

  tabs.forEach((tab, i) => {
    tab.classList.remove('operations__tab--active')
    tabsContent[i].classList.remove('operations__content--active')
  })

  clicked.classList.add('operations__tab--active');
  const index = clicked.dataset.tab - 1
  tabsContent[index].classList.add('operations__content--active');
})

///////////////////////////////////////
// Menu fade animation

const handleHover = function (e) {
  if(e.target.classList.contains('nav__link')) {
    const link = e.target
    const siblings = link.closest('.nav__links').querySelectorAll('.nav__link')
    const logo = link.closest('.nav').querySelector('img')

    siblings.forEach(s => {
      if(s !== link) s.style.opacity = this
    })
    logo.style.opacity = this
    
  }
}

// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5))
nav.addEventListener('mouseout', handleHover.bind(1))

///////////////////////////////////////
// Sticky navigation

// const initialCoords = section1.getBoundingClientRect()

// window.addEventListener('scroll', () => {
//   if(window.scrollY > initialCoords.top) nav.classList.add('sticky')
//   else nav.classList.remove('sticky')
// })

// Sticky navigation: Intersection Observer API
// const obsCallback = (entries, observer) => {
//   entries.forEach((entry) => {
//     console.log(entry);
//   })
// }

// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// }

// const observer = new IntersectionObserver(obsCallback, obsOptions)
// observer.observe(section1);

const header = document.querySelector('.header')
const navHeight = nav.getBoundingClientRect().height

const stickyNav = (entries) => {
  const [entry] = entries;
  entry.isIntersecting ? nav.classList.remove('sticky') : nav.classList.add('sticky')
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
})

headerObserver.observe(header)

///////////////////////////////////////
// Reveal sections

const allSections = document.querySelectorAll('.section')

const revealSection = (entries, observer) => {
  const [entry] = entries;
  // console.log(entry);

  // if(!entry.isIntersecting) {
  //   entry.target.classList.add('section--hidden')
  // } else {
  //   entry.target.classList.remove('section--hidden')
  // }
  
  if(!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden')

  observer.unobserve(entry.target)
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.1,
})

allSections.forEach((section) => {
  section.classList.add('section--hidden')
  sectionObserver.observe(section)
})

///////////////////////////////////////
// Lazy loading images

const imgTargets = document.querySelectorAll('img[data-src]')
// console.log(imgTargets);

const loadImg = (entries, observer) => {
  const [entry] = entries
  // console.log(entry);

  if(!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src
  entry.target.addEventListener('load', () => {
    entry.target.classList.remove('lazy-img')
  })
  observer.unobserve(entry.target)

}

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0.1,
  rootMargin: '200px'
})

imgTargets.forEach(img => imgObserver.observe(img))

///////////////////////////////////////
// Slider

const slider = () => {
  const slides = document.querySelectorAll('.slide')
  const btnLeft = document.querySelector('.slider__btn--left')
  const btnRight = document.querySelector('.slider__btn--right')
  const dotsContainer = document.querySelector('.dots')

  // Functions
  // Create Dots
  ;(() => {
    slides.forEach((_, i) => {
      const html = `<button class="dots__dot" data-slide=${i}></button>`
      dotsContainer.insertAdjacentHTML('beforeend',html)
    })
  })()
  // Get dots after create
  const dots = document.querySelectorAll('.dots__dot')

  const activateDot = (dot) => {
    dots.forEach(d => d.classList.remove('dots__dot--active'))
    dot.classList.add('dots__dot--active')
  }

  const goToSlide = (activeSlide) => {
    slides.forEach((s, i) => s.style.transform = `translateX(${100 * (i - activeSlide)}%)`)
  }

  // Init
  let curSlide = 0;
  const slideLength = slides.length;
  ;(() => {
    dots[0].classList.add('dots__dot--active')
    goToSlide(0)
  })()

  // Event handlers
  // Click each dot
  dotsContainer.addEventListener('click', (e) => {
    const dot = e.target.closest('.dots__dot')
    if(dot) {
      curSlide = dot.dataset.slide
      goToSlide(curSlide)
      activateDot(dot)
    }
  })
  // Next slide
  const nextSlide = () => {
    curSlide = curSlide === slideLength - 1 ? 0 : ++curSlide
    goToSlide(curSlide)
    activateDot(dots[curSlide])
  }
  btnRight.addEventListener('click', nextSlide)
  // Prev slide
  const prevSlide = () => {
    curSlide = curSlide <= 0 ? slideLength - 1 : --curSlide
    goToSlide(curSlide)
    activateDot(dots[curSlide])
  }
  btnLeft.addEventListener('click', prevSlide)
  // Both arrow keys
  document.addEventListener('keydown', (e) => {
    if(e.key === 'ArrowRight') nextSlide()
    e.key === 'ArrowLeft' && prevSlide()
  })
}
slider()
///////////////////////////////////////
///////////////////////////////////////
// document.documentElement.style.setProperty('--color-primary', 'orangered')
// console.log(document.querySelector('#logo').setAttribute('company', 'Banklist'))
// console.log(document.querySelector('#logo').dataset.versionNumber)

// const h1  = document.querySelector('h1')
// let i = 0
// const a = () => console.log('ok ' + ++i)
// h1.onmouseenter = a
// setTimeout(() => h1.removeEventListener('mouseenter', a), 2000)

// const h1 = document.querySelector('h1');
// console.log(h1.querySelectorAll('.highlight'));

document.addEventListener('DOMContentLoaded', function (e) {
  console.log(e);
})

window.addEventListener('load', function (e) {
  console.log(e);
})

// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = 'message'
// })












