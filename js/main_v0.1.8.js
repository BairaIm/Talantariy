'use strict';

// URL
// const HOME_URL = 'http://127.0.0.1:5500/';
const CABINET_URL = 'cabinet.html';
const SUBJECT_URL = 'subject.html';

// pages
const schedule = document.querySelector('.schedule');
const scheduleItems = document.querySelectorAll('.schedule__item');

const btnDropmenu = document.querySelector('.navigation__toggle');
const wrapperDropmenu = document.querySelector('.wrapper');
const dropmenu = document.querySelector('.dropmenu');

const btnRooms = document.querySelectorAll('.room');
let numRoomActive = 1;

const divSubjects = document.querySelector('.subjects');
const btnCategories = document.querySelectorAll('.category');
let numCategoryActive = 0;

const slidesTeam = [];
let numSlideTeam = 0;

const slidesNews = [];
let numSlideNews = 0;

const slidesPhotos = [];
let numSlidePhotos = 0;

let elementsWithThema =  [...document.querySelectorAll('.changeThema')];
const btnsThema = document.querySelectorAll('input[name="thema"]');
const labelsThema = document.querySelectorAll('.thema__item');

const colors = ['blue', 'green', 'white'];
let indexActiveColor = 0;
const ACTIVE_COLOR_KEY = "indexActiveColor";

const lessonsInRoom1 = [
    {subject: 'Мама и малыш группа 1', day: 1, timeStart: 9}, 
    {subject: 'Мама и малыш группа 2', day: 1, timeStart: 10}, 
    {subject: 'ГКП', day: 2, timeStart: 9}, 
    {subject: 'ГКП', day: 2, timeStart: 10}, 
    {subject: 'ГКП', day: 2, timeStart: 11}, 
    {subject: 'Мама и малыш группа 1', day: 3, timeStart: 9}, 
    {subject: 'Мама и малыш группа 2', day: 3, timeStart: 10}, 
    {subject: 'ГКП', day: 4, timeStart: 9}, 
    {subject: 'ГКП', day: 4, timeStart: 10}, 
    {subject: 'ГКП', day: 4, timeStart: 11}
]

const lessonsInRoom2 = [
    {subject: 'Мама и малыш группа 1', day: 2, timeStart: 9}, 
    {subject: 'Мама и малыш группа 2', day: 2, timeStart: 10}, 
    {subject: 'ГКП', day: 1, timeStart: 9}, 
    {subject: 'ГКП', day: 1, timeStart: 10}, 
    {subject: 'ГКП', day: 1, timeStart: 11}, 
    {subject: 'Мама и малыш группа 1', day: 4, timeStart: 9}, 
    {subject: 'Мама и малыш группа 2', day: 4, timeStart: 10}, 
    {subject: 'ГКП', day: 3, timeStart: 9}, 
    {subject: 'ГКП', day: 3, timeStart: 10}, 
    {subject: 'ГКП', day: 3, timeStart: 11}
]

const categories = ['kids', 'preschoolers', 'pupils'];
const subjects = {
    early: {title: 'Ранее развитие', descr: 'Учимся с раннего возраста', age: 'Для детей от 3 до 4 лет', icon: 'icons/icon_early.svg', url: 'early', photo: ''},
    withMom: {title: 'Вместе с Мамой', descr:'Учимся вместе с мамой', age: 'Для детей от 1 года до 3 лет', icon: 'icons/icon_with_mom.svg', url: 'withMom', photo: ''},
    temp: {title: 'Ритмика', descr: 'Учимся чувствовать ритм.', age: 'Для детей от 2 до 4 лет', icon: 'icons/icon_temp.svg', url: 'temp', photo: ''},
    art: {title: 'Творческая мастерская', descr: 'Учимся рисовать.', age: 'Для детей от 2 до 4 лет', icon: 'icons/icon_palette.svg', url: 'art', photo: ''},
    speech: {title: 'Логопед', descr: 'Учимся говорить четко.', age: 'Для детей от 3 лет', icon: 'icons/icon_speech_therapist.svg', url: 'speech', photo: ''},
    gkp: {title: 'Группа кратковременного пребывания (ГКП)', descr: 'проводим время в компании.', age: 'Для детей от 2 до 4 лет', icon: 'icons/icon_kindergarten.svg', url: 'gkp', photo: ''},
    preparation: {title: 'Подготовка к школе', descr: 'Готоимся к школе.', age: 'Для детей от 5 до 7 лет', icon: 'icons/icon_preparation.svg', url: 'preparation', photo: ''},
    chess: {title: 'Шахматы', descr: 'Игра в шахматы – это не только развлечение, но и полезный навык для детей. Она развивает логическое мышление, концентрацию внимания и стратегическое мышление. Кроме того, шахматы помогают детям улучшать память, учиться анализировать ситуации и принимать решения.', age: 'Для детей от 5 лет', icon: 'icons/icon_chess.svg', url: 'chess', photo: ''},
    game: {title: 'Клуб настольных игр', descr: 'Играем в настольные игры.', age: 'Для детей от 4 лет', icon: 'icons/icon_game.svg', url: 'game', photo: ''},
    math: {title: 'Занимательная математика', descr: 'Учимся математике с интересом.', age: 'Для детей от 7 лет', icon: 'icons/icon_math.svg', url: 'math', photo: ''},
};

