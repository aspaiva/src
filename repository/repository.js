const database = require('../config/database.js');
const { ObjectId } = require('mongodb');

function getCities() {
    return database.connect().then(db => {
        return db.collection('cinemas')
            .find({})
            .project({ cidade: 1, UF: 1, Pais: 1 })
            .toArray();
    });
}

async function getCinemasByCityId(cityId) {
    const objCityId = ObjectId.createFromHexString(cityId);
    let result = null;
    await database.connect()
        .then(async (db) => {
            result = await db.collection(process.env.DB_COLLECTION).findOne({ _id: objCityId }, { projection: { cinemas: 1 } });
            console.log('repo result', result);
        })
        .catch(err => {
            console.error('Error fetching cinemas by city ID:', err);
        });
    return result.cinemas.map(cinema => ({
        id: cinema._id,
        nome: cinema.nome
    }));
}

function getMoviesByCinemaId(cinemaId) {
    const objCinemaId = ObjectId.createFromHexString(cinemaId);
    let result = null;
    return database.connect()
        .then(async (db) => {
            result = await db.collection(process.env.DB_COLLECTION)
                .aggregate([
                    { $match: { 'cinemas._id': objCinemaId } },
                    { $unwind: '$cinemas' }, // Desestrutura o array de cinemas, tornando cada cinema um documento separado, flat
                    { $unwind: '$cinemas.salas' }, // Desestrutura o array de salas dentro de cada cinema
                    { $unwind: '$cinemas.salas.sessoes' }, // Desestrutura o array de sessões dentro de cada sala
                    { $group: { _id: { titulo: "$cinemas.salas.sessoes.filme", idFilme: "$cinemas.salas.sessoes.idFilme" } } }])
                .toArray();
            console.log('repo result', result);

            return result.map(item => item._id); // Retorna apenas o campo _id de cada item no array, ocultando o _id do $group no retorno
        })
        .catch(err => {
            console.error('Error fetching movies by cinema ID:', err);
            throw err;
        });
}

async function getSessionsByCinemaId(movieId, cinemaId) {
    const objCinemaId = ObjectId.createFromHexString(cinemaId);
    const objMovieId = ObjectId.createFromHexString(movieId);
    let result = null;

    const db = await database.connect();
    result = await db.collection(process.env.DB_COLLECTION)
        .aggregate([
            { $match: { 'cinemas._id': objCinemaId } },
            { $match: { 'cinemas.salas.sessoes.idFilme': objMovieId } },
            { $unwind: '$cinemas' }, // Desestrutura o array de cinemas, tornando cada cinema um documento separado, flat
            { $unwind: '$cinemas.salas' }, // Desestrutura o array de salas dentro de cada cinema
            { $unwind: '$cinemas.salas.sessoes' }, // Desestrutura o array de sessões dentro de cada sala
            {
                $group: {
                    _id: {
                        titulo: "$cinemas.salas.sessoes.filme",
                        idCinema: "$cinemas._id",
                        nomeCinema: "$cinemas.nome",
                        idSala: "$cinemas.salas._id",
                        Sala: "$cinemas.salas.nome",
                        sessoes: "$cinemas.salas.sessoes"
                    }
                }
            }])
        .toArray();

    console.log('repo result', result);

    return result.map(item => item._id); // Retorna apenas o campo _id de cada item no array, ocultando o _id do $group no retorno
}

async function addMovie(movie) {
    return database.connect().then(async db => {
        return await db.collection('movies').insertOne(movie);
    });
}

async function deleteMovie(movieId) {
    const objMovieId = ObjectId.createFromHexString(movieId);
    const db = await database.connect(null, "movies-service");
    return await db.collection('movies').deleteOne({ _id: objMovieId });
}

module.exports = {
    getCities, getCinemasByCityId, getMoviesByCinemaId, getSessionsByCinemaId,
    addMovie, deleteMovie
};