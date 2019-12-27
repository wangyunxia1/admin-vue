<template>
  <el-row  class="panel-group">
    <el-col :xs="24" :sm="24" :lg="24" class="card-panel-col">
      <!-- <p class="card-title"><span>交易数据</span></p> -->
      <el-row :gutter="15">
        <el-col :xs="24" :sm="12" :lg="4">
          <div class="card-col">
            <div class="card-panel card-panel1">
              <img src="../../../../assets/img/home-icon1.png" alt="">
              <div class="card-panel-description ">
                <div class="card-panel-text">
                  交易笔数
                </div>
                <count-to :start-val="0" :end-val="1024080" :duration="2600" class="card-panel-num" />
              </div>
            </div>
            <div class="card-chart">
              <bar-chart :class-name="chart1.chartName" :chartListdata="chart1.bardata" />
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="4">
          <div class="card-col">
            <div class="card-panel card-panel2">
              <img src="../../../../assets/img/home-icon2.png" alt="">
              <div class="card-panel-description ">
                <div class="card-panel-text">
                  交易金额
                </div>
                <count-to :start-val="0" :end-val="1000234567.89" :duration="2600" class="card-panel-num" />
              </div>
            </div>
          </div>
          <div class="card-chart">
            <bar-chart :class-name="chart2.chartName" :chartListdata="chart2.bardata" />
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="4">
          <div class="card-col">
            <div class="card-panel card-panel3">
              <img src="../../../../assets/img/home-icon3.png" alt="">
              <div class="card-panel-description ">
                <div class="card-panel-text">
                  退款笔数
                </div>
                <count-to :start-val="0" :end-val="1000234567.89" :duration="2600" class="card-panel-num" />
              </div>
            </div>
          </div>
         <div class="card-chart">
           <bar-chart :class-name="chart3.chartName" :chartListdata="chart3.bardata" />
         </div>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="4">
          <div class="card-col">
            <div class="card-panel card-panel4">
              <img src="../../../../assets/img/home-icon4.png" alt="">
              <div class="card-panel-description ">
                <div class="card-panel-text">
                  退款金额
                </div>
                <count-to :start-val="0" :end-val="1000234567.89" :duration="2600" class="card-panel-num" />
              </div>
            </div>
          </div>
          <div class="card-chart">
            <bar-chart :class-name="chart4.chartName" :chartListdata="chart4.bardata" />
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="4">
          <div class="card-col">
            <div class="card-panel card-panel5">
              <img src="../../../../assets/img/home-icon5.png" alt="">
              <div class="card-panel-description ">
                <div class="card-panel-text">
                  实际营收
                </div>
                <count-to :start-val="0" :end-val="1000234567.89" :duration="2600" class="card-panel-num" />
              </div>
            </div>
          </div>
          <div class="card-chart">
            <bar-chart :class-name="chart5.chartName" :chartListdata="chart5.bardata" />
          </div>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
// import echarts from 'echarts'
// require('echarts/theme/macarons') // echarts theme
// import resize from './mixins/resize'
import BarChart from './BarChart'
// const animationDuration = 6000

export default {
  name: 'DateTransaction',
  components: {
    CountTo,
    BarChart
  },
  data() {
    return {
      percentage: '10',
      wxColor: '#13ce66',
      aliColor: '#1890ff',
      otherColors: '#f5637b',
      chart1:{
        chartName: 'chart1',
        bardata: [123, 2345, 12340]
      },
      chart2:{
        chartName: 'chart2',
        bardata: [245, 2632, 2225]
      },
      chart3:{
        chartName: 'chart3',
        bardata: [352, 323, 333]
      },
      chart4:{
        chartName: 'chart4',
        bardata: [465, 422, 4266]
      },
      chart5:{
        chartName: 'chart5',
        bardata: [535, 554, 345]
      },
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-bottom: 40px;
  .card-col{
    .card-panel{
      height: 100px;
      padding-left: 20px;
      display: flex;
      align-items: center;
      &.card-panel1{
        background: #f4f7fd;
      }
      &.card-panel2{
        background: #fff6f7;
      }
      &.card-panel3{
        background: #faf6fe;
      }
      &.card-panel4{
        background: #f3fbfe;
      }
      &.card-panel5{
        background: #fef6fd;
      }
      .card-panel-description{
        margin-left: 10px;
      }
    }

  }
  @media only screen and (min-width: 1200px){
    &>>>.el-col-lg-4 {
        width: 20%;
    }
  }
 }
</style>
