<template>
  <v-layout
    row
    wrap
  >
    <v-flex
      class="xs12 md4"
      v-for="recipe in recipes"
      :key="recipe.id"
    >
      <v-col cols="12">
        <v-card>
          <v-img
            :src="'http://localhost:3000/containers/images/download/' + recipe.image"
            height="200px"
          >
          </v-img>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{recipe.name}}</h3>
            </div>
          </v-card-title>
          <v-card-subtitle>
            <div>
              <div>{{recipe.about}}</div>
            </div>
          </v-card-subtitle>
          <v-card-actions>
            <v-btn
              :to="{
              name: 'Recipe',
              params: {
                id: recipe.id
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
      ></v-pagination>
    </div>
  </v-layout>
</template>

<script>
import API from "../../lib/RecipeAPI";
import axios from 'axios';

export default {
  data() {
    return {
      page: 1,
      recipes: []
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    load: function() {
      API.getRecipes(this.page).then(recipes => {
        this.recipes = recipes;
      });
    }
  }
};
</script>
