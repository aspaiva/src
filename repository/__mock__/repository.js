const { ObjectId } = require("mongodb");

const cinemaCatalog = [{
    "cidade": "Gravataí",
    "uf": "RS",
    "cinemas": []
}, {
    "cidade": "Porto Alegre",
    "uf": "RS",
    "pais": "BR",
    "cinemas": [{
        "_id": ObjectId(),
        "nome": "Cinemark Bourbon Ipiranga",
        "salas": [{
            "nome": 1,
            "sessoes": [{
                "data": ISODate("2021-03-01T09:00:00Z"),
                "idFilme": ObjectId("605e57238ed0562b5da2f87d"),
                "filme": "Vingadores: Guerra Infinita",
                "valor": 25,
                "assentos": [{
                    "numero": 1,
                    "disponivel": true
                }, {
                    "numero": 2,
                    "disponivel": false
                }]
            }, {
                "data": ISODate("2021-03-01T11:00:00Z"),
                "idFilme": ObjectId("605e57238ed0562b5da2f87d"),
                "filme": "Vingadores: Guerra Infinita",
                "valor": 25,
                "assentos": [{
                    "numero": 1,
                    "disponivel": true
                }, {
                    "numero": 2,
                    "disponivel": true
                }]
            }, {
                "data": ISODate("2021-06-01T13:00:00Z"),
                "idFilme": ObjectId("605e57238ed0562b5da2f87e"),
                "filme": "Vingadores: Era de Ultron",
                "valor": 20,
                "assentos": [{
                    "numero": 1,
                    "disponivel": true
                }, {
                    "numero": 2,
                    "disponivel": false
                }, {
                    "numero": 2,
                    "disponivel": true
                }]
            }]
        }, {
            "nome": 2,
            "sessoes": [{
                "data": ISODate("2021-03-01T09:00:00Z"),
                "idFilme": ObjectId("605e57238ed0562b5da2f87e"),
                "filme": "Vingadores: Era de Ultron",
                "valor": 25,
                "assentos": [{
                    "numero": 1,
                    "disponivel": true
                }, {
                    "numero": 2,
                    "disponivel": false
                },]
            }, {
                "data": ISODate("2021-03-01T11:00:00Z"),
                "idFilme": ObjectId("605e57238ed0562b5da2f87c"),
                "filme": "Vingadores: Ultimato",
                "valor": 25,
                "assentos": [{
                    "numero": 1,
                    "disponivel": true
                }, {
                    "numero": 2,
                    "disponivel": true
                },]
            }, {
                "data": ISODate("2021-03-01T13:00:00Z"),
                "idFilme": ObjectId("605e57238ed0562b5da2f87c"),
                "filme": "Vingadores: Ultimato",
                "valor": 20,
                "assentos": [{
                    "numero": 1,
                    "disponivel": true
                }, {
                    "numero": 2,
                    "disponivel": false
                }, {
                    "numero": 2,
                    "disponivel": true
                }]
            }]
        }]
    }, {
        "_id": ObjectId(),
        "nome": "GNC Lindóia",
        "salas": [{
            "nome": 100,
            "sessoes": [{
                "data": ISODate("2021-03-30T19:00:00Z"),
                "idFilme": ObjectId("605e57238ed0562b5da2f87c"),
                "filme": "Vingadores: Ultimato",
                "valor": 25,
                "assentos": [{
                    "numero": 1,
                    "disponivel": true
                }, {
                    "numero": 2,
                    "disponivel": false
                }]
            }, {
                "data": ISODate("2021-03-30T11:00:00Z"),
                "idFilme": ObjectId("605e57238ed0562b5da2f87c"),
                "filme": "Vingadores: Ultimato",
                "valor": 25,
                "assentos": [{
                    "numero": 1,
                    "disponivel": true
                }, {
                    "numero": 2,
                    "disponivel": true
                }]
            }, {
                "data": ISODate("2021-03-30T13:00:00Z"),
                "idFilme": ObjectId("605e57238ed0562b5da2f87e"),
                "filme": "Vingadores: Era de Ultron",
                "valor": 20.00,
                "assentos": [{
                    "numero": 1,
                    "disponivel": true
                }, {
                    "numero": 2,
                    "disponivel": false
                }, {
                    "numero": 2,
                    "disponivel": true
                }]
            }]
        }]
    }]
}]

function getCities() {
    return cinemaCatalog.map(item => ({
        _id: ObjectId(),
        cidade: item.cidade,
        uf: item.uf,
        pais: item.pais
    }));
}

async function getCinemasByCityId(cityId) {
    return cinemaCatalog[cinemaCatalog.length - 1].cinemas; // sempre retorna os cinemas da última cidade do array
}

function getMoviesByCinemaId(cinemaId) {
    return getCinemasByCityId().map(cinema => {
        return {
            idFilme: cinema.salas[0].sessoes[0].idFilme,
            filme: cinema.salas[0].sessoes[0].filme
        }
    })
}

async function getSessionsByCinemaId(movieId, cinemaId) {
    return getCinemasByCityId().map(cinema => {
        return cinema.salas[0].sessoes;
    });
}