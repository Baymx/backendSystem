<template>
<!-- 历史数据 -->
  <div class="newest_box">
    <el-row class="graph_top">
      <!-- <div>
        <span>开始时间</span>
        <el-date-picker v-model="searchFields.startTime" type="datetime" format="yyyy-MM-dd hh:mm" value-format="yyyy-MM-dd hh:mm" placeholder="日期时间" style="width:180px;">
        </el-date-picker>
        <span>结束时间</span>
        <el-date-picker v-model="searchFields.endTime" type="datetime" format="yyyy-MM-dd hh:mm" value-format="yyyy-MM-dd hh:mm" placeholder="日期时间" style="width:180px;">
        </el-date-picker>
        <el-button type="primary" size="mini" @click="srarch">查询</el-button>
      </div> -->
    </el-row>
    <el-table :data="historyData" border style="width: 95%;margin-left:2.5%;margin-top:10px;">
      <!-- <el-table-column label="收缩压">
      </el-table-column>
      <el-table-column label="舒张压"></el-table-column>
      <el-table-column label="心率"></el-table-column> -->
      <el-table-column prop="Sbp" label="检测结果" width="180"></el-table-column>
      <el-table-column prop="analyze" label="健康分析" width="180"></el-table-column>
      <el-table-column prop="MeasuringTime" label="检测时间" width="180"></el-table-column>
      <el-table-column prop="SbpRange" label="参考范围"></el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total='totalItems'>
    </el-pagination>
    <p>声明：本报告仅供临床参考</p>
  </div>
 
</template>
<script>
export default {
  data() {
    return {
      totalItems: 0, //列表条数
      currentPage: 1, //初始页
      pageSize: 5, //页数大小
      accountId:'',//用户id
      historyData:[],
      options:[{
        value: '选项1',
        label: '黄金糕'
      },{
        value: '选项2',
        label: '双皮奶'
      },{
        value: '选项3',
        label: '龙须面'
      }],
      value:'',
      // searchFields:{
      //   startTime:'',
      //   endTime:''
      // },
      // tableData: [{
      //   project: '收缩压',
      //   result: '112',
      //   analyze: '正常',
      //   date: '2019-08-29 18.02',
      //   range: '99-139mmHg'
      // },{
      //   project: '血糖',
      //   result: '54',
      //   analyze: '偏低',
      //   date: '2019-08-29 18.02',
      //   range: '99-139mmHg'
      // }]
    }
  },
  
  mounted(){
    this.getImports()
  },
  methods:{
   
    //分页
    //handleSizeChange 列表一页的数量进行改变
    handleSizeChange(val){
      this.pageSize = val;
    },
    //handleCurrentChange 列表页数进行改变
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    getImports(){
      let role = sessionStorage.getItem('role')
      if(role){
       let accountId = JSON.parse(role).AccountId
       this.accountId = accountId;
       this.$http.get(`/api/v1/physdata/newest?accountId=${this.accountId}`).then(res=>{
         this.historyDate = res.data.Obj.Bp;
         console.log(this.historyDate)
       })
      }
    }
  }
}

</script>
<style scoped>
.graph_top{
  float: right;
  margin-top:-4.5%;
  margin-right: 2.5%;
  position: relative;
}
.newest_box p {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #999999;
  letter-spacing: 0.62px;
  padding:16px 40px;
}
</style>
