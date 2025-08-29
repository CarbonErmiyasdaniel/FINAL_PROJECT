import dotenv from "dotenv";

dotenv.config();

console.log("--- Dotenv Diagnostic ---");
console.log(`Node environment is: ${process.env.NODE_ENV}`);
console.log(`Your MONGO_URI is: ${process.env.MONGO_URI}`);
console.log("--- End of Diagnostic ---");
