import express from 'express';
import formData from 'form-data';
import Mailgun from 'mailgun.js';
import dotEnv from 'dotenv';

dotEnv.config();

const app = express();
const port = 3000;

async function sendSimpleMessage(email, name, surname) {
    const mailgun = new Mailgun(formData);

    const mg = mailgun.client({
        username: "api",
        key: process.env.API_KEY,
        // When you have an EU-domain, you must specify the endpoint:
        // url: "https://api.eu.mailgun.net"
    });

    try {
        const data = await mg.messages.create("sandbox1bd8808a75bc4ed1ac21ec246cbd4d52.mailgun.org", {
            from: "Mailgun Sandbox <postmaster@sandbox1bd8808a75bc4ed1ac21ec246cbd4d52.mailgun.org>",
            to: [`${name} ${surname} <${email}>`],
            subject: `Hello ${name} ${surname}`,
            text: `Congratulations ${name} ${surname}, you have just signed yourself up for a mailing service.`,
        });

        console.log('success!!'); // logs response data
    } catch (error) {
        console.log(error); //logs any error
    }
}

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + "/index.html");
});

function isStringValid(str)
{
    if (typeof str != "string") return false;
    if (!str.trim()) return false; // check for whitespaces and falsey values

    return true;
}

app.post('/', async (req, res) => {
    let email = req.body.email;
    let name = req.body.firstName;
    let surname = req.body.surname;

    console.log(email, name, surname);

    if (!isStringValid(email) && !isStringValid(name) && !isStringValid(surname)) {
        res.status(401).send('<script>alert("Failed!! Ensure you provide the email, name and surname!")</script>');
        return;
    }

    await sendSimpleMessage(email, name, surname);

    res.status(200).send('<script>alert("success!");</script>')
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});