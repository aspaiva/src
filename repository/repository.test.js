// const db = require('../config/database.js');
const { test, expect, beforeAll } = require('@jest/globals');
const repo = require('./repository.js');

let cityId = null; //'68bed560406ff1292b670688';
let cinemaId = null; //'68bed560406ff1292b670685';

beforeAll(async () => {
    // require('dotenv').config();
    const cities = await repo.getCities(); // guarda em const para ter acesso ao length na próxima linha
    cityId = cities[cities.length -1]._id.toString();
    console.log('cityId:', cityId);

    const cinemaList = await repo.getCinemasByCityId(cityId);
    cinemaId = cinemaList[0]._id.toString(); // toString() para converter ObjectId em string
    console.log('cinemaId:', cinemaId);
});

test('Get all cities', async () => {
    const cities = repo.getCities();
    console.log(cities)
    expect(cities).toBeDefined();
});

test('Get cinemas by city id', async () => {
    // const cityId = '68bed560406ff1292b670688';
    const cinemas = await repo.getCinemasByCityId(cityId);
    console.log('test result:', cinemas);
    expect(cinemas).toBeDefined();
});

test('Get movies by cinema id', async () => {
    // const cinemaId = '68bed560406ff1292b670685';
    const movies = await repo.getMoviesByCinemaId(cinemaId);
    console.log('test result:', movies);
    expect(movies).toBeDefined();
});