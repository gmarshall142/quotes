<template>
  <v-layout row>
    <!--
    <v-flex v-for="quote in quotes" :key="quote._id">
      <v-card>
        <v-card-title primary-title>
          <div>
            <div class="headline">{{ quote._id }}</div>
            <span class="grey--text">{{ quote.last_updated }} ‧ {{ quote.author_last_name }}</span>
          </div>
        </v-card-title>
        <v-card-text>
          {{ quote.quote_string }}
        </v-card-text>
      </v-card>
    </v-flex>
    -->
    <table border="solid 1 black" style="text-align: left;">
      <tr v-for="quote in quotes" :key="quote._id">
        <td style="width: 160px; padding: 2px 10px">{{quote.author_last_name}}</td>
        <td style="padding: 2px 10px;">{{quote.quote_string}}</td>
      </tr>
    </table>
  </v-layout>
</template>
<script type="text/javascript">
import axios from 'axios';

export default {
  name: 'Quotes',
  data() {
    return {
      quotes: [],
    };
  },
  mounted() {
    this.fetchQuotes();
  },
  methods: {
    async fetchQuotes() {
      return axios({
        method: 'get',
        url: 'http://localhost:3000/quotes',
      })
        .then((response) => {
          this.quotes = response.data.quotes;
        })
        .catch(() => {
        });
    },
  },
};
</script>
