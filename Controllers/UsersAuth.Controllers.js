import { validate_users, users } from "../Models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUserDetails = async (req, res) => {
  try {
      const userId = req.user._id;  // Directly get the user ID from req.user
      const user = await users.findById(userId);

      if (!user) {
          return res.status(404).send({
              success: false,
              message: 'User not found'
          });
      }

      const company_name = user.company_name;
      const name = user.name;

      res.status(200).send({
          success: true,
          user_details: { company_name, name }
      });
  } catch (error) {
      console.error('Error in GetUserDetails:', error);
      res.status(500).send({
          success: false,
          message: 'Internal server error'
      });
  }
};



export const signupUser = async (req, res) => {
  try {
    const {
      name,
      work_email,
      contact,
      password,
      confirm_password,
      company_name,
      message,
    } = req.body;

    if (confirm_password !== password) {
      return res.status(400).json({
        message: "Confirm password must be the same as Password",
        success: false,
      });
    } else {
      const userExists = await validate_users.findOne({ work_email });
      const userExistsInUsers = await users.findOne({ work_email });
      if (userExists) {
        return res.status(409).json({
          message:
            "Your Signup request has already submitted, please wait for the approval",
          success: false,
        });
      } else if (userExistsInUsers) {
        return res.status(409).json({
          message: "You are already a part of Cyber Jall, Please Login",
          success: false,
        });
      } else {
       
       
          const hashedPassword = await bcrypt.hash(password, 10);

          const newUser = new validate_users({
            name,
            work_email,
            contact,
            password: hashedPassword, // Store hashed password
            company_name,
            message,
          });
          await newUser.save();
          return res.status(201).json({
            message: "Data successful",
            success: true,
            data: newUser,
          });
        }
      }
    
  } catch (err) {
    console.error("Error during user signup:", err);
    return res.status(500).json({
      message: "Internal server error during user signup",
      error: err.message,
      success: false,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { work_email, password } = req.body;
    console.log();
    const user_exists = await users.findOne({ work_email });
    
    if (!user_exists) {
      return res.status(400).json({
        message: "User Not Found",
        success: false,
      });
    } else {
      const isMatch = await bcrypt.compare(password, user_exists.password);
      if (!isMatch) {
        return res.status(400).json({
          message: "Invalid credentials",
          success: false,
        });
      } else {
        const token = jwt.sign(
          {
            _id: user_exists._id,
            name: user_exists.name,
            work_email: user_exists.work_email,
          },
          `${process.env.JWT_TOKEN}`, 
          { expiresIn: "1h" } // You can adjust the expiration time
        );

        // Return the token in the response

        res.status(200).json({
          message: "Login successful",
          success: true,
          token,
        });
      }
    }

    // Generate JWT token
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Login Unsuccessful",
      success: false,
    });
  }
};

export const emailVerification = async (email) => {
  try {
    const apikey = process.env.EMAIL_API;

    const myHeaders = new Headers();
    myHeaders.append("apikey", apikey);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    const response = await fetch(
      `https://api.apilayer.com/email_verification/check?email=${email}`,
      requestOptions
    );

    const result = await response.json();

    // Validation logic
    if (!result.format_valid) {
      return { valid: false, message: "Invalid email format" };
    }

    if (!result.mx_found) {
      return { valid: false, message: "No mail server found for the domain" };
    }

    if (!result.smtp_check) {
      return {
        valid: false,
        message: "SMTP check failed - email does not exist",
      };
    }

    if (result.disposable) {
      return {
        valid: false,
        message: "Disposable email addresses are not allowed",
      };
    }

    return {
      valid: true,
      message: "Email is valid and exists",
      score: result.score, // Include the score if you need it for confidence level
    };
  } catch (error) {
    console.error("Error during email verification:", error);
    return { valid: false, message: "Error during email verification" };
  }
};
