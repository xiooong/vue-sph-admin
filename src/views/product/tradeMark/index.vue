<template>
  <div>
    <el-button
      type="primary"
      icon="el-icon-plus"
      size="small"
      style="margin-bottom: 20px"
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
        <template slot-scope="scope">
          <el-button type="warning" icon="el-icon-edit" size="mini" @click="dialogFormVisible = true">
            修改
          </el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini">
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

    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input  autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "tradeMark",
  data() {
    return {
      dialogFormVisible: false,   //对话框显示属性
      page: 1,
      limit: 10,
      total: 0,
      list: [],
    };
  },
  mounted() {
    this.getTradeMarkList();
  },
  methods: {
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
</style>