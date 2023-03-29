<template>
  <div>
    <el-button type="primary" @click="login">登录</el-button>
    <el-button type="success" @click="$router.go(-1)">返回</el-button>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "",
  data() {
    return {};
  },
  methods: {
    ...mapActions("user", ["login"]),
    login() {
      // 调用store的action异步发送请求
      //   this.login();
      // 提示信息
      this.$message({
        message: "你很有眼光!",
        type: "",
      });
    },
  },
};
</script>
<style lang="less" scoped></style>
