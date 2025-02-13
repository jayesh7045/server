import express from "express"
import { loginValidate, signupValidate, userValidate} from "../Middlewares/AuthValidation.js"
import { getProgramsData } from "../Controllers/ProgramsController.js"
import { saveProgramReport } from "../Controllers/HandleReports.js"
import { loginUser, signupUser, getUserDetails, TestFunction} from "../Controllers/UsersAuth.Controllers.js"
import { storeData, getPocFile } from "../Controllers/Cloudinary.js"
import { SubmitContactData } from "../Controllers/Contactus.js"
export const router = express.Router()
router.post("/login", loginValidate, loginUser)

router.post("/contact_us", SubmitContactData)
router.post("/signup", signupValidate, signupUser)
router.get('/get_details', userValidate, getUserDetails)
router.get('/get_programs', userValidate, getProgramsData)
rputer.get("/test", TestFunction)
router.post('/upload', storeData);
router.get('/get_file', getPocFile);
