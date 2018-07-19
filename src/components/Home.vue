<template>
  <div>
  <v-dialog v-model="editDialog" persistent max-width="500px">
      <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <edit-quote :quote="editedItem"/>
            </v-card-text>
          </v-card>
    </v-dialog>
  <v-card>
    <v-card-title>
      Quotes
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="quotes"
      :search="search"
      :custom-filter="customFilter"
      :pagination.sync="pagination"
      class="elevation-1"
      item-key="_id"
    >
      <template slot="headers" slot-scope="props">
        <th
          v-for="header in props.headers"
          :key="header.text"
          :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
          @click="changeSort(header.value)"
        >
          <v-icon small>arrow_upward</v-icon>
          {{ header.text }}
        </th>
      </template>
      <template slot="items" slot-scope="props">
        <td style="width: 120px; padding: 2px 10px; text-align: left; vertical-align: bottom">
          {{ props.item.author_first_name }}
        </td>
        <td style="width: 120px; padding: 2px 10px; text-align: left; vertical-align: bottom">
          {{ props.item.author_last_name }}
        </td>
        <td style="padding: 2px 10px;; text-align: left; vertical-align: bottom">
          {{ props.item.quote_string }}
        </td>
        <td style="padding: 2px 10px;; text-align: left; vertical-align: bottom">
          {{ props.item.source }}
        </td>
        <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteItem(props.item)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
  </v-card>
  </div>
</template>
<script type="text/javascript">
import EditQuote from './EditQuote';

export default {
  name: 'Quotes',
  data: () => ({
    pagination: {
      sortBy: 'name',
      rowsPerPage: 25,
    },
    search: '',
    headers: [
      { text: 'Author First Name', value: 'author_first_name' },
      { text: 'Author Last Name', value: 'author_last_name' },
      { text: 'Quote', value: 'quote_string' },
      { text: 'Source', value: 'source' },
    ],
    editedIndex: -1,
    editedItem: {},
    defaultItem: {
      version: 0,
      author_first_name: '',
      author_last_name: '',
      category: 0,
      comment: '',
      graphic_url: null,
      quote_format: 0,
      quote_string: null,
      source: '',
    },
  }),
  components: {
    'edit-quote': EditQuote,
  },
  computed: {
    quotes() {
      return this.$store.getters.fetchQuotes;
    },
    editDialog() {
      return this.$store.getters.getEditDialog;
    },
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
    },
  },
  watch: {
    editDialog(newVal, oldVal) {
      if (!newVal) {
        // this.$data.editedItem = Object.assign({}, this.defaultItem);
        // this.$data.editedIndex = -1;
        this.initEdited();
      }
    },
  },
  mounted() {
    this.$store.dispatch('fetchQuotes');
  },
  methods: {
    initEdited() {
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
    },
    customFilter(items, search, filter) {
      const newSearch = search.toString().toLowerCase();
      return items.filter(row => filter(row.author_last_name, newSearch));
    },
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    },
    editItem(item) {
      this.editedIndex = this.quotes.indexOf(item);
      this.editedItem = Object.assign({}, item);
      // this.dialog = true
      this.$store.dispatch('editDialog', true);
    },

    deleteItem(item) {
      const index = this.quotes.indexOf(item);
      const ret = confirm('Are you sure you want to delete this item?');
      if (ret) {
        this.$store.dispatch('deleteQuote', item);
      }
    },

    //     close() {
    //       //this.dialog = false;
    //       this.$store.dispatch('editDialog', false);
    //       setTimeout(() => {
    //         this.editedItem = Object.assign({}, this.defaultItem);
    //         this.editedIndex = -1;
    //       }, 300);
    //     },
    //
    //     save() {
    // /*
    //       if (this.editedIndex > -1) {
    //         Object.assign(this.desserts[this.editedIndex], this.editedItem);
    //       } else {
    //         this.desserts.push(this.editedItem);
    //       }
    // */
    //       this.close();
    //     },
  } };
</script>
