import { Schema, Types, model } from "mongoose";



const BolgModel = new Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    keywords: {
        type: [String],
        require: true,
    },
    content: {
        type: String,
        require: true,

    },
    created_by:{
        type:Types.ObjectId,
        ref:'empolyee',
        require:true
    }

});

const blog = model('bolg', BolgModel);

export default blog;