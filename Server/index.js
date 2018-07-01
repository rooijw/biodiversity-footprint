const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000
const nodemailer = require('nodemailer')


app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('pages/index'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'saxion.biodiversity.footprint@gmail.com',
        pass: 'biodiversity12'
    }
});

app.post('/api/email', function (req, res) {
    var mailOptions = {
        from: 'saxion.biodiversity.footprint@gmail.com',
        to: 'plansup.consult@gmail.com',
        subject: 'biodiversity',
        text: "From: " + req.body.email + "\nMessage: " + req.body.message
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.send("error");
        } else {
            console.log('Email sent: ' + info.response);
            res.send("success");
        }
    });

    
});


app.listen(PORT, () => console.log(`Listening on ${ PORT }`))