
<template>
  <RecipeForm
    :recipe="recipe"
    :onSubmit="submit"
  ></RecipeForm>
</template>

<script>
import API from "../../lib/RecipeAPI";
import RecipeForm from "../recipe/RecipeForm";
import router from '../../router/index';

export default {
  components: {
    RecipeForm
  },
  data() {
    return {
      recipe: {
        title: "",
        description: "",
        ingredient: "",
        howtocook: "",
        image: ""
      },
    };
  },
  mounted() {
    const { id } = this.$route.params;
    this.load(id);
  },
  methods: {
    load(id) {
      API.getRecipe(id).then(recipe => {
        this.recipe = recipe;
      });
    },
    submit() {
      API.updateRecipe(this.recipe.id ,this.recipe).then(() => {
        this.$router.push({
          name: "Recipe",
          params: {
            id: this.recipe.id
          }
        });
      });
    }
  }
};
</script>
