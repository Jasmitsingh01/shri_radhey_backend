import { Schema, Types, model } from "mongoose";
export interface ITask {
    title: string;
    description: string;
    createadby: Types.ObjectId;
    assign_to: Types.ObjectId;
    viewed: boolean;
    dueDate: Date;
    response: {
        data: string;
        submitted_by: Types.ObjectId;
        submission_date: Date;
        is_submitted: boolean
    };
    status: string;
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
        id: {
            type: Types.ObjectId,
            ref: 'empolyees',
            require: true
        },
        name: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true,
        },
        phone: {
            type: String,
            require: true,
        },
    },
    assign_to: {
        id: {
            type: Types.ObjectId,
            ref: 'empolyees',
            require: true
        },
        name: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true,
        },
        phone: {
            type: String,
            require: true,
        },

    },
    status: {
        type: String,
        require: true,
        default: "Todo"
    },
    dueDate: {
        type: Date,
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

        },
        is_submitted: {
            type: Boolean,
            default: false
        }
    }

}, {
    timestamps: true
})

const Task = model<ITask>('task', taskModel);

export default Task;