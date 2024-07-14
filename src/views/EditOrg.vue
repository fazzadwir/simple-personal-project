<template>
  <div class="container mt-3">
    <b-card title="Edit Organization">
      <b-form @submit.prevent="updateOrganization">
        <b-form-group label="ID" label-for="id">
          <b-form-input id="id" v-model="id" disabled></b-form-input>
        </b-form-group>

        <b-form-group label="Creator ID" label-for="creatorId">
          <b-form-input
            id="creatorId"
            v-model="creatorId"
            disabled
          ></b-form-input>
        </b-form-group>

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

        <b-button type="submit" variant="primary">Update Organization</b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "EditOrg",
  data() {
    return {
      id: "",
      creatorId: "",
      name: "",
      address: "",
      imageUrl: "",
      contact: "",
      description: "",
    };
  },
  created() {
    const org = this.$route.query;
    if (org) {
      this.id = org._id;
      this.creatorId = org.userCreatorId;
      this.name = org.name;
      this.address = org.address;
      this.imageUrl = org.imageUrl;
      this.contact = org.contact;
      this.description = org.description;
    }
  },
  methods: {
    async updateOrganization() {
      try {
        const token = this.$cookie.get("authToken");
        const response = await this.$axios.put(
          `organizations/${this.id}`,
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
        console.log("Organization updated:", response.data);
        this.$router.push("/home");
      } catch (error) {
        console.error("Error updating organization:", error);
      }
    },
  },
};
</script>
