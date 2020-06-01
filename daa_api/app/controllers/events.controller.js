const Event = require('../events/events.js');

// Create and Save a new Event
exports.create = (req, res) => {
    // Validate request
    if (!req.body.event_name) {
        return res.status(400).send({
            message: "Event name can not be empty"
        });
    }

    // Create a Event
    const event = new Event({
        id_event: req.body.id_event,
        event_name: req.body.event_name || "Untitled Event",
        long_name: req.body.long_name,
        description: req.body.description,
        cover_photo: req.body.cover_photo,
        dates: {
            start_date: req.body.start_date,
            end_date: req.body.end_date
        },
        registration: {
            status: req.body.status,
            fee: req.body.fee,
            registration_end: req.body.registration_end
        }
    });

    // Save Event in the database
    event.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Event."
            });
        });
};

// Retrieve and return all events from the database.
exports.findAll = (req, res) => {
    Event.find()
        .then(events => {
            res.send(events);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving events."
            });
        });
};

// Find a single event with a id
exports.findOne = (req, res) => {
    Event.findById(req.params.id_event)
        .then(event => {
            if (!event) {
                return res.status(404).send({
                    message: "Event not found with id " + req.params.id_event
                });
            }
            res.send(event);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Event not found with id " + req.params.id_event
                });
            }
            return res.status(500).send({
                message: "Error retrieving event with id " + req.params.id_event
            });
        });
};

// Update a event identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.event_name) {
        return res.status(400).send({
            message: "Event name can not be empty"
        });
    }

    // Find event and update it with the request body
    Event.findByIdAndUpdate(req.params.id_event, {
            title: req.body.event_name || "Untitled Event",
            long_name: req.body.long_name,
            description: req.body.description,
            cover_photo: req.body.cover_photo,
            dates: {
                start_date: req.body.start_date,
                end_date: req.body.end_date
            },
            registration: {
                status: req.body.status,
                fee: req.body.fee,
                registration_end: req.body.registration_end
            }
        }, { new: true })
        .then(event => {
            if (!event) {
                return res.status(404).send({
                    message: "Event not found with id " + req.params.id_event
                });
            }
            res.send(event);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Event not found with id " + req.params.id_event
                });
            }
            return res.status(500).send({
                message: "Error updating event with id " + req.params.id_event
            });
        });
};

// Delete a event with the specified id in the request
exports.delete = (req, res) => {
    Event.findByIdAndRemove(req.params.id_event)
        .then(event => {
            if (!event) {
                return res.status(404).send({
                    message: "Event not found with id " + req.params.id_event
                });
            }
            res.send({ message: "Event deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Event not found with id " + req.params.event
                });
            }
            return res.status(500).send({
                message: "Could not delete event with id " + req.params.id_event
            });
        });
};