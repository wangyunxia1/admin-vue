<template>
  <div class="app-container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="formInline.company" placeholder="设备号/门店/上级" />
      </el-form-item>
      <el-form-item>
        <el-select v-model="formInline.status" placeholder="设备类型">
          <el-option label="支付宝" value="1" />
          <el-option label="微信" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit"><svg-icon icon-class="search" />&emsp;搜索</el-button>
      </el-form-item>
    </el-form>
    <div class="panel">
      <el-table :data="tableData" style="width: 100%;margin-bottom: 50px;" border>
        <el-table-column align="left" label="设备号" min-width="100">
          <template slot-scope="scope">
            {{ scope.row.order }}
          </template>
        </el-table-column>
        <el-table-column align="left" label="设备类型" min-width="80">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column align="left" label="交易笔数" min-width="80">
          <template slot-scope="scope">
            {{ scope.row.contact }}
          </template>
        </el-table-column>
        <el-table-column align="left" label="交易金额" min-width="150">
          <template slot-scope="scope">
            {{ scope.row.tel }}
          </template>
        </el-table-column>
        <el-table-column align="left" label="所属门店" min-width="100">
          <template slot-scope="scope">
            {{ scope.row.status }}
          </template>
        </el-table-column>
        <el-table-column align="left" label="所属商家" min-width="100">
          <template slot-scope="scope">
            {{ scope.row.status }}
          </template>
        </el-table-column>
        <el-table-column align="left" label="三级代理" min-width="100">
          <template slot-scope="scope">
            {{ scope.row.status }}
          </template>
        </el-table-column>
        <el-table-column align="left" label="二级代理" min-width="100">
          <template slot-scope="scope">
            {{ scope.row.status }}
          </template>
        </el-table-column>
        <el-table-column align="left" label="一级代理" min-width="100">
          <template slot-scope="scope">
            {{ scope.row.status }}
          </template>
        </el-table-column>
        <el-table-column align="left" label="服务商" min-width="100">
          <template slot-scope="scope">
            {{ scope.row.status }}
          </template>
        </el-table-column>
        <el-table-column align="left" label="操作" min-width="120">
          <template slot-scope="scope">
            <router-link :to="'/device-manage/detail/'+scope.row.order">
              <el-button type="primary" size="small">
                流水清单{{ scope.row.order }}
              </el-button>
            </router-link>
            <!-- <el-button type="primary" size="small" @click="handleDetails(scope)">流水清单</el-button> -->
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
import path from 'path'
import { deepClone } from '@/utils'
import { getRoutes, getRoles, addRole, deleteRole, updateRole } from '@/api/role'

const defaultRole = {
  key: '',
  name: '',
  description: '',
  routes: []
}

