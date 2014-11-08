var handlebars = require('hbsfy/runtime');

function formatDate(date) {
    date = new Date(Number(date.match(/([0-9])+/)[0]));
    return ('0' + date.getDate()).slice(-2) + '.' + ('0' + (date.getMonth()+1)).slice(-2) + '.' + (date.getFullYear());
};

handlebars.registerHelper('formatDate', formatDate);
