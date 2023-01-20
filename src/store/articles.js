import {
  doc,
  setDoc,
  getDocs,
  collection,
  serverTimestamp,
  query,
  limit,
  orderBy,
  startAfter,
} from "firebase/firestore";
import { successMessage, errorMessage } from "@/tools/vuex";
import { db } from "@/firebase";
import router from "@/routes";

let articlesCollection = collection(db, "articles"); //Създаваме нова колекция с това име.

const articlesModule = {
  namespaced: true,
  state() {
    return {
      adminArticles: [],
      lastVisibleArticle: null,
    };
  },
  getters: {
    showAdminArticles(state) {
      return state.adminArticles;
    },
    getLastVisibleArticle(state) {
      return state.lastVisibleArticle;
    },
  },
  mutations: {
    setAdminArticles(state, articles) {
      state.adminArticles = articles;
    },
    setLastVisibleArticle(state, payload) {
      state.lastVisibleArticle = payload;
    },
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
    async getAdminArticles({ commit }, payload) {
      try {
        const currQuery = query(
          articlesCollection,
          orderBy("timestamp", "desc"),
          limit(payload.limit)
        );
        const querySnapshot = await getDocs(currQuery);

        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        const articles = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        commit("setAdminArticles", articles);
        commit("setLastVisibleArticle", lastVisible);
      } catch (error) {
        errorMessage(commit, error);
      }
    },
    async getMoreArticles({ commit, getters }, payload) {
      try {
        if (getters.getLastVisibleArticle) {
          const oldArticles = getters.showAdminArticles;

          const currQuery = query(
            articlesCollection,
            orderBy("timestamp", "desc"),
            startAfter(getters.getLastVisibleArticle),
            limit(payload.limit)
          );

          const querySnapshot = await getDocs(currQuery);
          const newArticles = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

          commit("setAdminArticles", [...oldArticles, ...newArticles]);
          commit("setLastVisibleArticle", lastVisible);
        }
      } catch (error) {
        errorMessage(commit, error);
      }
    },
  },
};

export default articlesModule;
