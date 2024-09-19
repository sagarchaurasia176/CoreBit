const mongoose = require("mongoose");
const Images = mongoose.Schema({
  image: {
    public_Id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
    },
  },
});

module.exports = mongoose.model("imageRefFromCloud", Images);



// PEDNING SCHEMA 
// DOUGHT IN REF PARTS
