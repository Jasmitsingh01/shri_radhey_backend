import { Response } from "express";

interface token {
    access_token: string,
    refresh_token: string
}


const setCookies =  (res: Response, token: token) => {
    for (const key in token) {
        if (Object.prototype.hasOwnProperty.call(token, key)) {
            const element = token[key as keyof token];
            res.cookie(key,element,{
                httpOnly: true,            
            })
            
        }
    }
  
}

export default setCookies;