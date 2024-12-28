import { Schema, Types, model } from "mongoose";

const gotraModel = new Schema({
    religion:{
        type:Types.ObjectId,
        ref:'religion',
        require:true
    },
    caste:{
        type:Types.ObjectId,
        ref:'caste',
        require:true
    },
    gotra: {
        type: String,
        require:true
    },
   

});

const gotra = model('gotra', gotraModel);
export default gotra;