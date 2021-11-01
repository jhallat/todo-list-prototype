<template>
  <div class="lgn-container">
    <div class="lgn-row margin-bottom-small">
      <div class="lgn-label">Username</div><input class="lgn-input" v-model='username'/>
    </div>
    <div class="lgn-row margin-bottom-small">
      <div class="lgn-label">Password</div><input class="lgn-input" type="password" v-model='password'/>
    </div>
    <div class="margin-left-small margin-bottom-small margin-top-small lgn-error" v-if="errorMessage">
      {{ errorMessage }}
    </div>
    <div class="row">
      <button class="lgn-button" @click="login">Login</button>
    </div>
  </div>
</template>

<script>
import {SecurityService} from "@/shared/service/security-service";

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
    }
  },
  methods: {
    async login() {
      const resp = await SecurityService.login(this.username, this.password);
      if (!resp.isAuthenticated) {
        this.errorMessage = "Invalid credentials";
      } else {
        await this.$router.push('/to-do-list');
      }
    }
  }
}
</script>

<style lang="scss">
@import "../shared/style/theme";

.lgn-error {
  color: #FF5555;
}

.lgn-row {
  display: flex;
  flex-direction: row;
  align-items: center;
}

  .lgn-container {
    padding: 20px;
    background-color: white;
    width: 500px;
    margin: auto;
  }

  .lgn-input {
    @include primary-input;
  }

  .lgn-label {
    width: 100px;
  }

  .lgn-button {
    @include primary-button;
  }
</style>

