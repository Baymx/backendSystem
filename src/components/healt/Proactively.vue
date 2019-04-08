<template>
    <div class="proactively_box">
      <el-row class="graph_top">
        <el-button class="el-icon-edit-outline" type="text">新建</el-button>
        <el-button class="el-icon-delete" type="text">删除</el-button>
      </el-row>
      <!-- <div class="proactively_button">
        <el-button class="el-icon-edit-outline" type="text">新建</el-button>
        <el-button class="el-icon-delete" type="text">删除</el-button>
      </div> -->
      <div class="mybaidumap" id="allmap" style="height:556px;"></div>
    </div>
</template>
<script>
import BMap from 'BMap'
export default {
  data(){
    return{

    }
  },
  mounted(){
    this.baiduMap()
  },
  methods:{
    baiduMap() {
      //百度地图API功能
      var map = new BMap.Map('allmap');  //创建Map实例
      map.centerAndZoom(new BMap.Point(116.404, 39.915),11);//初始化地图，设置中心点坐标和地图级别
      map.addControl(new BMap.MapTypeControl());
      map.enableScrollWheelZoom(true);//开启鼠标滚轮缩放
      map.setCurrentCity('北京')
      map.enableDoubleClickZoom(true);
    }
  }
}
</script>
<style lang="scss" scoped>
.proactively_box{
  width:95%;
  margin-left:2.5%;
  position: relative;
  .graph_top{
    position: absolute;
    top: -8%;
    right: 0;
    z-index: 999;
    width: 119px;
    height: 29px;
    background: linear-gradient(-180deg, #FFFFFF 0%, #F5F5F5 95%);
    border: 1px solid #E6E6E6;
    border-radius: 4px;
    text-align: center;
    .el-button--text{
      font-size: 12px;
      line-height: 2px;
    }
  }
}

</style>
