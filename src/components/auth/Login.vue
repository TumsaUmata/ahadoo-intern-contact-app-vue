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
            <v-toolbar-title>Login Form</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                label="Login"
                name="login"
                prepend-icon="mdi-account"
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
            <v-btn color="primary" @click="login">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

// import API from '../../lib/AuthAPI';
import axios from 'axios';
import store from '../../store';
import router from '../../router';

export default {
  data() {
    return {
      email: "",
      password: "",
    }
  },
  methods: {
    login() {
      const credentials = {
        email: this.email,
        password: this.password,
      };

      axios.post('http://localhost:3000/users/login', credentials)
        .then(response => {
          console.log(response)
          sessionStorage.setItem('token',response.data.token_userId[0]);
          sessionStorage.setItem('userId',response.data.token_userId[1]);
          store.dispatch('setApiToken', response.data.token_userId[0]);
          router.push('/contacts');

      })
      .catch((error) => {
        console.log(error);
      })
    }
  }
};
</script>
