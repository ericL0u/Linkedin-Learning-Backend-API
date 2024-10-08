const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// backend API port, directs to articles stored
const adminArticlesRouter = require('./routes/admin/articles');
// backend API port, directs to category stored
const adminCategoriesRouter = require('./routes/admin/categories');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// backend router settings
app.use('/admin/articles', adminArticlesRouter)
app.use('/admin/categories', adminCategoriesRouter)
module.exports = app;