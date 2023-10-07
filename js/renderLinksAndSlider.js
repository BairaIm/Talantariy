import {
    employees,
    news,
    photos,
    headerLinks,
    dropmenuLinks,
    footerLinks,
    colors,
    indexActiveColor,
    elementsWithThema
} from './data.js';

export {
    renderSliderTeams,
    renderSliderNews,
    renderSliderPhotos,
    renderHeaderLinks,
    renderDropmenuLinks,
    renderFooterLinks,
}

//sliders
const slidesTeam = [];
const slidesNews = [];
const slidesPhotos = [];

function renderHeaderLinks() {
    renderMenuLinks('topbar__menu', headerLinks);
};

function renderDropmenuLinks() {
    renderMenuLinks('dropmenu__menu', dropmenuLinks);
};

function renderFooterLinks() {
    renderMenuLinks('footer__menu', footerLinks);
};

function renderMenuLinks(nameMenu, links) {
    const menu = document.querySelector(`.${nameMenu}`);

    for (let i = 0; i < links.length; i++) {
        const link = links[i];
        const nameLink = link.href.substring(2);
        if (nameLink == 'team' && !(employees && employees.length)) {
            continue;
        } else if (nameLink == 'news' && !(news && news.length)) {
            continue;
        } else if (nameLink == 'photos' && !(photos && photos.length)) {
            continue;
        } else {
            const linkItem = document.createElement('li');
            linkItem.innerHTML = `<a class="${nameMenu}-item ${nameMenu}-item_${colors[indexActiveColor]} changeThema" href="${link.href}">${link.title}</a>`;
            menu.append(linkItem);
            elementsWithThema.push(linkItem);
        }
    };

    const messengers = document.createElement('div');

    if (nameMenu != 'dropmenu__menu') {
        messengers.innerHTML = `<div class="messengers">
            <a href="https://t.me/TalantariyBot" target="_blank"><img src="icons/icon_telegram.svg" alt="телеграмм" class="messengers__icon"></a>
            <img src="icons/icon_instagram.svg" alt="инстраграмм" class="messengers__icon">
            <a href="https://wa.me/message/WKKLULS6YKXGJ1" target="_blank"><img src="icons/icon_whatsapp.svg" alt="whatsapp" class="messengers__icon"></a>
        </div>`;
        menu.append(messengers);
    } else {
        messengers.innerHTML = `<div class="messengers">
            <a href="https://t.me/TalantariyBot" target="_blank"><img src="icons/icon_telegram.svg" alt="телеграмм" class="messengers__icon_big"></a>
            <img src="icons/icon_instagram.svg" alt="инстраграмм" class="messengers__icon_big">
            <a href="https://wa.me/message/WKKLULS6YKXGJ1" target="_blank"><img src="icons/icon_whatsapp.svg" alt="whatsapp" class="messengers__icon_big"></a>
        </div>`;
        menu.parentElement.append(messengers);
    }
};

function changeSlide(typeSlider, slides, typeBtn) {
    let numSlide = slides.findIndex((slide) => 
                slide.classList.contains('slide_active_right') 
                || slide.classList.contains('slide_active_left'));
                
    if (typeBtn == 'next') {
        slides[numSlide].classList.replace(slides[numSlide].classList[1], 'slide_no-active_right');
        numSlide = (numSlide + 1) % slides.length;
        slides[numSlide].classList.replace(slides[numSlide].classList[1], 'slide_active_right');
    } else {
        slides[numSlide].classList.replace(slides[numSlide].classList[1], 'slide_no-active_left');
        numSlide = numSlide > 0 ? numSlide - 1 : slides.length - 1;
        slides[numSlide].classList.replace(slides[numSlide].classList[1], 'slide_active_left');
    }
    const btnPrev = document.querySelector(`.slider_${typeSlider}-prev`);
    const btnNext = document.querySelector(`.slider_${typeSlider}-next`);
    btnPrev.disabled = true;
    btnNext.disabled = true;

    setTimeout(() => {
        btnPrev.disabled = false;
        btnNext.disabled = false;
    }, 800);
};

function renderSliderTeams() {
    if (employees && employees.length) {
        renderSection('Команда', 'team', 1);
        const cntCardInSlide = 6;
        renderSlider('team', cntCardInSlide);
    } else {
        document.querySelector('.section-team').style.padding = 0;
    }
};

