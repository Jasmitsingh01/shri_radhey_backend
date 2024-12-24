import { Schema, Types, model } from "mongoose";

export interface ITask {
    title: string;
    description: string;
    createadby: Types.ObjectId;
    assign_to: Types.ObjectId;
    viewed: boolean;
    response: {
        data: string;
        submitted_by: Types.ObjectId;
        submission_date: Date;
    };
}
const taskModel = new Schema({
    title: {
        type: String,
        require: true,

    },
    description: {
        type: String,
        require: true,
    },
    createadby: {
        type: Types.ObjectId,
        ref: 'empolyee',
        require: true
    },
    assign_to: {
        type: Types.ObjectId,
        ref: 'empolyee',
        require: true
    },
    viewed: {
        type: Boolean,
        default: false,
        require: true
    },
    response: {
        data: {
            type: String,
            require: true,
            default: "Please Submit Your Response"
        },
        submitted_by: {
            type: Types.ObjectId,
            ref: "empolyee",
        },
        submission_date: {
            type: Date,

        }
    }

}, {
    timestamps: true
})

const Task = model<ITask>('task', taskModel);

export default Task;