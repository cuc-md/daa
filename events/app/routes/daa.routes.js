module.exports = (app) => {
    const clubs = require('../controllers/clubs.controller.js');
    const events = require('../controllers/events.controller.js');
    const teams = require('../controllers/teams.controller.js');

    app.post('/api/v1/clubs', clubs.create);
    app.get('/api/v1/clubs', clubs.findAll);
    app.get('/api/v1/clubs/:id_club', clubs.findOne);
    app.put('/api/v1/clubs/:id_club', clubs.update);
    app.delete('/api/v1/clubs/:id_club', clubs.delete);

    app.post('/api/v1/events', events.create);
    app.get('/api/v1/events', events.findAll);
    app.get('/api/v1/events/:id_event', events.findOne);
    app.put('/api/v1/events/:id_event', events.update);
    app.delete('/api/v1/events/:id_event', events.delete);

    app.post('/api/v1/teams', teams.create);
    app.get('/api/v1/teams', teams.findAll);
    app.get('/api/v1/teams/:id_teams', teams.findOne);
    app.put('/api/v1/teams/:id_teams', teams.update);
    app.delete('/api/v1/teams/:id_teams', teams.delete);
}
