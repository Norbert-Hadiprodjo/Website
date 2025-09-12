'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }


// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}




// CONTACT FORM (mailto version)
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// enable/disable the button based on validity
const toggleBtn = () => {
  if (!form) return;
  if (form.checkValidity()) formBtn?.removeAttribute("disabled");
  else formBtn?.setAttribute("disabled", "");
};

// listen for typing/changes
formInputs.forEach(el => {
  el.addEventListener("input", toggleBtn);
  el.addEventListener("change", toggleBtn); // helps with autofill
});

// run once on load (covers autofill/BFCache)
document.addEventListener("DOMContentLoaded", toggleBtn);
window.addEventListener("pageshow", toggleBtn);




// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}


document.body.classList.add('no-scroll');

const splash = document.querySelector('.splash');
const skipBtn = document.querySelector('.splash-skip');

// Auto-fade after 3s
setTimeout(() => {
  splash.classList.add('is-hiding');
}, 3000);

// Also allow manual skip
skipBtn?.addEventListener('click', () => {
  splash.classList.add('is-hiding');
});

// When fade finishes, remove from layout & restore scroll
splash.addEventListener('transitionend', (e) => {
  if (e.propertyName === 'opacity' && splash.classList.contains('is-hiding')) {
    splash.classList.add('hidden');
    document.body.classList.remove('no-scroll');
  }
});


 //---------------------------------------------------------------------
// Typing: line-by-line, caret follows (without moving into the line)
(function () {
  const code = document.getElementById('about-code');
  if (!code) return;

  const CHAR_SPEED = 20; // ms per character

  // Snapshot each top-level line exactly as-is
  const lines = Array.from(code.children).map(n => n.cloneNode(true));
  if (!lines.length) return;

  // Clear and set caret (caret stays as a direct child of #about-code)
  code.innerHTML = '';
  const caret = document.createElement('span');
  caret.className = 'code-caret';
  code.appendChild(caret);

  let lineIndex = 0;


  function typeLine() {
    if (lineIndex >= lines.length) { caret.remove(); return; }

    const srcLine = lines[lineIndex++];
    const dstLine = srcLine.cloneNode(false);            // keep tags/classes, no children yet
    code.insertBefore(dstLine, caret);                   // insert the empty line before caret

    const nodes = Array.from(srcLine.childNodes);
    let nodeIndex = 0;

    function typeNode() {
      if (nodeIndex >= nodes.length) {
        setTimeout(typeLine, CHAR_SPEED * 2);            // next line
        return;
      }

      const node = nodes[nodeIndex++];

      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent;
        const tn = document.createTextNode('');
        dstLine.appendChild(tn);
        let i = 0;

        (function tick() {
          tn.textContent += text[i++];
          // keep caret AFTER the current line (as a sibling)
          code.insertBefore(caret, dstLine.nextSibling);
          if (i < text.length) setTimeout(tick, CHAR_SPEED);
          else typeNode();
        })();

      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node.cloneNode(false);                // same span, empty content
        dstLine.appendChild(el);
        const text = node.textContent;
        let i = 0;

        (function tick() {
          el.textContent += text[i++];
          code.insertBefore(caret, dstLine.nextSibling);  // caret stays outside the line
          if (i < text.length) setTimeout(tick, CHAR_SPEED);
          else typeNode();
        })();

      } else {
        typeNode();
      }
    }

    typeNode();
  }

  typeLine();
})();



