<template>
  <div class="app-container">
    <div>
      <el-card
        v-for="item in list"
        :key="item.id"
        class="box-card">
        <div slot="header">
          {{ item.dictName }}
        </div>
        <div class="box-item">
          <img :src= "item.fileUrl" style="width: 100%; min-height:500px">
          <el-input
            :rows="2"
            v-model="item.note"
            type="textarea"
            placeholder="审批不通过的理由/原因"/>
          <el-switch
            v-model="item.isPass"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="通过"
            inactive-text="未通过"
          />
        </div>
      </el-card>
    </div>
    <div style="clear: both; padding: 40px;width: 100%">
      <el-row>
        <el-col :span="12"><el-button type="primary" style="width: 90%" @click="firstshenhe">移交国土审核</el-button></el-col>
        <el-col :span="12"><el-button type="primary" style="width: 90%" @click="endshenhe">提交审核数据</el-button></el-col>
      </el-row>
    </div>

    <el-dialog
      :visible.sync="zsDialog"
      title="提示"
      width="30%"
      center>
      <span>确认审核通过吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="confirmmethod(false)">取 消</el-button>
        <el-button type="primary" @click="confirmmethod(true)">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="firstDialog"
      title="提示"
      width="30%"
      center>
      <span>确认移交国土审核吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="gtconfirmmethod(false)">取 消</el-button>
        <el-button type="primary" @click="gtconfirmmethod(true)">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
import { fileinfo, firstexam, endexam } from '@/api/examination'
export default {
  name: 'Applyinfofile',
  data() {
    return {
      zsDialog: false,
      firstDialog: false,
      list: undefined,
      listQuery: {
        applyId: null,
        list: null
      },
      value: true
    }
  },
  created() {
    this.getParams()
    this.getFileData()
  },
  methods: {
    getParams() {
      const applyId = this.$route.query.applyId
      this.listQuery.applyId = applyId
    },
    // 获取所有数据
    getFileData() {
      fileinfo(this.listQuery).then(response => {
        this.list = response.data.files
        this.listQuery.applyId = response.data.applyId
      })
    },
    // 初审数据
    firstshenhe() {
      this.firstDialog = true
      this.listQuery.list = this.list
      // firstexam(this.listQuery).then(response => {
      //   const status = response.status
      //   const msg = response.msg
      //   if (status === 200) {
      //     this.$notify({
      //       title: '成功',
      //       message: msg,
      //       type: 'success',
      //       duration: 2000
      //     })
      //   }
      // })
    },
    // 终审数据
    endshenhe() {
      this.zsDialog = true
      this.listQuery.list = this.list
      // endexam(this.listQuery).then(response => {
      //   const status = response.status
      //   const msg = response.msg
      //   if (status === 200) {
      //     this.$notify({
      //       title: '成功',
      //       message: msg,
      //       type: 'success',
      //       duration: 2000
      //     })
      //   }
      // })
    },

    confirmmethod(confirmtype) {
      this.zsDialog = false
      if (confirmtype) {
        endexam(this.listQuery).then(response => {
          const status = response.status
          const msg = response.msg
          if (status === 200) {
            this.$notify({
              title: '成功',
              message: msg,
              type: 'success',
              duration: 2000
            })
          }
        })
      }
    },
    gtconfirmmethod(confirmtype) {
      this.firstDialog = false
      if (confirmtype) {
        firstexam(this.listQuery).then(response => {
          const status = response.status
          const msg = response.msg
          if (status === 200) {
            this.$notify({
              title: '成功',
              message: msg,
              type: 'success',
              duration: 2000
            })
          }
        })
      }
    }
  }
}
</script>

<style scoped>
  .field-label{
    vertical-align: middle;
  }
  .box-card {
    width: 50%;
    max-width: 100%;
    min-height:700px;
    float:left;
  }

  .block {
    padding: 30px 24px;
  }

  .tag-item {
    margin-right: 15px;
  }
</style>