function renderSliderNews() {
    if (news && news.length) {
        renderSection('Новости и события', 'news', 0);
        const cntCardInSlide = 3;
        renderSlider('news', cntCardInSlide);
    } else {
        document.querySelector('.section-news').style.padding = 0;
    }
};

function renderSliderPhotos() {
    if (photos && photos.length) {
        renderSection('Фотогалерея', 'photos', 1);
        const cntCardInSlide = 2;
        renderSlider('photos', cntCardInSlide);
    } else {
        document.querySelector('.section-photos').style.padding = 0;
    }
};

function renderSection(sectionTitle, sectionId, sectionType) {
    const section = document.querySelector(`.section-${sectionId}`);

    section.innerHTML = `<div class="marker" id="${sectionId}"></div>
        <h2 class="section-title">${sectionTitle}</h2>
        <div class="slider slider_${sectionId}">
            <button class="slider__prev-slide slider__btnSlide slider_${sectionId}-prev hidden">
                <img class="slider__arrow" src="icons/arrowLeftt.svg" alt="prevSlide">
            </button>
            <button class="slider__next-slide slider__btnSlide slider_${sectionId}-next hidden">
                <img class="slider__arrow" src="icons/arrowRight.svg" alt="nextSlide">
            </button>
        </div>`;

    const indexSection = [...document.querySelectorAll('.marker')].findIndex((s) => s.id == sectionId);

    if (sectionType != indexSection % 2) {
        const sectionClass = (indexSection % 2 == 0) ? 'section-even' : 'section-odd';
        section.classList.replace(section.classList[0], sectionClass);
        section.classList.replace(section.classList[1], `${sectionClass}_${colors[indexActiveColor]}`);
    };
};

function renderSlider(typeSlider, cntCardInSlide) {
    if (typeSlider != "team" && typeSlider != "news" && typeSlider != "photos") {
        return;
    }
    
    const slider = document.querySelector(`.slider_${typeSlider}`);
    let slides;
    let classCard;
    let arrData;

    if (typeSlider == 'team') {
        slides = slidesTeam;
        classCard = 'personCard';
        arrData = employees;
    } else if (typeSlider == 'news') {
        slides = slidesNews;
        classCard = 'newsCard';
        arrData = news;
    } else if (typeSlider == 'photos') {
        slides = slidesPhotos;
        classCard = 'photoCard';
        arrData = photos;
    }

    const cntSlides = Math.floor(arrData.length / cntCardInSlide) + 1;

    if (cntSlides > 1 && cntCardInSlide < arrData.length) {
        const btnPrev = document.querySelector(`.slider_${typeSlider}-prev`);
        const btnNext = document.querySelector(`.slider_${typeSlider}-next`);

        btnPrev.classList.remove('hidden');
        btnNext.classList.remove('hidden');
                
        btnPrev.addEventListener('click', () => changeSlide(typeSlider, slides, 'prev'));
        btnNext.addEventListener('click', () => changeSlide(typeSlider, slides, 'next'));
    } else {
        cntCardInSlide = arrData.length;
    }

    for (let i = 0; i < cntSlides; i++) {
        const slide = document.createElement('div');
        slide.classList.add('slide');
        slide.classList.add('slide_no-active_right');
        for (let j  = 0; j < cntCardInSlide; j++) {
            const card = document.createElement('div');
            card.classList.add(classCard);
            const elem = arrData[i * cntCardInSlide + j];

            if (elem) {
                if (typeSlider == 'team') {
                    card.dataset.id = elem.id;
                }
                card.innerHTML = renderCard(classCard, elem.photo, elem.name, elem.text);
            } else {
                card.classList.add(`${classCard}_empty`);
            }

            slide.append(card);
        }
        slides.push(slide);
        slider.append(slide);
    }
    slides[0].classList.replace('slide_no-active_right', 'slide_active_right');
};

function renderCard(classCard, photo, name='', text='') {
    if (classCard == 'photoCard') {
        return `<img class="photoCard__img" src="${photo}" alt="фото">`;
    } else {
        return `<div class="${classCard}__photo">
        ${photo ? `<img class="${classCard}__img" src="${photo}" alt="фото">` : ''}
            </div>
            <h3 class="${classCard}__name card-title">${name}</h3>
            <p class="${classCard}__text card-text">${text}</p>`;
    }
};