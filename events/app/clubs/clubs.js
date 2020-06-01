const mongoose = require('mongoose');

const ClubsSchema = mongoose.Schema({
    id_club: Number,
    club_name: String,
    city: String,
    address: String,
    description: String,
    founded_on: Date,
    active_teams: Number,
    total_teams: Number,
});

module.exports = mongoose.model('Club', ClubsSchema);
