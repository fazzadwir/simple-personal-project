<template>
  <div>
    <h2>Edit Asset</h2>
    <b-form @submit.prevent="submitForm">
      <b-form-group label="\ ID" label-for="organizationId">
        <b-form-input
          id="organizationId"
          v-model="form._id"
          disabled
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Contract Address" label-for="contractAddress">
        <b-form-input
          id="contractAddress"
          v-model="form.contractAddress"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Creator Address" label-for="creatorAddress">
        <b-form-input
          id="creatorAddress"
          v-model="form.creatorAddress"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Contract Type" label-for="contractType">
        <b-form-input
          id="contractType"
          v-model="form.contractType"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  name: "EditAsset",
  data() {
    return {
      form: {
        organizationId: "",
        contractAddress: "",
        creatorAddress: "",
        contractType: "",
      },
    };
  },
  async mounted() {
    await this.fetchAsset();
  },
  methods: {
    async fetchAsset() {
      try {
        const token = this.$cookie.get("authToken");
        console.log("Fetching asset with ID:", this.$route.params.id); // Add this line
        const response = await this.$axios.get(
          `organizations-assets/${this.$route.params.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Fetch asset response:", response.data); // Add this line
        this.form = response.data;
      } catch (error) {
        console.error("Error fetching asset:", error);
      }
    },
    async submitForm() {
      try {
        const token = this.$cookie.get("authToken");
        const response = await this.$axios.put(
          `organizations-assets/${this.$route.params.id}`,
          this.form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("Asset updated successfully!");
        this.$router.push("/assets");
      } catch (error) {
        console.error("Error updating asset:", error);
      }
    },
  },
};
</script>
