"use strict";

// UNCOMMENT ONLY FOR node.js
//const dayjs = require('dayjs');

// Film constructor function
function Film(id, title, favourite, date = undefined, rating = undefined) {
    this.id = id;
    this.title = title;
    this.favourite = favourite || false;
    this.date = date ? dayjs(date) : date;
    this.rating = rating;
<<<<<<< HEAD
<<<<<<< HEAD
    this.library = undefined;
=======
>>>>>>> f431092 (lab04)
=======
    this.library = undefined;
>>>>>>> 4e871ee (Finished lab04)

    this.toString = () => {
        let s = `\nFilm ${this.id}:\n`
        s += `\tTitle: ${this.title}\n`
        s += `\tFavourite: ${this.favourite}\n`
        if (this.date) {
            s += `\tDate: ${this.date.format('DD MMMM YYYY')}\n`
        }
        if (this.rating) {
            s += `\tRating: ${this.rating}\n`
        }
        return s;
    }
}

// FilmLibrary constructor function
function FilmLibrary() {
    this.list = []

    this.init = (film_list = null) => {
        if (film_list !== null && film_list !== undefined) {
            this.list.push(...film_list)
        }
        let films = [new Film(1, "Pulp Fiction", true, "2022-03-10", 5),
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> b152e86 (Point 2)
            new Film(2, "21 Grams", true, "2022-03-17", 4),
            new Film(3, "Star Wars"),
            new Film(4, "Matrix"),
            new Film(5, "Shrek", false, "2022-03-21", 3),
<<<<<<< HEAD
        ];
        for (const film of films) {
            film.library = this;
<<<<<<< HEAD
=======
                    new Film(2, "21 Grams", true, "2022-03-17", 4),
                    new Film(3, "Star Wars"),
                    new Film(4, "Matrix"),
                    new Film(5, "Shrek", false, "2022-03-21", 3),
=======
>>>>>>> b152e86 (Point 2)
        ];
        for (const film of films) {
>>>>>>> f431092 (lab04)
=======
>>>>>>> 4e871ee (Finished lab04)
            this.addNewFilm(film);
        }
    }


    this.addNewFilm = (film) => {
        if (film != null && film != undefined) {
            if (this.list.filter(f => f.id === film.id) == 0) {
                this.list.push(film);
            }
        }
    }

    this.sortByDate = () => {
        let withDate = this.list.filter(f => f.date !== undefined);
        let remaining = this.list.filter(f => f.date === undefined);
        withDate.sort((f1, f2) => f2.date.isAfter(f1.date));
        withDate.push(...remaining);
        return withDate;
    }

    this.deleteFilm = (id) => {
        this.list = this.list.filter(f => f.id !== id);
    }

    this.resetWatchedFilms = () => {
        for (const film of this.list) {
            film.date = undefined;
        }
    }

    this.getRated = () => {
        let rated = this.list.filter(f => f.rating);
        rated.sort((f1, f2) => f2.rating - f1.rating);
        return rated;
    }

    this.toString = () => {
        return this.list.toString();
    }

<<<<<<< HEAD
<<<<<<< HEAD
    /* Sidebar Methods */

    this.getAll = () => {
        return this.list;
    }

    this.getFavourite = () => {
        return this.list.filter(f => f.favourite);
    }

    this.getBestRated = () => {
        return this.list.filter(f => f.rating == 5);
    }

    this.getSeenLastMonth = () => {
        return this.list.filter(f => f.date && f.date.isAfter(dayjs().subtract(30, 'day')));
    }

    this.getUnseen = () => {
        return this.list.filter(f => !f.date);
    }
}

