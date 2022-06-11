const bcrypt= require('bcrypt')
const User = require('../models/User');
const saltRounds=10;



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