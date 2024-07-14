<template>
  <div>
    <b-button variant="primary" @click="$router.push('/add-org')"
      >Add New Organization</b-button
    >
    <b-button variant="primary" @click="$router.push('/assets')"
      >View Assets</b-button
    >
    <b-button variant="danger" @click="logout" class="ml-2">Logout</b-button>
    <b-table striped hover :items="organizations" :fields="fields" class="mt-3">
      <template #cell(imageUrl)="data">
        <b-img :src="data.item.imageUrl" alt="Organization Image" fluid></b-img>
      </template>
      <template #cell(actions)="data">
        <b-button size="sm" @click="editOrganization(data.item)">Edit</b-button>
        <b-button
          size="sm"
          variant="danger"
          @click="deleteOrganization(data.item)"
          >Delete</b-button
        >
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      organizations: [],
      fields: [
        { key: "_id", label: "ID" },
        { key: "name", label: "Name" },
        { key: "address", label: "Address" },
        { key: "contact", label: "Contact" },
        { key: "imageUrl", label: "Image" },
        { key: "userCreatorId", label: "Creator ID" },
        { key: "actions", label: "Actions" },
      ],
    };
  },
  async mounted() {
    this.fetchOrganizations();
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
        // Add a placeholder image if the imageUrl is not provided
        this.organizations = response.data.map((org) => {
          return {
            ...org,
            imageUrl: org.imageUrl || "https://via.placeholder.com/150",
          };
        });
      } catch (error) {
        console.error("Error fetching organizations:", error);
      }
    },
    editOrganization(org) {
      this.$router.push({ name: "EditOrg", query: org });
    },
    async deleteOrganization(org) {
      if (
        confirm(`Are you sure you want to delete the organization ${org.name}?`)
      ) {
        try {
          const token = this.$cookie.get("authToken");
          await this.$axios.delete(`organizations/${org._id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          this.fetchOrganizations();
        } catch (error) {
          console.error("Error deleting organization:", error);
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
