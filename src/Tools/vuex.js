const errorMessage = (commit, message = "Oops. Try again later.") => {
  return commit(
    "notify/setToastMsg",
    {
      message: message,
      type: "error",
    },
    { root: true }
  ); //Понеже изпълняваме тази мутация от друго място - в друг модул на стейта (authenticationModule), който също си има свои мутации, трябва да имаме { root: true }, иначе мутацията няма да работи.
};

const successMessage = (commit, message = "Thank you.") => {
  return commit(
    "notify/setToastMsg",
    {
      message: message,
      type: "success",
    },
    { root: true }
  );
};

export { errorMessage, successMessage };
