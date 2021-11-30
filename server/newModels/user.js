import  pkg  from 'mongoose';
const { model, Schema } = pkg;

const userSchema = new Schema({
   name: String,
   email: String,
   password: String,
});

const UserSchema = model('user',userSchema);
export default UserSchema;