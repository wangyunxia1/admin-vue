<template>
  <el-row :gutter="30" class="panel-group">
    <el-col :xs="24" :sm="10" :lg="8" class="card-panel-col">
      <div class="card-content">
        <p class="card-title"><span>平台交易金额</span></p>
        <el-row :gutter="20">
          <el-col :xs="12" :sm="12" :lg="12">
            <div class="card-panel card-panel1" @click="handleSetLineChartData('newVisitis')">
              <div class="card-panel-description">
                <div class="card-panel-text">
                  交易总金额
                </div>
                <count-to :start-val="0" :end-val="1024080" :duration="2600" class="card-panel-num" />
              </div>
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12" class="">
            <div class="card-panel card-panel2" @click="handleSetLineChartData('messages')">
              <div class="card-panel-description">
                <div class="card-panel-text">
                  佣金
                </div>
                <count-to :start-val="0" :end-val="1024080" :duration="2600" class="card-panel-num" />
              </div>
            </div>
          </el-col>
        </el-row>
      </div>

    </el-col>

    <el-col :xs="24" :sm="14" :lg="16" class="card-panel-col">
      <div class="card-content">
        <p class="card-title"><span>数据概览</span></p>
        <el-row :gutter="15">
          <el-col :xs="12" :sm="8" :lg="4" class="">
            <div class="card-panel card-panel3" @click="handleSetLineChartData('purchases')">
              <div class="card-panel-description">
                <div class="card-panel-text">
                  服务商
                </div>
                <count-to :start-val="0" :end-val="1024080" :duration="2600" class="card-panel-num" />
              </div>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :lg="4" class="">
            <div class="card-panel card-panel4" @click="handleSetLineChartData('shoppings')">
              <div class="card-panel-description">
                <div class="card-panel-text">
                  一级代理商
                </div>
                <count-to :start-val="0" :end-val="1024080" :duration="2600" class="card-panel-num" />
              </div>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :lg="4" class="">
            <div class="card-panel card-panel5" @click="handleSetLineChartData('shoppings')">
              <div class="card-panel-description">
                <div class="card-panel-text">
                  二级代理商
                </div>
                <count-to :start-val="0" :end-val="1024080" :duration="2600" class="card-panel-num" />
              </div>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :lg="4" class="">
            <div class="card-panel card-panel6" @click="handleSetLineChartData('shoppings')">
              <div class="card-panel-description">
                <div class="card-panel-text">
                  三级代理商
                </div>
                <count-to :start-val="0" :end-val="1024080" :duration="2600" class="card-panel-num" />
              </div>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :lg="4" class="">
            <div class="card-panel card-panel7" @click="handleSetLineChartData('shoppings')">
              <div class="card-panel-description">
                <div class="card-panel-text">
                  总商户
                </div>
                <count-to :start-val="0" :end-val="1024080" :duration="2600" class="card-panel-num" />
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  components: {
    CountTo
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-bottom: 40px;
  .card-content {
    background: #fff;
    overflow: hidden;
    padding:  10px 20px;
  }
  .card-title{
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
        margin-top: -1px;
      }
  }
  .card-panel {
    height: 100px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #fff;
    border-radius: 5px;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    margin-bottom: 10px;
    &.card-panel1{
      background: url(../../../../assets/img/card-img-1.png) no-repeat center/cover;
    }
    &.card-panel2{
      background: url(../../../../assets/img/card-img-2.png) no-repeat center/cover;
    }
    &.card-panel3{
      background: url(../../../../assets/img/card-img-3.png) no-repeat center/cover;
    }
    &.card-panel4{
      background: url(../../../../assets/img/card-img-4.png) no-repeat center/cover;
    }
    &.card-panel5{
      background: url(../../../../assets/img/card-img-5.png) no-repeat center/cover;
    }
    &.card-panel6{
      background: url(../../../../assets/img/card-img-6.png) no-repeat center/cover;
    }
    &.card-panel7{
      background: url(../../../../assets/img/card-img-7.png) no-repeat center/cover;
    }
    // &:hover {
    //   .card-panel-icon-wrapper {
    //     color: #fff;
    //   }

    //   .icon-people {
    //     background: #40c9c6;
    //   }

    //   .icon-message {
    //     background: #36a3f7;
    //   }

    //   .icon-money {
    //     background: #f4516c;
    //   }

    //   .icon-shopping {
    //     background: #34bfa3
    //   }
    // }

    // .icon-people {
    //   color: #40c9c6;
    // }

    // .icon-message {
    //   color: #36a3f7;
    // }

    // .icon-money {
    //   color: #f4516c;
    // }

    // .icon-shopping {
    //   color: #34bfa3
    // }

    // .card-panel-icon-wrapper {
    //   float: left;
    //   margin: 14px 0 0 14px;
    //   padding: 16px;
    //   transition: all 0.38s ease-out;
    //   border-radius: 6px;
    // }

    // .card-panel-icon {
    //   float: left;
    //   font-size: 48px;
    // }

    .card-panel-description {
      margin-top: 17px;
      margin-left: 10px;
      .card-panel-text {
        line-height: 1;
        font-size: 16px;
        margin-bottom: 22px;
      }
      .card-panel-num {
        font-size: 24px;
        line-height: 1;
        font-weight: bold;
      }
    }
  }
  @media only screen and (min-width: 1200px){
    &>>>.el-col-lg-4 {
        width: 20%;
    }
  }
}

// @media (max-width:550px) {
//   .card-panel-description {
//     display: none;
//   }

//   .card-panel-icon-wrapper {
//     float: none !important;
//     width: 100%;
//     height: 100%;
//     margin: 0 !important;

//     .svg-icon {
//       display: block;
//       margin: 14px auto !important;
//       float: none !important;
//     }
//   }
// }
</style>
