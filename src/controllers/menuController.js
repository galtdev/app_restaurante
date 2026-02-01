const db = require('../services/menuService');
const resp = require('../red/response')
const express = require('express');

const auth = require('../auth/controllerAuth')

const TABLA = 'platillo';

async function all(req, res, next) {
    try {
        const items = await db.all(TABLA);
        resp.success(req, res, items, 200);
    } catch (err) {
        next(err);
    }
}

module.exports = {all}

