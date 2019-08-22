import { putRequest, postRequest } from '@/utils/request'
import request from '@/utils/request'
// 依据关键词获取所有用户
export function getSysUsers(searchWords) {
  return request({
    url: '/sys/users/' + searchWords,
    method: 'get',
    params: { searchWords }
  })
}
// 添加用户
export function addSysuser(username, password) {
  return request({
    url: '/sys/users/reg',
    method: 'post',
    params: { username, password }
  })
}

// 依据用户id获取用户
export function getUserById(hrId) {
  return request({
    url: '/sys/users/id/' + hrId,
    method: 'get'
  })
}

// 删除用户
export function deleteSysuser(userid) {
  return request({
    url: '/sys/users/' + userid,
    method: 'delete'
  })
}

// 更新用户(启用、禁用)
export function updateSysuser(newValue, hrId) {
  return request({
    url: '/sys/users/updateuser/',
    method: 'put',
    data: { enabled: newValue, id: hrId }
  })
}

// 依据用户id更新角色id
export function updateUserrole(hrId, rids) {
  return putRequest('/sys/users/updateuserrole/', { hrId: hrId, rids: rids })
}
// 获取所有角色
export function getSysRoles() {
  return request({
    url: '/sys/basic/roles',
    method: 'get'
  })
}
// 添加角色
export function addSysrole(role, roleZh) {
  return postRequest('/sys/basic/addrole', { role: role, roleZh: roleZh })
}

// 删除角色
export function deleterole(roleid) {
  return request({
    url: '/sys/basic/role/' + roleid,
    method: 'delete'
  })
}

// 更新角色菜单
export function updateRoleMenu(rid, mids) {
  return putRequest('/sys/basic/updateMenuRole', { rid: rid, mids: mids })
}

// 依据角色获取菜单
export function getmenubyrole(roleid) {
  return request({
    url: '/sys/basic/menuTree/' + roleid,
    method: 'get'
  })
}
// 依据用户获取菜单
export function getSysMenus() {
  return request({
    url: '/sysmenu/',
    method: 'get'
  })
}
