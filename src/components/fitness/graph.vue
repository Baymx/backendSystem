<template>
  <div class="graph_box">
    <el-row class="graph_top">
      <!-- <el-select placeholder="中医体质辨识" style="width:140px;">
        <el-option style="height:45px;"></el-option>
      </el-select> -->
    </el-row>
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
          <p><el-radio v-model="radio" label="2">月</el-radio></p>
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
  data(){
    return{
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      value1: '',
      radio: '1'
    }
  },
  mounted(){
    this.drawLine()
  },
  methods:{
    drawLine(){
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      myChart.setOption({
        // title : {
        //   text: '某地区蒸发量和降水量',
        //   subtext: '纯属虚构'
        // },
        tooltip : {
          trigger: 'axis'
        },
        legend: {
          data:['蒸发量','降水量']
        },
        toolbox: {
          show : true,
          feature : {
            dataView : {show: true, readOnly: false},
            magicType : {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
          }
        },
        calculable : true,
        xAxis : [
          {
            type : 'category',
            data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
          }
        ],
        yAxis : [
          {
            type : 'value'
          }
        ],
        series : [
          {
            name:'蒸发量',
            type:'bar',
            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
            markPoint : {
              data : [
                {type : 'max', name: '最大值'},
                {type : 'min', name: '最小值'}
              ]
            },
            markLine : {
              data : [
                {type : 'average', name: '平均值'}
              ]
            }
          },
          {
            name:'降水量',
            type:'bar',
            data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
            markPoint : {
              data : [
                {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183},
                {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
              ]
            },
            markLine : {
              data : [
                {type : 'average', name : '平均值'}
              ]
            }
          }
        ]
      })
    }
  }
}
</script>
<style scoped>
.graph_box{
  width: 95%;
  margin-left: 2.5%;
  background: #fff;
}
.graph_top{
  float: right;
  margin-top:-5.5%;
}
.graph_entire{
  width: 100%;
  height: 600px;
  display: flex;
}
.graph_entire .graph_left{
  flex: 3;
  height: 100px;
}
.graph_entire .graph_left p{
  padding: 5px 18px;
}
.list{
  flex: 3;
  margin-left: 10px;
  padding-top: 3px;
  border-bottom: 1px solid #ccc;
}
.graph_block{
  padding: 10px 0 10px 18px;
}
.graph_block >>> .el-input__inner{
  background: #EEEEEE;
}
.graph_frame{
  padding: 10px 0 0 18px;
}
.el-radio{
  margin-left: 15px;
}
.graph_frame p{
  margin-left: 18px;
  line-height: 2;
}
.graph_bottom{
  height: 42px;
  background: #F5F5F5;
  text-align: center;
  margin-left: 10px;
  line-height: 42px;
}
.graph_bottom button{
  background: #53AC99;
  border-radius: 4px;
  color: #fff;
  border: 0;
  outline: 0;
  padding: 5px 10px;
}
.graph_entire .graph_right{
  flex: 7;
  padding-left: 10px;
}
.graph_entire .graph_right p{
  font-weight: 600;
  padding: 5px 10px;
}
.graph_entire .graph_right #myChart{
  border: 1px solid #000;
  height: 500px;
}
</style>
