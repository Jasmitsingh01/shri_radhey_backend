import error from "../utlis/error/Error";
import RequestHandler from "../utlis/request/requestHandler";
import ResponseData from "../utlis/response/responseData";
import ResponseHandler from "../utlis/response/responseHandler";
import client from "../models/client.model";
import { Request, Response, NextFunction } from 'express'

const SimilarClient = RequestHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {

     const query = req.query;

     const {ethinicity,qualification,occupation,meal,member} = req.body;
     if(!ethinicity || !qualification || !occupation || !meal || !member){
        throw new error('All fields are required',400)
     }

     if (!query) {
        throw new error( 'Query is required',400);
        }
        let searchCriteria:any = {}
        if (meal.drinking) {
            if (!searchCriteria.meal) {
                searchCriteria.meal = {};
            }
            searchCriteria.meal = meal;
        }


        let clients = await client.find({
            $text: {
                $search:  meal?.drinking + ' ' + meal?.smoking,
            }
        },{
            score: { $meta: "textScore" }
        }).sort({
            score: { $meta: "textScore" }, // Sort by score

        });
        const maxScore = clients.length > 0 && clients[0].score !== undefined ? clients[0].score : 1;
        const usersWithMatchPercentage = clients.map((user) => ({
          ...user.toObject(),
          matchPercentage: user.score ? ((user.score / maxScore) * 100).toFixed(2) : '0.00',
        }));
        console.log(usersWithMatchPercentage)
    }
    catch (err) {
        console.error(err);
        const response = new ResponseData(err, (err as any).statusCode || (err as any).status || 500, (err as any).message);
        ResponseHandler(res, response, (err as any).statusCode || (err as any).status || 500)
    }
}
)

export default SimilarClient;