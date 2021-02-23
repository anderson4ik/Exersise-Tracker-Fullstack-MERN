const router = require('express').Router();
let User = require('../models/user.model');

//The first endpoint handles incoming HTTP GET requests on the /users/ URL path. We call Users.find() to get a list of all the users from the database. The find method returns a promise. The results are returned in JSON format with res.json(users).
router.route('/'). get((req, res) => {
    User.find()
       .then(users => res.json(users))
       .catch(err => res.status(400).json('Error: ' + err));
});

//The second endpoint handles incoming HTTP POST requests on the /users/add/ URL path. The new username is part of the request body. After getting the username, we create a new instance of User. Finally, the new user is saved to the database with the save() method and we return “User added!”
router.route('/add').post((req, res) => {
    const username = req.body.username;

    const newUser = new User({username});

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
