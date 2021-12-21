/*
 * @Author: your name
 * @Date: 2021-12-21 11:33:23
 * @LastEditTime: 2021-12-21 14:35:45
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \group-2\am-app\src\utils\auth.js
 */
export function setToken(token){
  localStorage.setItem("token",token);
}
export function getToken(){
  return localStorage.getItem("token")
}
export function removeToken(){
  localStorage.removeItem("token")
}