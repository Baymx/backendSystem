<template>
  <div class="newest_box">
    <el-row class="graph_top">
      <!-- <el-select placeholder="血压" style="width:140px;">
        <el-option style="height:45px;"></el-option>
      </el-select> -->
    </el-row>
    <el-table :data="historyList" border style="width: 95%;margin-left:2.5%;">
      <el-table-column prop="project" label="检测项目" width="180"></el-table-column>
      <el-table-column prop="Sbp" label="检测结果" width="180"></el-table-column>
      <el-table-column prop="analyze" label="健康分析" width="180"></el-table-column>
      <el-table-column prop="MeasuringTime" label="检测时间" width="180"></el-table-column>
      <el-table-column prop="range" label="参考范围"></el-table-column>
    </el-table>
    <p>声明：本报告仅供临床参考</p>
  </div>

</template>
<script>
// import EventBus from '../../eventBus'
export default {
    data() {
        return {
          historyList:[],
            history: [
                {
                    Sbp: "", //收缩压
                    Dbp: "", //舒张压
                    HeartRate: "", //心率
                    MeasuringTime: "", //测量时间
                    AccountId: "" //用户id
                }
            ]
            // tableData: [{
            //   project: '收缩压',
            //   result: '112',
            //   analyze: '正常',
            //   date: '2019-08-29 18.02',
            //   range: '99-139mmHg'

            // }, {
            //   project: '舒张压',
            //   result: '234',
            //   analyze: '正常',
            //   date: '2019-08-29 18.02',
            //   range: '99-139mmHg'
            // }, {
            //   project: '心率',
            //   result: '543',
            //   analyze: '偏高',
            //   date: '2019-08-29 18.02',
            //   range: '99-139mmHg'
            // }, {
            //   project: '血糖',
            //   result: '54',
            //   analyze: '偏低',
            //   date: '2019-08-29 18.02',
            //   range: '99-139mmHg'
            // }]
        };
    },
    props: { list: Array },
    mounted() {
       let role = sessionStorage.getItem("role");
            if (role) {
              let accountId = JSON.parse(role).AccountId;
              this.accountId = accountId;
              this.getHistiryData();
            }
    },
    methods :{
      /**
         * saveData 获取保存的数据
         * @param data
         */
        getHistiryData() {
            let role = sessionStorage.getItem("role");
            if (role) {
                
                this.$http
                    .get(`/api/v1/health/bp/page?page=1&row=5&accountId=0&start=2018-11-11&end=2019-11-11`)
                    .then(res => {
                        
                        this.historyList = res.data.Obj;
                       
                    });
            }
        },
        getTableCount(){
          
        }
    },
};
</script>
<style scoped>
.graph_top {
    float: right;
    margin-top: -5.5%;
    margin-right: 2.5%;
}
.newest_box p {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #999999;
    letter-spacing: 0.62px;
    padding: 16px 40px;
}
</style>
