<template>
<!-- 最新数据 -->
  <div class="newest_box" style="width: 95%;margin-left:2.5%;">
    <el-table :data="tableList" border style="width:100%;">
      <el-table-column prop="BpSbp" label="收缩压"  v-if="value === '选项1'"></el-table-column>
      <el-table-column prop="BpDbp" label="舒张压"  v-if="value === '选项1'"></el-table-column>
      <el-table-column prop="BpHeartRate" label="心率"  v-if="value === '选项1'"></el-table-column>
      <el-table-column prop="BpMeasuringTime" label="测量时间" v-if="value === '选项1'"></el-table-column>

      <el-table-column prop="Bgc" label="血糖"  v-if="value === '选项2'"></el-table-column>
      <el-table-column prop="BgTimeFrame" label="时段" v-if="value === '选项2'"></el-table-column>
      <el-table-column prop="BgMeasuringTime" label="测量时间" v-if="value === '选项2'"></el-table-column>

      <el-table-column prop="BoSpo" label="血氧浓度" v-if="value === '选项3'"></el-table-column>
      <el-table-column prop="BoHeartRate" label="心率" v-if="value === '选项3'"></el-table-column>
      <el-table-column prop="BoMeasuringTime" label="测试时间" v-if="value === '选项3'"></el-table-column>

      <el-table-column prop="" label="呼吸" v-if="value === '选项4'"></el-table-column>
      <el-table-column prop="" label="心率" v-if="value === '选项4'"></el-table-column>
      <el-table-column prop="" label="测量时间" v-if="value === '选项4'"></el-table-column>
      
      <!-- <el-table-column prop="Dbp" label="舒张压" ></el-table-column>
      <el-table-column prop="HeartRate" label="心率" ></el-table-column>
      <el-table-column prop="result" label="检测结果" ></el-table-column>
      <el-table-column prop="analyze" label="健康分析" ></el-table-column>
      <el-table-column prop="MeasuringTime" label="检测时间" ></el-table-column>
      <el-table-column prop="SbpRange" label="参考范围"></el-table-column> -->
    </el-table>
    <p>声明：本报告仅供临床参考</p>
  </div>
 
</template>
<script>
export default {
  props: ['value'],
  data() {
    return {
      tableList:[],
      accountId:''//用户id
    }
  },
  watch: {
    value(newVal) {
      console.log(newVal)
    }
  },
  computed:{
    dataList(){
      var list = this.tableList;
      return list
    }
  },
  mounted(){
    this.getNewest()
  },
  methods:{
    getNewest(){
      let role = sessionStorage.getItem('role')
      if(role){
       let accountId = JSON.parse(role).AccountId
       this.accountId = accountId;
       this.$http.get(`/api/v1/physdata/newest?accountId=${this.accountId}`).then(res=>{
        let obj = res.data.Obj;
        this.tableList.push({
          //血糖
          Bgc: obj.Bg.Bgc,
          BgTimeFrame: obj.Bg.TimeFrame,
          BgMeasuringTime: obj.Bg.MeasuringTime,
          //血压
          BpSbp:obj.Bp.Sbp,
          BpDbp: obj.Bp.Dbp,
          BpHeartRate: obj.Bp.HeartRate,
          BpMeasuringTime: obj.Bp.MeasuringTime,
          //血氧
          BoSpo:obj.Bo.Spo,
          BoHeartRate: obj.Bo.HeartRate,
          BoMeasuringTime: obj.Bo.MeasuringTime,
          //心率
          // HrValue:obj.Hr.Value,
          // hrMeasuringTime:obj.Hr.MeasuringTime
        });
        console.log(this.tableList)
       })
      }
    }
  }
}
</script>
<style scoped>
.newest_box p {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #999999;
  letter-spacing: 0.62px;
  padding:16px 40px;
}
</style>
