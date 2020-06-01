const Club = require('../clubs/clubs.js');

// Create and Save a new Club
exports.create = (req, res) => {
    // Validate request
    if (!req.body.club_name) {
        return res.status(400).send({
            message: "Club name can not be empty"
        });
    }

    // Create a Club
    const club = new Club({
        id_club: req.body.id_club,
        club_name: req.body.club_name || "Untitled Club",
        city: req.body.city,
        address: req.body.address,
        description: req.body.description,
        founded_on: req.body.founded_on,
        active_teams: req.body.active_teams,
        total_teams: req.body.total_teams
    });

    // Save Club in the database
    club.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Club."
            });
        });
};

// Retrieve and return all clubs from the database.
exports.findAll = (req, res) => {
    Club.find()
        .then(clubs => {
            res.send(clubs);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving clubs."
            });
        });
};

// Find a single club with a id
exports.findOne = (req, res) => {
    Club.findById(req.params.id_club)
        .then(club => {
            if (!club) {
                return res.status(404).send({
                    message: "Club not found with id " + req.params.id_club
                });
            }
            res.send(club);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Club not found with id " + req.params.id_club
                });
            }
            return res.status(500).send({
                message: "Error retrieving club with id " + req.params.id_club
            });
        });
};

// Update a club identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.club_name) {
        return res.status(400).send({
            message: "Club name can not be empty"
        });
    }

    // Find club and update it with the request body
    Club.findByIdAndUpdate(req.params.id_club, {
            club_name: req.body.club_name || "Untitled Club",
            city: req.body.city,
            address: req.body.address,
            description: req.body.description,
            founded_on: req.body.founded_on,
            active_teams: req.body.active_teams,
            total_teams: req.body.total_teams
        }, { new: true })
        .then(club => {
            if (!club) {
                return res.status(404).send({
                    message: "Club not found with id " + req.params.id_club
                });
            }
            res.send(club);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Club not found with id " + req.params.id_club
                });
            }
            return res.status(500).send({
                message: "Error updating club with id " + req.params.id_club
            });
        });
};

// Delete a club with the specified id in the request
exports.delete = (req, res) => {
    Club.findByIdAndRemove(req.params.id_club)
        .then(club => {
            if (!club) {
                return res.status(404).send({
                    message: "Club not found with id " + req.params.id_club
                });
            }
            res.send({ message: "Club deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.club_name === 'NotFound') {
                return res.status(404).send({
                    message: "Club not found with id " + req.params.club
                });
            }
            return res.status(500).send({
                message: "Could not delete club with id " + req.params.id_club
            });
        });
};