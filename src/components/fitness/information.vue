 <template>
 <!-- 手动输入 -->
  <div class="information">
    <!-- <el-row class="graph_top">
      <el-select v-model="value" placeholder="血压" style="width:140px;">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" style="height:45px;"></el-option>
      </el-select>
    </el-row> -->
    <!-- 血压 -->
    <div class="information_top">
      <div class="information_nav">
        <el-form :label-position="labelPosition" :model="manual" ref="manual" v-if="value === 'bloodPressure'">
          <el-form-item label="收缩压:" prop="Sbp">
            <el-input v-model="manual.Sbp" style="width:240px;margin-left: 40px;"></el-input>
          </el-form-item>
          <div class="list"></div>
          <el-form-item label="舒张压:" prop="Dbp">
            <el-input v-model="manual.Dbp" style="width:240px;margin-left: 40px;"></el-input>
          </el-form-item>
          <div class="list"></div>
          <el-form-item label="心率:" prop="HeartRate">
            <el-input v-model="manual.HeartRate" style="width:240px;margin-left: 40px;"></el-input>
          </el-form-item>
          <div class="list"></div>
          <el-form-item label="测量时间:" prop="MeasuringTime">
            <el-date-picker v-model="manual.MeasuringTime" type="datetime" placeholder="选择日期时间" style="width:240px;margin-left:40px">
            </el-date-picker>
          </el-form-item>
          <div class="list"></div>
        </el-form>
      </div>
      <div class="bottom" v-if="value === 'bloodPressure'">
        <button @click="manualBtn">保存</button>
        <button @click="empty">清空</button>
      </div>
    </div>
    <!-- 血糖 -->
    <div class="information_top">
      <div class="information_nav">
        <el-form :label-position="labelPosition" :model="glucose" ref="glucose" v-if="value === 'bloodSugar'">
          <el-form-item label="时段:" prop="TimeFrame">
            <!-- <el-input v-model="glucose.TimeFrame" style="width:240px;margin-left: 40px;"></el-input> -->
            <el-select v-model="glucose.TimeFrame" placeholder="" style="width:240px;margin-left: 40px">
              <el-option v-for="item in glucose.TimeFrameOption" :key="item.value" :label="item.label" :value="item.value" style="height:45px;"></el-option>
            </el-select>
          </el-form-item>
          <div class="list"></div>
          <el-form-item label="心率:" prop="Bgc">
            <el-input v-model="glucose.Bgc" style="width:240px;margin-left: 40px;"></el-input>
          </el-form-item>
          <div class="list"></div>
          <el-form-item label="测量时间:" prop="MeasuringTime">
            <el-date-picker v-model="glucose.MeasuringTime" type="datetime" placeholder="选择日期时间" style="width:240px;margin-left:40px">
            </el-date-picker>
          </el-form-item>
          <div class="list"></div>
        </el-form>
      </div>
      <div class="bottom" v-if="value === 'bloodSugar'">
        <button @click="glucoseBtn">保存</button>
        <button @click="glucoseempty">清空</button>
      </div>
    </div>
    <!-- 血氧 -->
    <div class="information_top">
      <div class="information_nav">
        <el-form :label-position="labelPosition" :model="blood" ref="blood" v-if="value === 'bloodOxygen'">
          <el-form-item label="血氧浓度:" prop="Spo">
            <el-input v-model="blood.Spo" style="width:240px;margin-left: 40px;"></el-input>
          </el-form-item>
          <div class="list"></div>
          <el-form-item label="心率:" prop="HeartRate">
            <el-input v-model="blood.HeartRate" style="width:240px;margin-left: 40px;"></el-input>
          </el-form-item>
          <div class="list"></div>
          <el-form-item label="测量时间:" prop="MeasuringTime">
            <el-date-picker v-model="blood.MeasuringTime" type="datetime" placeholder="选择日期时间" style="width:240px;margin-left:40px">
            </el-date-picker>
          </el-form-item>
          <div class="list"></div>
        </el-form>
      </div>
      <div class="bottom" v-if="value === 'bloodOxygen'">
        <button @click="bloodBtn">保存</button>
        <button @click="bloodempty">清空</button>
      </div>
    </div>
    <!-- 心电 -->
    <div class="information_top">
      <div class="information_nav">
        <el-form :label-position="labelPosition" :model="exercise" ref="exercise" v-if="value === 'ECG'">
          <el-form-item label="呼吸:" prop="BreathRate">
            <el-input v-model="exercise.BreathRate" style="width:240px;margin-left: 40px;"></el-input>
          </el-form-item>
          <div class="list"></div>
          <el-form-item label="心率:" prop="HeartRate">
            <el-input v-model="exercise.HeartRate" style="width:240px;margin-left: 40px;"></el-input>
          </el-form-item>
          <div class="list"></div>
          <el-form-item label="测量时间:" prop="MeasuringTime">
            <el-date-picker v-model="exercise.MeasuringTime" type="datetime" placeholder="选择日期时间" style="width:240px;margin-left:40px">
            </el-date-picker>
          </el-form-item>
          <div class="list"></div>
        </el-form>
      </div>
      <div class="bottom" v-if="value === 'ECG'">
        <button @click="exerciseBtn">保存</button>
        <button @click="exerciseempty">清空</button>
      </div>
    </div>
  </div>
