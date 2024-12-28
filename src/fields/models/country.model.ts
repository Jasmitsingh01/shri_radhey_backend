import { Schema, model } from "mongoose";

const loacationModel = new Schema({
    country: {
        type: String,
         unique:true,

    },

});
const country = model('country', loacationModel);

export default country;

