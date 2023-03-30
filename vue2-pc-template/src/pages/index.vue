<template>
  <div id="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />

    <router-link to="/login">
      <el-button type="info">点击登录</el-button>
    </router-link>
    <!-- {{ token }} -->
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import HelloWorld from "../components/HelloWorld.vue";
export default {
  name: "Login",
  components: {
    HelloWorld,
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {},
  computed: {
    ...mapGetters("login", ["token"]),
  },
};
</script>
<style lang="less" scoped></style>
