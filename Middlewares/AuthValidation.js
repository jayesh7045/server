import Joi from "joi"
import jwt from "jsonwebtoken"
export const signupValidate=(req, res, next)=>{
    const userSchema = Joi.object({
        name: Joi.string().required(),
        work_email: Joi.string().email().required(),
        company_name: Joi.string().required(),
        contact: Joi.string().pattern(/^\+?[1-9]\d{1,14}$/).required(),
        message: Joi.string().optional(),
        password: Joi.string().min(6).required(),
        confirm_password: Joi.string().required(),
    });

    const {error} = userSchema.validate(req.body)
    if(error){
        res.status(400).json({
            message : "Bad Request",
            error : error
        })
    }
    next();
}

export const loginValidate=(req, res, next)=>{
    const schema = Joi.object(
        {
            work_email : Joi.string().email().required(),
            password : Joi.string().min(4).max(100).required(),
        }
    )   
    const {error} = schema.validate(req.body)
    if(error){
        res.status(400).json({
            message : "Bad Request",
            error : error
        })
    }
    next()
}



export const userValidate = (req, res, next) => {
    const authHeader = req.headers['authorization'];  // Note: header key is case-insensitive
    const secret_key = process.env.JWT_TOKEN;
    console.log('secret-token', secret_key)
    if (authHeader) {
        const token = authHeader.split(' ')[1];  // Extract token after 'Bearer'

        jwt.verify(token, secret_key, (err, decode) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid token', error: err.message });
            }
            req.user = decode;  
            next();  
        });
    } else {
        res.status(401).json({ message: 'Authorization token is required' });
    }
};
