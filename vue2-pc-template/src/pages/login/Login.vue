<template>
  <div>
    <el-button type="primary" @click="login">登录</el-button>
    <el-button type="success" @click="$router.go(-1)">返回</el-button>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  name: "",
  data() {
    return {};
  },
  methods: {
    ...mapMutations(["login/getLogin"]),
    login() {
      // 调用store的login异步发送请求
      // this["login/getLogin"]();

      // 提示信息
      this.$message({
        message: "有品!",
        type: "",
      });
    },
  },
};
</script>
<style lang="less" scoped></style>
