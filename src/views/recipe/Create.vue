<template>
  <RecipeForm
    :recipe="recipe"
    :onSubmit="submit"
  ></RecipeForm>
</template>

<script>

import API from '../../lib/RecipeAPI';
import RecipeForm from "../recipe/RecipeForm";

export default {
  components: {
    RecipeForm,
  },
  data() {
    return {
      recipe: {
        title: "",
        description: "",
        ingredient: "",
        howtocook: "",
        image: ""
      }
    };
  },
  methods: {
    submit() {
      API.createRecipe(this.recipe)
        .then(({ id }) => {
            this.$router.push({
                name: "Recipe",
                params: {
                    id
                }
            });
        });
    }
  }
};
</script>
