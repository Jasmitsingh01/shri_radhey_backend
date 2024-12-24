import { Schema, model } from "mongoose";

const loacationModel = new Schema({
    country: {
        type: String,
         unique:true,

    },
    city: {
        type: String,
        unique:true,

    },
    state: {
        type: String,
        unique:true,

    }
});
const location = model('location', loacationModel);

export default location;

