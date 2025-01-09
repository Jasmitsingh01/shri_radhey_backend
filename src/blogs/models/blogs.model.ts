import { Schema, Types, model } from "mongoose";

interface IBlog {
    thumbnails: {
        url: string;
        path: string;
    };
    title: string;
    description: string;
    keywords: string[];
    content: string;
    created_by: Types.ObjectId;
}


const BolgModel = new Schema({
    thumbnails:{
        url:{
            type:String,
            require:true
        },
        path:{
            type:String,
            require:true 
        }
    },
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

const blog = model<IBlog>('bolg', BolgModel);

export default blog;
