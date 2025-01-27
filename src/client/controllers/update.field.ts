import error from "../utlis/error/Error";
import RequestHandler from "../utlis/request/requestHandler";
import ResponseData from "../utlis/response/responseData";
import ResponseHandler from "../utlis/response/responseHandler";
import client from "../models/client.model";
import { Request, Response, NextFunction } from 'express'
import UploadImageOnline from "../utlis/cloudnairy";
import fs from 'fs'


const updateField = RequestHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {

        const data = req.body;
        const id = req.query.id
        const file = req.file
      
        if (!id) {
            throw new error('Invaild request', 400)
        }
        if (!data) {
            throw new error('Please Provide filed to update', 400)
        }

        const { fullname, contact, height, gender, birth, ethinicity, email, fulladdreess, qualification, occupation, member, disablitiy, blood_group, marital_status, body_type, complexion, use_specatils, family, meal, abroad, belive_in_patri, open_for_other_caste, income, astrology, native, sibling, perferance } = req.body;

        
        const { firstname, lastname } = fullname;
        const { phone, whatsaap_number } = contact;
        const { value, unit } = height;
        const { date, place, time } = birth;
        const { religion, caste, gotra } = ethinicity;
        const { country, state, custom, city, pincode } = fulladdreess;
        const { qualification: qualification_name, details: qualification_details } = qualification;
        const { occupation: occupation_name, details: occupation_details } = occupation;
        const { use, power } = use_specatils;
        const { father: { name: father_name, occupation: father_occupation }, mother: { name: mother_name, occupation: mother_occupation }, type, number_of_member, house_status } = family
        const { stauts, expries, package: { name: package_name, amount_paid }, budget, source } = member;
        const { diet, smoking, drinking } = meal;
        const { is_willing, mention_country } = abroad;
        const { family: family_income, personal: personal_income } = income;
        const updateClient = await client.findById(id)
        if (!updateClient) {
            throw new error('Failed to update Client', 500);
        }
        updateClient.fullname.firstname = firstname;

        updateClient.fullname.lastname = lastname;
        updateClient.contact.phone = phone;
        updateClient.contact.whatsaap_number = whatsaap_number;
        updateClient.contact.email = email;
        updateClient.height.value = value;
        updateClient.height.unit = unit;
        updateClient.gender = gender;
        updateClient.birth.date = date;
        updateClient.birth.place = place;
        updateClient.birth.time = time;
        updateClient.ethinicity.religion = religion;
        updateClient.ethinicity.caste = caste;
        updateClient.ethinicity.gotra = gotra;
        updateClient.fulladdreess.country = country;
        updateClient.fulladdreess.state = state;
        updateClient.fulladdreess.city = city;
        updateClient.fulladdreess.custom = custom ? custom : city + state + country + '-' + pincode;
        updateClient.fulladdreess.pincode = pincode;
        updateClient.qualification.qualification = qualification_name;
        updateClient.qualification.details = qualification_details;
        updateClient.occupation.occupation = occupation_name;
        updateClient.occupation.details = occupation_details;
        updateClient.member.stauts = stauts;
        updateClient.member.expries_member = expries;
        updateClient.member.package.name = package_name;
        updateClient.member.package.amount_paid = amount_paid;
        updateClient.member.budget = budget;
        updateClient.member.source = source;
        updateClient.disablitiy = disablitiy;
        updateClient.blood_group = blood_group;
        updateClient.marital_status = marital_status;
        updateClient.body_type = body_type;
        updateClient.complexion = complexion;
        updateClient.use_specatils.use = use !== 'YES' ? false : true;
        updateClient.use_specatils.power = power;
        updateClient.family.father.name = father_name;
        updateClient.family.father.occupation = father_occupation;
        updateClient.family.mother.name = mother_name;
        updateClient.family.mother.occupation = mother_occupation;
        updateClient.family.type = type;
        updateClient.family.number_of_member = number_of_member;
        updateClient.family.house_status = house_status;
        updateClient.native.state = native.state;
        updateClient.native.town = native.town;
        updateClient.siblings_details = sibling;
        updateClient.meal.diet = diet;
        updateClient.meal.smoking = smoking;
        updateClient.meal.drinking = drinking;
        updateClient.abroad.is_willing = is_willing !== 'YES' ? false : true;
        updateClient.abroad.mention_country = mention_country;
        updateClient.belive_in_patri = belive_in_patri !== 'YES' ? false : true;
        updateClient.open_for_other_caste = open_for_other_caste !== 'YES' ? false : true;
        updateClient.income.family = family_income;
        updateClient.income.personal = personal_income;
        updateClient.perferance = perferance;
        updateClient.astrology = astrology;
        if (file) {
            if (updateClient.profile_image) {
               
             const imageurl = await UploadImageOnline(file?.path || "")
             if(imageurl){
                updateClient.profile_image.url = imageurl || "";
                updateClient.profile_image.path=file.path
             }
                
            }
        }

        const save = await updateClient.save({
            validateBeforeSave: false
        });

        if (!save) {
            throw new error('Failed to Update Client', 500)
        }


        const response = new ResponseData(save, 202, 'Client Update Successfully');
        ResponseHandler(res, response, 202)
    } catch (error) {
        console.error(error);
        const response = new ResponseData(error, (error as any).statusCode || (error as any).status || 500, (error as any).message);
        ResponseHandler(res, response, (error as any).statusCode || (error as any).status || 500)
    }
});

export default updateField