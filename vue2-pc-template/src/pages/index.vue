<template>
  <div id="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />

    <router-link to="/login">
      <el-button type="info">点击登录</el-button>
    </router-link>
  </div>
</template>
<script>
import HelloWorld from "../components/HelloWorld.vue";
export default {
  name: "",
  components: {
    HelloWorld,
  },
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped></style>
