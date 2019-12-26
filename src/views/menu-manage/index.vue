<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddMainmenu">新建菜单</el-button>
    <div class="panel" style="margin-top:20px;">
      <el-table :data="tableData" style="width: 100%;margin-top:10px;" border>
        <el-table-column align="center" label="序号" min-width="100">
          <template slot-scope="scope">
            {{ scope.row.order }}
          </template>
        </el-table-column>
        <el-table-column align="left" label="标题" min-width="200">
          <template slot-scope="scope">
            <span :class="scope.row.level==1?'mainmenu':'submenu'"> {{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column align="left" label="状态" min-width="100">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-color="#1890ff"
              inactive-color="#dcdfe6"
              active-text="ON"
              inactive-text="OFF"
            />
          </template>

        </el-table-column>
        <el-table-column align="left" label="操作" min-width="200">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleAddSubmenu(scope)">新建子菜单</el-button>
            <el-button type="success" size="small" @click="handleEdit(scope)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDel(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新建菜单 -->
    <el-dialog
      :visible.sync="dialogAdd"
      :title="dialogType==='submenu'?'新建子菜单':'新建菜单'"
      custom-class="creat-dialog"
      width="500px"
    >
      <div class="dialog-form ">
        <el-form :model="menuForm" label-width="75px" label-position="right">
          <el-form-item label="标题">
            <el-input v-model="menuForm.name" placeholder="标题" />
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="menuForm.address" placeholder="地址" />
          </el-form-item>
          <el-form-item label="请求方式" prop="methods">
            <el-select v-model="menuForm.methods" placeholder="请选择">
              <el-option label="get" value="1" />
              <el-option label="post" value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="类型" prop="type">
            <el-select v-model="menuForm.type" placeholder="请选择菜单类型">
              <el-option label="分组" value="1" />
              <el-option label="区域二" value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="排序">
            <el-input v-model="menuForm.sort" placeholder="请填写菜单排序数值" />
          </el-form-item>
          <el-form-item label="是否启用" prop="resource">
            <el-radio-group v-model="menuForm.enable">
              <el-radio label="否" />
              <el-radio label="是" />
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <div style="text-align:center;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmRole">确定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog :visible.sync="dialogEdit" title="编辑" custom-class="creat-dialog" width="500px">
      <div class="dialog-form ">
        <el-form :model="role" label-width="75px" label-position="right">
          <el-form-item label="标题">
            <el-input v-model="role.title" placeholder="标题" />
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="role.address" placeholder="地址" />
          </el-form-item>
          <el-form-item label="请求方式" prop="methods">
            <el-select v-model="role.methods" placeholder="请选择">
              <el-option label="get" value="1" />
              <el-option label="post" value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="类型" prop="type">
            <el-select v-model="role.type" placeholder="请选择菜单类型">
              <el-option label="分组" value="1" />
              <el-option label="区域二" value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="排序">
            <el-input v-model="role.sort" placeholder="请填写菜单排序数值" />
          </el-form-item>
          <el-form-item label="是否启用" prop="resource">
            <el-radio-group v-model="role.enable">
              <el-radio label="否" />
              <el-radio label="是" />
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <div style="text-align:center;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmRole">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
const defaultRole = {
  key: 'ss',
  name: 'sss',
  description: 'sss',
  routes: []
}

export default {
  name: 'MenuManage',
  data() {
    return {
      tableData: [
        {
          order: '1',
          title: '首页',
          level: 1,
          status: true
        }, {
          order: '1',
          title: '服务商管理',
          level: 1,
          status: false
        }, {
          order: '1',
          title: '设备管理',
          level: 1,
          status: true
        }, {
          order: '1',
          title: '设备列表',
          level: 2,
          status: true
        }, {
          order: '1',
          title: '系统角色管理',
          level: 1,
          status: true
        }, {
          order: '1',
          title: '系统权限管理',
          level: 1,
          status: false
        },
        {
          order: '1',
          title: '菜单管理',
          level: 1,
          status: false
        }],
      dialogAdd: false,
      dialogEdit: false,
      dialogType: 'submenu',
      menuForm: {
        title: '',
        address: '',
        methods: '',
        type: '',
        sort: '',
        enable: '是'
      },
      role: Object.assign({}, defaultRole)
    }
  },
  methods: {
    handleAddMainmenu() {
      this.dialogType = 'mainmenu'
      this.dialogAdd = true
    },
    handleAddSubmenu(scope) {
      this.dialogType = 'submenu'
      this.dialogAdd = true
    },
    handleEdit(scope) {
      this.dialogEdit = true
      this.role = scope.row
      console.log(this.role)
    },
    handleDel(scope) {
      // this.dialogDel = true;
      // console.log(scope.row.title)
      // this.title = scope.row.title;
      this.$confirm('是否删除' + scope.row.title + '？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
        // await deleteRole(row.key)
        // this.rolesList.splice($index, 1)
          this.$message({
            type: 'success',
            message: 'Delete succed!'
          })
        })
        .catch(err => { console.error(err) })
    },
    async confirmRole() {
    //   const isEdit = this.dialogType === 'edit'

      //   const checkedKeys = this.$refs.tree.getCheckedKeys()
      //   this.role.routes = this.generateTree(deepClone(this.serviceRoutes), '/', checkedKeys)

      //   if (isEdit) {
      //     await updateRole(this.role.key, this.role)
      //     for (let index = 0; index < this.rolesList.length; index++) {
      //       if (this.rolesList[index].key === this.role.key) {
      //         this.rolesList.splice(index, 1, Object.assign({}, this.role))
      //         break
      //       }
      //     }
      //   } else {
      //     const { data } = await addRole(this.role)
      //     this.role.key = data.key
      //     this.rolesList.push(this.role)
      //   }

    //   const { description, key, name } = this.role
    //   this.dialogVisible = false
    //   this.$notify({
    //     title: 'Success',
    //     dangerouslyUseHTMLString: true,
    //     message: `
    //         <div>Role Key: ${key}</div>
    //         <div>Role Name: ${name}</div>
    //         <div>Description: ${description}</div>
    //       `,
    //     type: 'success'
    //   })
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-container{
    .submenu{
      margin-left: 30px;
    }
    &>>>.el-dialog .el-input{
      width: 380px;
    }
    &>>>.el-switch{
      .el-switch__label{
        position: absolute;
        display: none;
        color: #fff;
        margin: 0;
        font-size: 12px;
      }
       .el-switch__core,
         .el-switch .el-switch__label {
               width: 55px !important;
      }
      .el-switch__label.is-active {
        display: block;
       }
       .el-switch__label--right {
         margin-left: 0;
          z-index: 1;
         right: 25px;
       }
        .el-switch__label--left {
         z-index: 1;
         left: 21px;
       }
    }

  }
</style>
