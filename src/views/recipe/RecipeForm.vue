<template>
  <v-layout>
    <v-flex xs12 sm8 offset-sm2>
      <v-form ref="form" v-model="valid">
        <v-text-field
          v-model="recipe.title"
          label="Title"
          :rules="titleRules"
          required
        ></v-text-field>
        <v-text-field
          v-model="recipe.description"
          label="Description"
          :rules="descriptionRules"
          required
        ></v-text-field>
        <v-textarea
          v-model="recipe.ingredient"
          label="Ingredient"
          :rules="ingredientRules"
          required
        ></v-textarea>
        <v-textarea
          v-model="recipe.howtocook"
          label="How To Cook"
          :rules="howtocookRules"
          required
        ></v-textarea>
        <v-text-field
          v-model="recipe.image"
          label="Image URL"
          :rules="imageRules"
          required
        ></v-text-field>

        <v-btn
          class="mr-4"
          @click="submit"
        >submit</v-btn>
        <v-btn @click="clear">clear</v-btn>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  props: ['recipe', 'onSubmit'],
    data(){
        return {
            valid: true,
            descriptionRules: [(description) => {
                if (description.trim() === '') return 'Description must not be empty!';
                return true;
            }],
            ingredientRules: [(ingredient) => {
                if (ingredient.trim() === '') return 'Ingredient must not be empty!';
                return true;
            }],
            howtocookRules: [(howtocook) => {
                if (howtocook.trim() === '') return 'HowToCook must not be empty!';
                return true;
            }],
            imageRules: [(image) => {
                if (image.trim() === '') return 'Image must not be empty!';
                return true;
            }],
        };
    },
    methods: {
        submit(){
            if (this.valid) {
                this.onSubmit();
            }
        },
        clear(){
            this.$refs.form.reset();
        }
    },
};
</script>
