<template>
  <div class="_commodity_page">
    <div class="_commodity_page_left">
      <el-col :span="50" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true">
          <el-form-item prop="date">
            <el-input v-model="filters"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getUsers">搜索</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getUsers">高级搜索</el-button>
          </el-form-item>
          <el-form-item>
            <router-link to="/commodityNewlyAdded"><el-button type="primary" @click="handleAdd">+新增会员</el-button></router-link>
          </el-form-item>
        </el-form>
      </el-col>
      <el-table style="100%">
        <el-table-column prop="id" label="姓名"></el-table-column>
        <el-table-column prop="order" label="性别"></el-table-column>
        <el-table-column prop="payment" label="年龄"></el-table-column>
      </el-table>
      <el-pagination
        layout="prev, pager, next"
        :total="50">
      </el-pagination>
    </div>
    <div class="_commodity_page_right">
      <div class="_commodity_page_right_top">
        <div class="_page_right_img">
        <img src="http://life.southmoney.com/tuwen/UploadFiles_6871/201808/20180808151110171.jpg"/>
        </div>
        <div class="_page_right_content">
          <div class="_page_right_content_detailed">
            <!-- <el-form>
              <el-form-item label="姓名" prop="name">
                <el-input v-model="addForm.name" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="性别" prop="read">
                  <el-input v-model="addForm.read" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="年龄" prop="issue">
                  <el-input v-model="addForm.issue" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="生日" prop="issue">
                  <el-input v-model="addForm.issue" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="手机" prop="issue">
                  <el-input v-model="addForm.issue" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="电话" prop="issue">
                  <el-input v-model="addForm.issue" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="身份证号" prop="issue" class="_identity">
                  <el-input v-model="addForm.issue" auto-complete="off"></el-input> 
              </el-form-item>
              <el-form-item label="联系地址" prop="issue" class="_address">
                  <el-input v-model="addForm.issue" auto-complete="off"></el-input>
              </el-form-item>
            </el-form> -->
            <ul class="_page_right_content_detailed_content">
              <li>
                <span>姓名:</span>
                <p>张三</p>
              </li>
              <li>
                <span>性别:</span>
                <p>男</p>
              </li>
              <li>
                <span>年龄:</span>
                <p>24</p>
              </li>
              <li>
                <span>生日:</span>
                <p>2019/1/21</p>
              </li>
              <li>
                <span>手机:</span>
                <p>15030736092</p>
              </li>
              <li>
                <span>电话:</span>
                <p>3438388731</p>
              </li>
              <li class="_identity">
                <span>身份证号:</span>
                <p>430946183746280018</p>
              </li>
              <li class="_address">
                <span>联系地址:</span>
                <p>北京市海淀区上地软件园孵化器</p>
              </li>
            </ul>
          </div>
          <div class="_page_right_content_btn">
            <el-form>
              <!-- <el-form-item>
                <el-button type="primary">查询</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">+新增</el-button>
              </el-form-item> -->
            </el-form>
          </div>
        </div>
      </div>
      <div class="_commodity_page_right_bottom">
        <ul>
          <li @click="clickTab(1)"><router-link to="/commodity/integration">最新动态</router-link></li>
          <li @click="clickTab(2)"><router-link to="/commodity/ConsultationManagement">健康管理</router-link></li>
          <li @click="clickTab(3)"><router-link to="/commodity/HealthAgreement">健康咨询</router-link></li>
          <li @click="clickTab(4)"><router-link to="/commodity/MedicalRecords">健康档案</router-link></li>
          <li @click="clickTab(5)"><router-link to="/commodity/deviceManagement">订单信息</router-link></li>
          <li @click="clickTab(6)"><router-link to="/commodity/SafetyMonitoring">积分信息</router-link></li>
          <li @click="clickTab(7)"><router-link to="/commodityn">余额信息</router-link></li>
        </ul>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      filters:'',
      dialogImageUrl: '',
      dialogVisible: false,
      pagesize:7,
      addForm:{
        name:'',
        date:'',
        read:'',
        issue:'',
        name1: '',
        desc : ''
      },
    }
  },
  methods : {
    //查询
    getUsers(){

    },
    //添加页面显示
    handleAdd:function(){
      // console.log(this.order)
      // this.addFormVisible=true;
      // this.addForm = {
      //   name:'',
      //   date:'',
      //   read:'',
      //   issue:''
      // }
    },
    //添加确定按钮
    addSubmit:function(){
      // this.addForm = {
      //   name:this.addForm.name,
      //   date:this.addForm.date,
      //   read:this.addForm.read,
      //   issue:this.addForm.issue
      // }
      // this.orderData.push(this.addForm);
      // this.addFormVisible = false;
      // this.totalItems = this.orderData.length;
    },
    clickTab(id){
      console.log(id)
    }
  }
}
</script>

<style scoped>
  ._commodity_page{
    display: flex;
  }
  ._commodity_page_left{
    width: 25%;
    border: 1px solid #f2f2f2;
    margin-right: 10px;
  }
  .toolbar{
    background-color: #fff;
  }
  ._commodity_page_right{
    width: 80%;
    height: 100%;
    border: 1px solid #f2f2f2;
    padding-top: 15px;
  }
  ._commodity_page_right ._commodity_page_right_top{
    display: flex;
    border-bottom: 1px solid #f2f2f2;
    padding-bottom: 20px;
  }
  ._page_right_img{
    width: 18%;
    padding-left: 10px;
  }
  ._page_right_img img{
    width: 100%;
    margin-top: 10px;
  }
  ._page_right_content{
    width: 82%;
    display: flex;
  }
  ._page_right_content_detailed ._page_right_content_detailed_content{
    display: flex;
    flex-wrap: wrap;
    padding-left: 20px;
  }
  ._page_right_content_detailed ._page_right_content_detailed_content li{
    width: 50%;
    display: flex;
    line-height: 50px;
  }
  ._page_right_content_detailed ._page_right_content_detailed_content li span{
    font-size: 16px;
    margin-right: 10px;
  }
  ._page_right_content_detailed ._page_right_content_detailed_content li p{
    flex: 1;
    font-size:16px;
  }
  ._page_right_content_detailed{
    width: 85%;
  }
  ._identity,._address{
    width: 100%!important;
    display: flex;
  }
  ._identity span,._address span{
    margin-right: 10px;
  }
  ._identity p,._address p{
    flex: 1;
  }
  ._page_right_content_btn{
    width: 15%;
    padding-right: 20px;
  }
  ._page_right_content_btn button{
    width: 100%;
  }
  ._commodity_page_right_bottom ul{
    display: flex;
    font-family: PingFangSC-Medium;
    font-size: 18px;
    color: #3685D7;
    letter-spacing: 0.62px;
  }
  ._commodity_page_right_bottom ul li{
    width: 14%;
    line-height: 50px;
    text-align: center;
  }
  ._commodity_page_right_bottom ul .router-link-active{
    font-family: PingFangSC-Medium;
    font-size: 18px;
    color: #3685D7;
    letter-spacing: 0;
    position: relative;
  }
  ._commodity_page_right_bottom ul .router-link-active:before{
    background: #409EFF;
    border-radius: 2px;
    content: '';
    height: 3px;
    position: absolute;
    top: 25px;
    width: 50px;
    left: 50%;
    transform: translate(-50%,0)
  }
  ._commodity_page_right_bottom ul li a{
    color : #000;
    text-decoration: none;
  }
</style>
