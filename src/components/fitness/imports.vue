<template>
<!-- 历史数据 -->
  <div class="newest_box">
    <div class="imports_banner">
      <el-row class="graph_top">
        <div>
          <span style="margin-left:20px;">开始时间</span>
          <el-date-picker v-model="searchFields.startTime" type="datetime" 
            format="yyyy-MM-dd hh:mm" value-format="yyyy-MM-dd hh:mm" 
            default-value="2019-01-01" placeholder="日期时间" style="width:180px;">
          </el-date-picker>
          <span>结束时间</span>
          <el-date-picker v-model="searchFields.endTime" type="datetime" 
            format="yyyy-MM-dd hh:mm" value-format="yyyy-MM-dd hh:mm" 
            :default-value="Date.now()" placeholder="日期时间" style="width:180px;">
          </el-date-picker>
          <el-button type="primary" size="small" @click="srarch">查询</el-button>
        </div>
      </el-row>
      <el-table :data="dataList" border style="width: 95%;margin-left:2.5%;margin-top:10px;">
        <el-table-column prop="Sbp" label="收缩压" width="180"></el-table-column>
        <el-table-column prop="Dbp" label="舒张压" width="180"></el-table-column> 
        <el-table-column prop="HeartRate" label="心率" width="180"></el-table-column>
        <el-table-column prop="MeasuringTime" :formatter='formatter' label="检测时间" width="180"></el-table-column>
        <el-table-column prop="DbpRange" label="参考范围"></el-table-column>
      </el-table>
    </div>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 15, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalItems">
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
      tableData:[],//数据存放
      searchFields:{
        startTime:'',
        endTime:''
      },
    }
  },
  computed:{
    dataList(){
      return this.tableData.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    }
  },
  mounted(){
    // this.getImports()
    this.srarch();
  },
  methods:{
    //时间格式化
    formatter(row, column) {
      var time = row.MeasuringTime;
      var dateee = new Date(time).toJSON();
      var times = new Date(+new Date(dateee) + 16 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
      return times;
    },
    //分页
    //handleSizeChange 列表一页的数量进行改变
    handleSizeChange(val){
      this.pageSize = val;
    },
    //handleCurrentChange 列表页数进行改变
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    srarch(){
      console.log(this.searchFields.startTime,this.searchFields.endTime)
      let role = sessionStorage.getItem('role')
      if(role){
       let accountId = JSON.parse(role).AccountId
       this.accountId = accountId;
       this.$http.get(`/api/v1/health/bp/count?accountId=${this.accountId}&start=${this.searchFields.startTime || '2019-01-01'}&end=${this.searchFields.endTime || '2090-09-09'}`)
       .then(res=>{
         this.$http.get(`/api/v1/health/bp/page?page=${this.currentPage}&row=${this.pageSize}&accountId=${this.accountId}
          &start=${this.searchFields.startTime || '2019-01-01'}&end=${this.searchFields.endTime || '2090-09-09'}`)
        .then(res=>{
          this.tableData = res.data.Obj
          this.totalItems = this.tableData.length
          console.log(this.tableData)
        })
       })
      }
    },
  }
}

</script>
<style scoped>
.graph_top{
  /* float: right; */
  /* margin-top:-5%; */
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
.el-pagination{
  margin-left:2.5%;
}
</style>
