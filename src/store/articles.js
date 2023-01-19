import { doc, setDoc, collection, serverTimestamp } from "firebase/firestore";
import { successMessage, errorMessage } from "@/tools/vuex";
import { db } from "@/firebase";
import router from "@/routes";

let articlesCollection = collection(db, "articles"); //Създаваме нова колекция с това име.

const articlesModule = {
  namespaced: true,
  state() {
    return {};
  },
  actions: {
    async addArticle({ commit, rootGetters }, payload) {
      try {
        const user = rootGetters["auth/getUserData"]; //Когато викаме гетери от един модул в друг, ползваме rootGetters.

        const newArticle = doc(articlesCollection); //Създаваме нов артикул в тази колекция.

        await setDoc(newArticle, {
          timestamp: serverTimestamp(),
          owner: {
            uid: user.uid,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isAdmin: user.isAdmin,
          },
          ...payload,
        }); //Правим заявка до базата и записваме този документ с тези данни в съответната колекция.

        router.push({ name: "admin_articles" });
        successMessage(commit, "Article added successfully");
      } catch (error) {
        errorMessage(commit, error);
      }
    },
  },
};

export default articlesModule;
