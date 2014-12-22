var gulp = require('gulp');
var Promise = require('es6-promise').Promise;
var GoogleSpreadsheet = require("google-spreadsheet");
var afk_sheet = new GoogleSpreadsheet('1svnSp174idz6UiibQbdYqOO6wGH1tbPAxANK6TVZKHc');
var convert = require('gulp-convert');
var File = require('gulp-file');
var insert = require('gulp-insert');
var replace = require('gulp-ext-replace');
var del = require('del');
var beautify = require('gulp-beautify');
var tap = require('gulp-tap');

var useless = ['_xml', 'id', 'title', 'content', '_links', 'save', 'del'];

var sex = {
    g: 'gutter',
    j: 'jenter',
    m: 'menn',
    s: 'blandet'
};

gulp.task('contacts', ['clean:contacts'], function () {
    return new Promise(function (resolve, reject) {
        return afk_sheet.getInfo(function (err, info) {

            var contacts = info.worksheets[1];

            if (contacts != undefined) {
                resolve(contacts);
            } else {
                reject(new Error('no contacts'))
            }
        })
    })
    .then(function(data) {
        var contacts = [];
        data.getRows(1, function(err, rows) {
            rows.forEach(function(row) {

                useless.forEach(function (prop) {
                    delete row[prop];
                });

                contacts.push(row);

            });
            File('contacts.json', JSON.stringify(contacts))
                .pipe(convert({
                    from: 'json',
                    to: 'yml'
                }))
                // .pipe(console.log.bind(console))
                .pipe(gulp.dest('./data'))
        });
    })
    .catch(function(error) {
        console.log(new Error(error))
    })
});


gulp.task('teams', ['clean:teams'], function () {
    return new Promise(function (resolve, reject) {
        return afk_sheet.getInfo(function (err, info) {

            var teams = info.worksheets[0];

            if (teams != undefined) {
                resolve(teams);
            } else {
                reject(new Error('no teams'))
            }
        })
    })
    .then(function(data) {
        return new Promise(function (resolve, reject) {

            var teams = [];

            data.getRows(1, function(err, rows) {

                rows.forEach(function(row, i) {

                    //var name = /(?:\S+ )(\S+ )(?:\S+)/.g(row.lagnavniturnering)[1];

                    var name = row.lagnavn;

                    var age = /([0-9]+[^\s|-])/g.exec(row.hovedlag);

                    // console.log(age);

                    var group = teams.filter(function(element) {
                        return element.title === name;
                    })[0] || {
                        title : name,
                        layout: 'team',
                        sex: sex[row.hovedlag.charAt(6).toLowerCase()],
                        age: age === null ? null : Number(age[1]),
                        teams : []
                    };

                    group.teams.push({
                        name: row.lagnavniturnering,
                        kontaktperson: row.kontaktperson,
                        fiksid: row.fiksid || null
                    });

                    if (group.teams.length === 1) {
                        teams.push(group);
                    };

                });

                if (teams.length > 0) {
                    resolve(teams)
                } else {
                    reject(Error('no teams'))
                }
            });

        });

    })
    .then(function category (data) {
        data.forEach(function (team) {

            if (team.age === null || team.age === 50) {
                team.category = 'senior';
            } else if (team.age < 13) {
                team.category = 'barn';
            } else if (team.age <= 19) {
                team.category = 'ungdom';
            };

            if (team.title.toLowerCase() === 'stjerne') {
                team.category = 'stjerne'
            };

        });
        return data;
    })
    .then(function subteams (data) {
        data.forEach(function (team) {
            if (team.teams.length > 1) {
                //console.log(team.title, 'has', team.teams.length, 'subteams');
                team.teams.forEach(function (subteam) {
                    team.subteams = team.subteams || [];
                    if (team.category === 'barn') {
                        team.subteams.push(/(?:\S+\s){2}(\S+)/g.exec(subteam.name)[1]);
                    } else {
                        team.subteams.push(subteam.name);
                    }
                    //console.log(subteam.name);
                });
            }
        });
        return data;
    })
    .then(function saveToFile (data) {

        data.forEach(function (team) {
            var filename = team.title.toLowerCase();

            filename = filename.replace(/[æøå\/]/g, function(m) {
                return {
                    '/' : '-',
                    'æ' : 'a',
                    'ø' : 'o',
                    'å' : 'a'
                }[m];
            }).replace(/\s/g, '-');

            team.slug = filename;

            File(  filename + '.json', JSON.stringify(team))
                .pipe(convert({
                    from: 'json',
                    to: 'yml'
                }))
                .pipe(insert.wrap('---\n', '---\n'))
                .pipe(replace('.md'))
                .pipe(gulp.dest('teams/' + team.category))
        })

    })
    .catch(function(error) {
        console.log(new Error(error))
    })
});

gulp.task('clean:teams', function(cb) {
    del(['./teams/**'], cb);
});

gulp.task('clean:contacts', function(cb) {
    del(['./contacts/**'], cb);
})

gulp.task('default', ['teams', 'contacts']);
