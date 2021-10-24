//sposób 1

// const mongoose = require("mongoose");

// const Character = mongoose.model('Character', mongoose.Schema({
//     name: String,
//     age: Number,
//     rank: String
// }));

// module.exports = Character;

//sposób 2

const mongoose = require("mongoose");
const CharacterSchema = new mongoose.Schema({
    name: String,
    age: Number,
    rank: String,
    employment: Boolean //dodane dopiero w punkcie trzecim (03. add, update, remove) - przykład 2d
});

const Character = new mongoose.model('CharacterSchema', CharacterSchema);

module.exports = Character;