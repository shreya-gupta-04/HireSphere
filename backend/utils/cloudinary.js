import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import { configDotenv } from "dotenv";

configDotenv();

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            console.error("Local file path is not provided.");
            return null;
        }

        // Determine the file type
        const fileExtension = path.extname(localFilePath).toLowerCase();
        let resourceType = 'auto';

        // Set resource_type to 'raw' for non-image files
        if (fileExtension === '.pdf') {
            resourceType = 'raw';
        }

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: resourceType
        });
        // if file uploads successfully
        if (response.secure_url) {
            fs.unlinkSync(localFilePath);
            return response;
        } else {
            console.error("Failed to get secure_url from Cloudinary response.");
            return null;
        }
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        // fs.unlinkSync(localFilePath); // remove locally saved file as upload got failed
        return null;
    }
};

export {
    uploadOnCloudinary
};