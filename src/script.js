import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Headroom from 'headroom.js';

gsap.registerPlugin(ScrollTrigger);

window.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('#js_nav');
  new Headroom(nav, {
    classes: {
      initial: 'nav',
      pinned: 'nav--pinned',
      unpinned: 'nav--unpinned',
    },
  }).init();

  const navToggler = nav.querySelector('#js_navToggler');
  navToggler.addEventListener('click', (e) => {
    const { currentTarget: btn } = e;
    const navList = nav.querySelector('#js_navList');

    if (btn.getAttribute('aria-expanded') == 'false') {
      btn.setAttribute('aria-expanded', 'true');
      navList.dataset.state = 'expanded';
      gsap.to(navList, {
        height: 'auto',
        opacity: 1,
        marginTop: '2rem',
        duration: 0.3,
      });

      return;
    }

    btn.setAttribute('aria-expanded', 'false');
    navList.dataset.state = 'collapsed';
    gsap.to(navList, {
      height: 0,
      opacity: 0,
      marginTop: '0',
      duration: 0.3,
    });
  });
});

// intro animation
const introAnima = gsap.timeline({
  paused: true,
  defaults: {
    y: 100,
    opacity: 0,
  },
});

introAnima
  .fromTo('body > .overlay', { opacity: 1, y: 0 }, { opacity: 1, y: 0, scaleY: 0, duration: 1 })
  .from(
    '.hero__title-line > span',
    {
      rotate: '15deg',
      duration: 1,
      stagger: 0.15,
      ease: 'power4',
    },
    '<50%',
  )
  .from('.hero p', { scale: 0.9 }, '<25%')
  .from('.hero .form', {}, '<25%')
  .from('.hero__imgs', { y: -25, scale: 1.25, duration: 2 }, '<25%');

window.onload = function () {
  introAnima.play();

  // hero__imgs animations
  const mm = gsap.matchMedia();
  mm.add(
    {
      isMobile: '(max-width: 47.9375em)',
      isDesktop: '(min-width: 48em)',
    },
    (ctx) => {
      const start = 'top 90%';
      const end = 'bottom 10%';
      const { isMobile, isDesktop } = ctx.conditions;

      gsap.from('.ring-music', {
        y: isDesktop ? 50 : 25,
        scrollTrigger: {
          trigger: '.ring-music',
          start,
          end,
          scrub: true,
        },
      });

      gsap.from('.ring-money', {
        y: isDesktop ? 50 : 25,
        scrollTrigger: {
          trigger: '.ring-money',
          start,
          end,
          scrub: true,
        },
      });
      gsap.from('.shoes', {
        y: isDesktop ? -100 : -50,
        scrollTrigger: {
          trigger: '.shoes',
          start,
          end,
          scrub: true,
        },
      });
      gsap.from('.watch', {
        y: isDesktop ? 100 : 50,
        scrollTrigger: {
          trigger: '.watch',
          start,
          end,
          scrub: true,
        },
      });
    },
  );

  // howitworks
  const stepsImgs = document.querySelectorAll('.steps__item img');
  stepsImgs.forEach((img) => {
    gsap.from(img, {
      y: 100,

      scrollTrigger: {
        trigger: img,
        start: 'top bottom+=50',
        end: 'bottom-=150',
        scrub: 0.5,
      },
    });
  });

  // faq
  const questions = document.querySelectorAll('.question');
  questions.forEach((q) => {
    const qBtn = q.querySelector('button');
    const content = q.querySelector('.question__content');
    qBtn.addEventListener('click', (e) => {
      const { state } = q.dataset;

      if (state == 'collapsed') {
        q.dataset.state = 'expanded';
        gsap.to(content, {
          opacity: 1,
          height: 'auto',
          // marginTop: '1rem',
          duration: 0.3,
        });
      } else {
        q.dataset.state = 'collapsed';
        gsap.to(content, {
          opacity: 0,
          height: 0,
          // marginTop: 0,
          duration: 0.3,
        });
      }
    });
  });
};
