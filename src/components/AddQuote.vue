<template>
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-text-field
      label="Quote Text"
      v-model="quoteString"
      :rules="quoteRules"
      required
      multi-line
    ></v-text-field>
    <v-text-field
      label="Author First Name"
      v-model="firstName"
    ></v-text-field>
    <v-text-field
      label="Author Last Name"
      v-model="lastName"
    ></v-text-field>
    <v-text-field
      label="Source"
      v-model="source"
    ></v-text-field>
    <v-btn
      @click="submit"
      :disabled="!valid"
    >
      submit
    </v-btn>
    <v-btn @click="clear">clear</v-btn>
  </v-form>
</template>
<script>
import axios from 'axios';

export default {
  data: () => ({
    valid: true,
    quoteString: '',
    firstName: '',
    lastName: '',
    source: '',
    quotesRules: [
      v => !!v || 'Movie name is required',
    ],
    select: null,
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        return axios({
          method: 'post',
          data: {
            quote_string: this.quoteString,
            author_first_name: this.firstName,
            author_last_name: this.lastName,
            source: this.source,
          },
          url: 'http://localhost:3000/quotes',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(() => {
            this.$router.push({ name: 'Home' });
            this.$refs.form.reset();
          })
          .catch(() => {
          });
      }
      return true;
    },
    clear() {
      this.$refs.form.reset();
    },
  },
};
</script>
