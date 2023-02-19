const User = require('../models/user')

const getAllUser = (req, res) => { 
    User.find({}, (err, data) => {
        if (err) {
            return res.json({ Error: err });
        }
        return res.json(data);
    })
};

/*const newUser = (req, res) => {
    User.findOne({mail: req.body.mail}, (err, data) =>{
        if(!data){
            const user = new User({
                mail: req.body.mail,
                password: req.body.password
            })

            user.save((err, data) => {
                if (err) return res.json({ Error: err });
                return res.json(data);
            })

        }else {
            if (err) return res.json(`Something went wrong, please try again. ${err}`);
            return res.json({ message: "User already exists" });
        }
        
    })
}*/

const newUser = (req, res) => {
    //check if the tea name already exists in db
    User.findOne({ mail: req.body.mail }, (err, data) => {

        //if tea not in db, add it
        if (!data) {
            //create a new tea object using the Tea model and req.body
            const newUser = new User({
                mail: req.body.mail,
                password: req.body.password
            })

            // save this object to database
            newUser.save((err, data) => {
                if (err) return res.json( `Something went wrong, PD. ${err}` );
                return res.json(data);
            })
            //if there's an error or the tea is in db, return a message         
        } else {
            if (err) return res.json(`Something went wrong, please try again. ${err}`);
            return res.json({ message: "Tea already exists" });
        }
    })
};

const login = (req, res) => {
    User.findOne({ mail: req.body.mail }, (err, data) => {
        if(!data) return res.json( `mail does not exist ` );

        if(data.password == req.body.password){
            return res.json(true);
        }else{
            res.json(false);
            res.err('pass errata')
        }
    })
}


module.exports = {
    getAllUser,
    newUser,
    login
}