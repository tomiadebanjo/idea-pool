export default class RequestHelpers {
  static errorHandler(error, displayMessageMethod) {
    if (error.response) {
      displayMessageMethod(error.response.data.reason);
    } else if (error.request) {
      displayMessageMethod("Network Error, Please try again!");
    } else {
      displayMessageMethod("Something went wrong, Please try again!");
    }
  }
}
