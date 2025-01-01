import { Schema, model } from "mongoose";
interface IClient {
    score?: number; // Add the score property

    fullname: {
        firstname: string;
        lastname?: string;
    };
    contact: {
        phone: string;
        whatsaap_number?: string;
        email: string;

    };
    height: {
        value: string;
        unit?: string;
    };
    gender: string;
    birth: {
        date: Date;
        place: string;
        time: string;
    };
    ethinicity: {
        religion: string;
        caste: string;
        gotra: string;
    };
    fulladdreess: {
        country: string;
        state: string;
        city: string;
        custom?: string;
        pincode: string;
    };
    qualification: {
        qualification: string;
        details?: string;
    };
    occupation: {
        occupation: string;
        details: string;
    };
    profile_image: string;
    disablitiy: string;
    blood_group: string;
    marital_status: string;
    body_type: string;
    complexion: string;
    use_specatils: {
        use: boolean;
        power?: string;
    };
    family: {
        father: {
            name: string;
            occupation?: string;
        };
        mother: {
            name: string;
            occupation?: string;
        };
        type: string;
        number_of_member?: number;
    };
    member: {
        stauts: string;
        expries_member: Date;
        package: {
            name: string;
            amount_paid: number;
        };
        budget: number;
        source: string;
    };
    meal: {
        diet: string;
        smoking: string;
        drinking: string;
    };
    abroad: {
        is_willing: boolean;
        mention_country?: string;
    };
    belive_in_patri: boolean;
    open_for_other_caste: boolean;
    income: {
        family: number;
        personal: number;
    };
}
const clientModel = new Schema({
    fullname: {
        firstname: {
            type: String,
            require: true
        },

        lastname: {
            type: String

        },
    },
    contact: {
        phone: {
            type: String,
            require: true,
            unique:true,


        },
        whatsaap_number: {
            type: String,
            unique:true,

        },
        email: {
            type: String,
            require: true,
            unique:true,

        },
    },
    height: {
        value: {
            type: String
            ,
            require: true

        },
        unit: {
            type: String,
            default: 'inch'

        },
    },
    gender: {
        type: String,
        require: true

    },
    birth: {
        date: {
            type: Date,
            require: true

        },
        place: {
            type: String
            ,
            require: true

        },
        time: {
            type: String
            ,
            require: true

        },
    },
    ethinicity: {
        religion: {
            type: String,
            require: true

        },
        caste: {
            type: String,
            require: true

        },
        gotra: {
            type: String,
            require: true

        },
    },
    fulladdreess: {
        country: {
            type: String,
            require: true

        },
        state: {
            type: String,
            require: true

        },
        city: {
            type: String,
            require: true

        },
        custom: {
            type: String,


        },
        pincode: {
            type: String,
            require: true

        },
    },
    qualification: {
        qualification: {
            type: String,
            require: true

        },
        details: {
            type: String

        },
    },
    occupation: {
        occupation: {
            type: String,
            require: true

        },
        details: {
            type: String,
            require: true

        },
    },
    profile_image: {
        type: String,
        default: 'data:image/jpeg;base64,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'
        ,
        require: true


    },
    disablitiy: {
        type: String
        ,
        require: true

    },
    blood_group: {
        type: String,
        require: true

    },

    marital_status: {
        type: String,
        require: true

    },
    body_type: {
        type: String,
        require: true

    },
    complexion: {
        type: String,
        require: true

    },
    use_specatils: {
        use: {
            type: Boolean,

            require: true

        },
        power: {
            type: String

        },
    },
    family: {
        father: {
            name: {
                type: String
                ,
                require: true

            },
            occupation: {
                type: String

            },
        },
        mother: {
            name: {
                type: String,
                require: true

            },
            occupation: {
                type: String

            },
        },
        type: {
            type: String,
            require: true

        },
        number_of_member: {
            type: Number,

        },
    },
    member: {
        stauts: {
            type: String
            ,
            require: true

        },
        expries_member: {
            type: Date,

            require: true

        },
        package: {
            name: {
                type: String
                ,
                require: true

            },
            amount_paid: {
                type: Number,
                require: true

            },
        },
        budget: {
            type: String
            ,
            require: true

        },
        source: {
            type: String
            ,
            require: true

        },
    },
    meal: {
        diet: {
            type: String
            ,
            require: true

        },
        smoking: {
            type: String,

            require: true

        },
        drinking: {
            type: String
            ,
            require: true

        },
    },
    abroad: {
        is_willing: {
            type: Boolean,

            require: true

        },
        mention_country: {
            type: String

        },
    },
    belive_in_patri: {
        type: Boolean,

        require: true

    },
    open_for_other_caste: {
        type: Boolean,

        require: true
    },
    income: {
        family: {
            type: Number,
            require: true


        },
        personal: {
            type: Number,

            require: true

        },
    },
}
    ,
    {

        timestamps: true

    }
);

const client = model<IClient>('client', clientModel);

export default client;