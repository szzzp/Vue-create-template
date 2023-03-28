<template>
  <!-- 菜单维护 -->
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      size="small"
      :inline="true"
      v-show="showSearch"
      label-width="80px"
      :style="{ height: '30px' }"
    >
      <el-form-item label="套餐名称:" prop="jobName" size="small">
        <el-input
          v-model="queryParams.jobName"
          placeholder="请输入套餐名称"
          clearable
          @keyup.enter.native="handleQuery"
          prefix-icon="el-icon-tickets"
          :style="{ width: '204px' }"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8" type="flex" justify="end">
      <el-col :span="1.5">
        <el-button
          type="primary"
          size="medium"
          plain
          icon="el-icon-plus"
          @click="handleAdd"
          v-hasPermi="['system:log:add']"
          >新增</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          size="medium"
          plain
          icon="el-icon-edit"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:log:edit']"
          >修改</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          size="medium"
          plain
          icon="el-icon-download"
          @click="handleExport"
          v-hasPermi="['system:log:export']"
          >导出</el-button
        >
      </el-col>
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="logList"
      border
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column
        label="套餐ID"
        align="center"
        prop="jobLogId"
        width="80"
      />
      <el-table-column
        label="套餐名称"
        align="center"
        prop="setMealName"
        width="180"
      />
      <el-table-column label="套餐图片" align="center" prop="setMealiamge">
        <el-image
          style="width: 100px; height: 100px"
          :src="url"
          :fit="fit"
        ></el-image>
      </el-table-column>
      <el-table-column
        label="售价"
        align="center"
        prop="SellingPrice"
        width="180"
      />
      <el-table-column
        label="备注"
        align="center"
        prop="setMealRemarks"
        width="300"
      />
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:log:edit']"
            >修改</el-button
          >
          <el-button
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:log:remove']"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
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

    <!-- 添加或修改定时任务调度日志对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="任务名称" prop="jobName">
          <el-input v-model="form.jobName" placeholder="请输入任务名称" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listLog, getLog, delLog, addLog, updateLog } from "@/api/log";

export default {
  name: "menu",
  data() {
    return {
      // 遮罩层
      loading: false,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 定时任务调度日志表格数据
      logList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        jobName: null,
        SellingPrice: null, // 售价
        setMealRemarks: null, // 套餐备注
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        jobName: [
          { required: true, message: "任务名称不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    // this.getList();
  },
  methods: {
    /** 查询定时任务调度日志列表 */
    getList() {
      this.loading = true;
      listLog(this.queryParams).then((response) => {
        this.logList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        jobLogId: null,
        jobName: null,
        createTime: null,
        setMealName: null, // 套餐名字
        setMealiamge: null, // 套餐图片
        SellingPrice: null, // 售价
        setMealRemarks: null, // 套餐备注
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.jobLogId);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加定时任务调度日志";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const jobLogId = row.jobLogId || this.ids;
      getLog(jobLogId).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改定时任务调度日志";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.jobLogId != null) {
            updateLog(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addLog(this.form).then((response) => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const jobLogIds = row.jobLogId || this.ids;
      this.$modal
        .confirm('是否确认删除套餐编号为"' + jobLogIds + '"的数据项？')
        .then(function () {
          return delLog(jobLogIds);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        })
        .catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download(
        "system/log/export",
        {
          ...this.queryParams,
        },
        `log_${new Date().getTime()}.xlsx`
      );
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
