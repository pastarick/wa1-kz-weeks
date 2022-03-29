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
                    new Film(2, "21 Grams", true, "2022-03-17", 4),
                    new Film(3, "Star Wars"),
                    new Film(4, "Matrix"),
                    new Film(5, "Shrek", false, "2022-03-21", 3),
        ];
        for (const film of films) {
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

    this.getAll = () => {
        return this.list;
    }
}

function createFilmTableRow(film) {
    let s = `<tr>
        <td>${film.title}</td>
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
    return s;
}

function populateTable(films) {
    const table = document.getElementById('film-table');

    for (const film of films) {
        const filmElement = createFilmTableRow(film);
        console.log(filmElement);
        table.insertAdjacentHTML('afterbegin', filmElement);
    }
}


/*
Id: 1, Title: Pulp Fiction, Favorite: true, Watch date: March 10, 2022, Score: 5
Id: 2, Title: 21 Grams, Favorite: true, Watch date: March 17, 2022, Score: 4
Id: 3, Title: Star Wars, Favorite: false, Watch date: <not defined>, Score: <not assigned>
Id: 4, Title: Matrix, Favorite: false, Watch date: <not defined>, Score: <not assigned>
Id: 5, Title: Shrek, Favorite: false, Watch date: March 21, 2022, Score: 3
*/

let filmLibrary = new FilmLibrary;
filmLibrary.init();

const films = filmLibrary.getAll();
populateTable(films);