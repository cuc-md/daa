module.exports = (app) => {
    //const clubs = require('../controllers/clubs.controller.js');
    const events = require('../controllers/events.controller.js');
    //const teams = require('../controllers/teams.controller.js');


    // app.post('/clubs', clubs.create);
    // app.get('/clubs', clubs.findAll);
    // app.get('/clubs/:id_club', clubs.findOne);
    // app.put('/clubs/:id_club', clubs.update);
    // app.delete('/clubs/:id_club', clubs.delete);


    app.post('/events', events.create);
    app.get('/events', events.findAll);
    app.get('/events/:id_event', events.findOne);
    app.put('/events/:id_event', events.update);
    app.delete('/events/:id_event', events.delete);



    // app.post('/teams', teams.create);
    // app.get('/teams', teams.findAll);
    // app.get('/teams/:id_teams', teams.findOne);
    // app.put('/teams/:id_teams', teams.update);
    // app.delete('/teams/:id_teams', teams.delete);
}