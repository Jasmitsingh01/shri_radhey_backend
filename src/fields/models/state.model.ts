import { Schema, Types, model } from "mongoose";

const loacationModel = new Schema({
    country: {
        type: Types.ObjectId,
        require:true,
        ref:"country"

    },
    state:{
        type:String,
        require:true,
        unique:true
    }

});
const state = model('state', loacationModel);

export default state;

