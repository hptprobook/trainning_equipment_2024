import { userService } from '~/services/userService';

module.exports = async (request, response, next) => {
  try {
    const user = await userService.onceUser(request.verifiedData.idGit);
    if (user?.isPro) {
      request.userIdPro = String(user._id);
      next();
      return;
    }
    request.userId = String(user._id);
    next();
  } catch (err) {
    return response.status(401).send(err);
  }
};
