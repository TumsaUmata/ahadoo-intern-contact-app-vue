<template>
  <v-layout>
    <v-flex xs12 sm8 offset-sm2>
      <v-form ref="form" v-model="valid">
        <v-text-field
          v-model="recipe.name"
          label="Name"
          :rules="nameRules"
          required
        ></v-text-field>
        <v-text-field
          v-model="recipe.telephone"
          label="Telephone"
          :rules="telephoneRules"
          required
        ></v-text-field>
        <v-text-field
          v-model="recipe.about"
          label="About"
          :rules="aboutRules"
          required
        ></v-text-field>
        <v-textarea
          v-model="recipe.address"
          label="Address"
          :rules="addressRules"
          required
        ></v-textarea>
        <v-textarea
          v-model="recipe.event"
          label="Special Event, Ceremony or Celebration"
          :rules="eventRules"
          required
        ></v-textarea>
        <!-- <v-text-field
          v-model="recipe.image"
          label="Image URL"
          :rules="imageRules"
          required
        ></v-text-field> -->

        Image:
        <input
          type="file"
          id="file"
          ref="file"
          v-on:change="handleFileUpload()"
        />
        <v-btn class="mr-4" @click="submit">submit</v-btn>
        <v-btn @click="clear">clear</v-btn>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
import API from "../../lib/RecipeAPI";
import RecipeForm from "../recipe/RecipeForm";
import axios from "axios";
import router from "../../router";

export default {
  data() {
    return {
      recipe: {
        name: "",
        telephone: "",
        about: "",
        address: "",
        event: ""
        //image: this.image.name
      },
      file: "",
      valid: true,
      nameRules: [
        name => {
          if (name.trim() === "") return "Name must not be empty!";
          return true;
        }
      ],
      telephoneRules: [
        telephone => {
          if (telephone.trim() === "") return "Telephone must not be empty!";
          return true;
        }
      ],
      aboutRules: [
        about => {
          if (about.trim() === "")
            return "About must not be empty!";
          return true;
        }
      ],
      addressRules: [
        address => {
          if (address.trim() === "") return "Address must not be empty!";
          return true;
        }
      ],
      eventRules: [
        event => {
          if (event.trim() === "") return "HowToCook must not be empty!";
          return true;
        }
      ],
      token: sessionStorage.getItem("token")
    };
  },
  methods: {
    submit() {
      const data = {
        name: this.recipe.name,
        about: this.recipe.about,
        telephone: this.recipe.telephone,
        address: this.recipe.address,
        event: this.recipe.event,
        image: this.file.name
      };

      console.log(data);
      const URL = "http://localhost:3000/contacts";
      axios({
        method: "post",
        url: URL,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`
        },
        data: data
      })
        .then(_ => {
          router.push("/recipes");
        })
        .catch(error => {});

      let formData = new FormData();
      //Add the form data we need to submit
      formData.append("file", this.file);
      axios
        .post("http://localhost:3000/containers/images/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${this.token}`
          }
        })
        .then(function() {
          //console.log('saved')
        })
        .catch(function() {
          // console.log('error');
        });
    },
    clear() {
      this.$refs.form.reset();
    },
    handleFileUpload() {
      console.log(this.$refs.file.files[0].name);
      this.file = this.$refs.file.files[0];
    }
  }
};
</script>
