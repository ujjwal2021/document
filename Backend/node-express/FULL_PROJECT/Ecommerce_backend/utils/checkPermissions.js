const CustomError = require("../errors");

const checkPermissions = (requestUser, resourceUserId) => {
    // console.log(requestUser, resourceUserId);
    // console.log(typeof requestUser);
    // console.log(typeof resourceUserId);
    if(requestUser.role ==="admin") return;
    if(requestUser.userId === resourceUserId.toString()) return;
    throw new CustomError.UnauthorizedError("not authorized to access this route");
}

module.exports = checkPermissions;