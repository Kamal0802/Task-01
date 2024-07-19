const Mongo = require('mongoose');

const validator = require("validator");

const bc = require("bcrypt");

const userSchema = new Mongo.Schema({
  userName: {
    type: String,
    required: [true, "enter user name"],
  },

  email: {
    type: String,
    required: [true, "please enter the email"],
    validate: [validator.isEmail, "please enter valid email"],
    lowercase: true,
    unique: true,
  },

  Password: {
    type: String,
    required: [true, "please enter the password"],
    minlength: 5,
    select:false
  },

  confirmPassword:{
   type:String,
   required:[true,"please enter the confirm password"],
   validate:{
      validator:function(val){
         return val=== this.Password
      }
   },
   messege:"password and confirm password is not matching"
  }

 
});

userSchema.pre('save', async function (nxt) {
  if (!this.isModified("Password")) return nxt();

  this.Password = await bc.hash(this.Password, 12)

  this.confirmPassword=undefined;
    
});

const userModel = Mongo.model('user',userSchema);

module.exports = userModel;
