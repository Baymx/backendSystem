<template>
  <div class="_commodity_newly_added">
    <div class="_commodity_newly_added_top">
      <el-form label-width="90px" :rules="rules" :model="NewlyForm" ref="NewlyForm">
        <!-- <el-form-item label="所属机构" class="_mechanism" style="width:600px">
          <el-select v-model="strMechanism" clearable placeholder="请选择" @change="clickMechan">
            <el-option v-for="item in mechanism" :key="item.Id" :label="item.Name" :value="item.Id">
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="所属驿站" prop="strStation" style="width:90%">
          <el-select v-model="strStation" multiple placeholder="请选择">
            <el-option v-for="item in postStation" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名" prop="Name" :rules="[{ required: true, message: '请输入姓名!!'}]">
          <el-input v-model="NewlyForm.Name" auto-complete="off" placeholder="请输入名字"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="Sex">
          <el-radio-group v-model="NewlyForm.Sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="身份证号" prop="CardId" >
            <el-input v-model="NewlyForm.CardId" auto-complete="off" placeholder="证件号码"></el-input>
        </el-form-item>
        <el-form-item label="出生日期" prop="Birthday" :rules="[{ required: true, message: '请输入出生日期!!'}]">
            <el-date-picker v-model="NewlyForm.Birthday" type="date" placeholder="选择日期">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="手机号码" class="_identity" prop="Telephone">
            <el-input v-model="NewlyForm.Telephone" auto-complete="off" placeholder="手机号码"></el-input>
        </el-form-item>
        <el-form-item label="家庭座机" prop="Phone">
            <el-input v-model="NewlyForm.Phone" auto-complete="off" placeholder="0000-1111111"></el-input>
        </el-form-item>
        <el-form-item label="身高(cm)" prop="Height" class="_identity">
            <el-input v-model="NewlyForm.Height" auto-complete="off" placeholder="身高"></el-input>
        </el-form-item>
        <el-form-item label="体重(kg)" prop="Weight" >
            <el-input v-model="NewlyForm.Weight" auto-complete="off" placeholder="体重"></el-input>
        </el-form-item>
        <el-form-item label="居住地址" prop="Addr" class="_address" :rules="[{ required: true, message: '请输入居住地址!!'}]">
            <el-input v-model="NewlyForm.Addr" auto-complete="off" placeholder="详细地址"></el-input>
        </el-form-item>
        <div v-if="!routeId" class="userPard">
          <el-form-item label="账号"  class="_user" prop="userName">
            <el-input v-model="NewlyForm.userName" auto-complete="off" placeholder="字母+数字+下划线组成,字母开头,4-16位"></el-input>
          </el-form-item>
          <el-form-item label="密码"  class="_password" prop="passWord">
            <el-input v-model="NewlyForm.passWord" auto-complete="off" type="password" placeholder="数字+字母+特殊字符，6-20位"></el-input>
          </el-form-item>
          <el-form-item label="重输密码" class="_password" prop="againPassWord">
            <el-input v-model="NewlyForm.againPassWord" auto-complete="off" type="password" placeholder="数字+字母+特殊字符，6-20位"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <el-form>
        <div class="commodity_img">
          <div class="show-img" v-if="NewlyForm.HeadUrl">
            <img :src="NewlyForm.HeadUrl" class="avatar">
            <i class="el-icon-error uploader-delete" @click="addFormDelImg"></i>
          </div>
          <el-upload v-else class="avatar-uploader" :http-request="addUploadFile" action="http://210.76.124.110:86/api/v1/file/push" :show-file-list="false">
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </el-form>
    </div>
    <div class="_commodity_newly_added_bottom">
      <el-form ref="guardian" label-width="90px">
        <el-form-item label="监护人" v-for="(item, index) in guardian" :key="item.key" :prop="'guardian.' + index + '.value'">
          <el-input v-model="item.Name" auto-complete="off" placeholder="姓名"></el-input>
          <el-input v-model="item.Relation" auto-complete="off" placeholder="关系"></el-input>
          <el-input v-model="item.Phone" auto-complete="off" placeholder="联系电话"></el-input>
          <el-button v-if="index == (guardian.length-1)" @click="addGuardian" type="success">新增监护人</el-button>
          <el-button v-if="guardian.length!=1" @click.prevent="removeGuardian(item)" type="danger">删除</el-button>
        </el-form-item>
      </el-form>
      <el-form label-width="90px">
        <el-form-item label="紧急联系人" v-for="(item, index) in linkman" :key="item.key" :prop="'guardian.' + index + '.value'">
          <el-input v-model="item.Name" auto-complete="off" placeholder="姓名"></el-input>
          <el-input v-model="item.Relation" auto-complete="off" placeholder="关系"></el-input>
          <el-input v-model="item.Phone" auto-complete="off" placeholder="联系电话"></el-input>
          <el-button v-if="index == (linkman.length-1)" @click="addLinkman" type="success">新增联系人</el-button>
          <el-button v-if="linkman.length!=1" @click.prevent="removeLinkman(item)" type="danger">删除</el-button>
        </el-form-item>
      </el-form>
      <div class="_commodity_newly_added_emergency_contact">
        <el-button type="primary" @click="saveInformation">保存</el-button>
        <router-link to="/commodity/integration">
          <el-button>取消</el-button>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      //手机号
      var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/
      var validateTelephone = (rule,value,callback) => {
        if (!value) {
          return callback(new Error('请输入手机号!!'))
        }
        if(!phoneReg.test(value)){
          callback(new Error('手机号有误'))
        }else{
          callback()
        }
      }
      //身份证号
      var regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      var validateCard = (rule,value,callback) => {
        if(!value) {
          return callback(new Error('请输入身份证号!!'))
        }
        if(!regIdNo.test(value)){
          callback(new Error('身份证号有误'))
        }else{
          callback()
        }
      }
      //座机号码
      var regExp=/0\d{2,3}-\d{7,8}/
      var validatePhone = (rule,value,callback) => {
        if(!value){
          return callback(new Error('请输入家庭座机!!'))
        }
        if(!regExp.test(value)){
          callback(new Error('家庭座机号输入有误'))
        }else{
          callback()
        }
      }
      //体重
      var weightReg = /^(0(\.\d{1}){0,1}|[1-8]\d{1,3}(\.\d{1}){0,1}|9\d{1,2}(\.\d{1}){0,1}|999(\.0){0,1}|.{0})$/
      var validateWeight = (rule,value,callback) => {
        if(!value){
          return callback(new Error('请输入体重!!'))
        }
        if(!weightReg.test(value)){
          callback(new Error('体重输入有误'))
        }else{
          callback()
        }
      }
      //身高
      var heightReg = /^(0{1}|[1-9]\d{0,3}|.{0})$/
      var validateHeight = (rule,value,callback) => {
        if(!value){
          return callback(new Error('请输入身高!!'))
        }
        if(!heightReg.test(value)){
          callback(new Error('身高输入有误'))
        }else{
          callback()
        }
      }
      //账号
      var userNameReg = /^[a-zA-z]\w{3,15}$/
      var validateuserName = (rule,value,callback) => {
        if(!value){
          return callback(new Error('请输入账号!!'))
        }
        if(!userNameReg.test(value)){
          callback(new Error('账号输入有误，由字母、数字、下划线组成，字母开头，4-16位'))
        }else{
          callback()
        }
      }
      //密码
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.NewlyForm.passWord) {
          // console.log(value, this.NewlyForm.passWord, '两次秘密')
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        // radio: '1',
        NewlyForm: {
          Name: '',
          Sex: 1,
          Birthday: '',
          Weight: "",
          Height: "",
          CardId: '',
          CardType: "CARD_ID",
          Linkman: "",
          Guardian: "",
          Telephone: "",
          Addr: '',
          State: 1,
          Phone: '',
          HeadUrl: '',
          userName : '',
          passWord : '',
          AccountId : '',
          againPassWord : '',
        },
        // 校验规则
        rules: {
          //主要通过validator来指定验证器名称
          Telephone: [{ required: true, validator: validateTelephone, trigger: 'blur' }],
          CardId: [{ required: true, validator: validateCard, trigger: 'blur' }],
          Phone: [{ required: true, validator: validatePhone, trigger: 'blur'}],
          Weight: [{ required: true, validator: validateWeight, trigger: 'blur'}],
          Height: [{ required: true, validator: validateHeight, trigger: 'blur'}],
          userName: [{ required: true, validator: validateuserName, trigger: 'blur'}],
          passWord: [
            { required: true, message: '请输入密码', trigger: 'blur'},
            { pattern: /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W_]).{6,20}$/, message: '密码为数字+字母+特殊字符，6-20位'},
            { required: true, validator: validatePass2, trigger: 'blur'}
          ],
          againPassWord: [
            //{ required: true, message: '请输入密码', trigger: 'blur'},
            { required: true, validator: validatePass2, trigger: 'blur'}
          ]
        },
        // addForm: {
        //   Name: '',
        //   date: '',
        //   read: '',
        //   issue: '',
        //   name1: '',
        //   desc: ''
        // },
        // options: [],
        value: '',
        // userInfo: {http://210.76.124.110:86/api/v1/company//userinfo
        //   avatar: 'https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=62d46c39067b020818c437b303b099b6/d4628535e5dde7119c3d076aabefce1b9c1661ba.jpg'
        // },
        routeId: '',
        guardian: [{
          "Name": "",
          "Relation": "",
          "Phone": ""
        }],
        linkman: [{
          "Name": "",
          "Relation": "",
          "Phone": ""
        }],
        mechanism : [],
        postStation : [],
        strMechanism : null,//机构
        strStation : [],
        accObj : 0,
        OldId:'',
        NewId:''
        // accountId:''
      }
    },
    created() {
      // this.userEdit()
      var Obj = localStorage.getItem('Obj');
      this.Obj = JSON.parse(Obj);
      if (this.$route.query.id) {
        this.routeId = this.$route.query.id;
        console.log(Obj)
        if (Obj) {
          Obj = JSON.parse(Obj);
          
        }
      }
    },
    methods: {
      // onStationChange() {
      //   if (!this.strStation) {
      //     this.strMechanism = null;
      //     return;
      //   }
      //   this.postStation.forEach(item => {
      //     if (item.Id === this.strStation) {
      //       this.strMechanism = item.CompanyId;
      //     }
      //   })
      //   console.log(this.strMechanism);
      // },
      // clickMechan(){
      //   if(!this.strMechanism){
      //     this.strStation = '';
      //     this.postStation = '';
      //   }else{
      //     alert(this.strMechanism)
      //     //根据机构id获取所管理的驿站信息
      //     this.$api.user.getPostStation(`/api/v1/company/${this.strMechanism}/station`)
      //     .then(res=>{
      //       console.log(res)
      //       this.postStation = res.data.Obj
      //     })
      //   }
      // },
      removeGuardian(item) {
        var index = this.guardian.indexOf(item)
        if (index !== -1) {
          this.guardian.splice(index, 1)
        }
      },
      addGuardian() {
        this.guardian.push({
          "Name": "",
          "Relation": "",
          "Phone": ""
        });
      },
      removeLinkman(item) {
        var index = this.linkman.indexOf(item)
        if (index !== -1) {
          this.linkman.splice(index, 1)
        }
      },
      addLinkman() {
        this.linkman.push({
          "Name": "",
          "Relation": "",
          "Phone": ""
        });
      },
      addFormDelImg() {
        this.NewlyForm.HeadUrl = "";
      },
      addUploadFile(params) {
        const role = sessionStorage.getItem('role')
        if(role) {
          const accountId = JSON.parse(role).AccountId;
          this.accountId = accountId;
          const _file = params.file;
          var formData = new FormData();
          let fileName = _file.name.split(",");
          formData.append("file", _file);
          formData.append("accountId", this.accountId);
          formData.append("extension", fileName[fileName.length - 1]);
          return this.$api.staff.pushHeadUrl(`/api/v1/file/push`, formData).then(res => {
              this.NewlyForm.HeadUrl = res.data.Obj[0];
          });
        }
      },
      saveInformation() {
        // if (!this.strMechanism) {
        //   console.log('请选择驿站')
        //   return;
        // }
        this.$refs['NewlyForm'].validate().then((val, row) => {
          // debugger
          console.log(val, row);
          if (!val) return;
           if(!this.$route.query.id){
              this.InstitutionalEntity().then(res=>{
                this.userPreservation().then(res => {
                  this.$router.push({
                    path: '/commodity/integration'
                  })
                })
              })
            }else{
              this.editUser().then(res=>{
                this.$router.push({
                  path: '/commodity/integration'
                })
              })
            }
        })
      },
      InstitutionalEntity(){
        var time = this.NewlyForm.Birthday;
        var dateee = new Date(time).toJSON();
        var times = new Date(+new Date(dateee) + 16 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
        return this.$api.staff.postPersonnelEntity(`/api/v1/station/${this.strStation}/userinfo`,{
          User : {
            Name: this.NewlyForm.Name,
            Sex: parseInt(this.NewlyForm.Sex),
            Birthday: times,
            Weight: parseInt(this.NewlyForm.Weight),
            Height: parseInt(this.NewlyForm.Height),
            CardId: this.NewlyForm.CardId,
            CardType: this.NewlyForm.CardType,
            Addr: this.NewlyForm.Addr,
            State: this.NewlyForm.State,
            Guardian: JSON.stringify(this.guardian),
            Linkman: JSON.stringify(this.linkman),
            Telephone: this.NewlyForm.Telephone,
            Phone: this.NewlyForm.Phone,
            HeadUrl: this.NewlyForm.HeadUrl,
            AccountId: this.accObj.AccountId,
          },
          accountName : this.NewlyForm.userName,
          passwd : this.NewlyForm.passWord
        })
      },
      PersonnelEntity(){
        var time = this.NewlyForm.Birthday;
        var dateee = new Date(time).toJSON();
        var times = new Date(+new Date(dateee) + 16 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
        return this.$api.staff.postPersonnelEntity(`/api/v1/station/${this.strMechanism}/userinfo`,{
          User : {
            Name: this.NewlyForm.Name,
            Sex: parseInt(this.NewlyForm.Sex),
            Birthday: times,
            Weight: parseInt(this.NewlyForm.Weight),
            Height: parseInt(this.NewlyForm.Height),
            CardId: this.NewlyForm.CardId,
            CardType: this.NewlyForm.CardType,
            Addr: this.NewlyForm.Addr,
            State: this.NewlyForm.State,
            Guardian: JSON.stringify(this.guardian),
            Linkman: JSON.stringify(this.linkman),
            Telephone: this.NewlyForm.Telephone,
            Phone: this.NewlyForm.Phone,
            HeadUrl: this.NewlyForm.HeadUrl,
            AccountId: this.NewlyForm.AccountId,
          },
          accountName : this.NewlyForm.userName,
          passwd : this.NewlyForm.passWord
        })
      },
      editUser(){
        var this_ = this;
        var str = this.$route.query.str
        // debugger
        // this_.strStation.str
        // var stationArr = str.split(",")
        // stationArr.forEach(function(item){
        //   this_.strStation.push(item.toString())
        // })
        // debugger
        return this.$api.staff.editUserinfo(`/api/v1/station/userinfo`,{
          info:{
            Name: this.NewlyForm.Name,
            Sex: parseInt(this.NewlyForm.Sex),
            Birthday: this.NewlyForm.Birthday,
            Weight: parseInt(this.NewlyForm.Weight),
            Height: parseInt(this.NewlyForm.Height),
            CardId: this.NewlyForm.CardId,
            CardType: this.NewlyForm.CardType,
            Addr: this.NewlyForm.Addr,
            State: this.NewlyForm.State,
            Guardian: JSON.stringify(this.guardian),
            Linkman: JSON.stringify(this.linkman),
            Telephone: this.NewlyForm.Telephone,
            Phone: this.NewlyForm.Phone,
            HeadUrl: this.NewlyForm.HeadUrl,
            AccountId: this.NewlyForm.AccountId,
            Id: this.$route.query.id,
          },
          //驿站id
          OldId:this.$route.query.str,
          NewId:this.strStation.toString()
        })
        // debugger
      },
      userEdit() {
        var this_ = this
        var str = this.$route.query.str
        var stationArr = str.split(",")
        // debugger
        stationArr.forEach(function(item){
          this_.strStation.push(item.toString())
        })
        // debugger
        console.log(this.NewlyForm.Id, 'xxxxxx');
        return this.$api.user.EditUserEdit({
          Name: this.NewlyForm.Name,
          Sex: parseInt(this.NewlyForm.Sex),
          Birthday: this.NewlyForm.Birthday,
          Weight: parseInt(this.NewlyForm.Weight),
          Height: parseInt(this.NewlyForm.Height),
          CardId: this.NewlyForm.CardId,
          CardType: this.NewlyForm.CardType,
          Addr: this.NewlyForm.Addr,
          State: 1,
          Guardian: JSON.stringify(this.guardian),
          Linkman: JSON.stringify(this.linkman),
          Telephone: this.NewlyForm.Telephone,
          Phone: this.NewlyForm.Phone,
          HeadUrl: this.NewlyForm.HeadUrl,
          AccountId: this.NewlyForm.AccountId,
          Id: this.$route.query.id,
          // BelongInfo: ['-1,,79,汤圆驿站演示2']
        })
      },
      userPreservation() {
        return this.$api.user.saveUser({
          Name: this.NewlyForm.Name,
          Sex: parseInt(this.NewlyForm.Sex),
          Birthday: this.NewlyForm.Birthday,
          Weight: parseInt(this.NewlyForm.Weight),
          Height: parseInt(this.NewlyForm.Height),
          CardId: this.NewlyForm.CardId,
          CardType: this.NewlyForm.CardType,
          Addr: this.NewlyForm.Addr,
          State: this.NewlyForm.State,
          Guardian: JSON.stringify(this.guardian),
          Linkman: JSON.stringify(this.linkman),
          Telephone: this.NewlyForm.Telephone,
          Phone: this.NewlyForm.Phone,
          HeadUrl: this.NewlyForm.HeadUrl,
          AccountId: this.accObj.AccountId,
        })
      }
    },
    mounted() {
      var this_ = this
      //保存用户信息
      var Obj = sessionStorage.getItem('role');
      if (Obj) {
        Obj = JSON.parse(Obj);
        console.log(Obj);
        this.accObj = Obj
        //获取员工所管理的机构
        //this.$api.user.getMechanism(`/api/v1/staff/${Obj.AccountId}/company`).then(res=>{
        this.$api.user.getPostStation(`/api/v1/user/${Obj.AccountId}/station`).then(res=>{
          console.log(res)
          var data = res.data.Obj
            data.forEach(function(item) {
              // debugger
              var param = {
                value: item.Id.toString(),
                label: item.Name
              }
              // debugger
              this_.postStation.push(param)
            })
        }).then(() => {
          if (this.$route.query.id) {
            this.$api.user.getUserById({id:this.$route.query.id}).then(res => {
              console.log(res)
              var time = res.data.Obj.Birthday
              var dateee = new Date(time).toJSON();
              var times = new Date(+new Date(dateee) + 16 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
              res.data.Obj.Birthday = times;
              let user = res.data.Obj;
              this.NewlyForm = user;
              this.guardian = JSON.parse(user.Guardian);
              this.linkman = JSON.parse(user.Linkman);
              // 驿站id
              // this.strStation = res.data.Obj.State;
              // 通过驿站id获取机构id
              // this.postStation.forEach(item => {
              //   if (item.Id === this.strStation) {
              //     this.strMechanism = item.CompanyId;
              //   }
              // })
              // console.log(this.NewlyForm, this.strMechanism, '33333')
              // 驿站处理
                this_.strStation = []
                // debugger
                var str = this.$route.query.str
                var stationArr = str.split(",")
                stationArr.forEach(function(item){
                  this_.strStation.push(item)
                  // debugger
              })
            })
          }
        });

        
      }
    }
  }
</script>
<style lang="scss">
/*上传组件样式*/
.avatar-uploader {
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.commodity_img{
  // position: absolute;
  // top: 100px;
  // right: 130px;
  padding: 0px 24px 0px 38px;
  margin-top: 10%;
  .show-img {
    width: 120px;
    height: 120px;
    position: relative;
    img {
      display: block;
      width: 120px;
      height: 120px;
    }
    .uploader-delete {
      position: absolute;
      top: -5px;
      right: -5px;
    }
  }
}
</style>
<style scoped>
._commodity_newly_added_top {
  border-top: 1px solid #f2f2f2;
  margin-top: 5px;
  display: flex;
}

._commodity_newly_added_top form:nth-child(1) {
  width: 70%;
  display: flex;
  flex-wrap: wrap;
}

._commodity_newly_added_top form:nth-child(1) {
  padding-top: 1.5%;
}

._commodity_newly_added_top form:nth-child(1) .el-form-item {
  width: 50%;
}

._commodity_newly_added_top form:nth-child(1) /deep/ .el-form-item__label {
  width: 20%;
}

._commodity_newly_added_top form:nth-child(1)>.el-form-item .el-input {
  width:60%!important;
}

._commodity_newly_added_top form:nth-child(1) .el-form-item:nth-child(2) .el-cascader,
._commodity_newly_added_top form:nth-child(1) .el-form-item:nth-child(5) .el-cascader {
  width: 30%;
}

 ._commodity_newly_added_top ._address {
  width: 100%!important;
}

/*._commodity_newly_added_top form:nth-child(1) .el-form-item:nth-last-child(2) .el-input {
  width: 35%;
  margin: 0 2% 30px 0;
}

._commodity_newly_added_top form:nth-child(1) ._address {
  width: 35%;
  margin-bottom: 0;
} */


/* .item_bock {
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 94px;
  width: 300px;
  padding: 0px 24px 0px 38px;
  background: #fff;
  margin-top: 10%;
} */

/* .head_p {
  height: 132px;
}

.head_img {
  height: 90px;
}

.head_img img {
  width: 90px;
  height: 90px;
  border-radius: 50px
} */

.setting_right {
  display: flex;
  height: 37px;
  justify-content: flex-end;
  align-items: center;
}

.hiddenInput {
  display: none;
}
.userPard{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.caption {
  color: #8F8F8F;
  line-height: 35px;
  margin-top: 10px;
  cursor: pointer;
  border: 1px solid skyblue;
  padding: 0px 5px;
}

._commodity_newly_added_bottom form {
  display: flex;
  flex-wrap: wrap;
}

._commodity_newly_added_bottom form .el-input,
._commodity_newly_added_bottom form .el-select {
  width: 200px;
}

._commodity_newly_added_emergency_contact {
    text-align: center;
}

._commodity_newly_added_emergency_contact button {
  width: 10%;
}

.userPard{
  margin-bottom: 40px;
}
.userPard .el-form-item:nth-child(1){
  width: 100%!important;
}
.userPard .el-form-item{
  width: 50%;
}
.userPard ._password .el-input{
  width: 73%!important;
  
}
.userPard ._user{
  margin-bottom: 22px!important;
}
.userPard ._user /deep/ .el-input{
  width: 33%!important;
}
._mechanism /deep/ .el-select{
  width: 60%;
}
/* ._address /deep/ .el-form-item__content>.el-input {
  width: 40%!important;
} */
._address /deep/ .el-form-item__content{
  margin-left: 0!important;
}
._commodity_newly_added_top form:nth-child(1) .el-form-item:nth-child(2) .el-form-item__content .el-select,._commodity_newly_added_top form:nth-child(1) .el-form-item:nth-child(3) .el-form-item__content .el-select{
  width: 60%;
}
.userPard /deep/ .el-form-item{
  margin-bottom: 0;
}
</style>

