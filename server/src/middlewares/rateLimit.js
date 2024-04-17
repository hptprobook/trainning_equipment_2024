import { userService } from '~/services/userService';

module.exports = async (request, response, next) => {
  try {
    // const user = await userService.onceUser(request.verifiedData.idGit);
    let user;
    if (request.verifiedData.idGit) {
      user = await userService.getUser(request.verifiedData.idGit);
    } else {
      user = await userService.getUserEmail(request.verifiedData.email);
    }

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
