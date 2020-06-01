const mongoose = require('mongoose');

const EventsSchema = mongoose.Schema({
    id_event: Number,
    event_name: String,
    long_name: String,
    description: String,
    cover_photo: String,
    dates: {
        start_date: Date,
        end_date: Date
    },
    registration: {
        status: String,
        fee: String,
        registration_end: Date
    }
});

module.exports = mongoose.model('Event', EventsSchema);
