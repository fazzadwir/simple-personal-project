<template>
  <div class="container mt-3">
    <b-card title="Add Organization">
      <b-form @submit.prevent="addOrganization">
        <b-form-group label="Name" label-for="name">
          <b-form-input id="name" v-model="name" required></b-form-input>
        </b-form-group>

        <b-form-group label="Address" label-for="address">
          <b-form-input id="address" v-model="address" required></b-form-input>
        </b-form-group>

        <b-form-group label="Image URL" label-for="imageUrl">
          <b-form-input id="imageUrl" v-model="imageUrl"></b-form-input>
        </b-form-group>

        <b-form-group label="Contact" label-for="contact">
          <b-form-input id="contact" v-model="contact" required></b-form-input>
        </b-form-group>

        <b-form-group label="Description" label-for="description">
          <b-form-textarea
            id="description"
            v-model="description"
            rows="3"
          ></b-form-textarea>
        </b-form-group>

        <b-button type="submit" variant="primary">Add Organization</b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "AddOrg",
  data() {
    return {
      name: "",
      address: "",
      imageUrl: "",
      contact: "",
      description: "",
    };
  },
  methods: {
    async addOrganization() {
      try {
        const token = this.$cookie.get("authToken");
        const response = await this.$axios.post(
          "organizations",
          {
            name: this.name,
            address: this.address,
            imageUrl: this.imageUrl,
            contact: this.contact,
            description: this.description,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Organization added:", response.data);
        this.$router.push("/");
      } catch (error) {
        console.error("Error adding organization:", error);
      }
    },
  },
};
</script>
