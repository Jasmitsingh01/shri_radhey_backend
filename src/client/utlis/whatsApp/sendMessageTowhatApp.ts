import twilio from 'twilio'
import error from '../error/Error'

const client = twilio('ACbfcad3712eff6dc6398d7db19b63b088','0a8ae2a96f5370573e569833301de2d8')

async function sendTowhatsapp(messages:string,media:string,to:string){
try {
   const message=await client.messages.create({
      body:messages,
      from: 'whatsapp:+14155238886',
      to:'whatsapp:+91'+to,
      mediaUrl:[media]
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