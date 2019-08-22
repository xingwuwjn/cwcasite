<template>
  <div style="margin-left: 8px;margin-top:20px">
    <div class="filter-container" style="border-bottom: solid 1px #d8d8d8;margin-bottom: 30px;padding-bottom: 30px;">
      <div>
        <el-input :placeholder="$t('table.keyword')" v-model="listQuery.keyword" style="width:900px;" @keyup.enter.native="handleFilter"/>
        <el-button type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
      </div>
      <div class="xg-filter-select__item" style="margin-top: 5px">
        <el-select v-model="listQuery.adtype" :placeholder="$t('table.adtype')" clearable style="width: 150px;height: 20px">
          <el-option v-for="item in adtype" :key="item" :label="item" :value="item"/>
        </el-select>
        <el-select v-model="listQuery.action" :placeholder="$t('table.action')" clearable style="width: 200px">
          <el-option v-for="item in actions" :key="item" :label="item" :value="item"/>
        </el-select>
        <el-button @click="show3 = !show3">Customize Ads<i class="el-icon-arrow-down el-icon--right" style="height: 14px"/>
        </el-button>
        <el-collapse-transition>
          <ul v-show="show3" id="dropdown-menu-6445" data-v-9a8212d0="" class="el-dropdown-menu el-popper xg-filter__el-dropdown-menu" style="transform-origin: center top; z-index: 2072; position: absolute; top: 89px; left: 250px;" x-placement="bottom-end" @mouseleave="leave()">
            <li data-v-9a8212d0="" tabindex="-1" class="el-dropdown-menu__item">
              <div id="xg-custom" data-v-9a8212d0="" class="el-row el-row--flex">
                <div class="el-col el-col-10">
                  Likes
                </div>
                <div class="el-col el-col-14">
                  <div class="el-row el-row--flex">
                    <div class="el-col el-col-10">
                      <div class="el-input">
                        <input v-model="listQuery.minlikes" type="number" autocomplete="off" min="0" class="el-input__inner">
                      </div>
                    </div>
                    <div class="el-col el-col-2 el-col-offset-1">
                      <div >
                        -
                      </div>
                    </div>
                    <div class="el-col el-col-10">
                      <div class="el-input">
                        <!---->
                        <input v-model="listQuery.maxlikes" type="number" autocomplete="off" min="0" class="el-input__inner">
                      </div>
                    </div>
                  </div>
                </div>
            </div></li>
            <li data-v-9a8212d0="" tabindex="-1" class="el-dropdown-menu__item">
              <div data-v-9a8212d0="" class="el-row el-row--flex">
                <div class="el-col el-col-10">
                  Shares
                </div>
                <div class="el-col el-col-14">
                  <div class="el-row el-row--flex">
                    <div class="el-col el-col-10">
                      <div class="el-input">
                        <!---->
                        <input v-model="listQuery.minshares" type="number" autocomplete="off" min="0" class="el-input__inner">
                      <!---->
                      <!---->
                      <!---->
                      </div>
                    </div>
                    <div class="el-col el-col-2 el-col-offset-1">
                      <div >
                        -
                      </div>
                    </div>
                    <div class="el-col el-col-10">
                      <div class="el-input">
                        <!---->
                        <input v-model="listQuery.maxshares" type="number" autocomplete="off" min="0" class="el-input__inner">
                      <!---->
                      <!---->
                      <!---->
                      </div>
                    </div>
                  </div>
                </div>
            </div></li>
            <li data-v-9a8212d0="" tabindex="-1" class="el-dropdown-menu__item">
              <div data-v-9a8212d0="" class="el-row el-row--flex">
                <div class="el-col el-col-10">
                  Comments
                </div>
                <div class="el-col el-col-14">
                  <div class="el-row el-row--flex">
                    <div class="el-col el-col-10">
                      <div class="el-input">
                        <!---->
                        <input v-model="listQuery.mincomments" type="number" autocomplete="off" min="0" class="el-input__inner">
                      <!---->
                      <!---->
                      <!---->
                      </div>
                    </div>
                    <div class="el-col el-col-2 el-col-offset-1">
                      <div >
                        -
                      </div>
                    </div>
                    <div class="el-col el-col-10">
                      <div class="el-input">
                        <!---->
                        <input v-model="listQuery.maxcomments" type="number" autocomplete="off" min="0" class="el-input__inner">
                      </div>
                    </div>
                  </div>
                </div>
            </div></li>
            <li data-v-9a8212d0="" tabindex="-1" class="el-dropdown-menu__item">
              <div id="" data-v-9a8212d0="" class="el-row el-row--flex">
                <div class="el-col el-col-10">
                  Views
                </div>
                <div class="el-col el-col-14">
                  <div class="el-row el-row--flex">
                    <div class="el-col el-col-10">
                      <div class="el-input">
                        <input v-model="listQuery.minviews" type="number" autocomplete="off" min="0" class="el-input__inner">
                      </div>
                    </div>
                    <div class="el-col el-col-2 el-col-offset-1">
                      <div >
                        -
                      </div>
                    </div>
                    <div class="el-col el-col-10">
                      <div class="el-input">
                        <input v-model="listQuery.maxviews" type="number" autocomplete="off" min="0" class="el-input__inner">
                      </div>
                    </div>
                  </div>
                </div>
            </div></li>
            <div x-arrow="" class="popper__arrow" style="left: 168.5px;"/>
          </ul>
        </el-collapse-transition>
        <el-date-picker
          v-model="listQuery.create_time"
          :picker-options="pickerOptions"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
          align="right"
          type="date"
          placeholder="crawl_time"/>
      </div>
    </div>
    <div>
      <el-row>
        <el-col :span="12">
          <div class="search-content__count">
            Found <span style="color: #1e6abc">{{ total }} </span> Matching Ads
          </div>
        </el-col>
        <el-col :span="11" style="text-align: right;">
          Sort By
          <el-select v-model="listQuery.sortname" :placeholder="$t('table.sortname')" clearable style="width: 200px">
            <el-option v-for="item in sortnames" :key="item" :label="item" :value="item"/>
          </el-select>
        </el-col>
      </el-row>
    </div>
    <div v-loading="listLoading" style="display: flex;justify-content: space-around;flex-wrap: wrap;text-align: left;margin-top: 30px;">
      <el-card
        v-for="item in list"
        :key="item.id"
        style="width: 250px;margin-bottom: 10px;height: 300px;font-size: 18px;"
      >
        <div slot="header" class="clearfix">
          <a :href=" item.url " >KerotinHairCare <svg-icon icon-class="facebook_blue"/></a>
          <el-button
            type="text"
            style="margin: 0px;float: right; padding: 0 0;font-size:18px;"
            icon="el-icon-star-off"/>
        </div>
        <div>
          <div style="width: 100%;display: flex;">
            <img v-if="item.firstimage.indexOf('http')==-1" :src="'http://'+item.firstimage" alt="4444" style="width: 150px;height: 120px;">
            <img v-else :src="item.firstimage" alt="4444" style="width: 150px;height: 120px;">
          </div>
          <div style="margin-top: 10px">
            <div><span class="user-info">点赞: {{ item.likes }} <span>↑</span>{{ item.incrementlikes }}%</span></div>
            <div><span class="user-info">评论: {{ item.comments }} <span>↑</span>{{ item.incrementcomments }}%</span></div>
            <div><span class="user-info">分享: {{ item.shares }} <span>↑</span>{{ item.incrementshares }}%</span></div>
            <div><span class="user-info">播放量: {{ item.views }} <span>↑</span>{{ item.incrementviews }}%</span></div>
          </div>
        </div>
      </el-card>
    </div>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>
<script>
import { fetchList } from '@/api/fbdeal'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
export default {
  name: 'ComplexTable',
  components: { Pagination },
  data() {
    return {
      show3: false,
      cardLoading: [],
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        adtype: undefined,
        keyword: undefined,
        action: undefined,
        create_time: new Date(),
        sortname: 'incrementlikes',
        minlikes: undefined,
        maxlikes: undefined,
        mincomments: undefined,
        maxcomments: undefined,
        minviews: undefined,
        maxviews: undefined,
        minshares: undefined,
        maxshares: undefined
      },
      adtype: ['Video', 'Image', 'Others'],
      actions: ['Buy Now', 'Shop Now', 'Learn More'],
      sortnames: ['incrementlikes', 'incrementcomments', 'incrementshares', 'incrementviews'],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
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
    leave() {
      this.show3 = false
      console.log('asdfasdfad')
    }
  }
}
</script>
<style>
.user-info {
  font-size: 15px;
  color: #909399;
}
.user-info span{
  color: #1e6abc;
}
</style>
