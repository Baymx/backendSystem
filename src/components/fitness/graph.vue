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
  props: ['value'],
  data(){
    return{
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
      radio: '1',
      copy: []
    }
  },
  mounted(){
    this.draw();
  },
  computed: {
    list() {
      if (this.value === '选项1') {
        return this.copy[0]
      }
      if (this.value === '选项2') {
        return this.copy[1]
      }
      if (this.value === '选项3') {
        return this.copy[2]
      }
    }
  },
  watch: {
    value() {
      this.drawLine();
    }
  },
  methods:{
    getData() {
      return new Promise(function(resolve) {
        setTimeout(function() {
          console.log(111)
          resolve([[1, 3, 5, 7, 9, 11], [1, 3, 9, 7, 9, 11],[1, 5, 3, 5, 9, 11]])
        }, 1000)
      })
    },
    draw() {
      this.getData().then(res => {
        console.log(2222)
        this.copy = res;
        this.drawLine();
      })
    },
    drawLine(){
      console.log(this.list, 'draw line')
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      myChart.setOption({
            tooltip: {},
            legend: {
                data:['血糖']
            },
            xAxis: {
                data: []
            },
            yAxis: {},
            series: [{
                name: '血糖',
                type: 'bar',
                data: this.list
            }]
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
  margin-top:-4.8%;
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
