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
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ["contact", "onSubmit"],
  data() {
    return {
      valid: true,
      nameRules: [
        name => {
          if (name.trim() === "") return "Name must not be empty!";
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
      telephoneRules: [
        telephone => {
          if (telephone.trim() === "")
            return "Telephone must not be empty!";
          return true;
        }
      ],
      addressRules: [
        address => {
          if (address.trim() === "") return "Ingredient must not be empty!";
          return true;
        }
      ],
      eventRules: [
        event => {
          if (event.trim() === "") return "Event must not be empty!";
          return true;
        }
      ],
      // imageRules: [(image) => {
      //     if (image.trim() === '') return 'Image must not be empty!';
      //     return true;
      // }],
      file: ""
    };
  },
  methods: {
    submit() {
      if (this.valid) {
        this.onSubmit();
      }
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
