<template>
  <v-layout
    row
    wrap
  >
    <v-flex class="xs12 sm8 offset-sm2">
      <v-card>
        <v-img
          :src="'http://localhost:3000/containers/images/download/' + contact.image"
          height="400px"
        >
        </v-img>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{contact.name}}</h3>
          </div>
        </v-card-title>
        <v-divider class="mx-4"></v-divider>

        <v-card-text>
          <v-row
            align="center"
            class="mx-0"
          >

            <div class="grey--text ml-4">Tel: {{contact.telephone}}</div>
          </v-row>

          <div class="my-4 subtitle-1 black--text">
            About:
          </div>
          <div>{{contact.about}}</div>
        </v-card-text>

        <v-divider class="mx-4"></v-divider>

        <v-card-text>
          <div class="my-4 subtitle-1 black--text">
            Address:
          </div>
          <div>{{contact.address}}</div>
        </v-card-text>

        <v-divider class="mx-4"></v-divider>

        <v-card-text>
          <div class="my-4 subtitle-1 black--text">
            A Special Event, Ceremony, or Celebration:
          </div>
          <div>{{contact.event}}</div>
        </v-card-text>

        <v-card-actions>
          <v-btn
            v-if='token'
            :to="{
              name: 'Edit',
              params: {
                id: contact.id
              }
            }"
            text
            color="primary"
          >Edit</v-btn>
          <v-btn
            v-if='token'
            @click="deleteContact()"
            text
            color="warning"
          >Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import API from "../../lib/ContactAPI";
import axios from 'axios'
import router from '../../router'

export default {
  data() {
    return {
      contact: {},
      token: sessionStorage.getItem('token')
    };
  },
  mounted() {
    const { id } = this.$route.params;
    this.load(id);
  },
  methods: {
    load(id) {
      API.getContact(id).then(contact => {
        this.contact = contact;
      });
    },
    deleteContact(){
      const { id } = this.$route.params;
      const URL = 'http://localhost:3000/contacts/'+id+'';
        axios({
          method: 'delete',
          url: URL,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.token}`
          }
        })
          .then(_ => {
          router.push('/contacts')
        })
        .catch(error => {
          
        })

    },
  }
};
</script>
