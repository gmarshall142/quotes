<template>
  <v-layout row>
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
  computed: {
    quotes() {
      return this.$store.getters.fetchQuotes;
    },
  },
  mounted() {
    this.$store.dispatch('fetchQuotes');
  },
};
</script>
