<!--
 * @Author: your name
 * @Date: 2021-12-20 15:05:48
 * @LastEditTime: 2021-12-20 16:37:52
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \group-2\am-dashboard\src\pages\government\components\Map_lz.vue
-->
<template>
    <div ref="map_container" style="height:100%;background:%fff"></div>
</template>
<script>
export default {
    data(){
        return {
            map:null
        }
    },
    mounted(){
        //初始化
        this.initMap();
        
    },
    methods:{
        initMap(){
           //初始化地图
           let container = this.$refs.map_container;
             var map = new AMap.Map(container, {
             mapStyle:'amap://styles/519bc5be170415504fe23ba1a632d085',
             zoom:30,//级别
             center: [103.834228,36.060798],//中心点坐标
             viewMode:'3D'//使用3D视图
    });
    this.map=map;
    // 行政区轮廓
      let polygons=[];
      var opts = {
          subdistrict: 0,   //获取边界不需要返回下级行政区
          extensions: 'all',  //返回行政区边界坐标组等具体信息
          level: 'district'  //查询行政级别为 市
      };
      let district = new AMap.DistrictSearch(opts);
      district.setExtensions('all');
      district.search('兰州市', function(status, result) {
          map.remove(polygons)//清除上次结果
          polygons = [];
          var bounds = result.districtList[0].boundaries;
          if (bounds) {
              for (var i = 0, l = bounds.length; i < l; i++) {
                  //生成行政区划polygon
                  var polygon = new AMap.Polygon({
                      strokeWeight: 5,
                      path: bounds[i],
                      fillOpacity: 0.4,
                      fillColor: '#80d8ff',
                      strokeColor: '#0091ea'
                  });
                  polygons.push(polygon);
              }
          }
          map.add(polygons)
          map.setFitView(polygons);//视口自适应
      });
       let marker1 = new AMap.Marker({
          position:[103.698965,36.090771],//位置
          title:'one',
          extData:{
            id:1,
            name:'one'
          }
      })
      let marker2 = new AMap.Marker({
          position:[103.692082,36.096108],//位置
          title:'two',
          extData:{
            id:2,
            name:'two'
          }
      })
      marker1.on('click',function(){
        console.log(this.getExtData());
      })
      marker2.on('click',function(){
        console.log(this.getExtData());
      })
    map.add(marker1);//添加到地图
    map.add(marker2);//添加到地图
        }
     
    }
}
</script>
