<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.username"
        placeholder="申请人"
        style="width: 100px;"
        @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.handlingType" placeholder="办理类型" clearable style="width: 120px">
        <el-option v-for="(value, key) in handlingTypes" :key="key" :label="value" :value="key"/>
      </el-select>
      <el-select v-model="listQuery.userType" placeholder="用户类型" clearable style="width: 120px">
        <el-option v-for="(value, key) in userTypes" :key="key" :label="value" :value="key"/>
      </el-select>
      <el-select v-model="listQuery.isJbr" placeholder="是否经办人" clearable style="width: 150px">
        <el-option v-for="(value, key) in isJbr" :key="key" :label="value" :value="key"/>
      </el-select>
      <el-select v-model="listQuery.isPass" placeholder="审核状态" clearable style="width: 120px">
        <el-option v-for="(value, key) in passType" :key="key" :label="value" :value="key"/>
      </el-select>
      <el-select v-model="listQuery.expressType" placeholder="邮寄类型" clearable style="width: 120px">
        <el-option v-for="(value, key) in expressType" :key="key" :label="value" :value="key"/>
      </el-select>
      <el-select v-model="listQuery.certificateType" placeholder="证书类型" clearable style="width: 120px">
        <el-option v-for="(value, key) in certificateType" :key="key" :label="value" :value="key"/>
      </el-select>
      <el-select v-model="listQuery.auditDept" placeholder="cwca审/国土审" clearable style="width: 170px">
        <el-option v-for="(value, key) in auditDeptType" :key="key" :label="value" :value="key"/>
      </el-select>
      <div style="margin-top:10px;">
        <el-select v-model="listQuery.payType" placeholder="支付状态" clearable style="width: 120px">
          <el-option v-for="(value, key) in payStatus" :key="key" :label="value" :value="key"/>
        </el-select>
        <el-date-picker
          v-model="listQuery.applyinfo_time"
          :picker-options="pickerOptions2"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
          type="daterange"
          start-placeholder="start_time"
          end-placeholder="end_time"
          range-separator="~"
        />
        <el-button v-waves type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
        <!--<el-button style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">{{ $t('table.add') }}</el-button>-->
        <div style="float: right">
          <el-button
            :loading="downloadLoading"
            type="primary"
            icon="el-icon-download"
            @click="downloadVisible = true">导出
          </el-button>
          <el-checkbox
            style="margin-left:5px;"
            @change="tableKey=tableKey+1"/>
        </div>
      </div>
    </div>

    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;overflow-x:scroll;"
      @sort-change="sortChange">
      <el-table-column label="id" prop="id" align="center" width="65">
        <template slot-scope="scope">
          <span>{{ scope.$index+1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请人" min-width="160px" align="center">
        <template slot-scope="scope">
          <span style="cursor: pointer;color: #409EFF;" @click="getApplyFileInfo(scope.row.applyId)">{{ scope.row.applyUserName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="办理类型" min-width="90px">
        <template slot-scope="scope">
          <span>{{ scope.row.handlingType | handFilter }}</span>
          <!--<el-tag>{{ scope.row.type | typeFilter }}</el-tag>-->
        </template>
      </el-table-column>
      <el-table-column label="用户" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.userType | userTypeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="证书类型" min-width="130px">
        <template slot-scope="scope">
          <span v-for="item in scope.row.certificateType" :key="item.id">{{ item | certificateFilter }},</span>
        </template>
      </el-table-column>
      <el-table-column label="是否经办人" width="110px" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.isJbr" >是</span>
          <span v-else >否</span>
        </template>
      </el-table-column>
      <el-table-column label="审核状态" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.isPass | passFilter }}</span>
        </template>
      </el-table-column>

      <el-table-column label="邮寄类型" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.type | ExpressTypeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="支付状态" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.payState | payStatusFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="cwca审/国审" width="130px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.auditDept | auditDeptFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审核人" width="70px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.adminusername }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发货状态" width="128px" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.sendExpressStatus!='未发货'"><a :href="expresshref(scope.row.sendExpressStatus)" target="_Blank" style="color: #409EFF;"> {{ scope.row.sendExpressStatus }}</a></span>
          <span v-else >{{ scope.row.sendExpressStatus }}</span>
        </template>
      </el-table-column>
      <el-table-column label="送key方式" width="128px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.send_type | sendkeyFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="送key地址" width="300px" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.send_type==1">{{ scope.row.send_address | sendAddressFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="送key快递公司" width="128px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.express_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="送key快递单号" width="128px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.express_num }}</span>
        </template>
      </el-table-column>
      <el-table-column label="领取地址" width="300px" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.type==1">{{ scope.row.qzAddress | sendAddressFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="领取状态" width="128px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.self_fetch | selfFetchFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="领取时间" width="128px" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.self_fetch">{{ scope.row.update_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="领取人姓名" width="128px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.qzrName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="领取人电话" width="128px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.qzrPhone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="领取人身份证号" width="160px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.qzrIdCard }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="110px" align="center" sortable prop="create_time">
        <template slot-scope="scope">
          <span>{{ scope.row.create_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="left" min-width="320px" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="deletetmp(scope.row.applyId)">删除</el-button>
          <el-button v-if="scope.row.isPass==4 && scope.row.type==0 && scope.row.payState==0" size="mini" type="danger" @click="printexpress(scope.row.applyId)">打印</el-button>
          <el-button v-if="scope.row.isPass==4 && scope.row.type==1 && !scope.row.self_fetch && scope.row.payState==0" size="mini" type="primary" @click="lingqu(scope.row)">领取</el-button>
          <el-button v-if="scope.row.isPass==4 && scope.row.type==1 && scope.row.self_fetch" size="mini" type="info" style="width: 70px">已领取</el-button>
          <el-button v-if="scope.row.isPass==4 && scope.row.payState==0" size="mini" type="primary" style="width: 90px" @click="getInvoice(scope.row.applyId)">查询发票</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"/>

    <el-dialog
      :visible.sync="centerDialogVisible"
      title="提示"
      width="30%"
      center>
      <span>确认需要打印吗？只能在部署了打印机的机器上打印，以免重复下单！</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="confirmmethod(false)">取 消</el-button>
        <el-button type="primary" @click="confirmmethod(true)">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      :visible.sync="ziquDialog"
      title="提示"
      width="30%"
      center>
      <span>确认已经自取吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="ziquconfirmmethod(false)">取 消</el-button>
        <el-button type="primary" @click="ziquconfirmmethod(true)">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      :visible.sync="payDialog"
      title="提示"
      width="30%"
      center>
      <span>确认将支付状态修改为成功吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="payconfirmmethod(false)">取 消</el-button>
        <el-button type="primary" @click="payconfirmmethod(true)">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="downloadVisible"
      title="选择申请日期（只导出支付成功的！）"
      width="30%">
      <el-date-picker
        v-model="downloadquery.applyinfo_time"
        :picker-options="pickerOptions2"
        value-format="yyyy-MM-dd"
        format="yyyy-MM-dd"
        type="daterange"
        start-placeholder="start_time"
        end-placeholder="end_time"
        range-separator="~"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="downloadVisible = false">取 消</el-button>
        <el-button type="primary" @click="downloadzhengshu()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="deleteVisible"
      title="请输入删除原因！"
      width="30%">
      <el-input v-model="deletequery.delete_comment"/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteApplyInfomethod()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, printexpress, updateApplyInfo, changepaystatus, downloadzehngshu, getInvoices, deleteApplyInfo } from '@/api/examination'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { printMD, jsonProperty } from '@/utils/printUtils'
import { Message } from 'element-ui'
// const calendarTypeOptions = [
//   { key: 1, display_name: 'Story' },
//   { key: 2, display_name: 'Science' }
// ]
const calendarTypeOptions = { 1: 'Story', 2: 'Science' }
const handlingTypes = {
  0: '首次申请',
  1: '变更',
  2: '更新',
  3: '丢失补办',
  4: '丢失补办更新'
}
const userTypes = {
  0: '自然人',
  1: '事业单位',
  2: '企业',
  3: '其他'
}

const expressType = {
  1: '自取',
  0: '邮寄'
}

const passType = {
  2: '待审核',
  3: '未通过',
  4: '通过'
}

const certificateType = {
  0: '建设用地',
  1: '采矿权',
  2: '探矿权'
}

const isJbr = {
  true: '是',
  false: '否'
}

const payStatus = {
  '0': '支付成功',
  '-1': '等待支付'
}
const auditDeptType = {
  0: 'cwca审核',
  1: '国土审核'
}
// const statusOptions = [
//   { key: 1, display_name: 'deleted' },
//   { key: 0, display_name: 'published' }
// ]

// arr to obj ,such as { CN : "China", US : "USA" }
// const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
//   acc[cur.key] = cur.display_name
//   return acc
// }, {})

export default {
  name: 'ApplyInfo',
  components: { Pagination },
  directives: { waves },
  filters: {
    userTypeFilter(status) {
      const statusMap = {
        0: '自然人',
        1: '事业单位',
        2: '企业',
        3: '其他'
      }
      return statusMap[status]
    },
    payStatusFilter(status) {
      const statusMap = {
        '0': '支付成功',
        '-1': '等待支付'
      }
      return statusMap[status]
    },
    ExpressTypeFilter(status) {
      const statusMap = {
        1: '自取',
        0: '邮寄'
      }
      return statusMap[status]
    },
    passFilter(status) {
      const statusMap = {
        2: '待审核',
        3: '未通过',
        4: '通过'
      }
      return statusMap[status]
    },
    handFilter(status) {
      const statusMap = {
        0: '首次申请',
        1: '变更',
        2: '更新',
        3: '丢失补办',
        4: '丢失补办更新'
      }
      return statusMap[status]
    },
    certificateFilter(status) {
      const statusMap = {
        0: '建设用地',
        1: '采矿权',
        2: '探矿权'
      }
      return statusMap[status]
    },
    selfFetchFilter(status) {
      const statusMap = {
        true: '已领取',
        false: '未领取'
      }
      return statusMap[status]
    },
    sendkeyFilter(status) {
      const statusMap = {
        0: '邮寄',
        1: '自送'
      }
      return statusMap[status]
    },
    sendAddressFilter(status) {
      const statusMap = {
        '0': '宁夏银川市金凤区新昌西路65号易大紫荆花商务中心A座7层702室',
        '1': '宁夏银川市北京中路49号瑞银B座宁夏公共资源交易服务中心四楼大厅',
        '2': '吴忠市利通区李园二期南门口航天信息门店（政务大厅红绿灯向东150米）',
        '3': '中卫市沙坡头区应理南街315号航天信息门店（原地税局东侧2号营业房）',
        '4': '固原市经济开发区8小对面王洼煤业小区4号楼1单元2楼右201室',
        '5': '石嘴山市政务服务中心一楼商务区D号窗口'
      }
      return statusMap[status]
    },
    auditDeptFilter(status) {
      const statusMap = {
        0: 'cwca审核',
        1: '国土审核'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      downloaddata: null,
      total: 0,
      listLoading: true,
      centerDialogVisible: false,
      ziquDialog: false,
      payDialog: false,
      downloadVisible: false,
      deleteVisible: false,
      printquery: {
        applyId: undefined
      },
      deletequery: {
        applyId: undefined,
        delete_comment: undefined
      },
      downloadquery: {
        applyinfo_time: undefined
      },
      listQuery: {
        page: 1,
        limit: 20,
        handlingType: undefined,
        certificateType: undefined,
        isJbr: undefined,
        isPass: undefined,
        auditDept: undefined,
        applyinfo_time: undefined,
        userType: undefined,
        expressType: undefined,
        payType: undefined,
        username: undefined
      },
      handlingTypes,
      calendarTypeOptions,
      expressType,
      userTypes,
      passType,
      certificateType,
      isJbr,
      payStatus,
      auditDeptType,
      showReviewer: false,
      downloadLoading: false,
      downloadzhengshuLoading: false,
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }

    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 获取所有数据
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data
        this.total = response.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    sortChange(data) {
      const { prop, order } = data
      if (order === 'ascending') {
        this.listQuery.orderName = prop
        this.listQuery.isAsc = true
      } else {
        this.listQuery.orderName = prop
        this.listQuery.isAsc = false
      }
      this.handleFilter()
    },
    // 导出证书数据
    downloadzhengshu() {
      this.downloadzhengshuLoading = true
      downloadzehngshu(this.downloadquery).then(response => {
        if (response.status === 200) {
          this.downloaddata = response.data
          import('@/vendor/Export2Excel').then(excel => {
            const tHeader = ['单位名称', '组织机构代码', '法定代表人', '注册联系地址', '有效期', '颁发单位:', '登记号', '权限', 'CN', '金额', '业务类型', '证书主题项']
            const filterVal = ['username', 'zjbh', 'frmc', 'dz', 'outime', 'issue_unit', 'dengjihao', 'zczj', 'cn', 'price', 'handlingType', 'sum']
            const data = this.formatJson(filterVal, this.downloaddata)
            excel.export_json_to_excel({
              header: tHeader,
              data: data,
              filename: this.downloadquery.applyinfo_time
            })
            this.downloadzhengshuLoading = false
            this.downloadVisible = false
          })
        } else {
          Message({
            message: response.msg,
            type: 'error',
            duration: 5 * 1000
          })
        }
      })
    },
    // 跳转到文件审核页面
    getApplyFileInfo(applyId) {
      this.$router.push({
        path: '/exam/applyinfofile',
        query: {
          applyId: applyId
        }
      })
    },

    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'handlingType') {
          return handlingTypes[v[j]]
        } else {
          return v[j]
        }
      }))
    },

    printexpress(applyId) {
      this.printquery.applyId = applyId
      this.centerDialogVisible = true
    },
    confirmmethod(confirmtype) {
      this.centerDialogVisible = false
      if (confirmtype) {
        printexpress(this.printquery).then(response => {
          if (response.status === 200) {
            const data = response.data
            var jn = JSON.parse(data)
            if (jn.retCode === 0) {
              if (jn.data.retCode === '0') {
                Message({
                  message: jn.data.errMsg,
                  type: 'error',
                  duration: 5 * 1000
                })
                // alert()
              } else {
                var dto = JSON.parse(jn.data.dto)
                console.log(dto)
                delete dto.QRCode
                jsonProperty(dto)
                console.log(dto)
                printMD(jn.data.url, dto)
              }
            } else {
              Message({
                message: '请求失败',
                type: 'error',
                duration: 5 * 1000
              })
            }
          }
        })
      }
    },
    ziquconfirmmethod(confirmtype) {
      this.ziquDialog = false
      if (confirmtype) {
        updateApplyInfo(this.printquery).then(response => {
          if (response.status === 200) {
            Message({
              message: '领取成功！',
              type: 'success',
              duration: 5 * 1000
            })
            this.getList()
          } else {
            Message({
              message: '操作失败！',
              type: 'error',
              duration: 5 * 1000
            })
            this.getList()
          }
        })
      }
    },
    payconfirmmethod(confirmtype) {
      this.ziquDialog = false
      if (confirmtype) {
        changepaystatus(this.printquery).then(response => {
          if (response.status === 200) {
            Message({
              message: '领取成功！',
              type: 'success',
              duration: 5 * 1000
            })
            this.getList()
          } else {
            Message({
              message: '操作失败！',
              type: 'error',
              duration: 5 * 1000
            })
            this.getList()
          }
        })
      }
    },
    // changepay(applyId) {
    //   this.printquery.applyId = applyId
    //   this.payDialog = true
    // },
    lingqu(row) {
      this.printquery.applyId = row.applyId
      this.ziquDialog = true
    },
    expresshref(expressnum) {
      return 'http://www.sf-express.com/cn/sc/dynamic_function/waybill/#search/bill-number/' + expressnum
    },
    getInvoice(applyId) {
      this.printquery.applyId = applyId
      getInvoices(this.printquery).then(response => {
        if (response.status === 200) {
          const url = response.data
          window.open(url)
        }
      })
    },
    deletetmp(applyId) {
      this.deletequery.applyId = applyId
      this.deleteVisible = true
    },
    deleteApplyInfomethod() {
      deleteApplyInfo(this.deletequery).then(response => {
        if (response.status === 200) {
          Message({
            message: '删除成功！',
            type: 'success',
            duration: 5 * 1000
          })
          this.deleteVisible = false
          this.getList()
        } else {
          Message({
            message: '操作失败！',
            type: 'error',
            duration: 5 * 1000
          })
          this.getList()
        }
      })
    }
  }
}
</script>
