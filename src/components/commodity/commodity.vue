<template>
  <div class="_commodity_page">
    <div class="_commodity_page_left">
      <el-col :span="50" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true">
          <el-form-item>
            <el-input v-model="filters" placeholder="请输入手机号或用户名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="srarch">查询</el-button>
          </el-form-item>
          <!-- <el-form-item>
            <el-button type="primary" @click="getUsers">高级搜索</el-button>
          </el-form-item> -->
          <el-form-item>
            <router-link to="/commodityNewlyAdded"><el-button type="primary">+新增会员</el-button></router-link>
          </el-form-item>
        </el-form>
      </el-col>
      <el-table style="100%" :data="user" :row-class-name="tableRowClassName" @row-click="handle">
        <el-table-column prop="UserInfo.Name" label="姓名"></el-table-column>
        <el-table-column label="性别">
          <template slot-scope="scope">
            {{scope.row.UserInfo.Sex == 1 ? '男' : '女'}}
          </template>
        </el-table-column>
        <el-table-column prop="UserInfo.Age" label="年龄"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button size="small" @click="SelectData(scope.$index, scope.row)">查看</el-button>
            </template>
          </el-table-column>
      </el-table>
     <!-- 表格分页 -->
      <el-pagination small @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="totalItems"></el-pagination>
    </div>
    <div class="_commodity_page_right">
      <div class="_commodity_page_right_top">
        <div class="_page_right_img" v-if="item.UserInfo">
        <img :src="item.UserInfo.HeadUrl" :onerror="defaultImg"/>
        </div>
        <div class="_page_right_content" v-if="item.UserInfo">
          <div class="_page_right_content_detailed">
            <ul :class="detailFlag ? '_page_right_content_detailed_content _page_right_content_detailed_content_Flag' : '_page_right_content_detailed_content'" >
              <li>
                <span>姓名:</span>
                <p v-if="item.UserInfo">{{item.UserInfo.Name}}</p>
              </li>
              <li>
                <span>性别:</span>
                <p>{{item.UserInfo.Sex == 1 ? '男' : '女'}}
                  <!-- <span v-if="item.UserInfo.Sex==1">男</span>
                  <span v-if="item.UserInfo.Sex==2">女</span> -->
                </p>
              </li>
              <li>
                <span>年龄:</span>
                <p>{{item.UserInfo.Age}}岁</p>
              </li>
              <li>
                <span>生日:</span>
                <p>{{item.UserInfo.Birthday}}</p>
              </li>
              <li>
                <span>手机:</span>
                <p>{{item.UserInfo.Telephone}}</p>
              </li>
              <li>
                <span>电话:</span>
                <p>{{item.UserInfo.Phone}}</p>
              </li>
              <li>
                <span>身份证号:</span>
                <p>{{item.UserInfo.CardId}}</p>
              </li>
              <li>
                <span>联系地址:</span>
                <p>{{item.UserInfo.Addr}}</p>
              </li>
              <li>
                <span>身高:</span>
                <p>{{item.UserInfo.Height}}CM</p>
              </li>
              <li>
                <span>体重:</span>
                <p>{{item.UserInfo.Weight}}KG</p>
              </li>
              <li>
                <span>监护人姓名:</span>
                <p v-for="(list,index) in item.UserInfo.Guardian" :key="index">{{list.Name}}</p>
              </li>
              <li>
                <span>监护人手机号:</span>
                <p v-for="(list,index) in item.UserInfo.Guardian" :key="index">{{list.Phone}}</p>
              </li>
              <li>
                <span>紧急联系人姓名:</span>
                <p v-for="(list,index) in item.UserInfo.Linkman" :key="index">{{list.Name}}</p>
              </li>
              <li>
                <span>紧急联系人手机号:</span>
                <p v-for="(list,index) in item.UserInfo.Linkman" :key="index">{{list.Phone}}</p>
              </li>
            </ul>
            <!-- <el-form>
              <el-form-item>
                <el-button type="primary" @click="detail">{{detailText}}</el-button>
              </el-form-item>
            </el-form> -->
          </div>
          <div class="_page_right_content_btn">
            <el-form>
              <el-form-item>
                <el-button type="primary" @click="editClick">编辑</el-button>
              </el-form-item>
              <el-form-item>
                <!-- <template slot-scope="scope">
                  <el-button type="danger" icon="el-icon-delete" @click="reveClick(scope.$index, scope.row)">删除</el-button>
                </template> -->
                <!-- <el-button type="primary" @click="reveClick(scope.$index, scope.row)">删除</el-button> -->
                <el-button type="danger" icon="el-icon-delete" @click="reveClick">删除</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <div class="_commodity_page_right_bottom">
        <ul>
          <li><router-link to="/commodity/integration">最新动态</router-link></li>
          <li><router-link to="/commodity/ConsultationManagement">健康管理</router-link></li>
          <li><router-link to="/commodity/HealthAgreement">安全管理</router-link></li>
          <li><router-link to="/commodity/MedicalRecords">健康咨询</router-link></li>
          <li><router-link to="/commodity/deviceManagement">健康档案</router-link></li>
          <li><router-link to="/commodity/SafetyMonitoring">健康资料</router-link></li>
          <li><router-link to="/commodity/commodityn">设备管理</router-link></li>
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
      defaultImg:'this.src="' + require('../../assets/logo.png') + '"',
      filters:'',
      dialogImageUrl: '',
      dialogVisible: false,
      addForm:{
        name:'',
        date:'',
        read:'',
        issue:'',
        name1: '',
        desc : ''
      },
      user : [],
      userListLeng : '',
      detailFlag : false,
      detailText : '查看详情',
      item:{},
      list:{},
      currentPage: 1, //初始页
      pageSize: 10,
      totalItems: 0,
      BelongInfoList : [],
      index : 0
    }
  },
  methods : {
     tableRowClassName ({row, rowIndex}) {
       //把每一行的索引放进row
        row.index = rowIndex;
    },
    handle(row, event, column) {
      console.log(row, event, column)
      this.user.map((item,index)=>{
        if(row.Id === item.Id){
          // this.index = index;
        }
      })
      this.index = row.index;
      this.item = row;
    },
    //查询
    srarch(){
      console.log(this.user)
      if(this.filters!= ''){
        var Obj = sessionStorage.getItem('role');
        if(Obj){
          Obj = JSON.parse(Obj);
          let url1 = `/api/v1/staff/${Obj.AccountId}/alluserinfos?page=${this.currentPage}&row=${this.pageSize}&name=${this.filters}&phone=${this.filters}`;
          this.$api.staff.getAllUserInfo(url1).then(res=>{
            console.log(res)
            this.totalItems = res.data.Obj.length
            let arr = [];
            for(var item of res.data.Obj){
              arr = arr.concat(item)
            }
            if (arr.length === 0) return;
            this.user = arr;
            console.log(this.user)
            this.item = arr[0];
        })
      }
    }else{
      this.loginUser()
    }
  },
  //删除
  reveClick(){
    console.log(this.BelongInfoList)
    console.log(this.index)
    const index = this.index
    console.log(this.index,'111')
    let companyId = this.BelongInfoList[index].BelongInfo[0].split(',')[0];
    // let stationId = this.BelongInfoList[index].BelongInfo[0].split(',')[];
    console.log(companyId)
    // console.log(stationId,'111')
    if(companyId === '-1'){
      companyId = this.BelongInfoList[index].BelongInfo[0].split(',')[2];
    }
    // debugger
    let accountId=this.BelongInfoList[index].UserInfo.AccountId;
    // return;
      // `/api/v1/stafftostation?accountId=${row.AccountId}&stationId=${companyId}`)
    var url = "/api/v1/station/"+companyId+"/user?accountId="+accountId
    this.$api.staff.deleteStafftocompany(url).then(res=>{
      console.log(res)
      // debugger
      this.loginUser()
        
    })
  },
    /**
     * handleSizeChange 列表一页的数量进行改变
     * @param val 改变的数量
     */
    handleSizeChange(val) {
      console.log(val)
      this.pageSize = val;
      this.loginUser()
      // this.handleCurrentChange(this.currentPage)
    },
    /**
     * handleCurrentChange 列表页数进行改变
     * @param val 改变的页数
     */
    handleCurrentChange(val) {
      console.log(val)
      this.currentPage = val;
      this.loginUser()
    },
    //编辑
    editClick(){
      // debugger
      var str = ''
      var bi = this.item.BelongInfo
      bi.forEach(function(item, i) {
        var stationInfo = item.split(",")
        var sId = stationInfo[2]
        if (i !== 0) {
          str += ','
        }
        str += sId
      })
      // debugger
      // 驿站信息存储SessionStratoger
      this.$router.push({
        path:'/commodityNewlyAdded',
        query:{
          id:this.item.Id,
          str: str
        }
      });
    },
    loginUser(){
      var Obj = sessionStorage.getItem('role');
      let content = sessionStorage.getItem('content')
      if (Obj) {
        Obj = JSON.parse(Obj);
        let url2 = `/api/v1/staff/${Obj.AccountId}/alluser/cnt`;
        let data = {accountId:Obj.AccountId,excludeAccountIds:[]};
        this.$api.staff.getAllUserNum(url2,data).then(res=>{
          console.log(res)
          this.totalItems = res.data.Obj
          this.userListLeng = res.data.Obj
        })
        console.log(Obj.AccountId)
        let url1 = `/api/v1/staff/${Obj.AccountId}/alluserinfos`+"?page="+this.currentPage+"&row="+this.pageSize
        this.$api.staff.getAllUserInfo(url1).then(res=>{
          let arr = [];
          var date = new Date();
          for(var item of res.data.Obj){
            item.UserInfo.Birthday = new Date(+new Date(item.UserInfo.Birthday) + 16 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
            var string = item.UserInfo.Birthday.trim().split(" ")
            item.UserInfo.Birthday = string[0]
            item.UserInfo.Age = parseInt(date.getFullYear()) - parseInt(string[0].substring(0,4))
            arr = arr.concat(item)
          }
          // for(let i=0;i<arr.length;i++){
          //   if(arr[i].Sex === 1){
          //     arr[i].Sex = "男"
          //   }else{
          //     arr[i].Sex = "女"
          //   }
          // }
          this.user = arr;
          this.BelongInfoList = res.data.Obj;
          // sessionStorage.setItem('listBelong',JSON.stringify(this.BelongInfoList))
          console.log(this.BelongInfoList);
          this.index = 0;
          this.item = arr[0];
        })
      }
    },
    detail(){
      // if(this.detailFlag){
      //   this.detailFlag = false;
      //   this.detailText = '查看详情'
      // }
      // else{
      //   this.detailFlag = true;
      //   this.detailText = '收回'
      // }
      // this.detailFlag = true;
    },
    SelectData(index,row){
      sessionStorage.setItem('AccountId', row.UserInfo.AccountId);
    }
  },
  mounted(){

    this.loginUser()
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
  ._commodity_page_left .el-pagination{
    text-align: center;
    margin-top: 10px;
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
  }
  ._page_right_img{
    width: 18%;
    height: 200px;
    margin-left: 10px;
    border: 1px solid #e1e1e1;
  }
  ._page_right_img img{
    width: 100%;
    height: 100%;
    border-radius: 5px;
    /* margin-top: 10px; */
  }
  ._page_right_content{
    width: 82%;
    display: flex;
  }
  ._page_right_content_detailed ._page_right_content_detailed_content{
    display: flex;
    flex-wrap: wrap;
    padding-left: 20px;
    height: auto;
    overflow: hidden;
  }
  ._page_right_content_detailed_content_Flag{
    height: auto!important;
    /* overflow: hidden; */
  }
  ._page_right_content_detailed ._page_right_content_detailed_content li{
    width: 50%;
    display: flex;
    line-height: 50px;
    color: #606266;
  }
  ._page_right_content_detailed ._page_right_content_detailed_content li span{
    font-size: 12px;
    margin-right: 10px;
  }
  ._page_right_content_detailed ._page_right_content_detailed_content li p{
    flex: 1;
    font-size:14px;
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
    /* font-family: PingFangSC-Medium;
    font-size: 12px;
    color: #3685D7;
    letter-spacing: 0.62px; */
  }
  ._commodity_page_right_bottom ul li{
    width: 14%;
    line-height: 45px;
    text-align: center;
  }
  ._commodity_page_right_bottom ul .router-link-active{
    font-family: PingFangSC-Medium;
    font-size: 12px;
    color: #3685D7;
    letter-spacing: 0.62px;
    position: relative;
  }
  ._commodity_page_right_bottom ul .router-link-active:before{
    background: #409EFF;
    border-radius: 2px;
    content: '';
    height: 3px;
    position: absolute;
    top: 32px;
    width: 45px;
    left: 50%;
    transform: translate(-50%,0);
  }
  ._commodity_page_right_bottom ul li a{
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #333333;
    letter-spacing: 0.62px;
    text-decoration: none;
  }
</style>
