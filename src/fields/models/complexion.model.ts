import { Schema, model } from "mongoose";

const ComplexionModel = new Schema({
    complexion: {
        type: String,
        require: true
    }

});

const complexion = model('complexion', ComplexionModel);
export default complexion;