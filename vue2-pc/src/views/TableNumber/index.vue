<template>
  <!-- 桌号维护 -->
  <div class="app-container">
    <el-form
      ref="elForm"
      :model="formData"
      :rules="rules"
      :inline="true"
      size="small"
      label-width="80px"
      :style="{ height: '30px' }"
    >
      <el-form-item label="桌号：" prop="field101" size="small">
        <el-input
          v-model="formData.field101"
          placeholder="请输入桌号"
          clearable
          prefix-icon="el-icon-tickets"
          :style="{ width: '204px', 'margin-right': '8px' }"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          :style="{ 'margin-right': '8px' }"
          size="small"
          icon="el-icon-search"
          type="primary"
          @click="submitForm"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh" size="small" @click="resetForm"
          >重置</el-button
        >
      </el-form-item>
    </el-form>

    <!-- 按钮 -->
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
    <!-- /按钮 -->

    <!-- 表格 -->
    <el-table border :data="data" style="width: 100%">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column
        align="center"
        prop="TableNum"
        label="桌号"
        width="width"
      />
      <el-table-column
        align="center"
        prop="SeatNum"
        label="座位数"
        width="width"
      />
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
      :current-page="currentPage4"
      :page-sizes="[10, 20, 30]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="40"
    >
    </el-pagination>
    <!-- /分页 -->
  </div>
</template>
<script>
export default {
  name: "TableNum",
  components: {},
  props: [],
  data() {
    return {
      formData: {
        field101: undefined,
      },
      rules: {
        field101: [
          {
            required: true,
            message: "请输入桌号",
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
.mb8 {
  margin-bottom: 10px;
}
.el-pagination {
  text-align: center;
}
</style>