const teams = [
    {name: 'Оленина Айса Анатольевна', text: 'Руководитель центра', photo: 'img/avatar1-min.webp'}, 
    {name: 'Иванова Татьяна Сергеевна', text: 'Администратор'}, 
    {name: 'Петрова Татьяна Сергеевна', text: 'Администратор'}, 
    {name: 'Сидорова Татьяна Сергеевна', text: 'Воспитатель'},
    {name: 'Оленина Айса Анатольевна', text: 'Тренер по Шахматам', photo: 'img/avatar1-min.webp'},
    {name: 'Иванова Татьяна Сергеевна', text: 'Педагог раннего развития'},
    {name: 'Петрова Татьяна Сергеевна', text: 'Педагог арт мастерской'},
    {name: 'Сидорова Татьяна Сергеевна', text: 'Логопед'},
    {name: 'Иванова Татьяна Сергеевна', text: 'Администратор'}, 
    {name: 'Петрова Татьяна Сергеевна', text: 'Администратор'}, 
    {name: 'Сидорова Татьяна Сергеевна', text: 'Воспитатель'},
]

const news = [
    {name: 'Мы открылись!', text: '01.10.2023'},
    {name: 'Начался набор', text: '10.10.2023'},
    {name: 'Занятия по безопасности', text: '01.10.2023'},
    {name: 'Акция в честь открытия!', text: '01.10.2023'},
]

const photos = [
    {photo: 'img/side-view-kid-cheating-at-school-test-min.webp'},
    {photo: 'img/teacher-holding-english-class-min.webp'},
    {photo: 'img/cute-boy-thinking-at-lesson-min.webp'}
];

let subjectsByCategories = {
    kids: [ subjects.early, subjects.withMom, subjects.temp, subjects.art, subjects.speech, subjects.gkp ],
    preschoolers: [ subjects.preparation, subjects.chess, subjects.game, subjects.art, subjects.speech ],
    pupils: [ subjects.math, subjects.chess, subjects.game, subjects.art, subjects.speech ]
};

init();

