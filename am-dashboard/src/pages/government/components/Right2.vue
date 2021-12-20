<!--
 * @Description: 
 * @Author: charles
 * @Date: 2021-05-05 22:02:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-19 15:03:33
-->
<template>
 <!--1. 容器 -->
  <div ref="Right2_container" style="height:95%"></div>
</template>
<script>
import { DualAxes } from '@antv/g2plot';
export default {
  mounted () {
   this.initChart();
 },
  methods:{
    initChart(){
      const data=[
        { year: '1991', value: 3, count: 10 },
        { year: '1992', value: 4, count: 4 },
        { year: '1993', value: 3.5, count: 5 },
        { year: '1994', value: 5, count: 5 },
        { year: '1995', value: 4.9, count: 4.9 },
        { year: '1996', value: 6, count: 35 },
        { year: '1997', value: 7, count: 7 },
        { year: '1998', value: 9, count: 1 },
        { year: '1999', value: 13, count: 20 },
      ]
      const dualAxes = new DualAxes(this.$refs.Right2_container, {
  data: [data, data],
  xField: 'year',
  yField: ['value', 'count'],
  xAxis: {
          label: {
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
              fontSize: 10,
            },
            
          },
        },
  geometryOptions: [
    {
      geometry: 'line',
      color: '#5B8FF9',
       label: {
            style: {
              fill: "white",
              fontFamily: "TencentSans",
              fontSize: 10,
            },
            
          },
    },
    {
      geometry: 'line',
      color: '#5AD8A6',
       label: {
            style: {
              fill: "white",
              fontFamily: "TencentSans",
              fontSize: 10,
            },
            
          },
    },
  ],
});
    dualAxes.render();
   }
  }

}
</script>