import { Schema, model } from "mongoose";

const religionModel = new Schema({
    religion: {
        type: String,
        unique: true,
    },
   

});

const religion = model('religion', religionModel);
export default religion;