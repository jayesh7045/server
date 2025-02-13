import { GridFSBucket } from "mongodb";
import fs from "fs"
import { get_connection } from "../server.js";
import { reports } from "../Models/report_submissions.model.js";


export async function storeData(req, res) {
    console.log("StoreDATA BACKEND");
    try {
        console.log("Backend StoreData");

        const company_data = req.body;

        if (!company_data.data || !company_data.data.poc) {
            console.log(company_data)
            return res.status(400).json({
                success: false,
                message: "Missing required data or file path",
            });
        }

        const {
            name, email, title, severity, type, detail, steps, impact, affected_system, poc
        } = company_data.data;

        console.log("Incoming Data:", company_data);

        // Step 1: Save initial company data
        const new_company_data = new reports({
            name, email, title, severity, type, detail, steps, impact, affected_system, poc
        });

        await new_company_data.save();

        // Step 2: Establish GridFS connection
        const connect_to_db = await get_connection();
        const database = connect_to_db.db;
        const bucket = new GridFSBucket(database);

        // Step 3: Read and upload file
        if (!fs.existsSync(poc)) {
            return res.status(400).json({
                success: false,
                message: "Provided file path does not exist",
            });
        }

        const fileName = poc.split("/").pop();
        const fileData = fs.createReadStream(poc);
        const uploadStream = bucket.openUploadStream(fileName);

        const fileId = await new Promise((resolve, reject) => {
            fileData
                .pipe(uploadStream)
                .on("error", (error) => reject(new Error("Error uploading file: " + error)))
                .on("finish", () => resolve(uploadStream.id));
        });

        console.log("File stored successfully:", fileId);

        // Step 4: Update the document with the file ID
        const find = await reports.findByIdAndUpdate(
            new_company_data._id,
            { $set: { fid: fileId } },
            { new: true }
        );
        
        if (!find) {
            console.error(`Document with ID ${new_company_data._id} not found or update failed.`);
        } else {
            console.log("Updated Document:", find);
        }
        console.log(new_company_data._id)
        return res.status(200).json({
            success: true,
            message: "File upload successful",
            fileId,
        });
    } catch (error) {
        console.error("Error storing data:", error);
        return res.status(500).json({
            success: false,
            message: "Error storing data",
            error: error.message,
        });
    }
}



export async function getPocFile(req, res) {
    try {
        const {name, email, title} = await req.body
        const connect_to_db = get_connection()
        const database = connect_to_db.db
       

        // Find the user by name and get the Resume (fileId) from the database
        const report = await reports.findOne({ name, email, title });
        if(reports)
        {
          console.log("reports Found")
        }
        const fid = report.fileId
        if (!fid) {
            console.log("User not found");
            return;
        }

      

        const bucket = new GridFSBucket(database);
        const downloadStream = bucket.openDownloadStream(fid);
        const fileStream = fs.createWriteStream(`${name}_Resume.pdf`); // Download the file with the name as filename

        downloadStream.pipe(fileStream)
            .on("error", (error) => {
                console.error("Error downloading file:", error);
            })
            .on("finish", () => {
                console.log("File downloaded successfully!");
                res.status(200).json(
                  {
                    message : "File saved Successfully",
                    success : true
                  }
                )
            });
    } catch (error) {
        console.error("Error retrieving PDF:", error);
    }
}

// Example usage:
async function storeAndRetrievePDF() {
    const name = "John Doe"; // Example name
    const filePath = "C:/Roar/CyberJall_eSparse/CyberJall/CyberJall/Backend/Controllers/ViewResult1.pdf"; // Example file path

    // Store the PDF and get the fileId
    const fileId = await storeData();
    if (fileId) {
        // Retrieve the PDF by name (use the same name you stored it with)
        await retrievePDF(name);
    }
}


