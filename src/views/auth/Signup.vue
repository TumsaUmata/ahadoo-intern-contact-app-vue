<template>
  <v-container
    class="fill-height"
    fluid
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        sm="8"
        md="4"
      >
        <v-card class="elevation-12">
          <v-toolbar
            color="primary"
            dark
            flat
          >
            <v-toolbar-title>Signup Form</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                label="First Name"
                name="firstName"
                prepend-icon="mdi-account"
                type="text"
                v-model="firstName"
              ></v-text-field>

               <v-text-field
                label="Last Name"
                name="lastName"
                prepend-icon="mdi-account"
                type="text"
                v-model="lastName"
              ></v-text-field>

              <v-text-field
                label="Email"
                name="login"
                prepend-icon="mdi-email"
                type="text"
                v-model="email"
              ></v-text-field>
              <v-text-field
                id="password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                v-model="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="registerUser">Signup</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import axios from 'axios';
import router from '../../router/index';

export default {
  data() {
    return {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      token: "",
    }
  },
  methods: {
    registerUser() {
      const credentials = {
        email: this.email,
        password: this.password,
        lastName: this.lastName,
        firstName: this.firstName
      }

      axios.post('http://localhost:3000/users', credentials)
        .then(response => {
          router.push('/login');
      })
    }
  }
};
</script>