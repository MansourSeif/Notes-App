const dotenv = require('dotenv');
const cors = require('cors');
const config = require('./config.json');
const mongoose = require('mongoose');
const express = require('express');

const jwt =require('jsonwebtoken');
const {authenticateToken} = require('./utilities');

const User = require('./models/user.model');
const Note = require('./models/note.model');

dotenv.config(); 

const app = express();

mongoose.connect(config.connectionString)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Could not connect to MongoDB:', err));

app.use(express.json());

app.use(cors({
    origin: '*',  
}));

app.get('/', (req, res) => {
    res.json({ data: "Hello World!" });
});

// create an account 
app.post('/create-account',async (req ,res) => {
    const {fullname , email , password} = req.body ;
    
    if (!fullname ) {
        return res.status(400)
        .json({error: true , message: "Full Name is required ! "})
        ;}
    if (!password ) {
        return res.status(400)
        .json({error: true , message: "Password is required ! "})
        ;}
    if (!email ) {
        return res.status(400)
        .json({error: true , message: "Email is required ! "})
        ;}
        // check if user already exists
        const isUser = await User.findOne({email: email}) ; 

        if(isUser){
           return  res.json({error: true , message: "User already exists ! "}) ; 
        }
        
        const user = new User({
            fullname,
            email,
            password
        });
    
        await user.save() ;

        const accessToken = jwt.sign({user} ,
             process.env.ACCESS_TOKEN_SECRET ,
              {expiresIn: '36000m'}) ; 

        return res.json({error:false ,
            accessToken,
            user , 
            message: "Account created successfully !"
        }) ; 




})

// login
app.post('/login',async (req,res) =>{
    const {email , password} = req.body ; 
    if (!email ) {
        return res.status(400)
        .json({error: true , message: "Email is required ! "})
        ;}
    if (!password ) {
        return res.status(400)
        .json({error: true , message: "Password is required ! "})
        ;}
        // check if user already exists
    const userInfo = await  User.findOne({email :email}) ;
    if(!userInfo){
        return res.status(400).json({ message : " User not found !"}) ;
    }
    // check if password is correct
    if(userInfo.email == email && userInfo.password == password){
        const user={user:userInfo} ;
        const accessToken =jwt.sign(user , process.env.ACCESS_TOKEN_SECRET , {expiresIn: '36000m'}) ;
        
        return res.json({
            error: false ,
            accessToken ,
            email ,
            message: "Login successful !"}) ;
    }else {
        return res.status(400).json({error: true , message: "Invalid credentials ! "}) ;
    }


})

// Add Note
app.post('/add-note' , authenticateToken , async (req ,res) => {
    const {title , content , tags} = req.body ; 
    const user = req.user ;
    if(!title){
        return res.status(400).json({error: true , message: "Title is required ! "}) ;
    }
    if(!content){
        return res.status(400).json({error: true , message: "Content is required ! "}) ;
    }
    try {
        const note = new Note({
            title,
            content,
            tags : tags || [],
            userId: user._id
        }) ; 

        await note.save() ; 

        return res.json({error: false , note  , message: "Note added successfully ! "}) ;
    }catch(err){
        return res.status(500).json({error:true, message: "Internal Server Error ! "}) ;
    }

});

app.listen(8000, () => {
    console.log('Server is running on http://localhost:8000');
});

module.exports = app; 
