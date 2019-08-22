<template>
  <div style="margin-top: 10px;margin-left:15px;">
    <el-tabs v-model="defaultTab" type="card">
      <el-tab-pane label="权限组" name="menuRole">
        <menu-role/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import MenuRole from './basic/MenuRole.vue'

export default {
  components: {
    'menu-role': MenuRole
  },
  data() {
    return {
      defaultTab: 'menuRole'
    }
  },
  methods: {}
}
</script>
