<template>
  <el-row :gutter="24" class="panel-group">
    <el-col :xs="24" :sm="24" :lg="24">
      <el-table :data="tableData" style="width: 100%;" border>
        <el-table-column align="left" label="序号" min-width='40'>
          <template slot-scope="scope">
            {{ scope.row.order }}
          </template>
        </el-table-column>
        <el-table-column align="left" label="一级代理商名称" min-width='100'>
          <template slot-scope="scope">
            {{ scope.row.name1 }}
          </template>
        </el-table-column>
        <el-table-column align="left" label="二级代理商名称" min-width='100'>
          <template slot-scope="scope">
            {{ scope.row.name2 }}
          </template>
        </el-table-column>
        <el-table-column align="left" label="三级代理商名称" min-width='100'>
          <template slot-scope="scope">
            {{ scope.row.name3 }}
          </template>
        </el-table-column>
        <el-table-column align="left" label="商户名称" min-width='100'>
          <template slot-scope="scope">
            {{ scope.row.name4 }}
          </template>
        </el-table-column>
        <el-table-column align="left" label="订单金额" min-width='100'>
          <template slot-scope="scope">
            {{ scope.row.money1 }}
          </template>
        </el-table-column>
        <el-table-column align="left" label="退款金额" min-width='100'>
          <template slot-scope="scope">
            {{ scope.row.money2 }}
          </template>
        </el-table-column>
        <el-table-column align="left" label="有效交易基数" min-width='100'>
          <template slot-scope="scope">
            {{ scope.row.money3 }}
          </template>
        </el-table-column>
        <el-table-column align="left" label="顾客实际支付" min-width='100'>
          <template slot-scope="scope">
            {{ scope.row.money4 }}
          </template>
        </el-table-column>
        <el-table-column align="left" label="操作" min-width='100'>
          <template slot-scope="scope">
            <a href="">详情</a>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'DataStatistics',
  props: {
    tableData:{
      type:Array,
    }
  }

}
</script>

<style>
</style>
