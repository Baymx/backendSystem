<template>
  <div class="_Consultation_Management">
    <ul class="tab-tilte">
      <li @click="cur=0" :class="{active:cur==0}">最新数据</li>
      <li @click="cur=1" :class="{active:cur==1}">图形分析</li>
      <li @click="cur=2" :class="{active:cur==2}">历史数据</li>
      <li @click="cur=3" :class="{active:cur==3}">手动输入</li>
    </ul>
    <div class="tab-content">
      <newest  v-show="cur==0" class="tab_ban"></newest>
      <graph v-show="cur==1"></graph>
      <imports  :list="tableData" v-show="cur==2"></imports>
      <information @saveData="getSaveData" v-show="cur==3"></information>
    </div>
  </div>
</template>
<script>
import newest from "../fitness/newest";
import graph from "../fitness/graph";
import imports from "../fitness/imports";
import information from "../fitness/information";
export default {
    name: "",
    data() {
        return {
            cur: 0,
            tableData: []
        };
    },
    components: {
        newest,
        graph,
        imports,
        information
    },
    methods: {
        /**
         * saveData 获取保存的数据
         * @param data
         */
        getSaveData(data) {
            console.log(data);
        },
        
    }
};
</script>
<style scoped>
._Consultation_Management {
    background: #f6f6f6;
}
.tab-tilte {
    height: 42px;
    padding: 15px 0 0 22px;
}
.tab-tilte li {
    float: left;
    padding: 5px 15px;
    text-align: center;
    background: #fff;
    cursor: pointer;
}
/* 点击对应的标题添加对应的背景颜色 */
.tab-tilte .active {
    background: #53ac99;
    border-radius: 4px;
    color: #fff;
}
/* .tab-content{
  width: 100%;
} */
/* .tab-content .tab_ban{
  float: left;
  text-align: center;
} */
</style>