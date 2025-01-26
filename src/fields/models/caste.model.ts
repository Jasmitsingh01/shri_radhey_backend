import { Schema, model } from "mongoose";

const casteModel = new Schema({

    caste: {
        type: String,
        reqiure:true,
    },
   

});

const caste = model('caste', casteModel);
export default caste;