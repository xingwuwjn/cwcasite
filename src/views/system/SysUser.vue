<template>
  <div v-loading="fullloading" style="margin-top: 10px" >
    <div style="margin-bottom: 10px;display: flex;justify-content: center;align-items: center">
      <el-input
        :model="keywords"
        placeholder="默认展示部分用户，可以通过用户名搜索更多用户..."
        prefix-icon="el-icon-search"
        size="small"
        style="width: 400px;margin-right: 10px"
      />
      <el-button size="small" type="primary" icon="el-icon-search" @click="searchClick">搜索</el-button>
    </div>
    <div style="display: flex;justify-content: space-around;flex-wrap: wrap;text-align: left">
      <el-card
        v-loading="cardLoading[index]"
        v-for="(item,index) in hrs"
        :key="item.id"
        style="width: 350px;margin-bottom: 20px"
      >
        <div slot="header" class="clearfix">
          <span>{{ item.name }}</span>
          <el-button
            type="text"
            style="color: #f6061b;margin: 0px;float: right; padding: 3px 0;width: 15px;height:15px"
            icon="el-icon-delete"
            @click="deleteHr(item.id)"/>
        </div>
        <div>
          <div style="width: 100%;display: flex;justify-content: center">
            <img :src="item.userface" alt="item.name" style="width: 70px;height: 70px;border-radius: 70px">
          </div>
          <div style="margin-top: 20px">
            <div><span class="user-info">用户名:{{ item.name }}</span></div>
            <div><span class="user-info">手机号码:{{ item.phone }}</span></div>
            <div><span class="user-info">电话号码:{{ item.telephone }}</span></div>
            <div><span class="user-info">地址:{{ item.address }}</span></div>
            <div class="user-info" style="display: flex;align-items: center;margin-bottom: 3px">
              用户状态:
              <el-switch
                v-model="item.enabled"
                :key="item.id"
                active-color="#13ce66"
                inactive-color="#aaaaaa"
                active-text="启用"
                inactive-text="禁用"
                style="display: inline;margin-left: 5px"
                @change="switchChange(item.enabled,item.id,index)"
              />
            </div>
            <div class="user-info">
              用户角色:
              <el-tag
                v-for="role in item.roles"
                :key="role.id"
                :disable-transitions="false"
                type="success"
                size="mini"
                style="margin-right: 5px"
              >{{ role.nameZh }}
              </el-tag>
              <el-popover
                v-loading="eploading[index]"
                :key="item.id"
                trigger="click"
                placement="right"
                title="角色列表"
                width="200"
                @hide="updateHrRoles(item.id,index)"
              >
                <el-select v-model="selRoles" multiple placeholder="请选择角色">
                  <el-option
                    v-for="ar in allRoles"
                    :key="ar.id"
                    :label="ar.nameZh"
                    :value="ar.id"/>
                </el-select>
                <el-button
                  slot="reference"
                  :disabled="moreBtnState"
                  type="text"
                  icon="el-icon-more"
                  style="color: #09c0f6;padding-top: 0px"
                  @click="loadSelRoles(item.roles,index)"
                />

              </el-popover>
            </div>
            <div><span class="user-info">备注:{{ item.remark }}</span></div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import { getSysUsers, updateSysuser, deleteSysuser, getSysRoles, updateUserrole, getUserById } from '@/api/systemapi'
export default{
  data() {
    return {
      keywords: '',
      fullloading: false,
      hrs: [],
      cardLoading: [],
      eploading: [],
      allRoles: [],
      moreBtnState: false,
      selRoles: [],
      selRolesBak: []
    }
  },
  mounted: function() {
    this.initCards()
    this.loadAllRoles()
  },
  methods: {
    searchClick() {
      this.initCards()
      this.loadAllRoles()
    },
    // 更新用户角色
    updateHrRoles(hrId, index) {
      this.moreBtnState = false
      var _this = this
      // 判断修改的与原有的
      if (this.selRolesBak.length === this.selRoles.length) {
        for (var i = 0; i < this.selRoles.length; i++) {
          for (var j = 0; j < this.selRolesBak.length; j++) {
            if (this.selRoles[i] === this.selRolesBak[j]) {
              this.selRolesBak.splice(j, 1)
              break
            }
          }
        }
        // 未做修改，不进行任何操作
        if (this.selRolesBak.length === 0) {
          return
        }
      }
      // 当前用户的加载置为true
      this.eploading.splice(index, 1, true)
      updateUserrole(
        hrId, this.selRoles
      ).then(resp => {
        console.log('jilaile')
        _this.eploading.splice(index, 1, false)
        if (resp && resp.status === 200) {
          // var data = resp.data
          // 刷新当前用户
          // if (data.msg === 'success') {
          _this.refreshHr(hrId, index)
          // }
        }
      })
    },
    // 刷新用户
    refreshHr(hrId, index) {
      var _this = this
      _this.cardLoading.splice(index, 1, true)
      getUserById(hrId).then(resp => {
        _this.cardLoading.splice(index, 1, false)
        _this.hrs.splice(index, 1, resp.data)
      })
    },
    // 加载当前用户角色
    loadSelRoles(hrRoles, index) {
      this.moreBtnState = true
      this.selRoles = []
      this.selRolesBak = []
      hrRoles.forEach(role => {
        this.selRoles.push(role.id)
        this.selRolesBak.push(role.id)
      })
    },
    // 获取所有角色
    loadAllRoles() {
      var _this = this
      getSysRoles().then(resp => {
        _this.fullloading = false
        if (resp && resp.status === 200) {
          _this.allRoles = resp.data
        }
      })
    },
    // 启用、禁用用户
    switchChange(newValue, hrId, index) {
      var _this = this
      _this.cardLoading.splice(index, 1, true)
      updateSysuser(newValue, hrId).then(resp => {
        _this.cardLoading.splice(index, 1, false)
        if (resp && resp.status === 200) {
          var data = resp.data
          if (data.status === 'error') {
            _this.refreshHr(hrId, index)
          }
        } else {
          _this.refreshHr(hrId, index)
        }
      })
    },
    // 初始化获取用户
    initCards() {
      this.fullloading = true
      var _this = this
      var searchWords
      if (this.keywords === '') {
        searchWords = 'all'
      } else {
        searchWords = this.keywords
      }
      getSysUsers(searchWords).then(resp => {
        if (resp && resp.status === 200) {
          _this.hrs = resp.data
          var length = resp.data.length
          _this.cardLoading = Array.apply(null, Array(length)).map(function(item, i) {
            return false
          })
          _this.eploading = Array.apply(null, Array(length)).map(function(item, i) {
            return false
          })
        }
      })
    },
    // 删除用户
    deleteHr(hrId) {
      var _this = this
      this.fullloading = true
      deleteSysuser(hrId).then(resp => {
        _this.fullloading = false
        if (resp && resp.status === 200) {
          var data = resp.data
          if (data.status === 'success') {
            _this.initCards()
            _this.loadAllRoles()
          }
        }
      })
    }
  }
}
</script>
<style>
  .user-info {
    font-size: 12px;
    color: #09c0f6;
  }
</style>
