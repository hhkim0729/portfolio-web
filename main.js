'use strict';

// transparent navbar
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add('navbar--dark');
  } else {
    navbar.classList.remove('navbar--dark');
  }
});

// transparent home
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  const homeOpacity = 1 - window.scrollY / homeHeight;
  home.style.opacity = homeOpacity * 2;
});

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (e) => {
  const target = e.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  navbarMenu.classList.remove('open');
  scrollIntoView(link);
});

// Handle tapping on navbar hamburger button
const hamburgerBtn = document.querySelector('.navbar__toggle-btn');
hamburgerBtn.addEventListener('click', () => {
  navbarMenu.classList.toggle('open');
});

// Handle scrolling when tapping on "contact me" button on home
const contactButton = document.querySelector('.home__contact');
contactButton.addEventListener('click', () => {
  scrollIntoView('#contact');
});

// Handle go to top button
const arrowUp = document.querySelector('.arrow-up');
arrowUp.addEventListener('click', (e) => scrollIntoView('#home'));
document.addEventListener('scroll', () => {
  if (window.scrollY > homeHeight / 2) {
    arrowUp.classList.add('visible');
  } else {
    arrowUp.classList.remove('visible');
  }
});

// Handle project category button
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');
workBtnContainer.addEventListener('click', (e) => {
  const target =
    e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
  const category = target.dataset.category;
  if (category == null) {
    return;
  }

  const selected = document.querySelector('.category__btn.selected');
  selected.classList.remove('selected');
  target.classList.add('selected');

  projectContainer.classList.add('anim-out');
  setTimeout(() => {
    projects.forEach((project) => {
      if (category === '*' || category === project.dataset.type) {
        project.classList.remove('invisible');
      } else {
        project.classList.add('invisible');
      }
    });
    projectContainer.classList.remove('anim-out');
  }, 300);
});

// Handle interactive scrolling
const options = {
  threshold: 0.4,
};
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const active = document.querySelector('.navbar__menu__item.active');
      const navItem = document.querySelector(
        `[data-link="#${entry.target.id}"]`
      );
      active.classList.remove('active');
      navItem.classList.add('active');
    }
  });
}, options);
sections.forEach((section) => observer.observe(section));

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
}
