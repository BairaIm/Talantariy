import {
    lessonsInRoom1,
    lessonsInRoom2,
    categoryNames,
    subjects,
    priceTickets,
    subjectsByCategories,
    employees,
    colors,
    indexActiveColor,
    elementsWithThema
} from './data.js';

export {
    renderCategories,
    renderSchedule,
    renderPrices,
    renderSubjects,
    renderPerson,
    renderFooter,
    elementsWithThema
}

//pages
const divSubjects = document.querySelector('.subjects');
const btnCategories = document.querySelectorAll('input[name="category"]');
const btnRooms = document.querySelectorAll('.room');

//counters
let numRoomActive = 1;


function renderCategories(categoryName, SUBJECT_URL) {
    divSubjects.innerHTML = '';

    let maxLen = 0;

    for (let category in categoryNames) {
        if ((subjectsByCategories[category]?.length || 0) > maxLen) {
            maxLen = subjectsByCategories[category].length;
        }
    }

    for (let i = 0; i < maxLen; i++) {
        const subjectId = subjectsByCategories[categoryName.substring(('category_').length)][i];
        const subject = subjects.find((sub) => sub.id == subjectId);

        if (subject) {
            const subjectCard = document.createElement('a');
            subjectCard.href = `${SUBJECT_URL}#${subject.name}`;
            subjectCard.classList.add('subjectCard');
            subjectCard.classList.add(`subjectCard_${colors[indexActiveColor]}`);
            subjectCard.classList.add('changeThema');
            
            subjectCard.innerHTML = `<h3 class="card-title subjectCard__title">${subject.title}</h3>
            <p class="card-text subjectCard__text">Для детей ${subject.age}</p>
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

    btnCategories.forEach(category => category.classList.remove('category_active'));
    document.getElementById(categoryName).classList.add('category_active');
};

function renderSchedule(numRoom, SUBJECT_URL) {
    if (numRoom == numRoomActive) {
        return;
    }

    const schedule = document.querySelector('.schedule');
    const scheduleItems = document.querySelectorAll('.schedule__item');

    scheduleItems.forEach((item) => item.innerText = '');
    const usedCells = [];

    const lessons  = numRoom === 0 ? lessonsInRoom1 : lessonsInRoom2;
    lessons.forEach((lesson) => {
        for (let i = 0; i < +lesson.duration; i++) {
            usedCells.push(`D${lesson.day}-${lesson.timeStart + i}`);
        }
        const item = document.createElement('div');
        item.classList.add('schedule__item');
        item.style.gridColumn = `D${lesson.day}-${lesson.timeStart}`;
        item.style.gridRow = `D${lesson.day}-${lesson.timeStart} / span ${lesson.duration}`;
        item.innerHTML = `<a href=${SUBJECT_URL}#${subjects.find((sub) => sub.id == lesson.subjectId).name}>${lesson.subject}</a><br><b>${employees.find((person) => person.id == lesson.empId).name}</b>`;
        schedule.append(item);
    });

    for (let i = 1; i <= 7; i++) {
        for (let j = 9; j <= 19; j++) {
            if (!usedCells.includes(`D${i}-${j}`)) {
                const item = document.createElement('div');
                item.classList.add('schedule__item');
                item.classList.add(`schedule__item-D${i}-${j}`);
                schedule.append(item);
            }
        }
    }
    btnRooms[numRoomActive].classList.remove('room_active');
    btnRooms[numRoom].classList.add('room_active');

    numRoomActive = numRoom;
};

function renderPrices(SUBJECT_URL) {
    const tablePrice = document.querySelector('.price-table')
    subjects.forEach((subject) => {
        const price = priceTickets.find((price) => price.id == subject.priceId);

        tablePrice.insertAdjacentHTML('beforeend', `<div class="price-table__title price-table__title_white card-text changeThema"><a href=${SUBJECT_URL}#${subject.name}>${subject.title}</a></div>
        <div class="price-table__item price-table__item_white card-text changeThema">${price.one}</div>
        <div class="price-table__item price-table__item_white card-text changeThema">${price.four}</div>
        <div class="price-table__item price-table__item_white card-text changeThema">${price.eight}</div>
        <div class="price-table__item price-table__item_white card-text changeThema">${price.twelve}</div>`);
    })
};

