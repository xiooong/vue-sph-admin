<template>
  <div>
    <el-button
      type="primary"
      icon="el-icon-plus"
      size="small"
      style="margin-bottom: 20px"
      @click="showDialog"
      >新增</el-button
    >
    <el-table :data="list" style="width: 100%" border stripe>
      <el-table-column
        prop="id"
        label="序号"
        width="70px"
        align="center"
        type="index"
      >
      </el-table-column>
      <el-table-column
        prop="tmName"
        label="品牌名称"
        width="width"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="logoUrl"
        label="品牌logo"
        width="width"
        align="center"
      >
        <template slot-scope="scope">
          <el-image
            v-if="scope.row.logoUrl.includes('http')"
            style="height: 40px"
            :src="scope.row.logoUrl"
            :preview-src-list="[scope.row.logoUrl]"
          >
          </el-image>
          <img v-else style="height: 60px" src="../../../assets/duck.gif" />
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width" align="center">
        <template slot-scope="{ row }">
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
            @click="updateTradeMark(row)"
          >
            修改
          </el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="removeTradeMark(row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="text-align: center; margin-top: 30px"
      @size-change="handleSizeChange"
      @current-change="getTradeMarkList"
      :current-page="page"
      :page-sizes="[10, 20, 50]"
      :page-size="limit"
      :pager-count="7"
      :total="total"
      layout="prev, pager, next, jumper, ->, sizes, total"
    >
    </el-pagination>

    <!-- 添加品牌对话框 -->
    <el-dialog
      :title="tmForm.id ? '修改品牌' : '添加品牌'"
      :visible.sync="dialogFormVisible"
    >
      <el-form style="width: 80%" :model="tmForm" :rules="rules" ref="ruleForm">
        <el-form-item
          label="品牌名称"
          :label-width="formLabelWidth"
          prop="tmName"
        >
          <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
        </el-form-item>
        <el-form-item
          style="width: 80%"
          label="品牌LOGO"
          :label-width="formLabelWidth"
          prop="logoUrl"
        >
          <!-- action:设置图片上传地址 -->
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div class="el-upload__tip" slot="tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdate">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "tradeMark",
  data() {
    var validateTmName = (rule, value, callback) => {
      //自定义校验规则
      if (value.length < 1 || value.length > 5) {
        callback(new Error("品牌名称1-5位"));
      } else {
        callback();
      }
    };
    return {
      centerDialogVisible: false, //删除品牌对话框显示属性
      dialogFormVisible: false, //更新品牌对话框显示属性
      formLabelWidth: "120px", //对话框表单文本宽度
      imageUrl: "", //对话框上传图片地址
      page: 1, //分页-当前页
      limit: 10, //分页-每页条数
      total: 0, //分页-总条数
      list: [], //商品列表数据
      tmForm: {
        tmName: "",
        logoUrl: "",
      }, // 更新品牌对话框表单
      rules: {
        tmName: [
          { required: true, message: "请输入品牌名称", trigger: "blur" },
          { validator: validateTmName, trigger: "change" },
        ],
        logoUrl: [{ required: false, message: "请上传图片" }],
      },
    };
  },
  mounted() {
    this.getTradeMarkList();
  },
  methods: {
    // 删除品牌按钮
    removeTradeMark(row) {
      this.$confirm(`你确定删除${row.tmName}吗？`, "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let result = await this.$API.trademark.reqRemoveTradeMark(row.id);
          console.log("删除品牌接口", result);
          if (result.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功",
            });
          this.getTradeMarkList(this.list.length>1 ? this.page:(this.page=1 ? 1:this.page-1));
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 修改品牌按钮
    updateTradeMark(row) {
      this.dialogFormVisible = true;
      this.tmForm = { ...row };
    },
    // 添加或修改品牌接口
    addOrUpdate() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          this.dialogFormVisible = false;
          let result = await this.$API.trademark.reqAddOrUpdateTradeMark(
            this.tmForm
          );
          // console.log('添加品牌接口',result);
          if (result.code == 200) {
            this.$message({
              message: this.tmForm.id ? "修改品牌成功" : "添加品牌成功",
              type: "success",
            });
            this.getTradeMarkList(this.page);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 对话框-添加图片回调函数
    // 图片上传成功回调函数
    handleAvatarSuccess(res, file) {
      this.tmForm.logoUrl = res.data;
    },
    // 图片上传前回调函数
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === "image/jpg" || "image/jpeg" || "image/png" || "image/gif";

      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 jpg或png 格式!");
      }
      if (!isLt2M) {
        this.$message.error({
          message: "上传头像图片大小不能超过 2MB!",
          duration: 1000,
        });
      }
      return isJPG && isLt2M;
    },
    // 显示对话框
    showDialog() {
      this.dialogFormVisible = true;
      this.tmForm = { tmName: "", logoUrl: "" };
    },
    // 调用品牌管理列表接口
    async getTradeMarkList(pager = 1) {
      this.page = pager;
    // 解构data数据
      const { page, limit } = this;
      //调用接口
      let result = await this.$API.trademark.reqTradeMarkList(page, limit);
      console.log("品牌管理接口", result);
      //接口调用成功，赋值total和list
      if (result.code == 200) {
        this.total = result.data.total;
        this.list = result.data.records;
      }
    },
    // 切换每页条数
    async handleSizeChange(val) {
      this.limit = val;
      this.getTradeMarkList();
    },
  },
  computed: {},
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>