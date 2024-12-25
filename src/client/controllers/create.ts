import error from "../utlis/error/Error";
import RequestHandler from "../utlis/request/requestHandler";
import ResponseData from "../utlis/response/responseData";
import ResponseHandler from "../utlis/response/responseHandler";
import client from "../models/client.model";
import { Request,Response ,NextFunction} from 'express'


const CreateClient = RequestHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {




        const { fullname, contact, height, gender, birth, ethinicity, fulladdreess, qualification, occupation, member, profile_image, disablitiy, blood_group, marital_status, body_type, complexion, use_specatils, family, meal, abroad, belive_in_patri, open_for_other_caste, income } = req.body;


        if (!fullname.firstname || !contact.phone || !contact.email || !height.value || !gender || !birth.date || !birth.place || !birth.time || !ethinicity.religion || !ethinicity.caste || !ethinicity.gotra || !fulladdreess.country || !fulladdreess.state || !fulladdreess.city || !fulladdreess.pincode || !qualification.qualification || !occupation.occupation || !disablitiy || !blood_group || !marital_status || !body_type || !complexion || !use_specatils.use || !family.father.name || !family.mother.name || !family.type || !member.stauts || !member.expries_member || !member.package.name || !member.package.amount_paid || !member.budget || !member.source || !meal.diet || !meal.smoking || !meal.drinking || !abroad.is_willing || !belive_in_patri || !open_for_other_caste || !income.family || !income.personal) {
            throw new error('some fields are missing ', 400)
        }

        // const { file } = req.files;
        const { firstname, lastname } = fullname;
        const { phone, whatsaap_number, email } = contact;
        const { value, unit } = height;
        const { date, place, time } = birth;
        const { religion, caste, gotra } = ethinicity;
        const { country, state, custom, city, pincode } = fulladdreess;
        const { qualification: qualification_name, details: qualification_details } = qualification;
        const { occupation: occupation_name, details: occupation_details } = occupation;
        const { use, power } = use_specatils;
        const { father: { name: father_name, occupation: father_occupation }, mother: { name: mother_name, occupation: mother_occupation }, type, number_of_member } = family
        const { stauts, expries, package: { name: package_name, amount_paid }, budget, source } = member;
        const { diet, smoking, drinking } = meal;
        const { is_willing, mention_country } = abroad;
        const { family: family_income, personal: personal_income } = income;







        const NewClient = new client({
            fullname: {
                firstname,
                lastname
            },
            contact: {
                phone,
                whatsaap_number,
                email
            },
            height: {
                value,
                unit
            },
            gender,
            birth: {
                date,
                place,
                time
            },
            ethinicity: {
                religion,
                caste,
                gotra
            },
            fulladdreess: {
                country,
                state,
                city,
                custom: custom ? custom : city + state + country + '-' + pincode,
                pincode
            },
            qualification: {
                qualification: qualification_name,
                details: qualification_details,
            },
            occupation: {
                occupation: occupation_name,
                details: occupation_details,
            },
            member: {
                stauts,
                expries_member: expries,
                package: {
                    name: package_name,
                    amount_paid
                },
                budget,
                source

            },
            profile_image,
            disablitiy,
            blood_group,
            marital_status,
            complexion,
            body_type,
            use_specatils: {
                use,
                power
            },
            family: {
                father: {
                    name: father_name,
                    occupation: father_occupation,
                },
                mother: {
                    name: mother_name,
                    occupation: mother_occupation,
                },
                type,
                number_of_member
            },
            meal: {
                diet,
                smoking,
                drinking,
            },
            abroad: {
                is_willing,
                mention_country
            },
            belive_in_patri,
            open_for_other_caste,
            income: {
                family: family_income,
                personal: personal_income
            }


        })

        const saveClient = await NewClient.save();

        if (!saveClient) {
            throw new error('Failed Save Client Details', 500)
        }

        const response = new ResponseData(saveClient, 201, 'Client Created Successfully');

        ResponseHandler(res, response, 201)
    } catch (error) {
        console.error(error)

    }

});


export default CreateClient;