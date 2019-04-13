<template>
  <!-- 图形分析 -->
  <div class="graph_box">
    <!-- <el-row class="graph_top">
      <el-select v-model="value" placeholder="中医体质辨识" style="width:140px;">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" style="height:45px;"></el-option>
      </el-select>
    </el-row> -->
    <div class="graph_entire">
      <div class="graph_left">
        <p>选择时间：</p>
        <div class="list"></div>
        <div class="graph_block">
          <span class="demonstration">时间</span>
          <el-date-picker v-model="value1" type="date" placeholder="选择日期" style="width:170px;margin-left:15px">
          </el-date-picker>
        </div>
        <div class="list"></div>
        <div class="graph_frame">
          <span class="demonstration">时段</span>
          <el-radio v-model="radio" label="1">周</el-radio>
          <p>
            <el-radio v-model="radio" label="2">月</el-radio>
          </p>
        </div>
        <div class="list"></div>
        <div class="graph_bottom">
          <button>确认</button>
        </div>
      </div>
      <div class="graph_right">
        <p>血压趋势</p>
        <div id="myChart"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    data() {
        return {
            // options:[{
            //   value: '选项1',
            //   label: '黄金糕'
            // },{
            //   value: '选项2',
            //   label: '双皮奶'
            // },{
            //   value: '选项3',
            //   label: '龙须面'
            // }],
            pickerOptions1: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
                shortcuts: [
                    {
                        text: "今天",
                        onClick(picker) {
                            picker.$emit("pick", new Date());
                        }
                    },
                    {
                        text: "昨天",
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit("pick", date);
                        }
                    },
                    {
                        text: "一周前",
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit("pick", date);
                        }
                    }
                ]
            },
            value1: "",
            radio: "1",
            copy: [],
            searchFields: {
                startTime: "",
                endTime: ""
            },
            dataList: [],
            type: "bloodPressure"
        };
    },
    props: ["value"],
    watch: {
        value(newVal) {
            this.type = newVal;
            this.draw();
        }
    },
    mounted() {
        this.draw();
    },
    computed: {
        list() {
            if (this.value === "选项1") {
                return this.copy[0];
            }
            if (this.value === "选项2") {
                return this.copy[1];
            }
            if (this.value === "选项3") {
                return this.copy[2];
            }
        }
    },
    watch: {
        value() {
            this.drawLine();
        }
    },
    methods: {
        formatter(time) {
            var dateee = new Date(time).toJSON();
            var times = new Date(+new Date(dateee))
                .toISOString()
                .replace(/T/g, " ")
                .replace(/\.[\d]{3}Z/, "");
            return times;
        },
        getData(type) {
            let role = sessionStorage.getItem("role");
            if (role) {
                let accountId = JSON.parse(role).AccountId;
                this.accountId = accountId;
                return new Promise(resolve => {
                    this.$http
                        .get(
                            `/api/v1/health/${type}?accountId=${
                                this.accountId
                            }&start=${this.searchFields.startTime ||
                                "2019-01-01"}&end=${this.searchFields.endTime ||
                                "2090-09-09"}`
                        )
                        .then(res => {
                            resolve(res);
                        });
                });
            }
        },
        draw() {
            if (this.type == "bloodPressure") {
                this.getData("bp").then(res => {
                    this.dataList = res.data.Obj;
                    this.drawLine();
                });
            }
        },
        drawLine() {
            console.log(this.dataList, "draw line");
            if (this.type == "bloodPressure") {
              this.drawBPLine();
            }
        },
        drawBPLine() {
            var xData = [],
                sbpData = [],
                dbpData = [],
                heartRateData = [];
            this.dataList.map(item => {
                if (item.MeasuringTime) {
                    xData.push(this.formatter(item.MeasuringTime));
                }
                if (item.Sbp || item.Sbp == 0) {
                    sbpData.push(item.Sbp);
                }
                if (item.Dbp || item.Dbp == 0) {
                    dbpData.push(item.Dbp);
                }
                if (item.HeartRate || item.HeartRate == 0) {
                    heartRateData.push(item.HeartRate);
                }
            });
            let myChart = this.$echarts.init(
                document.getElementById("myChart")
            );
            myChart.setOption({
                color: ["red", "yellow", "blue"],
                tooltip: {},
                legend: {
                    data: ["血压"]
                },
                dataZoom: [
                    {
                        type: "slider",
                        show: true,
                        xAxisIndex: [0],
                        start: 0,
                        end: 10
                    },
                    {
                        type: "inside",
                        xAxisIndex: [0],
                        start: 0,
                        end: 10
                    }
                ],
                xAxis: {
                    type: "category",
                    data: xData,
                    axisTick: {
                        alignWithLabel: true
                    }
                },
                yAxis: {
                    type: "value"
                },
                series: [
                    {
                        name: "收缩压",
                        type: "bar",
                        barWidth: 40, //柱图宽度
                        data: sbpData
                    },
                    {
                        name: "舒张压",
                        type: "bar",
                        barWidth: 40, //柱图宽度
                        data: dbpData
                    },
                    {
                        name: "心率",
                        type: "bar",
                        barWidth: 40, //柱图宽度
                        data: heartRateData
                    }
                ]
            });
        }
    }
};
</script>
<style scoped>
.graph_box {
    width: 95%;
    margin-left: 2.5%;
    background: #fff;
}
.graph_top {
    float: right;
    margin-top: -4.8%;
}
.graph_entire {
    width: 100%;
    height: 600px;
    display: flex;
}
.graph_entire .graph_left {
    flex: 3;
    height: 100px;
}
.graph_entire .graph_left p {
    padding: 5px 18px;
}
.list {
    flex: 3;
    margin-left: 10px;
    padding-top: 3px;
    border-bottom: 1px solid #ccc;
}
.graph_block {
    padding: 10px 0 10px 18px;
}
.graph_block >>> .el-input__inner {
    background: #eeeeee;
}
.graph_frame {
    padding: 10px 0 0 18px;
}
.el-radio {
    margin-left: 15px;
}
.graph_frame p {
    margin-left: 18px;
    line-height: 2;
}
.graph_bottom {
    height: 42px;
    background: #f5f5f5;
    text-align: center;
    margin-left: 10px;
    line-height: 42px;
}
.graph_bottom button {
    background: #53ac99;
    border-radius: 4px;
    color: #fff;
    border: 0;
    outline: 0;
    padding: 5px 10px;
}
.graph_entire .graph_right {
    flex: 7;
    padding-left: 10px;
}
.graph_entire .graph_right p {
    font-weight: 600;
    padding: 5px 10px;
}
.graph_entire .graph_right #myChart {
    border: 1px solid #000;
    height: 500px;
}
</style>
