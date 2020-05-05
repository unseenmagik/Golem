'use strict';

const express = require('express');
const router = express.Router();
const i18n = require('i18n');

const config = require('../config.json');
const defaultData = require('../data/default.js');

const GeofenceService = require('../services/geofence.js');

const svc = new GeofenceService.GeofenceService();


router.get(['/', '/index'], async function(req, res) {
    var data = defaultData;
    data.raids = 0;
    data.gyms_total = 0;
    data.quests = 0;
    data.invasions = 0;
    data.gyms_neutral = 0;
    data.gyms_mystic = 0;
    data.gyms_valor = 0;
    data.gyms_instinct = 0;
    res.render('index', data);
});

if (config.discord.enabled) {
    router.get('/login', function(req, res) {
        res.redirect('/api/discord/login');
    });

    router.get('/logout', function(req, res) {
        req.session.destroy(function(err) {
            if (err) throw err;
            res.redirect('/login');
        });
    });
}

if (config.pages.raids.enabled) {
    router.get('/raids', function(req, res) {
        var data = defaultData;
        data.cities = svc.geofences.map(x => { return { 'name': x.name }; });
        res.render('raids', data);
    });
}

if (config.pages.gyms.enabled) {
    router.get('/gyms', function(req, res) {
        var data = defaultData;
        data.cities = svc.geofences.map(x => { return { 'name': x.name }; });
        res.render('gyms', data);
    });
}

if (config.pages.quests.enabled) {
    router.get('/quests', function(req, res) {
        var data = defaultData;
        data.cities = svc.geofences.map(x => { return { 'name': x.name }; });
        res.render('quests', data);
    });
}

if (config.pages.invasions.enabled) {
    router.get('/invasions', function(req, res) {
        var data = defaultData;
        var gruntTypes = [];
        for (var i = 0; i <= 50; i++) {
            var grunt = i18n.__('grunt_' + i);
            gruntTypes.push({ 'name': grunt });
        }
        data.cities = svc.geofences.map(x => { return { 'name': x.name }; });
        data.grunt_types = gruntTypes;
        res.render('invasions', data);
    });
}

if (config.pages.nests.enabled) {
    router.get('/nests', function(req, res) {
        var data = defaultData;
        data.cities = svc.geofences.map(x => { return { 'name': x.name }; });
        res.render('nests', data);
    });
}

module.exports = router;