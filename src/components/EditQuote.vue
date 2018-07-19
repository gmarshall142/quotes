<template>
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-text-field
      label="Quote Text"
      v-model="quote.quote_string"
      :rules="quoteRules"
      required
      multi-line
    ></v-text-field>
    <v-text-field
      label="Author First Name"
      v-model="quote.author_first_name"
    ></v-text-field>
    <v-text-field
      label="Author Last Name"
      v-model="quote.author_last_name"
    ></v-text-field>
    <v-text-field
      label="Source"
      v-model="quote.source"
    ></v-text-field>
    <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
    <v-btn color="blue darken-1" flat :disabled="!valid" @click.native="save">Save</v-btn>
    </v-card-actions>
  </v-form>
</template>
<script>
export default {
  props: ['quote'],
  data: () => ({
    valid: true,
    quoteRules: [
      v => !!v || 'Quote string is required',
    ],
    select: null,
  }),
  methods: {
    close() {
      this.$refs.form.reset();
      this.$store.dispatch('editDialog', false);
    },

    save() {
      if (this.$refs.form.validate()) {
        if (this.quote.id) {
          const quote = {
            id: this.quote.id,
            version: this.quote.version,
            quote_string: this.quote.quote_string,
            author_first_name: this.quote.author_first_name,
            author_last_name: this.quote.author_last_name,
            category: this.quote.category,
            comment: this.quote.comment,
            graphic_url: this.quote.graphic_url,
            quote_format: this.quote.quote_format,
            source: this.quote.source,
          };
          this.$store.dispatch('updateQuote', quote);
        } else {
          const quote = {
            quote_string: this.quote.quote_string,
            author_first_name: this.quote.author_first_name,
            author_last_name: this.quote.author_last_name,
            source: this.quote.source,
          };
          this.$store.dispatch('addQuote', quote);
        }
        this.close();
      }
    },
  },
};
</script>
