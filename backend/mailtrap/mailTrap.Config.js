import { MailtrapClient } from "mailtrap";
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const hello = process.env.PORT
console.log(hello);
// console.log(process.env);
// Use import.meta.url to define __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const TOKEN = "7d793a92efc185cba7ce8ee41886d196";

if (!TOKEN) {
  console.error("Mailtrap Token is missing! Check your .env file.");
  process.exit(1);
}

const client = new MailtrapClient({
  token: TOKEN,
});

// Define sender and recipient
const sender = {
  email: "hello@demomailtrap.com",
  name: "AUTHORIZING COMMITTEE - Preventing Unauthorized Content Viewing",
};
const recipients = [
  {
    email: "",
  },
];

// Correct file path
const filePath = path.resolve(__dirname, 'emailContent.txt'); // Path to the new text file

// Read the file and send email
fs.readFile(filePath, 'utf-8', (err, fileContent) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  // Use the file content as the email body
  client.send({
      from: sender,
      to: recipients,
      subject: "Notification regarding unauthorized content usage on telegram",
      text: fileContent,
    })
    .then((response) => console.log("Email sent successfully:", response))
    .catch((error) => console.error("Error sending email:", error));
});
