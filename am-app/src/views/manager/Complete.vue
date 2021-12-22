<!--
 * @Author: your name
 * @Date: 2021-12-21 11:35:05
 * @LastEditTime: 2021-12-22 15:18:53
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \group-2\am-app\src\views\manager\Complete.vue
-->
<template>
  <div class="workorder">
    <van-nav-bar title="完成工单" />
    <!-- 图片上传 -->
    <div style="margin-bottom:2em">
      <van-uploader 
      multiple 
      :fileList="imgList"
      :max-count="3" 
      result-type="file"
      :after-read="afterRead" />
    </div>

    <van-button color="#1659a0" type="primary" block   @click="submitHandler">提交工单</van-button>
  </div>
</template>
<script>
import {get} from '../../http/axios'
import axios from 'axios'
import {Toast} from 'vant'

export default {
  data(){
    return {
      order:{},
      imgList:[]
    }
  },
  methods: {
    submitHandler(){
      let imgList = this.imgList;
      if(imgList.length < 3 ){
        Toast.fail('必须提交3张图片!')
        return false;
      }
      let url = "/workorder/finishOrder"
      let params = {
        id:this.order.id,
        photo1:imgList[0].url,
        photo2:imgList[1].url,
        photo3:imgList[2].url,
        finish_time:new Date().getTime()
      }
      get(url,params).then(resp => {
        Toast.success(resp.message);
        this.$router.go(-1)
      })
    },
    // 上传图片
    afterRead(file){
      console.log(file);
      file.status = "uploading";
      file.message = "上传中...";
      file.color="green";
      // 将文件上传至服务器测试
      let url = "http://121.199.29.84:8001/file/upload";
      let params = new FormData();
      params.append("file", file.file);
      axios.post(url, params, {
        headers: { "Content-Type": "multipart/form-data" }
      })
      .then(response => {
        file.status = "success";
        let url = 'http://121.199.29.84:8888/group1/'+response.data.data.id;
        this.imgList.push({url});
      })
      .catch(error => {
        file.status = "failed";
        file.message = "上传失败!";
        file.color="red";
        Toast("图片上传失败!:" + error + " 请返回重新上传!");
      });
    }
  },
  mounted() {
    this.order = this.$route.query;
  },
}
</script>
<style scoped>
.workorder {
  font-size: 14px;
  color: #666;
  padding-bottom: 50px;
  background-color: #f4f4f4
}


</style>
<style >
.van-uploader__wrapper {
  width:100%
}

.van-uploader__wrapper > div {
  flex:1
}

.van-uploader__wrapper > div .van-uploader__preview-image {
  width:100%
}
</style>