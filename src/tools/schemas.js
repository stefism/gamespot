import * as yup from "yup";

const addArticlesSchema = {
  game: yup.string().required("The game name is required."),
  title: yup
    .string()
    .required("The game title is required.")
    .min(20, "The title must be between 20 to 70 characters.")
    .max(100, "The title must be between 20 to 70 characters."),
  excerpt: yup
    .string()
    .required("The excerpt is required.")
    .min(20, "The excerpt must be between 20 to 500 characters.")
    .max(500, "The excerpt must be between 20 to 500 characters."),
  editor: yup
    .string()
    .required("The content is required.")
    .min(50, "The content must minimum 50 characters."),
  rating: yup
    .string()
    .required("The rating is required.")
    .notOneOf(["Select a rating"], "You need to select a rating."), //Изважда от селекцията първата стойност. Не позволява да остане селектирано "Select a rating" като value. Мега яко.
  img: yup
    .string()
    .url("Please enter a valid URL.")
    .required("The URL is required."),
};

export { addArticlesSchema };
