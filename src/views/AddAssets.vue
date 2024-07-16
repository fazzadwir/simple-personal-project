<template>
  <div>
    <b-button variant="primary" @click="$router.push('/assets')">
      Back to Assets
    </b-button>
    <b-card class="mt-3" bg-variant="dark" text-variant="white">
      <b-card-header>Add New Asset</b-card-header>
      <b-card-body>
        <b-form @submit.prevent="submitForm">
          <b-form-group label="Organization ID" label-for="organizationId">
            <b-form-select
              id="organizationId"
              v-model="form.organizationId"
              :options="organizationOptions"
              required
            ></b-form-select>
          </b-form-group>
          <b-form-group label="Contract Address" label-for="contractAddress">
            <b-form-input
              id="contractAddress"
              v-model="form.contractAddress"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Creator Address" label-for="creatorAddress">
            <b-form-input
              id="creatorAddress"
              v-model="form.creatorAddress"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Contract Type" label-for="contractType">
            <b-form-input
              id="contractType"
              v-model="form.contractType"
              required
            ></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="success">Add Asset</b-button>
        </b-form>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "AddAssets",
  data() {
    return {
      form: {
        organizationId: "",
        contractAddress: "",
        creatorAddress: "",
        contractType: "",
      },
      organizationOptions: [],
    };
  },
  async mounted() {
    await this.fetchOrganizations();
  },
  methods: {
    async fetchOrganizations() {
      try {
        const token = this.$cookie.get("authToken");
        const response = await this.$axios.get("organizations", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.organizationOptions = response.data.map((org) => ({
          value: org._id,
          text: org._id,
        }));
      } catch (error) {
        console.error("Error fetching organizations:", error);
      }
    },
    async submitForm() {
      try {
        const token = this.$cookie.get("authToken");
        const response = await this.$axios.post(
          "organizations-assets",
          this.form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("Asset added successfully!");
        console.log("Add assets success", response);
        this.$router.push("/assets");
      } catch (error) {
        console.error("Error adding asset:", error.response?.data || error);
      }
    },
  },
};
</script>
