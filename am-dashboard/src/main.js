/*
 * @Author: your name
 * @Date: 2021-12-22 10:44:34
 * @LastEditTime: 2021-12-22 13:38:12
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \group-2\am-dashboard\src\main.js
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style/layout.scss'
import {createStore} from 'vuex'
const store = createStore({
    state(){
      return {
        ed:{
          engineer_id:0,
          device_id:0
        }
      }
    },
    mutations:{
      SET_ED(state,ed){
        state.ed = ed;
      }
    }
  })
  
  createApp(App).use(router).use(store).mount('#app')
