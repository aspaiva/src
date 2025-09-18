const validationMiddleware = require('../middleware/validationMiddleware');

module.exports = (app, repository) => {
    app.get('/cities', async (req, res) => {
        try {
            const cities = await repository.getCities();
            res.status(200).json(cities);
        } catch (error) {
            console.error('Error fetching cities:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }   
    });

    app.get('/cities/:cityId/cinemas', async (req, res) => {
        try {
            const cinemas = await repository.getCinemasByCityId(req.params.cityId);
            res.status(200).json(cinemas);
        } catch (error) {
            console.error('Error fetching cinemas:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    app.post('/movie', validationMiddleware.validateMovie, async (req, res) => {
        console.log('Received movie data:', req.body);
        const movie = req.body;

        try {
            const result = await repository.addMovie(movie);
            res.status(201).json({ message: 'Movie added successfully', movieId: result.insertedId });
        } catch (error) {
            console.error('Error adding movie:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    app.delete('/movie/:movieId', async (req, res) => {
        const movieId = req.params.movieId;
        try {
            const result = await repository.deleteMovie(movieId);
            if (result.deletedCount === 0) {
                return res.status(404).json({ error: 'Movie not found' });
            }
            res.status(200).json({ message: 'Movie deleted successfully' });
        } catch (error) {
            console.error('Error deleting movie:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
}