</template>
<script>
// import EventBus from '../../eventBus'
export default {
  props: ['value'],
  data(){
    return{
      show:true,
      hade:false,
      //血压
      manual:{
        Sbp: '', //收缩压 
        Dbp: '', //舒张压 
        HeartRate:'', //心率 
        MeasuringTime:'', //测量时间 
        AccountId:'',//用户id
      },
      //血糖
      glucose:{
        Id:'',
        AccountId:'', //用户id ,
        Bgc:'',//血糖
        TimeFrame :'',
        TimeFrameOption:[{
          value: '0',
          label: '空腹'
        },{
          value:'1',
          label: '随机'
        },{
          value:'2',
          label:'糖负荷2小时'
        }],//时段 0空腹 1随机 2糖负荷2小时
        MeasuringTime:''//测量时间
      },
      //血氧
      blood:{
        Id:'',
        AccountId:'',
        Spo:'', //血氧浓度 
        HeartRate:'',//心率 
        MeasuringTime:'',//测量时间
      },
      //心电
      exercise:{
        Id:'',
        AccountId:'',
        HeartRate:'', //心率
        BreathRate:'', // 呼吸率
        MeasuringTime:'',//测量时间
      },
      labelPosition: 'right',
      roleId:'',
      accountId:'',
    }
  },
  mounted(){
    let role = sessionStorage.getItem('role');
    if(role){
      role = JSON.parse(role);
      console.log(role)
      this.roleId = role
    }
    // this.getHealth()
  },
  methods:{
    manualBtn(){
      var time = this.manual.MeasuringTime;
      var dateee = new Date(time).toJSON();
      var times = new Date(+new Date(dateee) + 16 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
      let role = sessionStorage.getItem('role')
      if(role){
        let accountId = JSON.parse(role).AccountId;
        this.accountId = accountId
        this.$http.post(`/api/v1/health/bp`,{
          Sbp:this.manual.Sbp,
          Dbp:this.manual.Dbp,
          HeartRate:this.manual.HeartRate,
          MeasuringTime:times,
          AccountId:this.accountId
        }).then(res =>{
          console.log(res)
          this.manualData = res.data.Obj
          console.log(this.manualData)
          this.manual = {
            Sbp: '', //收缩压 
            Dbp: '', //舒张压 
            HeartRate:'', //心率 
            MeasuringTime:'', //测量时间 
            AccountId:'',//用户id
          }
        })
      }
    },
    //清空
    empty(){
     this.manual = {
        Sbp: '', //收缩压 
        Dbp: '', //舒张压 
        HeartRate:'', //心率 
        MeasuringTime:'', //测量时间 
        AccountId:'',//用户id
      }
    },
    //血糖
    glucoseBtn(){
      var time = this.blood.MeasuringTime;
      var dateee = new Date(time).toJSON();
      var times = new Date(+new Date(dateee) + 16 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
      let role = sessionStorage.getItem('role')
      if(role){
        let accountId = JSON.parse(role).AccountId;
        this.accountId = accountId
        this.$http.post(`/api/v1/health/bg`,{
          AccountId:this.accountId,
          Bgc:this.glucose.Bgc,//血糖
          TimeFrame:this.glucose.TimeFrame,//时段 0空腹 1随机 2糖负荷2小时
          MeasuringTime:this.glucose.MeasuringTime//测量时间
        }).then(res=>{
          this.glucoseData = res.data.Obj
          this.glucose = {
            Bgc:'',//血糖
            TimeFrame:'',//时段 0空腹 1随机 2糖负荷2小时
            MeasuringTime:''//测量时间
          }
        })
      }
    },
    glucoseempty(){
      this.glucose = {
        Bgc:'',//血糖
        TimeFrame:'',//时段 0空腹 1随机 2糖负荷2小时
        MeasuringTime:''//测量时间
      }
    },
    //血氧
    bloodBtn(){
      var time = this.blood.MeasuringTime;
      var dateee = new Date(time).toJSON();
      var times = new Date(+new Date(dateee) + 16 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
      let role = sessionStorage.getItem('role')
      if(role){
        let accountId = JSON.parse(role).AccountId;
        this.accountId = accountId
        this.$http.post(`/api/v1/health/bo`,{
          AccountId:this.accountId,
          Spo:this.blood.Spo, //血氧浓度 
          HeartRate:this.blood.HeartRate,//心率 
          MeasuringTime:this.blood.MeasuringTime
        }).then(res=>{
          this.bloodData = res.data.Obj
          console.log(this.bloodData)
          this.blood = {
            Spo:'', //血氧浓度 
            HeartRate:'',//心率 
            MeasuringTime:'',//测量时间
          }
        })
      }
    },
    bloodempty(){
      this.blood = {
        Spo:'', //血氧浓度 
        HeartRate:'',//心率 
        MeasuringTime:'',//测量时间
      }
    },
    //心电
    exerciseBtn(){
      var time = this.blood.MeasuringTime;
      var dateee = new Date(time).toJSON();
      var times = new Date(+new Date(dateee) + 16 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
      let role = sessionStorage.getItem('role')
      if(role){
        let accountId = JSON.parse(role).AccountId;
        this.accountId = accountId
        this.$http.post(`/api/v1/health/ecg`,{
          AccountId:this.accountId,
          BreathRate:this.exercise.BreathRate,
          HeartRate:this.exercise.HeartRate, 
          MeasuringTime:this.exercise.MeasuringTime
        }).then(res=>{
          this.exerciseData = res.data.Obj
          this.exercise = {
            BreathRate:'',
            HeartRate:'', 
            MeasuringTime:''
          }
        })
      }
    },
    exerciseempty(){
      this.exercise = {
        BreathRate:'',
        HeartRate:'', 
        MeasuringTime:''
      }
    }
  }
}
</script>
<style scoped>
.information{
  width: 95%;
  margin-left: 2.5%;
  background: #fff;
}
.graph_top{
  float: right;
  margin-top:-4.8%;
}
.information_top{
  width: 400px;
  height: auto;
  padding: 0 25px;
  display: block;
}
.information_top .box{
  display: none;
}
/* .information_nav{
  padding-top: 10px;
}
.el-input__inner{
  height: 32px;
}
.demonstration{
  display: inline-block;
  width: 18%;
} */
.list{
  padding-top: 10px;
  border-bottom: 1px solid #ccc;
}
.bottom{
  text-align: center;
  padding-top: 10px;
}
.bottom button:nth-child(1){
  background: #FF7669;
  color: #fff;
  border: 0;
  outline: 0;
  padding: 5px 10px;
  border-radius: 5px;
}
.bottom button:nth-child(2){
  background: #42CABF;
  color: #fff;
  border: 0;
  outline: 0;
  padding: 5px 10px;
  border-radius: 5px;
}
.el-form >>> .el-form-item {
  margin-bottom: 0;
  padding-top: 10px;
}
.el-form >>> .el-form-item__label{
  color: #333333;
  width:20%;
}
</style>
