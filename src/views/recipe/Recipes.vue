<template>
  <v-layout row wrap>
    <v-flex class="xs12 md4" v-for="recipe in recipes" :key="recipe.id">
      <v-card>
        <v-img :src="recipe.image" height="200px">
        </v-img>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{recipe.title}}</h3>
          </div>
        </v-card-title>
        <v-card-subtitle>
          <div>
            <div>{{recipe.description}}</div>
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
            text color="orange">View</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import API from "../../lib/RecipeAPI";

  export default {

    data(){
      return {
        recipes: [],
      };
    },
    mounted() {
      this.load();
    },
    methods: {
      load: function () {
        API.getRecipes()
        .then((recipes) => {
          this.recipes = recipes;
        }); 
      },
    },
  }
</script>