function init() {
    loadData();
    changeThema(colors[indexActiveColor]);
    
    renderFooter();

    if (document.URL.includes('index.html')) {
        window.location.href = '/';
    } else if (document.URL.includes(SUBJECT_URL)) {
        const subjectName = document.URL.substring(document.URL.indexOf('#') + 1);
        renderSubjects(subjectName);
        document.querySelectorAll(`a[href^="${SUBJECT_URL}#"`).forEach((link) => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
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
    } else if (document.URL.includes('404.html')) {

    } else {
        renderCategories(1);
        renderSchedule(0);
        renderTeams();
        renderNews();
        renderPhotos();

        btnRooms.forEach((room, index) => room.addEventListener('click', () => renderSchedule(index)));
        btnCategories.forEach((category, index) => {
            category.addEventListener('click', () => renderCategories(index))
        });

        document.querySelectorAll('a[href^="/#"').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();

                let href = this.getAttribute('href').substring(2);
                smoothScrolling(href);
                if (!wrapperDropmenu.classList.contains('hidden')) {
                    btnDropmenu.click();
                }
            });
        });

        if (document.URL.includes('#')) {
            const href = document.URL.substring(document.URL.indexOf('#') + 1);
            smoothScrolling(href);
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

function changeSlide(typeSlider, slides, typeBtn) {
    let numSlide = slides.findIndex((slide) => slide.classList.contains('slide_active'));

    slides[numSlide].classList.remove('slide_active');

    if (typeBtn == 'next') {
        numSlide = (numSlide + 1) % slides.length;
    } else {
        numSlide = numSlide > 0 ? numSlide - 1 : slides.length - 1;
    }
    
    slides[numSlide].classList.add('slide_active');

    if (typeSlider == 'team') {
        numSlideTeam = numSlide;
    } else if (typeSlider == 'news') {
        numSlideNews = numSlide;
    } else if (typeSlider == 'photos') {
        numSlidePhotos = numSlide;
    }
}

// render
function renderCategories(numCategory) {
    if (numCategory == numCategoryActive) {
        return;
    }
    divSubjects.innerHTML = '';

    let maxLen = 0;

    for (let category in subjectsByCategories) {
        if (subjectsByCategories[category].length > maxLen) {
            maxLen = subjectsByCategories[category].length;
        }
    }

    for (let i = 0; i < maxLen; i++) {
        const subject = subjectsByCategories[categories[numCategory]][i];

        if (subject) {
            const subjectCard = document.createElement('a');
            subjectCard.href = `${SUBJECT_URL}#${subject.url}`;
            subjectCard.classList.add('subjectCard');
            subjectCard.classList.add(`subjectCard_${colors[indexActiveColor]}`);
            subjectCard.classList.add('changeThema');
            
            subjectCard.innerHTML = `<h3 class="card-title subjectCard__title">${subject.title}</h3>
            <p class="card-text subjectCard__text">${subject.age}</p>
            <img class="subjectCard__icon" src="${subject.icon}" alt="">`;
            divSubjects.append(subjectCard);
            elementsWithThema.push(subjectCard);
        } else {
            const subjectCard = document.createElement('div');
            subjectCard.classList.add('subjectCard');
            subjectCard.classList.add('subjectCard_empty');
            divSubjects.append(subjectCard);
        }
    }

    btnCategories[numCategoryActive].classList.remove('category_active');
    btnCategories[numCategory].classList.add('category_active');

    numCategoryActive = numCategory;
}

function renderSchedule(numRoom) {
    if (numRoom == numRoomActive) {
        return;
    }
    scheduleItems.forEach((item) => item.innerText = '');

    const lessons  = numRoom === 0 ? lessonsInRoom1 : lessonsInRoom2;
    lessons.forEach((lesson) => {
        const item = document.querySelector(`.schedule__item-D${lesson.day}-${lesson.timeStart}`);
        item.innerText = lesson.subject;
    });

    btnRooms[numRoomActive].classList.remove('room_active');
    btnRooms[numRoom].classList.add('room_active');

    numRoomActive = numRoom;
}

function renderSubjects(subjectName) {
    if (!subjectName || !subjects.hasOwnProperty(subjectName)) {
        window.location.href = `${HOME_URL}404.html`;
    }

    const subject = subjects[subjectName];

    document.querySelector('.subject__title').innerText = subject.title;
    document.querySelector('.subject__text').innerHTML = subject.descr;
    document.querySelector('.subject__age').innerHTML = subject.age;
    document.querySelectorAll('.subject__icon').forEach((icon) => icon.src = subject.icon);

    if (subject.photo) {
        document.querySelector('.subject__photo').src = subject.photo;
    }

    const topOffset = document.querySelector('.scrollto').offsetHeight;
    const elementPosition = document.querySelector('.subject__container').getBoundingClientRect().top;
    const offsetPosition = elementPosition - topOffset;

    window.scrollBy({
        top: offsetPosition,
        behavior: 'smooth'
    });

    window.location.href = `/${SUBJECT_URL}#${subjectName}`;
}

function renderTeams() {
    const cntCardInSlide = 8;
    renderSlider('team', cntCardInSlide);
}

function renderNews() {
    const cntCardInSlide = 3;
    renderSlider('news', cntCardInSlide);
}

function renderPhotos() {
    const cntCardInSlide = 2;
    renderSlider('photos', cntCardInSlide);
}

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
        arrData = teams;
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

    if (cntSlides > 1) {
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
        for (let j  = 0; j < cntCardInSlide; j++) {
            const card = document.createElement('div');
            card.classList.add(classCard);
            const elem = arrData[i * cntCardInSlide + j];

            if (elem) {
                card.innerHTML = renderCard(classCard, elem.photo, elem.name, elem.text);
            } else {
                card.classList.add(`${classCard}_empty`);
            }

            slide.append(card);
        }
        slides.push(slide);
        slider.append(slide);
    }
    slides[0].classList.add('slide_active');
}

function renderCard(classCard, photo, name='', text='') {
    if (classCard == 'photoCard') {
        return `<img class="photoCard__img" src="${photo}" alt="фото">`;
    } else {
        return `<div class="${classCard}__photo">
        ${photo 
            ? `<img class="${classCard}__img" src="${photo}" alt="фото">` : ''}
            </div>
            <h3 class="${classCard}__name card-title">${name}</h3>
            <p class="${classCard}__text card-text">${text}</p>`;
    }
}

function renderFooter() {
    const footer = document.querySelector('.footer');
    const footerMenu = document.querySelector('.footer__menu');
    const cats = {
        kids: 'Малыши',
        preschoolers: 'Дошкольники',
        pupils: 'Школьники'
    };

    for (let category of categories) {
        const div = document.createElement('div');
        div.classList.add('footer__block');

        const title = document.createElement('p');
        title.classList.add('footer__title');
        title.classList.add(`footer__title_${colors[indexActiveColor]}`);
        title.classList.add('changeThema');
        title.innerText = cats[category];

        div.append(title);
        elementsWithThema.push(title);

        for (let sub of subjectsByCategories[category]) {
            const text = document.createElement('a');
            text.classList.add('footer__text');
            text.classList.add(`footer__text_${colors[indexActiveColor]}`);
            text.classList.add('changeThema');
            text.href = `${SUBJECT_URL}#${sub.url}`;
            text.innerText = sub.title;
            
            div.append(text);
            elementsWithThema.push(text);
        }

        footer.insertBefore(div, footerMenu);
    }
}