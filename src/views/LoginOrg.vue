<template>
  <div class="container mt-3">
    <div data-mdb-input-init class="form-outline mb-4">
      <b-card title="Login">
        <b-form @submit.prevent="login">
          <b-form-group label="Email" label-for="email">
            <b-form-input
              id="email"
              v-model="email"
              type="email"
              required
            ></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary">Login</b-button>
        </b-form>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginOrg",
  data() {
    return {
      email: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await this.$axios.post("auth/simple-login", {
          email: this.email,
        });
        const token = response.data.token;
        console.log(token);
        this.$cookie.set("authToken", token, {
          secure: true,
          sameSite: "Strict",
        });
        this.$router.push("/");
      } catch (error) {
        console.error("Error logging in:", error);
      }
    },
  },
};
</script>
