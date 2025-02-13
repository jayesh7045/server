import dotenv from "dotenv"
dotenv.config();
export const mongo_url = process.env.URL
export const port = process.env.PORT
export const email_api = process.env.EMAIL_API
export const jwt_token = process.env.JWT_TOKEN 
export const cloudinary_secret = process.env.CLOUDINARY_SECRET
