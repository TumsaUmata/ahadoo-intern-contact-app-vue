<template>
  <v-layout
    row
    wrap
  >
    <v-flex
      class="xs12 md4"
      v-for="contact in sortedContacts"
      :key="contact.id"
    >
      <v-col cols="12">
        <v-card>
          <v-img
            :src="'http://localhost:3000/containers/images/download/' + contact.image"
            height="200px"
          >
          </v-img>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{contact.name}}</h3>
            </div>
          </v-card-title>
          <v-card-subtitle>
            <div>
              <div>{{contact.about}}</div>
            </div>
          </v-card-subtitle>
          <v-card-actions>
            <v-btn
              :to="{
              name: 'Contact',
              params: {
                id: contact.id
              }
            }"
              text
              color="orange"
            >View</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-flex>

    <div class="text-right">
      <v-pagination
              v-model="page"
              :length="15"
              :total-visible="7"
              @input="load"
      ></v-pagination>
    </div>
  </v-layout>
</template>

<script>
import API from "../../lib/ContactAPI";

export default {
  data() {
    return {
      page: 0,
      contacts: []
    };
  },
  mounted() {
    this.load();
  },
  computed: {
    sortedContacts: function() {
      this.contacts.sort( ( a, b) => {
        return new Date(a.date) - new Date(b.date);
      });
      return this.contacts;
    }
  },
  methods: {
    load: function() {
      API.getContacts(this.page).then(contacts => {
        this.contacts = contacts;
      });
    },
  }
};
</script>
