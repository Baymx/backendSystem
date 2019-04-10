<template>
  <div class="information">
    <el-row class="graph_top">
      <!-- <el-select placeholder="血压" style="width:140px;">
        <el-option style="height:45px;"></el-option>
      </el-select> -->
    </el-row>
    <div class="information_top">
      <div class="information_nav">
        <el-form :label-position="labelPosition" :model="manual" ref="manual">
          <el-form-item label="收缩压:" prop="Sbp">
            <el-input v-model="manual.Sbp" placeholder="" style="width:240px;margin-left: 40px;"></el-input>
          </el-form-item>
          <div class="list"></div>
          <el-form-item label="舒张压:" prop="Dbp">
            <el-input v-model="manual.Dbp" placeholder="" style="width:240px;margin-left: 40px;"></el-input>
          </el-form-item>
          <div class="list"></div>
          <el-form-item label="心率:" prop="HeartRate">
            <el-input v-model="manual.HeartRate" placeholder="" style="width:240px;margin-left: 40px;"></el-input>
          </el-form-item>
          <div class="list"></div>
          <el-form-item label="测量时间:" prop="MeasuringTime">
            <el-date-picker v-model="manual.MeasuringTime" type="date" placeholder="选择日期" style="width:240px;margin-left:40px">
            </el-date-picker>
          </el-form-item>
          <div class="list"></div>
        </el-form>
        <!-- <span class="demonstration">收缩压:</span>
        <el-input v-model="Sbp" placeholder="" style="width:240px;margin-left: 40px;"></el-input> -->
      </div>
      <!-- <div class="list"></div>
      <div class="information_nav">
        <span class="demonstration">舒张压:</span>
        <el-input v-model="Dbp" placeholder="" style="width:240px;margin-left: 40px;"></el-input>
      </div>
      <div class="list"></div>
      <div class="information_nav">
        <span class="demonstration">心率:</span>
        <el-input v-model="HeartRate" placeholder="" style="width:240px;margin-left: 40px;"></el-input>
      </div>
      <div class="list"></div>
      <div class="information_nav">
        <span class="demonstration">测量时间:</span>
        <el-date-picker v-model="value1" type="date" placeholder="选择日期" style="width:240px;margin-left:40px">
        </el-date-picker>
      </div>
      <div class="list"></div> -->
      <div class="bottom">
        <button @click="manualBtn">保存</button>
        <button>清空</button>
      </div>
    </div>
  </div>
</template>
<script>
// import EventBus from '../../eventBus'
export default {
    data() {
        return {
            manual: {
                Sbp: "", //收缩压
                Dbp: "", //舒张压
                HeartRate: "", //心率
                MeasuringTime: "", //测量时间
                AccountId: "" //用户id
            },
            manualData: {
                Sbp: "", //收缩压
                Dbp: "", //舒张压
                HeartRate: "", //心率
                MeasuringTime: "", //测量时间
                AccountId: "" //用户id
            },
            labelPosition: "right",
            roleId: "",
            accountId: ""
        };
    },
    mounted() {
        let role = sessionStorage.getItem("role");
        if (role) {
            role = JSON.parse(role);
            console.log(role);
            this.roleId = role;
        }
        // this.getHealth()
    },
    methods: {
        manualBtn() {
            let time = this.manual.MeasuringTime;
            let datee = new Date(time).toJSON();
            let times = new Date(+new Date(datee) + 16 * 3600 * 1000)
                .toISOString()
                .replace(/T/g, " ")
                .replace(/\.[\d]{3}Z/, "");
            let role = sessionStorage.getItem("role");
            if (role) {
                let accountId = JSON.parse(role).AccountId;
                this.accountId = accountId;
                this.$http
                    .post(`/api/v1/health/bp`, {
                        BloodPressure: {
                            Sbp: this.manual.Sbp,
                            Dbp: this.manual.Dbp,
                            HeartRate: this.manual.HeartRate,
                            MeasuringTime: times,
                            AccountId: this.accountId.AccountId
                        }
                    })
                    .then(res => {
                        console.log(res);
                        this.manualData = res.data.Obj;
                        this.$emit('saveData',this.manualData);
                        this.manual = {
                            Sbp: "", //收缩压
                            Dbp: "", //舒张压
                            HeartRate: "", //心率
                            MeasuringTime: "", //测量时间
                            AccountId: "" //用户id
                        };
                    });
            }
        }
        //保存
        // manualBtn(){
        //   // EventBus.$emit('item',this.manual)
        // }
    }
};
</script>
<style scoped>
.information {
    width: 95%;
    margin-left: 2.5%;
    background: #fff;
}
.graph_top {
    float: right;
    margin-top: -5.5%;
}
.information_top {
    width: 400px;
    height: 363px;
    padding: 0 25px;
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
.list {
    padding-top: 10px;
    border-bottom: 1px solid #ccc;
}
.bottom {
    text-align: center;
    padding-top: 10px;
}
.bottom button:nth-child(1) {
    background: #ff7669;
    color: #fff;
    border: 0;
    outline: 0;
    padding: 5px 10px;
    border-radius: 5px;
}
.bottom button:nth-child(2) {
    background: #42cabf;
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
.el-form >>> .el-form-item__label {
    color: #333333;
    width: 20%;
}
</style>
