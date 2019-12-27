<template>
  <div class="app-container">
    <el-form :inline="false" :model="formInline" class="demo-form-inline">
    <el-row :gutter="10">
      <el-col :xs="12" :sm="6" :lg="4">
        <el-form-item>
          <el-input v-model="formInline.company" placeholder="订单号" />
        </el-form-item>
      </el-col>
       <el-col :xs="12" :sm="6" :lg="4">
         <el-form-item>
           <el-input v-model="formInline.company" placeholder="收银员" />
         </el-form-item>
       </el-col>
       <el-col :xs="24" :sm="10" :lg="8">
         <el-form-item>
           <el-date-picker
             v-model="value1"
             type="daterange"
             range-separator="~"
             start-placeholder="开始日期"
             end-placeholder="结束日期"
           />
         </el-form-item>
       </el-col>
       <el-col :xs="4" :sm="4" :lg="2" style="text-align: left;">
         <el-form-item>
          <el-button type="primary" @click="onSubmit"><svg-icon icon-class="search" />&nbsp;搜索</el-button>
         </el-form-item>
       </el-col>
       <el-col :xs="4" :sm="4" :lg="2" style="text-align: left;">
         <el-form-item>
          <el-button type="primary" @click="onSubmit"><svg-icon icon-class="download" />&nbsp;导出</el-button>
         </el-form-item>
       </el-col>
       <el-col :xs="4" :sm="4" :lg="4" style="text-align: right;">
         <el-form-item>
         <el-button type="primary" class="backlist" @click="backList"><svg-icon icon-class="back" />&nbsp;返回列表</el-button>
          </el-form-item>
       </el-col>



        <!--  <el-form-item>
            <el-button type="primary" @click="onSubmit"><svg-icon icon-class="search" />&nbsp;搜索</el-button>
            <el-button type="primary" @click="onSubmit"><svg-icon icon-class="download" />&nbsp;导出</el-button>
          </el-form-item>

        <el-button type="primary" class="backlist" @click="backList"><svg-icon icon-class="back" />&nbsp;返回列表</el-button>
    -->
    </el-row>
    </el-form>
  <!--  <div class="clearfix">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="formInline.company" placeholder="订单号" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="formInline.company" placeholder="收银员" />
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit"><svg-icon icon-class="search" />&nbsp;搜索</el-button>
          <el-button type="primary" @click="onSubmit"><svg-icon icon-class="download" />&nbsp;导出</el-button>
        </el-form-item>
      </el-form>
      <el-button type="primary" class="backlist" @click="backList"><svg-icon icon-class="back" />&nbsp;返回列表</el-button>
    </div> -->


    <div class="statis-order">
      <span>订单总数：</span>
      <span>0笔</span>
      <span>订单总金额：</span>
      <span>0元</span>
      <span>退款总金额：</span>
      <span>0元</span>
      <span>顾客实付：</span>
      <span>0元</span>
      <span>优惠：</span>
      <span>0元</span>
    </div>

    <div class="panel">
      <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
        <el-table-column align="center" label="序号" width="80">
          <template slot-scope="{row}">
            <span>{{ row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column width="180px" align="left" label="订单号">
          <template slot-scope="{row}">
            <span>{{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </template>
        </el-table-column>

        <el-table-column width="120px" align="left" label="门店">
          <template slot-scope="{row}">
            <span>{{ row.author }}</span>
          </template>
        </el-table-column>

        <el-table-column width="100px" label="收银员">
          <template slot-scope="{row}">
            <svg-icon v-for="n in + row.importance" :key="n" icon-class="star" class="meta-item__icon" />
          </template>
        </el-table-column>
        <el-table-column width="120px" align="left" label="订单金额">
          <template slot-scope="{row}">
            <span>{{ row.author }}</span>
          </template>
        </el-table-column>
        <el-table-column width="120px" align="left" label="创建时间">
          <template slot-scope="{row}">
            <span>{{ row.author }}</span>
          </template>
        </el-table-column>

        <el-table-column class-name="status-col" align="left" label="状态" width="110">
          <template slot-scope="{row}">
            <el-tag :type="row.status | statusFilter">
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column min-width="100px" align="left" label="支付方式">
          <template slot-scope="{row}">
            <span>{{ row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="100px" align="left" label="支付通道">
          <template slot-scope="{row}">
            <span>{{ row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="100px" align="left" label="退款金额">
          <template slot-scope="{row}">
            <span>{{ row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="100px" align="left" label="顾客实付">
          <template slot-scope="{row}">
            <span>{{ row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="100px" align="left" label="优惠">
          <template slot-scope="{row}">
            <span>{{ row.title }}</span>
          </template>
        </el-table-column>

      </el-table>

      <div class="pagination-container">
        <el-pagination
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>

  </div>
</template>

<script>
import { fetchList } from '@/api/article'

export default {
  name: 'DeviceDetail',
  filters: {
    statusFilter(status) {
      const statusMap = {
        '支付成功': '',
        '已撤销': 'danger',
        '未支付': 'success',
        '全额退款': 'info'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      formInline: {
        company: '',
        contact: '',
        status: ''
      },
      value1: '',
      currentPage4: 1,
      list: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
    backList() {
      this.$router.push('/device-manage/list')
    },
    async getList() {
      this.listLoading = true
      const { data } = await fetchList(this.listQuery)
      const items = data.items
      this.list = items.map(v => {
        this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
        v.originalTitle = v.title //  will be used when user click the cancel botton
        return v
      })
      this.listLoading = false
    },
    handleSizeChange() {

    },
    handleCurrentChange() {

    },
    handleDetails() {
      this.$route.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  position: relative;
  .clearfix{display: block;content: '';clear: both;}
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
  &>>>.el-dialog .is-required .el-form-item__label:before{
    content: "*";
    color: #f56c6c;
    margin-right: 4px;
  }
  &>>> .el-form-item__content .el-input-group{
    width: 150px !important;
  }
  .demo-form-inline{
    // float: left;
  }
  .backlist{
    // float: right;
      // position: absolute;
      // top: 20px;
      // right: 20px;
  }
  .statis-order{
    background: #2b324f;
    padding:17px 20px;
    font-size: 14px;
    color: #fff;
    margin-top: -10px;
    margin-bottom: 10px;
    span:nth-child(2n){
      margin-right: 40px;
    }
  }
}
</style>
