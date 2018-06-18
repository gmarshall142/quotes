import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    quotes: [],
  },
  getters: {
    fetchQuotes: state => state.quotes,
  },
  mutations: {
    QUOTES: (state, payload) => {
      state.quotes = payload;
    },
    ADD_QUOTE: (state, payload) => {
      state.quotes.push(payload);
    },
  },
  actions: {
    addQuote: (context, payload) => {
      return axios({
        method: 'post',
        data: payload,
        url: 'http://localhost:3000/quotes',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          context.commit('ADD_QUOTE', response.data);
        })
        .catch(() => {
        });
    },
    fetchQuotes: (context, payload) => {
      axios({
        method: 'get',
        url: 'http://localhost:3000/quotes',
      })
        .then((response) => {
          context.commit('QUOTES', response.data.quotes);
        })
        .catch(() => {
        });
    },
  },
});