function createFilmTableRow2(film) {
    let s = `<tr>
        <td>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" style="margin-bottom:1%" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg>
        ${film.title}</td>
=======
=======
    /* Sidebar Methods */

>>>>>>> b152e86 (Point 2)
    this.getAll = () => {
        return this.list;
    }

    this.getFavourite = () => {
        return this.list.filter(f => f.favourite);
    }

    this.getBestRated = () => {
        return this.list.filter(f => f.rating == 5);
    }

    this.getSeenLastMonth = () => {
        return this.list.filter(f => f.date && f.date.isAfter(dayjs().subtract(30, 'day')));
    }

    this.getUnseen = () => {
        return this.list.filter(f => !f.date);
    }
}

function createFilmTableRow2(film) {
    let s = `<tr>
<<<<<<< HEAD
        <td>${film.title}</td>
>>>>>>> f431092 (lab04)
=======
        <td>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" style="margin-bottom:1%" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg>
        ${film.title}</td>
>>>>>>> 4e871ee (Finished lab04)
        <td><input class="form-check-input" type="checkbox" value="" 
            id="flexCheckDefault" ${film.favourite ? 'checked' : ''}>
            <label class="form-check-label" for="flexCheckDefault">
            Favorite
        </label></td>
        <td>${film.date? film.date.format('MMM D, YYYY') : ''}</td>
        <td>`;

    for (let i = 0; i < 5; i++) {
        if (i < film.rating) {
            s += '<span class="fa fa-star checked"></span>';
        } else {
            s += '<span class="fa fa-star"></span>';
        }
    }

    s += `</td>
    </tr>`;
<<<<<<< HEAD
<<<<<<< HEAD



    return s;
}

function createFilmTableRow(film) {
    const tr = document.createElement('tr');

    const tdTitle = document.createElement('td');
    tdTitle.innerText = film.title;
    let trashIcon = document.createElement('i');
    trashIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" style="margin-bottom:1%; margin-right:1%" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg>`;

    trashIcon.addEventListener('click', e => {
        tr.remove();
        film.library.deleteFilm(film.id);
    });

    tdTitle.insertAdjacentElement('afterbegin', trashIcon);
    tr.appendChild(tdTitle);

    const tdFav = document.createElement('td');
    tdFav.innerHTML = `<input class="form-check-input" type="checkbox" value="" 
                        id="flexCheckDefault" ${film.favourite ? 'checked' : ''}>
                        <label class="form-check-label" for="flexCheckDefault">
                        Favorite
                        </label>`;
    tr.appendChild(tdFav);

    const tdDate = document.createElement('td');
    tdDate.innerText = film.date? film.date.format('MMM D, YYYY') : '';
    tr.appendChild(tdDate);

    const tdScore = document.createElement('td');
    let s = '';
    for (let i = 0; i < 5; i++) {
        if (i < film.rating) {
            s += '<span class="fa fa-star checked"></span>';
        } else {
            s += '<span class="fa fa-star"></span>';
        }
    }
    tdScore.innerHTML = s;
    tr.appendChild(tdScore);

    return tr;
}


=======
    return s;
}

>>>>>>> f431092 (lab04)
=======



    return s;
}

function createFilmTableRow(film) {
    const tr = document.createElement('tr');

    const tdTitle = document.createElement('td');
    tdTitle.innerText = film.title;
    let trashIcon = document.createElement('i');
    trashIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" style="margin-bottom:1%; margin-right:1%" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg>`;

    trashIcon.addEventListener('click', e => {
        tr.remove();
        film.library.deleteFilm(film.id);
    });

    tdTitle.insertAdjacentElement('afterbegin', trashIcon);
    tr.appendChild(tdTitle);

    const tdFav = document.createElement('td');
    tdFav.innerHTML = `<input class="form-check-input" type="checkbox" value="" 
                        id="flexCheckDefault" ${film.favourite ? 'checked' : ''}>
                        <label class="form-check-label" for="flexCheckDefault">
                        Favorite
                        </label>`;
    tr.appendChild(tdFav);

    const tdDate = document.createElement('td');
    tdDate.innerText = film.date? film.date.format('MMM D, YYYY') : '';
    tr.appendChild(tdDate);

    const tdScore = document.createElement('td');
    let s = '';
    for (let i = 0; i < 5; i++) {
        if (i < film.rating) {
            s += '<span class="fa fa-star checked"></span>';
        } else {
            s += '<span class="fa fa-star"></span>';
        }
    }
    tdScore.innerHTML = s;
    tr.appendChild(tdScore);

    return tr;
}


