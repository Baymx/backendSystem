<template>
  <div class="healt_box">
    <ul class="tab_title">
      <li @click="cur=0" :class="{active:cur==0}">求救定位</li>
      <li @click="cur=1" :class="{active:cur==1}">活动范围</li>
      <li @click="cur=2" :class="{active:cur==2}">主动寻址</li>
      <li @click="cur=3" :class="{active:cur==3}">电子围栏</li>
    </ul>
    <div class="tab_content">
      <locating v-show="cur==0"></locating>
      <activity v-show="cur==1"></activity>
      <electronic v-show="cur==2"></electronic>
      <proactive v-show="cur==3"></proactive>
    </div>
  </div>
</template>
<script>
import locating from '../healt/locating.vue'
import activity from '../healt/activity.vue'
import electronic from '../healt/electronic.vue'
import proactive from '../healt/Proactively.vue'
export default {
  data(){
    return{
      cur:0
    }
  },
  components:{
    locating,
    activity,
    electronic,
    proactive
  }
}
</script>
<style lang="scss" scoped>
.healt_box{
  background: #f6f6f6;
  padding-bottom: 10px;
  .tab_title{
    height: 42px;
    padding:15px 0 0 22px;
    li{
      float: left;
      padding: 5px 15px;
      text-align: center;
      background: #fff;
      cursor: pointer;
    }
    .active{
      background: #53AC99;
      border-radius: 4px;
      color: #fff;
    }
  }
}
</style>

