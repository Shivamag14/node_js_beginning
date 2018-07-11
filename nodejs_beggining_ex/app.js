// const http = require('http');

// const port = "3001";
// const hostname = 'localhost';

// const server = http.createServer(
//     (req, res) => {
//         console.log(`create server 3000: ${req, res}`);
//         res.statusCode = 200;
//         res.write('hurray!');
//         res.end();
//     }
// );

// server.get('/', (req, res) => {
//     console.log(`create server 3000: ${req, res}`);
//     res.statusCode = 200;
//     res.write('hello!');
//     res.end();
// });

// server.listen(port, hostname, () => {
//     console.log('listening to port 3000: ');
// })

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// middleware for form validation
const {
    check,
    validationResult
} = require('express-validator/check');

const app = express();

const port = "2000";
const hostname = 'localhost';

// custom middleware
// const logger = (req, res, next) => {
//     console.log('logging...');
//     next();
// }

// app.use(logger);


// body parser middleware
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// for static data for setting static data folder
//  if we have anything in this 'public' folder
app.use(express.static(path.join(__dirname, 'public')))

// let people = [{
//         name: 'shivam',
//         age: 23
//     },
//     {
//         name: 'rupica',
//         age: 25
//     }
// ]

// View Engine for view pages
app.set('view engine', 'ejs');
// to set the view folder to put our html file or
// ejs files which are similar to html files
app.set('views', path.join(__dirname, 'views'));

// Global variables
app.use((req, res, next) => {
    res.locals.errors = null;
    next();
})

let users = [{
        id: 1,
        first_name: "jale",
        email: "asdsdas@shdjas.ocm"
    },
    {
        id: 2,
        first_name: "kille",
        email: "jdshjfsrur@shdjas.ocm"
    }
]

app.get('/', (req, res) => {
    // console.log("res: ", res);
    // res.json(people);
    // res.send('hey');
    let title = 'customer';
    res.render('index', {
        title,
        users
    })
});

app.post('/user/add', [
    // username must be an email
    check('fname', 'length should be less than 5').isLength({
        min: 5
    }),
    // password must be at least 5 chars long
    check('email', 'invalid emial').isEmail()
], (req, res) => {

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(422).json({
    //         errors: errors.array()
    //     });
    // }

    if (errors) {
        let title = 'customer';
        res.render('index', {
            title,
            users,
            errors
        })
    } else {
        let user = {
            firstname: req.body.fname,
            email: req.body.email
        }
        console.log("user: ", user);
        console.log(success);
    }

});

app.listen(port, hostname, () => {
    console.log(`listening to port ${port}`);
});