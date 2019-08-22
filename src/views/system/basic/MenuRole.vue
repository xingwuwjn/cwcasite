<template>
  <div>
    <div v-loading="loading" style="text-align: left" >
      <el-input
        v-model="newRole"
        placeholder="请输入角色英文名称..."
        size="mini"
        style="width: 250px"
      >
        <template slot="prepend">ROLE_</template>
      </el-input>
      <el-input
        v-model="newRoleZh"
        placeholder="请输入角色中文名称..."
        size="mini"
        style="width: 250px"
      />
      <el-button type="primary" size="mini" style="margin-left: 5px" @click="addNewRole()">添加角色</el-button>
    </div>
    <div style="margin-top: 10px;text-align: left">
      <el-collapse v-model="activeColItem" accordion style="width: 500px;" @change="collapseChange">
        <el-collapse-item v-for="(item,index) in roles" :title="item.nameZh" :name="item.id" :key="item.name">
          <el-card class="box-card">
            <div slot="header">
              <span>可访问的资源</span>
              <el-button
                type="text"
                style="color: #f6061b;margin: 0px;float: right; padding: 3px 0;width: 15px;height:15px"
                icon="el-icon-delete"
                @click="deleteRole(item.id,item.nameZh)"/>
            </div>
            <div>
              <el-tree
                ref="tree"
                :props="props"
                :key="item.id"
                :data="treeData"
                :default-checked-keys="checkedKeys"
                node-key="id"
                show-checkbox
                highlight-current
                @check-change="handleCheckChange"
              />
            </div>
            <div style="display: flex;justify-content: flex-end;margin-right: 10px">
              <el-button size="mini" @click="cancelUpdateRoleMenu">取消修改</el-button>
              <el-button type="primary" size="mini" @click="updateRoleMenu(index)">确认修改</el-button>
            </div>
          </el-card>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script>
import { isNotNullORBlank } from '@/utils/systemutils'
import { getSysRoles, addSysrole, getmenubyrole, updateRoleMenu, deleterole } from '@/api/systemapi'
export default{
  data() {
    return {
      props: {
        label: 'name',
        children: 'children'
      },
      newRole: '',
      newRoleZh: '',
      roles: [],
      treeData: [],
      checkedKeys: [],
      loading: false,
      activeColItem: -1
    }
  },
  mounted: function() {
    this.loading = true
    this.initRoles()
  },
  methods: {
    deleteRole(rid, rname) {
      var _this = this
      this.$confirm('删除角色[' + rname + '], 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.loading = true
        deleterole(rid).then(resp => {
          if (resp && resp.status === 200) {
            _this.initRoles()
          } else {
            _this.loading = false
          }
        })
      }).catch(() => {
        _this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    addNewRole() {
      if (isNotNullORBlank(this.newRole, this.newRoleZh)) {
        this.loading = true
        var _this = this
        addSysrole(this.newRole, this.newRoleZh).then(resp => {
          if (resp && resp.status === 200) {
            // var data = resp.data
            _this.initRoles()
            _this.newRole = ''
            _this.newRoleZh = ''
          } else {
            _this.loading = false
          }
        })
      }
    },
    // 有五个树，但是五个树用的同一个数据源
    updateRoleMenu(index) {
      var checkedKeys = this.$refs.tree[index].getCheckedKeys(true)
      var _this = this
      updateRoleMenu(this.activeColItem, checkedKeys).then(resp => {
        if (resp && resp.status === 200) {
          _this.activeColItem = -1
        }
      })
    },
    collapseChange(activeName) {
      if (activeName === '') {
        return
      }
      var _this = this
      getmenubyrole(activeName).then(resp => {
        if (resp && resp.status === 200) {
          var data = resp.data
          _this.treeData = data.menus
          _this.checkedKeys = data.mids
        }
      })
    },
    handleCheckChange(data, checked, indeterminate) {
    // console.log(data,checked,indeterminate)
    },
    initRoles() {
      var _this = this
      getSysRoles().then(resp => {
        _this.loading = false
        if (resp && resp.status === 200) {
          _this.roles = resp.data
          _this.activeColItem = -1
        }
      })
    },
    cancelUpdateRoleMenu() {
      this.activeColItem = -1
    }
  }

}
</script>
