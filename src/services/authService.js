const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken')
const User = require('../models/User');
const saltRounds=10;
const secret='hfdshdfjldfkdlgfdjkfjdkfkd'


exports.register =async ({username, password, repeatPassword}) =>{
  // User.create(userData);
  //todo: return form validation message
    if(password !== repeatPassword){
        return false
    }

   let hashedPassword = await bcrypt.hash(password, saltRounds)

   let createdUser = await User.create({
       username,
       password: hashedPassword
   });

   return createdUser;
};
exports.login= async ({username, password})=>{
    let user= await User.findOne({username});
         console.log(user.password)
    if(!user){
        // todo:message
        return ;
    }
    const isValid= await bcrypt.compare(password, user.password);
    
    if(!isValid){
        return 
    }
    let result= new Promise((resolve, reject)=>{
        jwt.sign({_id:user._id, username:user.username}, secret, {expiresIn:'2d'},(err, token)=>{
          if(err){
           return reject(err)
           }
            
           resolve(token)
        })
    });
   return result
};