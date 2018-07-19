import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    quotes: [],
    editDialog: false,
  },
  getters: {
    fetchQuotes: state => state.quotes,
    getEditDialog: state => state.editDialog,
  },
  mutations: {
    QUOTES: (state, payload) => {
      state.quotes = payload;
    },
    ADD_QUOTE: (state, payload) => {
      state.quotes.push(payload);
    },
    UPDATE_QUOTE: (state, payload) => {
      console.log('update_quote');
      const index = state.quotes.findIndex((item) => {
        return item.id === payload.id;
      });
      if (index > -1) {
        state.quotes.splice(index, 1, payload);
      }
    },
    DELETE_QUOTE: (state, payload) => {
      const deletedId = parseInt(payload, 10);
      const index = state.quotes.findIndex((item) => {
        return item.id === deletedId;
      });
      if (index > -1) {
        state.quotes.splice(index, 1);
      }
    },
    SET_EDIT_DIALOG: (state, payload) => {
      state.editDialog = payload;
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
    updateQuote: (context, payload) => {
      const urlstr = `http://localhost:3000/quotes/${payload.id}`;
      return axios({
        method: 'put',
        data: payload,
        url: urlstr,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          context.commit('UPDATE_QUOTE', response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteQuote: (context, payload) => {
      const urlstr = `http://localhost:3000/quotes/${payload.id}`;
      return axios({
        method: 'delete',
        url: urlstr,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          console.log(response);
          context.commit('DELETE_QUOTE', response.data.id);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchQuotes: (context, payload) => {
      axios({
        method: 'get',
        url: 'http://localhost:3000/quotes',
      })
        .then((response) => {
          context.commit('QUOTES', response.data);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
    editDialog: (context, payload) => {
      context.commit('SET_EDIT_DIALOG', payload);
    },
  },
});
