<template>
  <!-- 操作人维护 -->
  <div class="app-container">
    <el-form
      ref="elForm"
      :model="formData"
      :rules="rules"
      size="medium"
      label-width="80px"
      :inline="true"
      :style="{ height: '30px' }"
    >
      <el-form-item label="员工" prop="employee">
        <el-input
          v-model="formData.employee"
          placeholder="请输入员工名称"
          show-word-limit
          clearable
          prefix-icon="el-icon-user"
          :style="{ width: '100%', 'margin-right': '8px' }"
        ></el-input>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" size="medium" @click="submitForm"
          >搜索</el-button
        >
        <el-button @click="resetForm" size="medium">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb8" type="flex" justify="end">
      <el-col :span="1.5">
        <el-button plain type="primary" icon="el-icon-plus" size="medium"
          >新增</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain size="medium" icon="el-icon-delete"
          >删除</el-button
        >
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table border>
      <el-table-column
        align="center"
        width="55"
        type="selection"
      ></el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="prop"
        label="员工名称"
      >
      </el-table-column>
      <el-table-column header-align="center" align="center" label="操作">
        <el-button type="text" icon="el-icon-edit">修改</el-button>
        <el-button type="text" icon="el-icon-delete">删除</el-button>
      </el-table-column>
    </el-table>
    <!-- /表格 -->
    <el-footer :style="{ height: '30px' }"></el-footer>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentpage"
      :page-sizes="[10, 20, 30]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="40"
    >
    </el-pagination>
    <!-- /分页 -->
  </div>
</template>
<script>
export default {
  name: "operator",
  components: {},
  props: [],
  data() {
    return {
      formData: {
        employee: "",
      },
      rules: {
        employee: [
          {
            required: true,
            message: "请输入员工名称",
            trigger: "blur",
          },
          {
            pattern: /^1(3|4|5|7|8|9)\d{9}$/,
            message: "手机号格式错误",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    submitForm() {
      this.$refs["elForm"].validate((valid) => {
        if (!valid) return;
        // TODO 提交表单
      });
    },
    resetForm() {
      this.$refs["elForm"].resetFields();
    },
  },
};
</script>
<style lang="scss" scoped>
.line {
  text-align: center;
}
.mb8 {
  margin-bottom: 10px;
}
.el-pagination {
  text-align: center;
}
</style>
