<template>
  <div class="dashboard-editor-container">
    <!-- <github-corner class="github-corner" /> -->
      <panel-group  />
    <el-row>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="date-search">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item>
              <el-date-picker
                v-model="value1"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit"><svg-icon icon-class="search" />搜索</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
    <!-- 交易数据-->
    <div class="panel">
      <p class="panel-title">交易数据</p>
     <date-transaction />
    </div>

    <!-- <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <bar-chart ></bar-chart>
    </el-row> -->

    <div class="panel">
      <p class="panel-title">数据统计</p>
     <data-statistics :tableData = 'tableData'/>
    </div>



    <!-- <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <transaction-table />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <todo-list />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <box-card />
      </el-col>
    </el-row> -->
  </div>
</template>

<script>
// import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'
import DateTransaction from './components/DateTransaction'
import DataStatistics from './components/DataStatistics'

// import LineChart from './components/LineChart'
// import RaddarChart from './components/RaddarChart'
// import PieChart from './components/PieChart'
// import BarChart from './components/BarChart'
import TransactionTable from './components/TransactionTable'
// import TodoList from './components/TodoList'
// import BoxCard from './components/BoxCard'

// const lineChartData = {
//   newVisitis: {
//     expectedData: [100, 120, 161, 134, 105, 160, 165],
//     actualData: [120, 82, 91, 154, 162, 140, 145]
//   },
//   messages: {
//     expectedData: [200, 192, 120, 144, 160, 130, 140],
//     actualData: [180, 160, 151, 106, 145, 150, 130]
//   },
//   purchases: {
//     expectedData: [80, 100, 121, 104, 105, 90, 100],
//     actualData: [120, 90, 100, 138, 142, 130, 130]
//   },
//   shoppings: {
//     expectedData: [130, 140, 141, 142, 145, 150, 160],
//     actualData: [120, 82, 91, 154, 162, 140, 130]
//   }
// }

export default {
  name: 'DashboardAdmin',
  components: {
    // GithubCorner,
    PanelGroup,
    DateTransaction,
    DataStatistics,
    // LineChart,
    // RaddarChart,
    // PieChart,
    // BarChart,
    TransactionTable,
    // TodoList,
    // BoxCard
  },
  data() {
    return {
      formInline: {},
      value1: '',
      // lineChartData: lineChartData.newVisitis,
      tableData: [
        {
          order: '1',
          name1:'一二三商贸',
          name2:'一二三商贸',
          name3:'一二三商贸',
          name4:'服务商',
          money1:'12345.6',
          money2:'12345.6',
          money3:'12345.6',
          money4:'12345.6',
        }, {
          order: '1',
          name1:'一二三商贸',
          name2:'一二三商贸',
          name3:'一二三商贸',
          name4:'服务商',
          money1:'12345.6',
          money2:'12345.6',
          money3:'12345.6',
          money4:'12345.6',
        },{
          order: '1',
          name1:'一二三商贸',
          name2:'一二三商贸',
          name3:'一二三商贸',
          name4:'服务商',
          money1:'12345.6',
          money2:'12345.6',
          money3:'12345.6',
          money4:'12345.6',
        }]
    }
  },
  methods: {
    onSubmit() {

    },
    // handleSetLineChartData(type) {
    //   this.lineChartData = lineChartData[type]
    // }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 20px;
  background-color: rgb(240, 242, 245);
  position: relative;
  .date-search{
    margin-bottom: 40px;
  }
  .date-search .el-form-item{
    margin-bottom: 0;
  }
  .date-search .svg-icon{
    margin-right: 10px;
  }
  .panel{
    background: #fff;
    padding: 10px 20px;
    margin-bottom: 40px;
    .panel-title{
      margin-top: 0;
      margin-bottom: 20px;
      margin-left: -10px;
      span{
        font-size: 16px;
        line-height: 16px;
        vertical-align: middle;
      }
       &:before{
          display: inline-block;
          content: '';
          background: #333;
          width: 2px;
          height: 16px;
          vertical-align: middle;
          margin-right: 8px;
          margin-top: -2px;
        }
    }
  }

}

@media (max-width:1024px) {
  // .chart-wrapper {
  //   padding: 8px;
  // }
}
</style>
