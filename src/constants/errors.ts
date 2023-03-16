const errors = {
  badRequest: {
    message: "Bad Request: Request has wrong format.",
    statusCode: 400,
    publicMessage: "Bad Request: Request has wrong format.",
  },
  unauthorized: {
    message: "Unauthorized: User or password not found.",
    statusCode: 401,
    publicMessage: "Unauthorized: User not found.",
    wrongCredentialsMessage: "Unauthorized: Wrong credentials",
  },
  forbidden: {
    message: "Forbidden: You're missing permission to execute this request.",
    statusCode: 403,
    publicMessage:
      "Forbidden: You're missing permission to execute this request.",
  },
  notFound: {
    message: "Not Found: End point or path not found",
    statusCode: 404,
    endPointMessage: "End point not Found",
    pathMessage: "Path not found",
  },
  serverError: {
    message: "Internal Server Error: Something went wrong",
    statusCode: 500,
    publicMessage: "Internal Server Error: Something went wrong",
    startingServerError: "Error on starting the server",
    getImagesError: "Internal Server Error: Couldn't retrieve images.",
    deleteImagesError: "Internal Server Error: Couldn't delete the image.",
    databaseError: "Error while connecting to data base",
  },
  otherErrors: {
    eaddrinuse: "EADDRINUSE",
  },
  authenticationError: {
    statusCode: 401,
    missingHeader: "Authorization header missing",
    missingBearer: "Missing bearer in Authorization header",
    invalidToken: "Invalid Token",
    missingToken: "Missing Token",
  },
};
export default errors;
