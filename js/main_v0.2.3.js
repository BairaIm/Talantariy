'use strict';

import {
    colors,
    indexActiveColor,
    elementsWithThema
} from './data.js';

import {
    renderCategories,
    renderSchedule,
    renderPrices,
    renderSubjects,
    renderPerson,
    renderFooter
} from './render.js'

import {
    renderSliderTeams,
    renderSliderNews,
    renderSliderPhotos,
    renderHeaderLinks,
    renderDropmenuLinks,
    renderFooterLinks
} from './renderLinksAndSlider.js'

// URL
// const HOME_URL = 'http://127.0.0.1:5500/';
const CABINET_URL = 'cabinet.html';
const SUBJECT_URL = 'subject.html';
const URL_404 = '404.html';
const RULES_URL = 'rules.html';
const OFERTA_URL = 'oferta.html';
const POLICY_URL = 'policy.html';
const USE_URL = 'use.html';

// pages
const btnDropmenu = document.querySelector('.navigation__toggle');
const wrapperDropmenu = document.querySelector('.wrapper');

const btnRooms = document.querySelectorAll('.room');

const btnCategories = document.querySelectorAll('input[name="category"]');

const btnsThema = document.querySelectorAll('input[name="thema"]');
const labelsThema = document.querySelectorAll('.thema__item');

const ACTIVE_COLOR_KEY = "indexActiveColor";

init();

function init() {
    // loadData();
    // changeThema(colors[indexActiveColor]);
    renderFooterLinks();
    renderFooter(SUBJECT_URL);

    if (document.URL.includes('index.html')) {
        window.location.href = '/';
    } else if (document.URL.includes(SUBJECT_URL)) {
        renderHeaderLinks();
        renderDropmenuLinks();

        const subjectName = document.URL.substring(document.URL.indexOf('#') + 1);
        renderSubjects(subjectName);
        document.querySelectorAll(`a[href^="${SUBJECT_URL}#"`).forEach((link) => {
            link.addEventListener('click', (event) => {
                // event.preventDefault();
                const href = link.href.substring(document.URL.indexOf('#') + 1);
                renderSubjects(href);
            });
        })
    } else if (document.URL.includes(CABINET_URL)) {
        const chapterName = document.URL.substring(document.URL.indexOf('#') + 1);
        if (!document.getElementById(chapterName)) {
            window.location.href = `/404.html`;
        }

        document.querySelectorAll('.cabinet__chapter').forEach((chapter) => 
            chapter.classList.add('hidden'));
        document.querySelector(`.${chapterName}`).classList.remove('hidden');
        document.querySelectorAll('.sidebar__item').forEach((item) => item.classList.remove('sidebar__item_active'));
        document.querySelector(`a[href="${CABINET_URL}#${chapterName}"]`).classList.add('sidebar__item_active');

        document.querySelectorAll(`a[href^="${CABINET_URL}#"`).forEach((link) => {
            link.addEventListener('click', (event) => {
                const href = link.href.substring(link.href.indexOf('#') + 1);
                document.querySelectorAll('.cabinet__chapter').forEach((chapter) => 
                    chapter.classList.add('hidden'));
                document.querySelector(`.${href}`).classList.remove('hidden');
                document.querySelectorAll('.sidebar__item').forEach((item) => item.classList.remove('sidebar__item_active'));
                event.target.classList.add('sidebar__item_active');
            });
        })
    } else if (document.URL.includes(URL_404) 
            || document.URL.includes(OFERTA_URL)
            || document.URL.includes(RULES_URL)
            || document.URL.includes(POLICY_URL)
            || document.URL.includes(USE_URL)) {
        renderHeaderLinks();
        renderDropmenuLinks();
    } else {
        renderHeaderLinks();
        renderDropmenuLinks();
        
        renderCategories('category_all', SUBJECT_URL);
        renderSchedule(0, SUBJECT_URL);
        renderPrices(SUBJECT_URL);
        renderSliderTeams();
        renderSliderNews();
        renderSliderPhotos();

        document.querySelectorAll('a[href^="/#"').forEach(link => {
            link.addEventListener('click', function(e) {
                if (!wrapperDropmenu.classList.contains('hidden')) {
                    btnDropmenu.click();
                }
            });
        });

        btnRooms.forEach((room, index) => room.addEventListener('click', () => renderSchedule(index, SUBJECT_URL)));
        btnCategories.forEach((category) => {
            category.addEventListener('change', () => renderCategories(category.id, SUBJECT_URL))
        });

        document.querySelectorAll('.personCard').forEach((personCard) => 
            personCard.addEventListener('click', () => renderPerson(personCard)));

        if (!document.URL.includes('#')) {
            smoothScrolling('our-schedule');
        }

        const cntSection = document.querySelectorAll('.marker').length;

        if (cntSection % 2 == 0) {
            const contacts = document.querySelector('.our-contacts');
            contacts.classList.replace('section-even', 'section-odd');
            contacts.classList.replace('section-even_white', `section-odd_${colors[indexActiveColor]}`);
        }

    }
        
    btnsThema.forEach((btn) => btn.addEventListener('change', () => changeThema(btn.value)));

    if (btnDropmenu) {
        btnDropmenu.addEventListener('change', (event) => {
            wrapperDropmenu.classList.toggle('hidden');
        });

        wrapperDropmenu.addEventListener('click', (event) => {
            if (event.target == wrapperDropmenu) {
                btnDropmenu.click();
            }
        });
    }
}

//utils
function saveData() {
    localStorage.setItem(ACTIVE_COLOR_KEY, indexActiveColor);
}

function loadData() {
    indexActiveColor = +localStorage.getItem(ACTIVE_COLOR_KEY);
}

// handle events
function smoothScrolling(target) {
    const scrollTarget = document.querySelector(`.${target}`);
        
    const topOffset = document.querySelector('.scrollto').offsetHeight;
    const elementPosition = scrollTarget.getBoundingClientRect().top;
    const offsetPosition = elementPosition - topOffset;
    window.scrollBy({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

function changeThema(color) {
    if (color == 'blue') {
        document.querySelectorAll('.logo__img').forEach((logo) => logo.src = "img/logo_blue-min.webp");
    } else {
        document.querySelectorAll('.logo__img').forEach((logo) => logo.src = "img/logo_green-min.webp");
        if (document.querySelector('.section-head__h1-border-img')) {
            if (color == 'white') {
                document.querySelector('.section-head__h1-border-img').src="img/h1-border-green.svg";
            } else {
                document.querySelector('.section-head__h1-border-img').src="img/h1-border.svg";
            }
        }
    }
    
    elementsWithThema.forEach((elem) => {
        elem.classList.replace(
            elem.classList[1],
            `${elem.classList[0]}_${color}`);
        
    });

    indexActiveColor = colors.indexOf(color);
    labelsThema.forEach((btn) => btn.classList.remove('thema__item_checked'));
    labelsThema[indexActiveColor].classList.add('thema__item_checked');
    saveData();
}

