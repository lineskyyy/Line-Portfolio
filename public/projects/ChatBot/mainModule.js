import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyBhDSP9lrzsaKRmZJL4k3G_Nrm6iNiVHWs"
const genAI = new GoogleGenerativeAI (API_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-pro"
});

export{
    model
    };