export default {
  name: 'DeviceManage',
  data() {
    return {
      formInline: {
        company: '',
        contact: '',
        status: ''
      },
      tableData: [
        {
          order: '1',
          name: '支付宝',
          contact: '一二三',
          tel: '1111111',
          status: '一二三四五六七八 九十',
          createtime: '2019-10-27 17:49:42'
        }, {
          order: '2',
          name: '支付宝',
          contact: '一二三',
          tel: '支付宝',
          status: '高级',
          createtime: '2019-10-27 17:49:42'
        }, {
          order: '3',
          name: '支付宝',
          contact: '一二三',
          tel: '1111111',
          status: '高级',
          createtime: '2019-10-27 17:49:42'
        }, {
          order: '4',
          name: '支付宝',
          contact: '一二三',
          tel: '1111111',
          status: '高级',
          createtime: '2019-10-27 17:49:42'
        }, {
          order: '5',
          name: '支付宝',
          contact: '一二三',
          tel: '1111111',
          status: '高级',
          createtime: '2019-10-27 17:49:42'
        }],
      role: Object.assign({}, defaultRole),

      routes: [],
      rolesList: [],
      dialogVisible: false,
      dialogDetaile: false,
      detaile: {
        methods: 1,
        wx: '1.11'
      },
      dialogType: 'new',
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      currentPage4: 1
    }
  },
  computed: {
    routesData() {
      return this.routes
    }
  },
  created() {
    // Mock: get all routes and roles list from server
    // this.getRoutes()
    // this.getRoles()
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
    handleSizeChange() {

    },
    handleCurrentChange() {

    },
    // handleDetails() {
    //   this.$router.push('/device-manage/detail')
    // },
    changeMethod(val) {
      if (val == '微信') {

      }
    },
    // async getRoutes() {
    //   const res = await getRoutes()
    //   this.serviceRoutes = res.data
    //   this.routes = this.generateRoutes(res.data)
    // },
    // async getRoles() {
    //   const res = await getRoles()
    //   this.rolesList = res.data
    // },

    // // Reshape the routes structure so that it looks the same as the sidebar
    // generateRoutes(routes, basePath = '/') {
    //   const res = []

    //   for (let route of routes) {
    //     // skip some route
    //     if (route.hidden) { continue }

    //     const onlyOneShowingChild = this.onlyOneShowingChild(route.children, route)

    //     if (route.children && onlyOneShowingChild && !route.alwaysShow) {
    //       route = onlyOneShowingChild
    //     }

    //     const data = {
    //       path: path.resolve(basePath, route.path),
    //       title: route.meta && route.meta.title

    //     }

    //     // recursive child routes
    //     if (route.children) {
    //       data.children = this.generateRoutes(route.children, data.path)
    //     }
    //     res.push(data)
    //   }
    //   return res
    // },
    generateArr(routes) {
      let data = []
      routes.forEach(route => {
        data.push(route)
        if (route.children) {
          const temp = this.generateArr(route.children)
          if (temp.length > 0) {
            data = [...data, ...temp]
          }
        }
      })
      return data
    },
    handleAdd() {
      this.role = Object.assign({}, defaultRole)
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([])
      }
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    handleEdit(scope) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.checkStrictly = true
      this.role = deepClone(scope.row)
      this.$nextTick(() => {
        const routes = this.generateRoutes(this.role.routes)
        this.$refs.tree.setCheckedNodes(this.generateArr(routes))
        // set checked state of a node not affects its father and child nodes
        this.checkStrictly = false
      })
    },
    handleDelete({ $index, row }) {
      this.$confirm('是否确认操作？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          await deleteRole(row.key)
          this.rolesList.splice($index, 1)
          this.$message({
            type: 'success',
            message: '注销成功'
          })
        })
        .catch(err => { console.error(err) })
    },
    handleReset({ $index, row }) {
      this.$confirm('是否确认操作？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          await deleteRole(row.key)
          this.rolesList.splice($index, 1)
          this.$message({
            type: 'success',
            message: '新密码重置为123456'
          })
        })
        .catch(err => { console.error(err) })
    },
    // generateTree(routes, basePath = '/', checkedKeys) {
    //   const res = []

    //   for (const route of routes) {
    //     const routePath = path.resolve(basePath, route.path)

    //     // recursive child routes
    //     if (route.children) {
    //       route.children = this.generateTree(route.children, routePath, checkedKeys)
    //     }

    //     if (checkedKeys.includes(routePath) || (route.children && route.children.length >= 1)) {
    //       res.push(route)
    //     }
    //   }
    //   return res
    // },
    async confirmRole() {
      const isEdit = this.dialogType === 'edit'

      const checkedKeys = this.$refs.tree.getCheckedKeys()
      this.role.routes = this.generateTree(deepClone(this.serviceRoutes), '/', checkedKeys)

      if (isEdit) {
        await updateRole(this.role.key, this.role)
        for (let index = 0; index < this.rolesList.length; index++) {
          if (this.rolesList[index].key === this.role.key) {
            this.rolesList.splice(index, 1, Object.assign({}, this.role))
            break
          }
        }
      } else {
        const { data } = await addRole(this.role)
        this.role.key = data.key
        this.rolesList.push(this.role)
      }

      const { description, key, name } = this.role
      this.dialogVisible = false
      this.$notify({
        title: 'Success',
        // dangerouslyUseHTMLString: true,
        message: `
            <div>Role Key: ${key}</div>
            <div>Role Name: ${name}</div>
            <div>Description: ${description}</div>
          `,
        type: 'success'
      })
    },
    // reference: src/view/layout/components/Sidebar/SidebarItem.vue
    onlyOneShowingChild(children = [], parent) {
      let onlyOneChild = null
      const showingChildren = children.filter(item => !item.hidden)

      // When there is only one child route, the child route is displayed by default
      if (showingChildren.length === 1) {
        onlyOneChild = showingChildren[0]
        onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path)
        return onlyOneChild
      }

      // Show parent if there are no child route to display
      if (showingChildren.length === 0) {
        onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return onlyOneChild
      }

      return false
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
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
}
</style>