>>>>>>> 4e871ee (Finished lab04)
function populateTable(films) {
    const table = document.getElementById('film-table');

    for (const film of films) {
<<<<<<< HEAD
<<<<<<< HEAD
        // const filmElement = createFilmTableRow2(film);
        // table.insertAdjacentHTML('afterbegin', filmElement);
        const filmElement = createFilmTableRow(film);
        table.insertAdjacentElement('afterbegin', filmElement);
=======
        const filmElement = createFilmTableRow(film);
        console.log(filmElement);
        table.insertAdjacentHTML('afterbegin', filmElement);
>>>>>>> f431092 (lab04)
=======
        // const filmElement = createFilmTableRow2(film);
        // table.insertAdjacentHTML('afterbegin', filmElement);
        const filmElement = createFilmTableRow(film);
        table.insertAdjacentElement('afterbegin', filmElement);
>>>>>>> 4e871ee (Finished lab04)
    }
}


<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> b152e86 (Point 2)
function clearTable() {
    document.querySelector('#film-table').innerHTML = '';
}


function sidebarUnclick() {
    let clicked = document.querySelector(".nav-link.active");
    clicked.className = "nav-link text-white";
}

<<<<<<< HEAD
=======
>>>>>>> f431092 (lab04)
=======
>>>>>>> b152e86 (Point 2)
/*
Id: 1, Title: Pulp Fiction, Favorite: true, Watch date: March 10, 2022, Score: 5
Id: 2, Title: 21 Grams, Favorite: true, Watch date: March 17, 2022, Score: 4
Id: 3, Title: Star Wars, Favorite: false, Watch date: <not defined>, Score: <not assigned>
Id: 4, Title: Matrix, Favorite: false, Watch date: <not defined>, Score: <not assigned>
Id: 5, Title: Shrek, Favorite: false, Watch date: March 21, 2022, Score: 3
*/

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> b152e86 (Point 2)
function sidebarInit(filmLibrary) {
    let pageTitle = document.getElementById('page-title');

    // 1. All
    let allBtn = document.getElementById('sidebar-all');
    allBtn.addEventListener('click', e => {
        clearTable();
        // set current view to All
        pageTitle.innerText = 'All';
        const films = filmLibrary.getAll();
        populateTable(films);
        sidebarUnclick();
        allBtn.className = "nav-link active";
    });

    let favBtn = document.getElementById('sidebar-fav');
    favBtn.addEventListener('click', e => {
        clearTable();
        // set current view to Favorite
        pageTitle.innerText = 'Favorite';
        const films = filmLibrary.getFavourite();
        populateTable(films);
        sidebarUnclick();
        favBtn.className = "nav-link active";
    });

    let bestBtn = document.getElementById('sidebar-best');
    bestBtn.addEventListener('click', e => {
        clearTable();
        // set current view to Favorite
        pageTitle.innerText = 'Best rated';
        const films = filmLibrary.getBestRated();
        populateTable(films);
        sidebarUnclick();
        bestBtn.className = "nav-link active";
    });

    let lastSeenBtn = document.getElementById('sidebar-last-seen');
    lastSeenBtn.addEventListener('click', e => {
        clearTable();
        // set current view to Favorite
        pageTitle.innerText = 'Seen last month';
        const films = filmLibrary.getSeenLastMonth();
        populateTable(films);
        sidebarUnclick();
        lastSeenBtn.className = "nav-link active";
    });

    let unseenBtn = document.getElementById('sidebar-unseen');
    unseenBtn.addEventListener('click', e => {
        clearTable();
        // set current view to Favorite
        pageTitle.innerText = 'Unseen';
        const films = filmLibrary.getUnseen();
        populateTable(films);
        sidebarUnclick();
        unseenBtn.className = "nav-link active";
    });
}

function main() {
    let filmLibrary = new FilmLibrary;
    filmLibrary.init();

    sidebarInit(filmLibrary);

    const films = filmLibrary.getAll();
    populateTable(films);
}
<<<<<<< HEAD

main();
=======
let filmLibrary = new FilmLibrary;
filmLibrary.init();

const films = filmLibrary.getAll();
populateTable(films);
>>>>>>> f431092 (lab04)
=======

main();
>>>>>>> b152e86 (Point 2)
