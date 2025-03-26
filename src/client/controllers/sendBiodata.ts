import error from "../utlis/error/Error"; // Assuming your custom error class is named CustomError
import RequestHandler from "../utlis/request/requestHandler";
import ResponseData from "../utlis/response/responseData";
import ResponseHandler from "../utlis/response/responseHandler";
import client from "../models/client.model";
import { Request, Response, NextFunction } from 'express';
import sendTowhatsapp from "../utlis/whatsApp/sendMessageTowhatApp";
import jsPDF from "jspdf";
import autoTable, { FontStyle } from 'jspdf-autotable';
import UploadImageOnline from "../utlis/cloudnairy";
import fs from 'fs'
function convert24HourTo12Hour(time24: string) {
    const [hours, minutes] = time24.split(':').map(Number);

    if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
        return "Invalid time format";
    }

    let period = 'AM';
    let hours12 = hours;

    if (hours >= 12) {
        period = 'PM';
        if (hours > 12) {
            hours12 = hours - 12;
        }
    } else if (hours === 0) {
        hours12 = 12;
    }

    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours12}:${formattedMinutes} ${period}`;
}


async function cloudinaryUrlToBase64(cloudinaryUrl: string): Promise<string | null> {
    try {
        const response: globalThis.Response = await fetch(cloudinaryUrl);
        const blob: Blob = await response.blob();

        return new Promise<string>((resolve, reject) => {
            const reader: FileReader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    resolve(reader.result);
                } else {
                    reject('FileReader result is not a string');
                }
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    } catch (error) {
        console.error('Error converting Cloudinary URL to base64:', error);
        return null;
    }
}




async function addCloudinaryImageToPdf(doc: any, cloudinaryUrl: string, x: number, y: number, width: number, height: number): Promise<void> {
    const base64Image: string | null = await cloudinaryUrlToBase64(cloudinaryUrl);
    if (base64Image) {
        let imageType: string = base64Image.substring("data:image/".length, base64Image.indexOf(";base64"));
        doc.addImage(base64Image, imageType.toUpperCase(), x, y, width, height);
    }
}
const generatePdf = (client: any): Promise<string> => {
    return new Promise(async (resolve, reject) => {
        const doc = new jsPDF();
        doc.setFontSize(12);
        doc.setFillColor('#831311');
        doc.rect(5, 5, 200, 110, 'F');
        doc.setTextColor(255, 255, 255);
        doc.text('Eamil :- info.shriradhey.service@gmail.com', 120, 70)

        doc.text('Location - NSP, new delhi', 150, 80,)
        doc.text('Phone No - 8810472899', 150, 90)
        doc.text('Website :- https://shriradheymatrimony.in', 126, 100,)



        doc.setFontSize(16);

        // if (client?.profile_image) {
        //     let secureImage = client?.profile_image.replace("http://", "https://");
        //     doc.addImage(client?.profile_image,"PNG", 7, 7, 75, 100);
        // }

        doc.setFillColor('#831311');
        doc.rect(13.5, 125, 182.3, 20, 'F');
        doc.text('Personal Details', 18, 133);
        const tableStyles = {
            headStyles: {
                fillColor: [131, 19, 17] as [number, number, number],
                textColor: [255, 255, 255] as [number, number, number],
                fontStyle: 'bold' as FontStyle,

            },
            alternateRowStyles: {
                fillColor: [220, 220, 220] as [number, number, number], // Light gray alternate row color
                textColor: [0, 0, 0] as [number, number, number], // Black text on light background
                fontStyle: 'bold' as FontStyle,
            },
            styles: {
                fontSize: 11,
                fontStyle: 'bold' as FontStyle,
                cellPadding: 3,
                textColor: [0, 0, 0] as [number, number, number], // White text for contrast
                lineWidth: 0.2, // Add border line width to body cells
                lineColor: [0, 0, 0] as [number, number, number],
            },
        };
        autoTable(doc, {
            startY: 140,

            body: [
                ['Full Name', `${client?.fullname?.firstname} ${client?.fullname?.lastname} ` || 'N/A'],

                ['Height', `${client?.height?.value} ${client?.height?.unit || 'N/A'}`],
                ['Gender', client?.gender || 'N/A'],
                ['Birth Date', client?.birth?.date ? new Date(client?.birth?.date).toLocaleDateString() : 'N/A'],
                ['Birth Place', client?.birth?.place || 'N/A'],
                ['Birth Time', client?.birth?.time ? convert24HourTo12Hour(client?.birth?.time) : 'N/A'],
                ['Native State', client?.native?.state || 'N/A'],
                ['Native Town', client?.native?.town || 'N/A'],
                ['Matrial Status', client?.marital_status || 'N/A'],

                ['Astrologically', client?.astrology?.manglik || 'N/A'],
                ['Personality', client?.body_type],
                ['Complexion', client?.complexion],
                ['Diet', client?.meal?.diet || 'N/A'],

                ['Smoking', client?.meal?.smoking || 'N/A'],
                ['Drinking', client?.meal?.drinking || 'N/A'],

                ['Religion', client?.ethinicity?.religion || 'N/A'],
                ['Caste', client?.ethinicity?.caste || 'N/A'],
                ['Gotra', client?.ethinicity?.gotra || 'N/A'],
            ],
            theme: 'grid',
            styles: tableStyles.styles,
            headStyles: tableStyles.headStyles,
            alternateRowStyles: tableStyles.alternateRowStyles,
        });




        doc.setFillColor('#831311');
        doc.rect(14, (doc as any).lastAutoTable.finalY + 5, 182, 20, 'F');
        doc.text('Qualification and Occupation Detail', 18, (doc as any).lastAutoTable.finalY + 15);

        // Qualification and Occupation
        autoTable(doc, {
            startY: (doc as any).lastAutoTable.finalY + 20,
            body: [
                ['Qualification', client?.qualification?.qualification || 'N/A'],
                ['Qualification Detail', client?.qualification?.details || 'N/A'],
                ['Occupation', client?.occupation?.occupation || 'N/A'],
                ['Occupation Detail', client?.occupation?.details || 'N/A'],
                ['Personal Income', client?.income?.personal || 'N/A'],

            ],
            theme: 'grid',
            styles: tableStyles.styles,
            headStyles: tableStyles.headStyles,
            alternateRowStyles: tableStyles.alternateRowStyles,
        });
        doc.setFillColor('#831311');
        doc.rect(14, (doc as any).lastAutoTable.finalY + 5, 182, 20, 'F');
        doc.text('Family Details', 18, (doc as any).lastAutoTable.finalY + 15);

        // Family Details
        autoTable(doc, {
            startY: (doc as any).lastAutoTable.finalY + 20,
            body: [
                ['Father Name', client?.family?.father?.name || 'N/A'],
                ['Father Occupation', client?.family?.father?.occupation || 'N/A'],
                ['Father Occupation Detail', client?.family?.father?.occupation_Details || "N/A"],
                ['Mother Name', client?.family?.mother?.name || 'N/A'],
                ['Mother Occupation', client?.family?.mother?.occupation || 'N/A'],
                ['Mother Occupation Detail', client?.family?.mother?.occupation_Details || "N/A"],

                ['Family Details', client?.family?.details || 'N/A'],
                ['Family Income', client?.income?.family || 'N/A'],

                ['Residence', client?.fulladdreess?.custom || 'N/A'],
            ],
            theme: 'grid',
            styles: tableStyles.styles,
            headStyles: tableStyles.headStyles,
            alternateRowStyles: tableStyles.alternateRowStyles,
        });

        doc.setFillColor('#831311');
        doc.rect(14, (doc as any).lastAutoTable.finalY + 10, 182, 20, 'F');
        doc.text(`Sibling Details`, 18, (doc as any).lastAutoTable.finalY + 20);

        // Other Details
        autoTable(doc, {
            startY: (doc as any).lastAutoTable.finalY + 25,
            head: [
                [
                    "S.NO",
                    'Name',
                    'Age',
                    'Relation',
                    'Occupation',
                    'Marital Status',
                    'Spouse Name',
                ],
            ],
            body: client.siblings_details?.map(
                (sibling: {
                    name?: string;
                    age?: string;
                    relation?: string;
                    occupation?: string;
                    matrial_status?: string;
                    spouse_name?: string;
                }, index: number) => [
                        index + 1,
                        sibling.name || 'N/A',
                        sibling.age || 'N/A',
                        sibling.relation || 'N/A',
                        sibling.occupation || 'N/A',
                        sibling.matrial_status || 'N/A',
                        sibling.spouse_name || 'N/A',
                    ]
            ) || [], // Handle case where client.siblings_details is undefined or null
            theme: 'grid',
            styles: tableStyles.styles,
            headStyles: tableStyles.headStyles,
            alternateRowStyles: tableStyles.alternateRowStyles,
        });
        const pdfPath = './generated.pdf';
        doc.save(pdfPath)
        resolve(pdfPath)
    })
};
const SendBIODATA = RequestHandler(async (req: Request, res: Response, next: NextFunction) => {

    try {
        const sendtoPhonenumber = Array.isArray(req.query.phone)
            ? req.query.phone[0]?.toString()
            : req.query.phone?.toString();
        if (!sendtoPhonenumber) {
            throw new error('Invalid Phone number', 400)
        };
        const id = req.query.id;
        const FindClient = client.findById(id)
        if (!FindClient) {
            throw new error('No client is found', 400)
        }
        //  Generate pdf
        const pdfPath = await generatePdf(FindClient)
        if (!pdfPath) {
            throw new error("Failed to genrate pdf ", 500)
        }

        const uploadedUrl = await UploadImageOnline(pdfPath);
        console.log("PDF uploaded successfully:", uploadedUrl);

        if (!uploadedUrl) {
            throw new error('Failed to upload pdf', 500)
        }

        await sendTowhatsapp('hi', uploadedUrl, sendtoPhonenumber)
        fs.unlinkSync(pdfPath);
        const response = new ResponseData('', 200, 'Bio data send');
        ResponseHandler(res, response, 200);
    } catch (err) {
        console.error(err);
        const response = new ResponseData(err, (err as any).statusCode || (err as any).status || 500, (err as any).message);
        ResponseHandler(res, response, (err as any).statusCode || (err as any).status || 500)

    }
})

export default SendBIODATA