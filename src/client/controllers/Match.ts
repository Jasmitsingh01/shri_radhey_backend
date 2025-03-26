import Error from "../utlis/error/Error";
import RequestHandler from "../utlis/request/requestHandler";
import ResponseData from "../utlis/response/responseData";
import ResponseHandler from "../utlis/response/responseHandler";
import client from "../models/client.model";
import { Request, Response, NextFunction } from 'express'

const SimilarClient = RequestHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {

        const query = req.query;

        const { ethinicity, qualification, occupation, meal, member, gender, complexion, body_type, marital_status } = req.body;
       
        if ((!ethinicity && !qualification && !occupation && !meal && !member && !gender && !complexion && !body_type && !marital_status) ) {
            throw new Error('All fields are required', 400)
        }

        if (!query) {
            throw new Error('Query is required', 400);
        }


        let clients = await client.find({
            $or: [
                { ethinicity: ethinicity },
                { qualification: qualification },
                { occupation: occupation },
                { meal: meal },
                { member: member },
                { complexion: complexion },
                { body_type: body_type },
                { marital_status: marital_status }
            ],
             gender: gender ,

            


        });
        if (!clients) {
            throw new Error('No client found', 404);
        }
        
        const response = new ResponseData(clients, 200, 'Clients found');
        ResponseHandler(res, response, 200);
    }
    catch (err) {
        console.error(err);
        const response = new ResponseData(err, (err as any).statusCode || (err as any).status || 500, (err as any).message);
        ResponseHandler(res, response, (err as any).statusCode || (err as any).status || 500)
    }
}
)

export default SimilarClient;