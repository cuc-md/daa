const mongoose = require('mongoose');

const TeamsSchema = mongoose.Schema({
    id_team: Number,
    team_name: String,
    captain: String,
    phone: Number
});

module.exports = mongoose.model('DAA', TeamsSchema);