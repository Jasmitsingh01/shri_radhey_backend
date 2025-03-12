import error from "../utlis/error/Error";
import RequestHandler from "../utlis/request/requestHandler";
import ResponseData from "../utlis/response/responseData";
import ResponseHandler from "../utlis/response/responseHandler";
import client from "../models/client.model";
import { Request, Response, NextFunction } from 'express'
import UploadImageOnline from "../utlis/cloudnairy";


const CreateClient = RequestHandler(async (req: Request, res: Response, next: NextFunction) => {

    try {



        const { fullname, contact, height, gender, birth, ethinicity, email, fulladdreess, qualification, occupation, member, disablitiy, blood_group, marital_status, body_type, complexion, use_specatils, family, meal, abroad, belive_in_patri, open_for_other_caste, income, astrology, native, sibling, perferance } = req.body;

        const file = req.file;

        const { firstname, lastname } = fullname;
        const { phone, whatsaap_number } = contact;
        const { value, unit } = height;
        const { date, place, time } = birth;
        const { religion, caste, gotra } = ethinicity;
        const { country, state, custom, city, pincode } = fulladdreess;
        const { qualification: qualification_name, details: qualification_details } = qualification;
        const { occupation: occupation_name, details: occupation_details } = occupation;
        const { use, power } = use_specatils;
        const { father: { name: father_name, occupation: father_occupation, occupation_Details: father_occupation_detalis }, mother: { name: mother_name, occupation: mother_occupation, occupation_Details: mother_occupation_detalis }, details, number_of_member, house_status } = family
        const { stauts, expries, package: { name: package_name, amount_paid }, budget, source } = member;
        const { diet, smoking, drinking } = meal;
        const { is_willing, mention_country } = abroad;
        const { family: family_income, personal: personal_income } = income;


        // const ExitsClient = await client.find({
        //     $and: [{
        //         "fullname.firstname": firstname,
        //         "fullname.lastname": lastname,
        //         "contact.phone": phone,
        //         "contact.whatsaap_number": whatsaap_number,
        //         "contact.email": email,
        //         "height.value": value,
        //         "height.unit": unit,
        //         gender: gender,
        //         "birth.date": date,
        //         "birth.place": place,
        //         "birth.time": time,
        //         preferences: perferance, // Corrected spelling
        //         "ethinicity.religion": religion,
        //         "ethinicity.caste": caste,
        //         "ethinicity.gotra": gotra,
        //         "fulladdreess.country": country,
        //         "fulladdreess.state": state,
        //         "fulladdreess.city": city,
        //         "fulladdreess.pincode": pincode,
        //         "fulladdreess.custom": custom ? custom : `${city || ''}${state || ''}${country || ''}-${pincode || ''}`,
        //         astrology: astrology, // Corrected spelling
        //         "qualification.qualification": qualification_name,
        //         "qualification.details": qualification_details,
        //         "occupation.occupation": occupation_name,
        //         "occupation.details": occupation_details,
        //         "member.stauts": stauts,
        //         "member.expires_member": expries, // Corrected spelling
        //         "member.package.name": package_name,
        //         "member.package.amount_paid": amount_paid,
        //         "member.budget": budget,
        //         "member.source": source,
        //         disability: disablitiy, // Corrected spelling
        //         blood_group: blood_group,
        //         marital_status: marital_status,
        //         complexion: complexion,
        //         body_type: body_type,
        //         "family.father.name": father_name,
        //         "family.father.occupation": father_occupation,
        //         "family.father.occupation_Details": father_occupation_detalis, // Corrected spelling
        //         "family.mother.name": mother_name,
        //         "family.mother.occupation": mother_occupation,
        //         "family.mother.occupation_Details": mother_occupation_detalis, // Corrected spelling
        //         "family.details": details,
        //         "family.number_of_member": number_of_member,
        //         "family.house_status": house_status,
        //         native: native,
        //         siblings_details: sibling,
        //         "meal.diet": diet,
        //         "meal.smoking": smoking,
        //         "meal.drinking": drinking,
        //         "income.family": family_income,
        //         "income.personal": personal_income,
        //     }]
        // });

        // if (ExitsClient) {
        //     throw new error('Client Already Extis', 400)
        // }


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
            perfrences: perferance,
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
            astroligy: astrology,
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
            disablitiy,
            blood_group,
            marital_status,
            complexion,
            body_type,
            use_specatils: {
                use: use !== 'YES' ? false : true,
                power
            },
            family: {
                father: {
                    name: father_name,
                    occupation: father_occupation,
                    occupation_Details: father_occupation_detalis
                },
                mother: {
                    name: mother_name,
                    occupation: mother_occupation,
                    occupation_Details: mother_occupation_detalis
                },
                details,
                number_of_member,
                house_status: house_status
            },
            native: native,
            siblings_details: sibling,
            meal: {
                diet,
                smoking,
                drinking,
            },
            abroad: {
                is_willing: is_willing !== 'YES' ? false : true,
                mention_country
            },
            belive_in_patri: belive_in_patri !== 'YES' ? false : true,
            open_for_other_caste: open_for_other_caste !== 'YES' ? false : true,
            income: {
                family: family_income,
                personal: personal_income
            }


        })
        if (file) {
            const imageurl = await UploadImageOnline((file as any)?.path || '');
            if (!imageurl) {
                throw new error('failed to upload image', 500)
            }
            NewClient.profile_image = imageurl;

        }

        const saveClient = await NewClient.save();

        if (!saveClient) {
            throw new error('Failed Save Client Details', 500)
        }

        const response = new ResponseData(saveClient, 201, 'Client Created Successfully');

        ResponseHandler(res, response, 201)
    } catch (error) {
        console.error(error)
        const response = new ResponseData(error, (error as any).statusCode || (error as any).status || 500, (error as any).message);

        ResponseHandler(res, response, (error as any).statusCode || (error as any).status || 500)

    }

});


export default CreateClient;