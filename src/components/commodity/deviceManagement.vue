<template>
  <div class="_device_management">
    <ul class="tab-tilte">
      <li @click="cur=0" :class="{active:cur==0}">基本信息</li>
      <li @click="cur=1" :class="{active:cur==1}">生理情况</li>
      <li @click="cur=2" :class="{active:cur==2}">疾病史</li>
      <li @click="cur=3" :class="{active:cur==3}">手术史</li>
      <li @click="cur=4" :class="{active:cur==4}">家族史</li>
      <li @click="cur=5" :class="{active:cur==5}">生活坏境</li>
      <div class="device_button">
        <button class="el-icon-edit">编辑</button>
      </div>
    </ul>
    <div class="tab-content">
      <basic v-show="cur==0">1</basic>
      <physiology v-show="cur==1">2</physiology>
      <illness v-show="cur==2"></illness>
      <operation v-show="cur==3"></operation>
      <family v-show="cur==4"></family>
      <life v-show="cur==5">6</life>
    </div>
  </div>
</template>
<script>
import basic from '../record/basic.vue'
import physiology from '../record/physiology.vue'
import illness from '../record/illness.vue'
import operation from '../record/operation.vue'
import family from '../record/family.vue'
import life from '../record/life.vue'
export default {
  data(){
    return {
      cur:0
    }
  },
  components:{
    basic,
    physiology,
    illness,
    operation,
    family,
    life
  }
}
</script>
<style scoped>
._device_management{
  background: #F6F6F6;
  padding-bottom: 10px;
}
.tab-tilte{
  height: 42px;
  padding: 15px 0 0 22px;
}
.tab-tilte li{
  float: left;
  padding: 5px 15px;
  text-align: center;
  background: #fff;
  cursor: pointer;
}
/* 点击对应的标题添加对应的背景颜色 */
.tab-tilte .active{
  background: #53AC99;
  border-radius: 4px;
  color: #fff;
}
.device_button{
  float:right;
  margin-right: 2.5%;
}
.device_button button{
  background: linear-gradient(-180deg, #FFFFFF 0%, #F5F5F5 95%);
  border: 1px solid #E6E6E6;
  border-radius: 4px;
  outline: 0;
  border: 0;
  padding: 10px 25px;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #3685D7;
  letter-spacing: 0.55px;
}
</style>

