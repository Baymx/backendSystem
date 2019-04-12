<template>
  <div class="_Consultation_Management">
    <ul class="tab-tilte">
      <li @click="cur=0" :class="{active:cur==0}">最新数据</li>
      <li @click="cur=1" :class="{active:cur==1}">图形分析</li>
      <li @click="cur=2" :class="{active:cur==2}">历史数据</li>
      <li @click="cur=3" :class="{active:cur==3}">手动输入</li>
      <div class="tab_button">
        <el-select v-model="value" placeholder="血压" style="width:160px;margin-top:-6px;">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" style="height:45px;"></el-option>
        </el-select>
      </div>
    </ul>
    <div class="tab-content">
      <newest v-show="cur==0" class="tab_ban" :value="value"></newest>
      <graph v-if="cur==1" :value="value"></graph>
      <imports v-show="cur==2" :value="value"></imports>
      <information v-show="cur==3" :value="value"></information>
    </div>
  </div>
</template>
<script>
import newest from '../fitness/newest'
import graph from '../fitness/graph'
import imports from '../fitness/imports'
import information from '../fitness/information'
export default {
  name:'',
  data(){
    return {
      cur:0,//tab切换
      accountId:'', //用户id
      options:[{
        value: '选项1',
        label: '血压'
      },{
        value: '选项2',
        label: '血糖'
      },{
        value: '选项3',
        label: '血氧'
      },{
        value: '选项4',
        label: '心电'
      }],
      value:'选项1'
    }
  },
  components:{
    newest,
    graph,
    imports,
    information
  },
  mounted(){
   
  },
  methods:{
    
  }
}
</script>
<style scoped>
._Consultation_Management{
  background: #F6F6F6;
}
.tab-tilte{
  height: 42px;
  padding: 15px 0 0 22px;
  position: relative;
}
.tab-tilte li{
  float: left;
  padding: 5px 12px;
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
.tab_button{
  float: right;
  margin-right: 2.5%;
  /* margin-left:20px;
  margin-bottom: -6px;  */
}
/* .tab-content{
  width: 100%;
} */
/* .tab-content .tab_ban{
  float: left;
  text-align: center;
} */
</style>