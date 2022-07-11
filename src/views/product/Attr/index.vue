<template>
  <div>
    <el-card style="margin:20px 0px">
      <categorySelect @getAttrInfo="getAttrInfo"></categorySelect>
    </el-card>
    <el-card v-if="attrInfo">
      <el-button type="primary" size="small" style="margin-bottom:20px">添加属性</el-button>
      <el-table
        :data="attrInfo"
        style="width: 100%"
        border>
        <el-table-column
          type=index
          label="序号"
          align="center"
          width="70px"
          >
        </el-table-column>
        <el-table-column
          prop="attrName"
          label="属性名称"
          align="center"
          width="width"
          >
        </el-table-column>
        <el-table-column
          prop="attrValueList"
          label="属性值列表"
          width="width"
          >
        <template slot-scope="{row}">
          <el-button type="success" v-for="(attr,index) in row.attrValueList" :key="index" @click="test(row)">{{attr.valueName}}</el-button>
        </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="width"
          >
        <template slot-scope="{row}">
          <el-button type="primary" size="mini">修改</el-button>
          <el-button type="primary" size="mini">删除</el-button>
        </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Attr',
  data(){
    return {
      attrInfo: []
    }
  },
  mounted(){
    this.getAttrInfo()
  },
  methods: {
    getAttrInfo(attrInfo){
      this.attrInfo = attrInfo
      console.log('商品分类列表',attrInfo);
    },
    test(row){
      console.log(row);
    }
  }
}
</script>

<style>

</style>