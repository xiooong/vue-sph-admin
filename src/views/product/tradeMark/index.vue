<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" size="small" >新增</el-button>
    <el-table style="width: 100%" border>
      <el-table-column
        prop="prop"
        label="序号"
        width="70px"
        align="center"
        >
      </el-table-column>
      <el-table-column
        prop="prop"
        label="品牌名称"
        width="width"
        align="center"
        >
      </el-table-column>
      <el-table-column
        prop="prop"
        label="品牌logo"
        width="width"
        align="center"
        >
      </el-table-column>
      <el-table-column
        prop="prop"
        label="操作"
        width="width"
        align="center"
        >
      </el-table-column>
    </el-table>
    <el-pagination
      style="text-align:center;margin-top:30px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="6"
      :page-sizes="[4, 20, 50]"
      :page-size="6"
      :pager-count="7"
      :total="66"
      layout="prev, pager, next, jumper, ->, sizes, total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'tradeMark'
}
</script>

<style>

</style>