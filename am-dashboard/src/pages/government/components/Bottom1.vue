<!--
 * @Author: your name
 * @Date: 2021-12-22 10:44:34
 * @LastEditTime: 2021-12-22 13:40:56
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \group-2\am-dashboard\src\pages\government\components\Bottom1.vue
-->
<template>
  <!--1. 容器 -->
  <div ref="Bottom1_container" style="height: 95%"></div>
</template>
<script>
// 2. 导入图表构造函数
import { Line } from '@antv/g2plot';
import {mapState} from 'vuex'
import { get } from '../../../utils/request';
import moment from 'moment'
export default {
  data(){
    return {
      monitorData:[],
      chart:null
    }
  },
  mounted() {
    // 4. 在页面渲染完成后调用图表的渲染
    this.initChart();
  },
  computed: {
    ...mapState(['ed'])
  },
  watch: {
    ed:{
      async handler(params){
        // 重新加载数据
        await this.loadMonitorData();
        this.changeData();
      },
      deep:true
    }
  },
  methods:{
    changeData(){
      if(this.chart){
        this.chart.changeData(this.monitorData)
      }
    },
    async loadMonitorData(){
      let url = "/dashboard/pageQueryTodayData"
      let params = {
        page:1,
        pageSize:20,
        ...this.ed
      }
      let resp =await get(url,params);
      let data = resp.data.list.map(item => {
        return {
          time:moment(item.insert_time).format('h:mm:ss'),
          value:+item.temperature
        }
      })
      this.monitorData = data;
    },
    // 3. 初始化图表
    initChart(){
      const data = this.monitorData;
      const line = new Line(this.$refs.Bottom1_container, {
        data,
        xField: 'time',
        yField: 'value',
        color:'l(90) 0:#D1D1FF 1:#7C82EA',
        xAxis: {
          label: {
            rotate: -45,
            offset: 10,
            style: {
              fill: "white",
              fontFamily: "TencentSans",
              fontSize: 16,
            },
          },
        },
        yAxis: {
          label: {
            style: {
              fill: "white",
              fontFamily: "TencentSans",
              fontSize: 16,
            }
          }
        }
      });
      line.render();
      this.chart = line;
    }
  }
}
</script>