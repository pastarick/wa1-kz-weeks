"use strict";

const dayjs = require('dayjs');
const sqlite = require('sqlite3');

// Film constructor function
function Film(id, title, favourite, date=undefined, rating=undefined) {
    this.id = id;
    this.title = title;
    this.favourite = favourite || false;
    this.date = dayjs(date);
    this.rating = rating;

    this.toString = () => {
        let s = `\nFilm ${this.id}:\n`;
        s += `\tTitle: ${this.title}\n`;
        s += `\tFavourite: ${this.favourite}\n`;
        if(this.date) {
            s += `\tDate: ${this.date.format('DD MMMM YYYY')}\n`;
        }
        if(this.rating) {
            s += `\tRating: ${this.rating}\n`
        }
        return s;
    }
}

// FilmLibrary constructor function
function FilmLibrary() {
    this.list = []
    this.db = new sqlite.Database('films.db', err => {if(err) throw err});

    this.addNewFilm = (film) => {
        if(film != null && film != undefined) {
            if(this.list.filter(f => f.id === film.id) == 0) {
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
        for(const film of this.list) {
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

    /* ASYNCHRONOUS METHODS */

    this.getDBMovies = () => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM films';
            this.db.all(sql, (err, rows) => {
                if(err) {
                    reject(err);
                }
                const films = rows.map(row => new Film(row.id, row.title, row.favorite, row.watchdate, row.rating));
                resolve(films);
            });
        });
    }

    this.getDBFavourites = () => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM films WHERE favorite=1';
            this.db.all(sql, (err, rows) => {
                if(err) 
                    reject(err);
                
                const films = rows.map(row => new Film(row.id, row.title, row.favorite, row.watchdate, row.rating));
                resolve(films);
            })
        });
    }

    this.getDBTodayFilms = () => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM films WHERE watchdate=DATE()';
            this.db.all(sql, (err, rows) => {
                if(err)
                    throw err;
                
                const films = rows.map(row => new Film(row.id, row.title, row.favorite, row.watchdate, row.rating));
                resolve(films);
            })
        }); 
    }

    this.getDBWatchedBefore = (date) => {
        date = dayjs(date).format('YYYY-MM-DD');
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM films WHERE watchdate < ?';
            this.db.all(sql, [date], (err, rows) => {
                if(err) {
                    reject(err);
                }
                
                const films = rows.map(row => new Film(row.id, row.title, row.favorite, row.watchdate, row.rating));
                resolve(films);
            });
        });
    }

    this.getDBRating = (rating) => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM films WHERE rating >= ?';
            this.db.all(sql, [rating], (err, rows) => {
                if(err)
                    reject(err);
                
                const films = rows.map(row => new Film(row.id, row.title, row.favorite, row.watchdate, row.rating));
                resolve(films);
            });
        });
    }

    this.getDBByTitle = (title) => {
        title = title.toLowerCase();
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM films WHERE lower(title) = ?';
            this.db.all(sql, [title], (err, rows) => {
                if(err)
                    reject(err);
                
                const films = rows.map(row => new Film(row.id, row.title, row.favorite, row.watchdate, row.rating));
                resolve(films);
            });
        });
    }

    this.addDBFilm = (film) => {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO films(id, title, favorite, watchdate, rating)\
                         VALUES(?, ?, ?, DATE(?), ?)';
            this.db.run(sql, [film.id, film.title, film.favorite? 1 : 0, film.date.format('YYYY-MM-DD'), film.rating], (err) => {
                if(err) {
                    console.error(`Couldn't insert film ${film}`);
                    reject(err)
                }
                else {
                    console.log(`Successfully inserted film ${film}`);
                }
            });
        });
    }

    this.removeDBFilm = (id) => {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM films WHERE id = ?';
            this.db.run(sql, [id], (err) => {
                if(err) {
                    console.error(`Couldn't delte film with id ${id}`);
                    reject(err)
                }
                else {
                    console.log(`Successfully deleted film with id ${id}`);
                }
            });
        });
    }

    this.resetDBWatchDate = () => {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE films \
                         SET watchdate=null';
            this.db.run(sql, (err) => {
                if(err) {
                    console.error(`Couldn't update films database`);
                    reject(err)
                }
                else {
                    console.log(`Successfully reset date in db`);
                }
            });
        });
    }

}


async function main() {
    /*
    Id: 1, Title: Pulp Fiction, Favorite: true, Watch date: March 10, 2022, Score: 5
    Id: 2, Title: 21 Grams, Favorite: true, Watch date: March 17, 2022, Score: 4
    Id: 3, Title: Star Wars, Favorite: false, Watch date: <not defined>, Score: <not assigned>
    Id: 4, Title: Matrix, Favorite: false, Watch date: <not defined>, Score: <not assigned>
    Id: 5, Title: Shrek, Favorite: false, Watch date: March 21, 2022, Score: 3
    */

    let film1 = new Film(1, "Pulp Fiction", true, dayjs("2022-03-10"), 5);
    let film2 = new Film(2, "21 Grams", true, dayjs("2022-03-17"), 4);
    let film3 = new Film(3, "Star Wars");
    let film4 = new Film(4, "Matrix");
    let film5 = new Film(5, "Shrek", false, dayjs("2022-03-21"), 3);

    let films = [film1, film2, film3, film4, film5]

    let filmLibrary = new FilmLibrary;
    for(const film of films) {
        filmLibrary.addNewFilm(film);
    }

    // console.log(filmLibrary.toString());

    // OK: console.log(filmLibrary.sortByDate());

    // OK: filmLibrary.deleteFilm(4);
    // console.log(filmLibrary);

    // OK: filmLibrary.resetWatchedFilms();
    // console.log(filmLibrary);

    // console.log(filmLibrary.getRated());
    console.log("All films:");
    const dbMovies = await filmLibrary.getDBMovies();
    console.log(dbMovies.toString());

    console.log("Favourite films:");
    const dbFavourites = await filmLibrary.getDBFavourites();
    console.log(dbFavourites.toString());

    console.log("Watched today:");
    const dbToday = await filmLibrary.getDBTodayFilms();
    console.log(dbToday.toString());

    console.log("Watched before today:");
    const dbBeforeToday = await filmLibrary.getDBWatchedBefore('2022-03-12');
    console.log(dbBeforeToday.toString());

    let rating = 3;
    console.log(`Rating greater than ${rating}:`);
    const dbRating = await filmLibrary.getDBRating(rating);
    console.log(dbRating.toString());

    let title = '21 GRAMS';
    console.log(`Matching movies with ${title};`);
    const dbTitles = await filmLibrary.getDBByTitle(title);
    console.log(dbTitles.toString());

    // let lotr = new Film(7, 'The Lord of the Rings', true, null, 5);
    // console.log("Trying to add new movie...");
    // await filmLibrary.addDBFilm(lotr);

    // console.log("Trying to delete a film...");
    // await filmLibrary.removeDBFilm(7);

    console.log("Trying to reset dates...");
    await filmLibrary.resetDBWatchDate();
}

main();