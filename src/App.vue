<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>{{name}}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-container v-if="isLoggedIn">
          <v-btn to="/recipes/create" text >Add Contact</v-btn>
          <v-btn @click="logout" text >Logout</v-btn>
        </v-container>
        <v-container v-else>
          <v-btn text to="/login">Login</v-btn>
          <v-btn text to="/signup">Signup</v-btn>
        </v-container>
      </v-toolbar-items>
    </v-app-bar>

    <v-content>
      <v-container class="fill-height" fluid>
        <v-layout>
          <router-view></router-view>
        </v-layout>
      </v-container>
    </v-content>
    
    <v-footer
      color="indigo"
      app
    >
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import store from './store/index';

export default {
  data() {
    return {
      name: 'Contact App',
      menu: [
        {name:"Signup",route:"Signup"},
        {name:"Login",route:"Login"}
      ]
    }
  },
  name: 'App',
  methods: {
    logout() {
      store.dispatch('resetUserToken');
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('userId')
      this.$router.push({
        name: "Recipes"
      });
    }
  },
  computed: {
    menus() {
      console.log(this.isLoggedIn);
      if (this.isLoggedIn) {
        this.menu = [
          {name:"Add Recipe",route:"Recipe"}
        ]
      }
      console.log(this._menu);
      return this.menu;
    },
    isLoggedIn() {
      return store.getters.getToken !== null;
    }
  }
};
</script>
