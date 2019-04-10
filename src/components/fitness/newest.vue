<template>
  <div class="newest_box">
    <el-table :data="dataList" empty-text="当前数据没有，请添加数据" border style="width: 95%;margin-left:2.5%;">
      <el-table-column prop="project" label="检测项目" width="180"></el-table-column>
      <el-table-column prop="result" label="检测结果" width="180"></el-table-column>
      <el-table-column prop="analyze" label="健康分析" width="180"></el-table-column>
      <el-table-column prop="MeasuringTime" label="检测时间" width="180"></el-table-column>
      <el-table-column prop="BgRange" label="参考范围"></el-table-column>
    </el-table>
    <p>声明：本报告仅供临床参考</p>
  </div>

</template>
<script>
export default {
    data() {
        return {
            tableList:[],
            tableData: [
                {
                    project: "收缩压",
                    result: "112",
                    analyze: "正常",
                    date: "2019-08-29 18.02",
                    range: "99-139mmHg"
                },
                {
                    project: "舒张压",
                    result: "234",
                    analyze: "正常",
                    date: "2019-08-29 18.02",
                    range: "99-139mmHg"
                },
                {
                    project: "心率",
                    result: "543",
                    analyze: "偏高",
                    date: "2019-08-29 18.02",
                    range: "99-139mmHg"
                },
                {
                    project: "血糖",
                    result: "54",
                    analyze: "偏低",
                    date: "2019-08-29 18.02",
                    range: "99-139mmHg"
                }
            ],
            accountId: "" //用户id
        };
    },
    computed: {
        dataList() {
          var list = this.tableList;
          return list;
        }
    },
    mounted() {
        this.getNewest();
    },
    methods: {
        getNewest() {
            let role = sessionStorage.getItem("role");
            if (role) {
                let accountId = JSON.parse(role).AccountId;
                this.accountId = accountId;
                this.$http
                    .get(`/api/v1/physdata/newest?accountId=${this.accountId}`)
                    .then(res => {
                        //  console.log(res)
                        //  debugger
                        this.newestData = res.data.Obj;

                        console.log(this.newestData);
                    });
            }
        }
    }
};
</script>
<style scoped>
.newest_box p {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #999999;
    letter-spacing: 0.62px;
    padding: 16px 40px;
}
</style>