// ==============================
// PORTFOLIO (Modal + Image Slider)
// ==============================
(() => {
  const modal = document.getElementById('projectModal');
  if (!modal) return;

  // Grab modal UI pieces safely
  const titleEl = document.getElementById('modalTitle');
  const catEl   = document.getElementById('modalCategory');
  const descEl  = document.getElementById('modalDesc');
  const demoEl  = document.getElementById('modalDemo');
  const ghEl    = document.getElementById('modalGithub');

  const track   = document.getElementById('sliderTrack');
  const dots    = document.getElementById('sliderDots');
  const btnPrev = modal.querySelector('[data-prev]');
  const btnNext = modal.querySelector('[data-next]');
  const closeBtn= modal.querySelector('.modal__close');

  if (!track || !dots) return; // must have slider parts

  let current = 0;

  // --- Helpers ---
  const setActiveSlide = (index) => {
    const slides = Array.from(track.children);
    const total  = slides.length;
    if (!total) return;

    current = (index + total) % total;

    slides.forEach((el, i) => el.setAttribute('aria-hidden', i === current ? 'false' : 'true'));
    dots.querySelectorAll('button').forEach((b, i) => {
      b.classList.toggle('is-active', i === current);
      b.setAttribute('aria-current', i === current ? 'true' : 'false');
    });

    // move the track
    track.style.transform = `translateX(-${current * 100}%)`;

    // hide nav/dots if single slide
    const single = total <= 1;
    btnPrev && (btnPrev.style.display = single ? 'none' : '');
    btnNext && (btnNext.style.display = single ? 'none' : '');
    dots.style.display = single ? 'none' : '';
  };

  const buildDots = (count) => {
    dots.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'slider__dot';
      b.setAttribute('aria-label', `Go to slide ${i + 1}`);
      b.addEventListener('click', () => setActiveSlide(i));
      dots.appendChild(b);
    }
  };

  const clearTrack = () => { track.innerHTML = ''; };

  const addImage = (src, alt) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt || '';
    img.loading = 'lazy';
    img.className = 'slider__item';
    img.setAttribute('aria-hidden', 'true');
    track.appendChild(img);
  };

  const openModalFromItem = (item) => {
    // Text
    const title    = item.querySelector('.project-title')?.textContent?.trim() || '';
    const category = item.querySelector('.project-category')?.textContent?.trim() || '';
    const desc     = item.getAttribute('data-desc') || '';

    if (titleEl) titleEl.textContent = title;
    if (catEl)   catEl.textContent   = category;
    if (descEl)  descEl.textContent  = desc;

    // Links
    const demo = item.getAttribute('data-demo');
    const gh   = item.getAttribute('data-github');
    if (demoEl) {
      if (demo) { demoEl.href = demo; demoEl.style.display = ''; }
      else      { demoEl.removeAttribute('href'); demoEl.style.display = 'none'; }
    }
    if (ghEl) {
      if (gh)   { ghEl.href   = gh;   ghEl.style.display   = ''; }
      else      { ghEl.removeAttribute('href'); ghEl.style.display   = 'none'; }
    }

    // Media (images only)
    clearTrack();
    const mediaAttr = item.getAttribute('data-images') || item.getAttribute('data-media') || '';
    const fallback  = item.querySelector('.project-card img')?.getAttribute('src') || '';
    const sources = (mediaAttr || fallback)
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    if (!sources.length && fallback) sources.push(fallback);
    if (!sources.length) {
      // If truly nothing, add a tiny transparent placeholder to avoid errors
      addImage('data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=', `${title} - placeholder`);
    } else {
      sources.forEach((src, i) => addImage(src, `${title} - slide ${i + 1}`));
    }

    buildDots(track.children.length);
    setActiveSlide(0);

    modal.classList.add('open');
    document.body.classList.add('modal-open');
    closeBtn?.focus();
  };

  const closeModal = () => {
    modal.classList.remove('open');
    document.body.classList.remove('modal-open');
  };

  // --- Open handlers ---
  document.querySelectorAll('.project-item .project-card').forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const li = card.closest('.project-item');
      if (!li) return;
      openModalFromItem(li);
    });
  });

  // --- Nav buttons ---
  btnNext?.addEventListener('click', (e) => {
    e.preventDefault(); e.stopPropagation();
    setActiveSlide(current + 1);
  });
  btnPrev?.addEventListener('click', (e) => {
    e.preventDefault(); e.stopPropagation();
    setActiveSlide(current - 1);
  });

  // --- Keyboard (only when modal is open) ---
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('open')) return;
    if (e.key === 'ArrowRight') setActiveSlide(current + 1);
    if (e.key === 'ArrowLeft')  setActiveSlide(current - 1);
    if (e.key === 'Escape')     closeModal();
  });

  // --- Touch swipe (simple) ---
  let startX = 0, deltaX = 0;
  track.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; deltaX = 0; }, { passive: true });
  track.addEventListener('touchmove',  (e) => { deltaX = e.touches[0].clientX - startX; },   { passive: true });
  track.addEventListener('touchend',   () => {
    const threshold = 40;
    if (Math.abs(deltaX) > threshold) {
      (deltaX < 0) ? setActiveSlide(current + 1) : setActiveSlide(current - 1);
    }
    deltaX = 0;
  });

  // --- Close interactions ---
  modal.addEventListener('click', (e) => {
    if (e.target.matches('[data-close], .modal__backdrop')) closeModal();
  });
})();

