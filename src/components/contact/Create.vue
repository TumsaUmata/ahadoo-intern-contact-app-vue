<template>
  <v-layout>
    <v-flex xs12 sm8 offset-sm2>
      <v-form ref="form" v-model="valid">
        <v-text-field
          v-model="contact.name"
          label="Name"
          :rules="nameRules"
          required
        ></v-text-field>
        <v-text-field
          v-model="contact.telephone"
          label="Telephone"
          :rules="telephoneRules"
          required
        ></v-text-field>
        <v-text-field
          v-model="contact.about"
          label="About"
          :rules="aboutRules"
          required
        ></v-text-field>
        <v-textarea
          v-model="contact.address"
          label="Address"
          :rules="addressRules"
          required
        ></v-textarea>
        <v-textarea
          v-model="contact.event"
          label="Special Event, Ceremony or Celebration"
          :rules="eventRules"
          required
        ></v-textarea>
        <!-- <v-text-field
          v-model="contact.image"
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



      <div v-if="imageData.length > 0">
        <img class="preview" :src="imageData" v-on:change="previewImage">
      </div>

      <v-img
        :src="
          this.preview + this.file.name
        "
        height="400px"
      ></v-img>
    </v-flex>
  </v-layout>
</template>

<script>

import axios from "axios";
import router from "../../router";

export default {
  data() {
    return {
      contact: {
        name: "",
        telephone: "",
        about: "",
        address: "",
        event: ""
        //image: this.image.name
      },
      imageData: "",
      file: "",
      preview: 'http://localhost:3000/containers/images/download/',
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
          if (about.trim() === "") return "About must not be empty!";
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
        name: this.contact.name,
        about: this.contact.about,
        telephone: this.contact.telephone,
        address: this.contact.address,
        event: this.contact.event,
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
          router.push("/contacts");
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
    },
    onFileChange(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
    },
    previewImage: function(event) {
      const input = event.target;
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageData = e.target.result;
          console.log(e.target);
        };
        reader.readAsDataURL(input.files[0]);
      }
    }
  }
};
</script>
