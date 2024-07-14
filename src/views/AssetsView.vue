<template>
  <div>
    <b-button variant="primary" @click="$router.push('/home')"
      >Back to Home</b-button
    >
    <b-table striped hover :items="assets" :fields="fields" class="mt-3">
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
        { key: "organizationId", label: "Organization ID" },
        { key: "userCreatorId", label: "Creator ID" },
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
        const response = await this.$axios.get("organizations-assets", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.assets = response.data;
      } catch (error) {
        console.error("Error fetching assets:", error);
      }
    },
    editAsset(asset) {
      this.$router.push({ name: "EditAsset", query: asset });
    },
    async deleteAsset(asset) {
      if (confirm(`Are you sure you want to delete the asset ${asset._id}?`)) {
        try {
          const token = this.$cookie.get("authToken");
          await this.$axios.delete(`organizations-assets/${asset._id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          this.fetchAssets();
        } catch (error) {
          console.error("Error deleting asset:", error);
        }
      }
    },
  },
};
</script>
