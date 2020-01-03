<template>
  <div>
    <el-table :data="tableData" height="700" border style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
    <div class="block pageclass">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :page-size="10"
        layout="total, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "index4",
  created() {
    this.tableRowClassName();
  },
  methods: {
    tableRowClassName() {
      console.log(this.tableheight);
      for (let index = 0; index < 100; index++) {
        this.tableData.push({
          date: "2016-05-02",
          name: "王小虎" + index,
          address: "上海市普陀区金沙江路" + index + "弄"
        });
      }
      this.total = this.tableData.length;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },
  data() {
    return {
      tableData: [],
      total: 0
    };
  }
};
</script>

<style scoped>
.pageclass {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 50px;
  padding-right: 30px;
  background-color: #F5F5F5;
}
</style>