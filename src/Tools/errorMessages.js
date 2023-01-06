const errorMessage = (code) => {
  let message = "Ooops, try again later.";

  switch (code) {
    case "auth/user-not-found":
      message = "This user is not found. Check your email.";
      break;
    case "auth/email-already-in-use":
      message = "This email already in use.";
      break;
    case "auth/wrong-password":
      message = "Wrong password.";
      break;

    default:
      message = code;
      break;
  }

  return message;
};

export default errorMessage;
