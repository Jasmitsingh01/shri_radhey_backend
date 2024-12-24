import { Schema, model } from "mongoose";

const ethinicityModel = new Schema({
    religion: {
        type: String,
        unique: true,
    },
    caste: {
        type: String,
    },
    gotra: {
        type: String,
    }

});

const ethinicity = model('ethinicity', ethinicityModel);
export default ethinicity;