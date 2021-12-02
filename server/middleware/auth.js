import { AuthenticationError } from 'apollo-server';
import jwt from 'jsonwebtoken';

const secret = 'test';

// const auth = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1];
//     const isCustomAuth = token.length < 500;

//     let decodedData;

//     if (token && isCustomAuth) {      
//       decodedData = jwt.verify(token, secret);

//       req.userId = decodedData?.id;
//       console.log(req);
//     } else {
//       decodedData = jwt.decode(token);

//       req.userId = decodedData?.sub;
//       console.log(req);
//     }

//     next();
//   } catch (error) {
//     console.log(error);
//   }
// };
const auth = async(context) => {
  const authHeader = context.req.headers.authorization;
  console.log("authHeader",authHeader);
  if(authHeader) {
      // Bearer .....
      const token = authHeader.split('Bearer ')[1];
      if(token){
          try{
              const user = jwt.verify(token, secret);
              const returnUser = {
                name: user.name, 
                id: user.id,
              };
              return returnUser;
          }catch(err){
              throw new AuthenticationError('Invalid/Expired token');
          }
      }
      throw new Error('Authentication token must be \'Bearer [token]');
  }
  throw new Error('Authorization header token must be provide');
}
export default auth;