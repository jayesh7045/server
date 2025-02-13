import { contacts } from "../Models/contactus.model.js";
export const SubmitContactData=async(req, res)=>{
    try{
      
        const {name, company_name, email, contact, message} = req.body;
        const new_contact = new contacts({
            name, company_name, email, contact, message
        })
        await new_contact.save();
        res.status(200).json({
            message : "User Contact Saved successfully",
            success : true
        })
       
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({
                message : "Some internal Error Occured",
                success : false
        })
    }
}