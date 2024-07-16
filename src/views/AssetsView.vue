<template>
  <div>
    <b-button variant="primary" @click="$router.push('/add-assets')"
      >Add New Asset</b-button
    >
    <b-button variant="danger" @click="logout" class="ml-2">Logout</b-button>
    <b-table striped hover :items="assets" :fields="fields" class="mt-3" dark>
      <template #cell(actions)="data">
        <b-button size="sm" @click="editAsset(data.item)">Edit</b-button>
        <b-button size="sm" variant="danger" @click="deleteAsset(data.item)"
          >Delete</b-button
        >
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: "AssetsView",
  data() {
    return {
      assets: [],
      fields: [
        { key: "_id", label: "ID" },
        { key: "contractAddress", label: "Contract Address" },
        { key: "creatorAddress", label: "Creator Address" },
        { key: "contractType", label: "Contract Type" },
        { key: "actions", label: "Actions" },
      ],
    };
  },
  async mounted() {
    this.fetchAssets();
  },
  methods: {
    async fetchAssets() {
      try {
        const token = this.$cookie.get("authToken");
        console.log("Fetching assets with token:", token);
        const response = await this.$axios.get("organizations-assets", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Fetch assets response:", response.data);
        this.assets = response.data;
      } catch (error) {
        console.error("Error fetching assets:", error);
      }
    },
    editAsset(asset) {
      console.log("Editing asset with ID:", asset._id); // Add this line
      this.$router.push({ name: "EditAsset", params: { id: asset._id } });
    },
    async deleteAsset(asset) {
      if (confirm(`Are you sure you want to delete the asset?`)) {
        try {
          const token = this.$cookie.get("authToken");
          console.log("Sending DELETE request for asset ID:", asset._id);
          const response = await this.$axios.delete(
            `organizations-assets/${asset._id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("DELETE request response:", response);
          // Ensure fetchAssets is called after deletion
          this.fetchAssets();
        } catch (error) {
          console.error("Error deleting asset:", error);
        }
      }
    },
    logout() {
      this.$cookie.remove("authToken");
      this.$router.push("/login");
    },
  },
};
</script>
