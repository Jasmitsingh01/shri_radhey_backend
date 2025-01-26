import twilio from 'twilio'
import error from '../error/Error'

const client = twilio('AC4edae408e6e035a092d0c9c0fedb6169','b0c15fc62f5a15c78e6378c3454d3589')

async function sendTowhatsapp(messages:string,to:string){
try {
   const message=await client.messages.create({
      body:messages,
      from: 'whatsapp:+14155238886',
      to:to
     })
     if(!message){
      throw new error('message is not Sented',500)
     }
     console.log('message sented', message.sid)
} catch (error) {
   console.error(error)
}


}

export default sendTowhatsapp;