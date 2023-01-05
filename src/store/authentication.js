/* eslint-disable */
import { errorMessage, successMessage } from "@/Tools/vuex";
import { db, auth } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import router from "@/routes";

const DEFAULT_USER = {
  uid: null,
  email: null,
  firstName: null,
  lastName: null,
  isAdmin: null,
};

const authenticationModule = {
  namespaced: true,
  state() {
    return {
      user: DEFAULT_USER,
      auth: false,
    };
  },
  mutations: {
    setUser(state, payload) {
      state.user = {
        ...state.user, //...state.user - така запазваме всички пропертита, които преди това сме сетнали от DEFAULT_USER. Иначе пропертитата, които не сетваме (firstName, lastName) ще се изгубят.
        ...payload, //Заместваме само пропертитата, които идват от payload с новите им стойности.
      };
      state.auth = true;
    },
  },
  actions: {
    async getUserInformation({ commit }, payload) {
      try {
        const userInfo = await getDoc(doc(db, "users", payload));

        if (userInfo.exists()) {
          return userInfo.data();
        } else {
          return Error("This user is not exist");
        }
      } catch (error) {
        console.log(error);
      }
    },
    async login({ commit, dispatch }, payload) {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          payload.email,
          payload.password
        );

        const userData = await dispatch(
          "getUserInformation",
          userCredential.user.uid
        );
        commit("setUser", userData);

        router.push("/user/dashboard");
      } catch (error) {
        console.log(error);
      }
    },
    async register({ commit }, payload) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          payload.email,
          payload.password
        );

        const newUser = {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          isAdmin: false,
        };

        await setDoc(doc(db, "users", userCredential.user.uid), newUser);
        commit("setUser", newUser); //Стейта се променя чрез мутация (mutations). Имаме мутация setUser, която задава нови стойности на някои от пропертитата на юзъра. Викаме мутацията чрез commit("името на мутацията", необходимите данни, в случая данните за новия потребител.).

        // commit(
        //   "notify/setToastMsg",
        //   {
        //     message: message,
        //     type: "error",
        //   },
        //   { root: true }
        // ); - за да избегнем писането на този код навсякъде, ползваме функците successMessage и errorMessage, които правят комита и които сме си написали в отделен файл и така намаляваме количеството код.

        successMessage(commit, "Welcome user."); //Подаваме commit-а като колбек, за да може да се ползва от функцията. А commit си е проперти, които идва на готово от екшъните.

        router.push("/user/dashboard");
      } catch (error) {
        errorMessage(commit); //Ако не подадем съобщение за грешка, във функцията си имаме дефолтно.
      }
    },
  },
};

export default authenticationModule;
