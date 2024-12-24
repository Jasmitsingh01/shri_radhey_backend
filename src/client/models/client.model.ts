import { Schema, model } from "mongoose";
interface IClient {
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
            require: true


        },
        whatsaap_number: {
            type: String

        },
        email: {
            type: String,
            require: true
    
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
            type: Number
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