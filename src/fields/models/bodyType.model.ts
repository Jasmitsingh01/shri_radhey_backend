import { Schema, model } from "mongoose";

const BodyType = new Schema({
    body_type: {
        type: String,
        require: true
    }

});

const bodyType = model('bodyType', BodyType);
export default bodyType;