function renderSubjects(subjectName) {
    const subject = subjects.find((sub) => sub.name == subjectName);

    if (!subjectName || !subject) {
        window.location.href = `/404.html`;
    }
    document.querySelector('.subject__title').innerHTML = subject.title;
    document.querySelector('.subject__text').innerHTML = subject.descr;
    document.querySelector('.subject__age').innerHTML = subject.age;
    document.querySelectorAll('.subject__icon').forEach((icon) => icon.src = subject.icon);
    document.querySelector('.subject__duration').innerHTML = subject.duration;
    document.querySelector('.subject__note').innerHTML = (subject.note) ? `Примечание: ${subject.note}` : '';

    const priceTicket = priceTickets.find((ticket) => ticket.id == subject.priceId);
    document.querySelector('.subject__price-12').innerHTML = priceTicket.twelve != '-' ? `12 занятий - ${priceTicket.twelve} руб` : '';
    document.querySelector('.subject__price-8').innerHTML = priceTicket.eight != '-' ? `8 занятий   - ${priceTicket.eight} руб` : '';
    document.querySelector('.subject__price-4').innerHTML = priceTicket.four != '-' ? `4 занятия   - ${priceTicket.four} руб` : '';
    document.querySelector('.subject__price-1').innerHTML = priceTicket.one != '-' ? `1 занятие   - ${priceTicket.one} руб` : '';
    
    if (subject.photo) {
        document.querySelector('.subject__photo').src = subject.photo;
    }

    document.querySelector('.marker').scrollIntoView();
};

function renderPerson(personCard) {
    const person = employees.find((person) => person.id == personCard.dataset.id);
    const wrapper = document.querySelector('.popup-person__wrapper');
    wrapper.classList.remove('hidden');
    
    wrapper.innerHTML = `<div class="popup-person">
        <img src="${person.photo}" alt="фото сотрудника" class="popup-person__photo">
        <p class="popup-person__name">${person.name}</p>
        <p class="popup-person__role">${person.text}</p>
        <p class="popup-person__text">${person.descr}</p>
        <button class="popup-person__close">&#10006;</button>
    </div>`;

    document.querySelector('.popup-person').focus();

    wrapper.addEventListener('click', (event) => {
        if (event.target == wrapper) {
            wrapper.classList.add('hidden');
        }
    })
    
    document.querySelector('.popup-person__close').addEventListener('click', () => {
        wrapper.classList.add('hidden');
    });
};

function renderFooter(SUBJECT_URL) {
    const footer = document.querySelector('.footer');
    const footerMenu = document.querySelector('.footer__menu');

    for (let category in categoryNames) {
        if (subjectsByCategories[category]?.length) {
            const div = document.createElement('div');
            div.classList.add('footer__block');
            
            const title = document.createElement('p');
            title.classList.add('footer__title');
            title.classList.add(`footer__title_${colors[indexActiveColor]}`);
            title.classList.add('changeThema');
            title.innerText = categoryNames[category];
    
            div.append(title);
            elementsWithThema.push(title);
    
            for (let subId of subjectsByCategories[category]) {
                const sub = subjects.find((subject) => subject.id == subId);
                const text = document.createElement('a');
                text.classList.add('footer__text');
                text.classList.add(`footer__text_${colors[indexActiveColor]}`);
                text.classList.add('changeThema');
                text.href = `${SUBJECT_URL}#${sub.name}`;
                text.innerHTML = sub.title;
                
                div.append(text);
                elementsWithThema.push(text);
            }
    
            footer.insertBefore(div, footerMenu);
        } else {
            continue;
        }
    }
};