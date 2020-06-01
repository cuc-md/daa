const Team = require('../teams/teams.js');

// Create and Save a new Team
exports.create = (req, res) => {
    // Validate request
    if (!req.body.team_name) {
        return res.status(400).send({
            message: "Team name can not be empty"
        });
    }

    // Create a Team
    const team = new Team({
        id_team: req.body.id_team,
        team_name: req.body.name || "Untitled Team",
        captain: req.body.captain,
        phone: req.body.phone
    });

    // Save Team in the database
    team.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Team."
            });
        });
};

// Retrieve and return all teams from the database.
exports.findAll = (req, res) => {
    Team.find()
        .then(teams => {
            res.send(teams);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving teams."
            });
        });
};

// Find a single team with a id
exports.findOne = (req, res) => {
    Team.findById(req.params.id_team)
        .then(team => {
            if (!team) {
                return res.status(404).send({
                    message: "Team not found with id " + req.params.id_team
                });
            }
            res.send(team);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Team not found with id " + req.params.id_team
                });
            }
            return res.status(500).send({
                message: "Error retrieving team with id " + req.params.id_team
            });
        });
};

// Update a team identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.team_name) {
        return res.status(400).send({
            message: "Team name can not be empty"
        });
    }

    // Find team and update it with the request body
    Team.findByIdAndUpdate(req.params.id_team, {
            team_name: req.body.team_name || "Untitled Team",
            captain: req.body.captain,
            phone: req.body.phone
        }, { new: true })
        .then(team => {
            if (!team) {
                return res.status(404).send({
                    message: "Team not found with id " + req.params.id_team
                });
            }
            res.send(team);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Team not found with id " + req.params.id_team
                });
            }
            return res.status(500).send({
                message: "Error updating team with id " + req.params.id_team
            });
        });
};

// Delete a team with the specified id in the request
exports.delete = (req, res) => {
    Team.findByIdAndRemove(req.params.id_team)
        .then(team => {
            if (!team) {
                return res.status(404).send({
                    message: "Team not found with id " + req.params.id_team
                });
            }
            res.send({ message: "Team deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.team_name === 'NotFound') {
                return res.status(404).send({
                    message: "Team not found with id " + req.params.team
                });
            }
            return res.status(500).send({
                message: "Could not delete team with id " + req.params.id_team
            });
        });
};
