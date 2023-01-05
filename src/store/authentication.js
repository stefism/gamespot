/* eslint-disable */
import { db, auth } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

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
    async login({ commit, dispatch }, payload) {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        payload.email,
        payload.password
      );
      console.log(userCredential);
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
      } catch (error) {
        console.log(error);
      }
    },
  },
};

export default authenticationModule;
