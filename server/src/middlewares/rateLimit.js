// import jwt from 'jsonwebtoken';
import { userService } from '~/services/userService';

module.exports = async (request, response, next) => {
  try {
    const user = await userService.onceUser(request.verifiedData.idGit);
    console.log(user._id);
    const timestamp = 1711688276359;
    const date = new Date(timestamp);
    console.log(date.getDate());
    next();
  } catch (err) {
    return response.status(401).send(err);
  }
};
