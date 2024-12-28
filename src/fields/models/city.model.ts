import { Schema, Types, model } from "mongoose";

const loacationModel = new Schema({
    country: {
        type: Types.ObjectId,
        require:true,
        ref:"country"

    },
    state: {
        type: Types.ObjectId,
        require:true,
        ref:"state"

    },
    city:{
        type:String,
        require:true,
    }

});
const city = model('city', loacationModel);

export default city;

