import { Schema, Types, model } from "mongoose";

const gotraModel = new Schema({

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