const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    routineID: {
        type: String, 
        required: false,
        trim: true,
    },
    name: { 
        type: String,
        required: false,
        trim: true,
    },
    description: {
        type: String,
        required: false,
        trime: true,
   },
   numOfReps: {
       type: String,
       required:false,
       trim:true,
    },
    url: {
        type: String,
        trim: true
    },
    image: {
        type:String,
        required: false,
        trim:true,
    }
}, {
    timestamps: true,
});
    const Exercise = mongoose.model('Exercise', exerciseSchema);

    module.exports = Exercise;
