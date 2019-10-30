<template>
    <v-layout row wrap>
    <v-flex class="xs12 sm8 offset-sm2">
      <v-card>
        <v-img :src="recipe.image" height="400px">
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
        <v-card-subtitle>
          <div>
            <div>{{recipe.ingredient}}</div>
          </div>
        </v-card-subtitle>
        <v-card-subtitle>
          <div>
            <div>{{recipe.howtocook}}</div>
          </div>
        </v-card-subtitle>
        <v-card-actions>
          <v-btn 
            :to="{
              name: 'Edit',
              params: {
                id: recipe.id
              }
            }"
            text color="primary">Edit</v-btn>
            <v-btn 
            @click="deleteRecipe()"
            text color="warning">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>

import API from '../../lib/RecipeAPI';

export default {
    data(){
        return {
            recipe: {},
        };
    },
    mounted() {
      const { id } = this.$route.params;
      this.load(id);
    },
    methods: {
      load(id) {
        API.getRecipe(id).then((recipe) => {
          this.recipe = recipe;
        });
      },
      deleteRecipe(){
        const { id } = this.$route.params;

        API.deleteRecipe(id)
          .then(() => {
            this.$router.push({
              name: 'Recipes'
            });
          });
      },
    },
};
</script>
