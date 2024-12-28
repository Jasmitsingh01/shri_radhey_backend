import { Schema, Types, model } from "mongoose";

const casteModel = new Schema({

    religion:{
        type:Types.ObjectId,
        ref:"religion",
        reqiure:true,
    },
    caste: {
        type: String,
        reqiure:true,
    },
   

});

const caste = model('caste', casteModel);
export default caste;