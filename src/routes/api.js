'use strict';

const express = require('express');
const moment = require('moment');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const logger = require('../modules/logger.service');

router.get('/healthCheck', (request, response, next) => {
    let loggingId = logger.generateId();
    let timestamp = moment().format(logger.timestampFormat);
    logger.info(`GET: /healthCheck`);

    next({ response: 'success' });
});

router.get('/investments', (request, response, next) => {
    let loggingId = logger.generateId();
    let timestamp = moment().format(logger.timestampFormat);
    logger.info(`GET: /investments`);

    let investments = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/investments.json')));
    next(investments);
});

router.get('/timesheets', (request, response, next) => {
    let loggingId = logger.generateId();
    let timestamp = moment().format(logger.timestampFormat);
    logger.info(`GET: /timesheets`);

    let investments = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/timesheets.json')));
    next(investments);
});

module.exports = router;