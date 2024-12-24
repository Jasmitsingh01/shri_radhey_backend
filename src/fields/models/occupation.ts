import { Schema,model } from "mongoose";

const occupationModel=new Schema({
    occupation:{
        type:String,
        require:true
    }
});

const occupation=model('occupation',occupationModel);

export default occupation;