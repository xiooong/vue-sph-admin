<template>
  <div>
    <el-form :inline="true" class="demo-form-inline" :model="cForm">
      <el-form-item label="一级分类">
        <el-select
          placeholder="请选择一级分类"
          v-model="cForm.category1Id"
          @change="handler1"
          :clearable="clearable"
        >
          <el-option
            v-for="c1 in category1List"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          placeholder="请选择二级分类"
          v-model="cForm.category2Id"
          @change="handler2"
          :clearable="clearable"
        >
          <el-option
            v-for="c2 in category2List"
            :key="c2.id"
            :label="c2.name"
            :value="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          placeholder="请选择三级分类"
          v-model="cForm.category3Id"
          @change="getAttrInfo"
          :clearable="clearable"
        >
          <el-option
            v-for="c3 in category3List"
            :key="c3.id"
            :label="c3.name"
            :value="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "categorySelect",
  data() {
    return {
      category1List: [],
      category2List: [],
      category3List: [],
      cForm: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
      attrInfo: [],
      clearable: true,
    };
  },
  mounted() {
    this.getCategory1List();
  },
  methods: {
    // 一级分类回调函数
    async getCategory1List() {
      let result = await this.$API.attr.reqCategory1List();
      if (result.code == 200) {
        console.log("一级分类接口", result);
        this.category1List = result.data;
      } else {
        console.error("category1 error");
      }
    },
    // 二级分类回调函数
    async handler1() {
      this.category2List = [];
      this.category3List = [];
      this.cForm.category2Id = "";
      this.cForm.category3Id = "";
      let result = this.cForm.category1Id
        ? await this.$API.attr.reqCategory2List(this.cForm.category1Id)
        : "";
      if (result.code == 200) {
        console.log("二级分类接口", result);
        this.category2List = result.data;
      }
    },
    // 三级分类回调函数
    async handler2() {
      this.category3List = [];
      this.cForm.category3Id = "";
      let result = this.cForm.category2Id
        ? await this.$API.attr.reqCategory3List(this.cForm.category2Id)
        : "";
      if (result.code == 200) {
        console.log("三级分类接口", result);
        this.category3List = result.data;
      }
    },
    // 获取商品分类列表
    async getAttrInfo() {
      const { category1Id, category2Id, category3Id } = this.cForm;
      let result = this.cForm.category3Id
        ? await this.$API.attr.reqAttrInfo(
            category1Id,
            category2Id,
            category3Id
          )
        : "";
      if (result.code == 200) {
        console.log("子组件商品分类列表数据", result);
        this.attrInfo = result.data;
        this.$emit("getAttrInfo", this.attrInfo);
      }else{
        this.$emit("getAttrInfo", '');
      }
    },
  },
};
</script>

<style>
</style>