<template>
  <div class="app-container" v-loading="loading">
    <el-button type="primary" @click="handleRefresh"><svg-icon icon-class="refresh" />&emsp;刷新</el-button>
    <div class="panel" style="margin-top:20px;">
      <el-table :data="tableData" style="width: 100%;margin-top:10px;" border>
        <el-table-column
          align="center"
          type="selection"
          width="50"
        />
        <el-table-column align="left" label="角色名称" min-width="100">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column align="left" label="公司类型" min-width="200">
          <template slot-scope="scope">
            {{ scope.row.type }}
          </template>
        </el-table-column>
        <el-table-column align="left" label="员工等级" min-width="100">
          <template slot-scope="scope">
            {{ scope.row.level }}
          </template>
        </el-table-column>
        <el-table-column align="left" label="创建时间" min-width="280">
          <template slot-scope="scope">
            {{ scope.row.createtime }}
          </template>
        </el-table-column>
        <el-table-column align="left" label="操作" min-width="200">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleAddRole(scope)">分配权限</el-button>
            <el-button type="danger" size="small" @click="handleEdit(scope)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑角色':'分配权限'" width="500px">
      <div class="dialog-form ">
        <el-form :model="role" label-width="70px" label-position="right">
          <el-form-item v-show="dialogType==='edit'?true:false" label="角色名称">
            <el-input v-model="role.name" placeholder="角色名称" />
          </el-form-item>
          <el-form-item v-show="dialogType==='edit'?false:true" label="菜单">
            <el-tree
              ref="tree"
              :check-strictly="checkStrictly"
              :data="routesData"
              :props="defaultProps"
              show-checkbox
              node-key="path"
              class="permission-tree"
            />
          </el-form-item>
        </el-form>
      </div>
     <!-- <div style="text-align:center;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmRole">确定</el-button>
      </div> -->
    </el-dialog>
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
  data() {

    return {
      loading:false,
      tableData: [
        {
          name: '超级管理员',
          type: '服务商',
          level: '高级',
          createtime: '2019-10-27 17:49:42'
        }, {
          name: 'OEM服务商',
          type: '一级代理商',
          level: '高级',
          createtime: '2019-10-27 17:49:42'
        }, {
          name: '超级管理员',
          type: '服务商',
          level: '高级',
          createtime: '2019-10-27 17:49:42'
        }, {
          name: '超级管理员',
          type: '服务商',
          level: '高级',
          createtime: '2019-10-27 17:49:42'
        }, {
          name: '超级管理员',
          type: '服务商',
          level: '高级',
          createtime: '2019-10-27 17:49:42'
        }],
      role: Object.assign({}, defaultRole),
      routes: [],
      rolesList: [],
      dialogVisible: false,
      dialogType: 'distribute',
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  computed: {
    routesData() {
      return this.routes
    }
  },
  created() {
    // Mock: get all routes and roles list from server
    this.getRoutes()
    this.getRoles()
  },
  methods: {
    handleRefresh() {  //刷新
      this.loading = true;
      setTimeout(()=>{
        this.getRoutes();
        this.loading = false
      },1000)

      // this.$router.go(0);
    },
    async getRoutes() {
      const res = await getRoutes() // 等getRoutes()函数执行完毕，得到的值赋给res
      // console.log(res.data)
      this.serviceRoutes = res.data
      this.routes = this.generateRoutes(res.data)
    },
    // 重塑路由结构，使其看起来与侧边栏相同
    generateRoutes(routes, basePath = '/') {
      console.log(0)
      const res = []
      for (let route of routes) {
        if (route.hidden) { continue }// skip some route
        const onlyOneShowingChild = this.onlyOneShowingChild(route.children, route)
        if (route.children && onlyOneShowingChild && !route.alwaysShow) {
          route = onlyOneShowingChild
        }
        const data = {
          path: path.resolve(basePath, route.path),
          title: route.meta && route.meta.title
        }
        if (route.children) {// 递归子路由
          data.children = this.generateRoutes(route.children, data.path)
        }
        res.push(data)
      }
      console.log(res)
      return res
    },
    async getRoles() {
      const res = await getRoles()
      this.rolesList = res.data
    },
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
    handleAddRole() { // 分配权限
      this.role = Object.assign({}, defaultRole)
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([])
      }
      this.dialogType = 'distribute'
      this.dialogVisible = true
    },
    handleEdit(scope) { // 编辑
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
    // handleDelete({ $index, row }) {
    //   this.$confirm('Confirm to remove the role?', 'Warning', {
    //     confirmButtonText: 'Confirm',
    //     cancelButtonText: 'Cancel',
    //     type: 'warning'
    //   })
    //     .then(async() => {
    //       await deleteRole(row.key)
    //       this.rolesList.splice($index, 1)
    //       this.$message({
    //         type: 'success',
    //         message: 'Delete succed!'
    //       })
    //     })
    //     .catch(err => { console.error(err) })
    // },
    generateTree(routes, basePath = '/', checkedKeys) {
      const res = []

      for (const route of routes) {
        const routePath = path.resolve(basePath, route.path)

        // recursive child routes
        if (route.children) {
          route.children = this.generateTree(route.children, routePath, checkedKeys)
        }

        if (checkedKeys.includes(routePath) || (route.children && route.children.length >= 1)) {
          res.push(route)
        }
      }
      return res
    },
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
        dangerouslyUseHTMLString: true,
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
  .dialog-form>>>.el-form-item--medium .el-form-item__label{
    // line-height: 26px;
  }
}
</style>
