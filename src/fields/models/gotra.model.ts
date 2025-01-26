import { Schema, model } from "mongoose";

const gotraModel = new Schema({

    gotra: {
        type: String,
        require:true
    },
   

});

const gotra = model('gotra', gotraModel);
export default gotra;