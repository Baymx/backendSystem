<template>
  <div class="nursing">
    <el-row class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" class="nursing_form">
        <div class="">
          <el-form-item>
            <el-input v-model="searchForm.nameOrphone" placeholder="请输入名称或手机号" style="width:220px;font-size:12px;"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="srarch">查询</el-button>
          </el-form-item>
        </div>
        <div class="">
          <el-form-item style="float:right;">
            <el-button-group>
              <el-button type="primary" @click=" addFormVisible = true">+新增</el-button>
            </el-button-group>
          </el-form-item>
        </div>
      </el-form>
    </el-row>
    <el-table :data="tableList" style="width: 100%">
      <el-table-column fixed type="index" label="序号" :index="roleIndexMethod"></el-table-column>
      <el-table-column prop="StaffInfo.HeadUrl" label="头像">
        <template slot-scope="scope">
          <img style="width:50px;height:50px" @click="imgBtn(scope.row.StaffInfo,BusinessLicenseImg)" :src="scope.row.StaffInfo.HeadUrl" />
        </template>
      </el-table-column>
      <el-table-column prop="StaffInfo.Name" label="姓名"></el-table-column>
      <el-table-column prop="StaffInfo.Sex" label="性别">
        <template slot-scope="scope">
          <span> {{ scope.row.StaffInfo.Sex == 0 ? "男" : "女" }}</span>
        </template>
      </el-table-column>
       <el-table-column prop="StaffInfo.Birthday" label="出生日期">
        <template slot-scope="scope">
          <span> {{ dateFormat( scope.row.StaffInfo.Birthday, true) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="StaffInfo.Phone" label="联系电话"></el-table-column>
       <el-table-column prop="CompanyId" label="所属机构">
        <template slot-scope="scope">
          <span> {{ scope.row.BelongInfo[0].split(',')[1] }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="StationId" label="所属驿站">
        <template slot-scope="scope">
          <span> {{ scope.row.BelongInfo[0].split(',')[3] }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="StaffInfo.State" label="状态">
        <template slot-scope="scope">
          <span> {{ scope.row.StaffInfo.State == 0 ? "启用" : "禁用" }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="StaffInfo.CreateTime" label="创建时间">
        <template slot-scope="scope">
          <span> {{ dateFormat( scope.row.StaffInfo.CreateTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="140">
        <template slot-scope="scope">
          <el-button size="small" icon="el-icon-edit" @click="EditData(scope.$index, scope.row)"></el-button>
          <el-button type="danger" size="small" icon="el-icon-delete" @click="deleteData(scope.$index, scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 15, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalItems">
    </el-pagination>

    <!--新增界面-->
    <el-dialog title="新增" v-if="addFormVisible" :visible.sync="addFormVisible" width="50%" :before-close="handleClose">
      <div class="dialog-body">
        <div class="from">
          <el-form :model="addForm" :rules="rules" label-width="120px" ref="addForm">
            <el-form-item label="所属机构" prop="CompanyId">
              <el-select v-model="addForm.CompanyId" style="width:100%" placeholder="请选择">
                <el-option v-for="item in companyOpption" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="所属驿站" prop="StationId">
              <el-select v-model="addForm.StationId	" style="width:100%" placeholder="请选择">
                <el-option v-for="item in stationOpption" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="姓名" prop="Name" :rules="[{ required: true, message: '姓名不能为空'}]">
              <el-input v-model="addForm.Name" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="性别" prop="Sex">
              <el-radio-group v-model="addForm.Sex">
                <el-radio :label="0">男</el-radio>
                <el-radio :label="1">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="身份证号" prop="CardId">
              <el-input v-model="addForm.CardId" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="出生日期" prop="Birthday" :rules="[{ required: true, message: '请选择出生日期'}]">
              <el-date-picker v-model="addForm.Birthday" type="date" placeholder="出生日期" style="width:100%">
              </el-date-picker>
            </el-form-item>

            <el-form-item label="联系电话" prop="Phone">
              <el-input v-model="addForm.Phone" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="联系地址" prop="Addr" :rules="[{ required: true, message: '联系地址不能为空'}]">
              <el-input v-model="addForm.Addr" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="状态" prop="State">
              <el-radio-group v-model="addForm.State">
                <el-radio :label="0">启用</el-radio>
                <el-radio :label="1">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="账号" prop="AccountName">
              <el-input v-model="addForm.AccountName" auto-complete="off" placeholder="字母,数字,下划线,字母开头,4-16位"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="Passwd">
              <el-input v-model="addForm.Passwd" auto-complete="off" placeholder="数字+字母+特殊字符，6-20位"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="AccPasswd">
              <el-input v-model="addForm.AccPasswd" auto-complete="off" placeholder="数字+字母+特殊字符，6-20位"></el-input>
            </el-form-item>
            <el-form-item label="自我介绍" prop="SelfIntroduce" :rules="[{ required: true, message: '自我介绍不能为空'}]">
              <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="addForm.SelfIntroduce" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="logo">
          <div class="show-img" v-if="addForm.HeadUrl">
            <img :src="addForm.HeadUrl" class="avatar">
            <i class="el-icon-error uploader-delete" @click="addFormDelImg"></i>
          </div>
          <el-upload v-else class="avatar-uploader" :http-request="addUploadFile" action="http://210.76.124.66:86/api/v1/file/push" :show-file-list="false">
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="handleClose">取消</el-button>
          <el-button type="primary" @click.native="addSubmit('addForm')">提交</el-button>
        </div>
      </div>
    </el-dialog>

    <!--修改界面-->
    <el-dialog title="编辑" v-if="editFormVisible" :visible.sync="editFormVisible" width="50%" :before-close="editFormClose">
      <div class="dialog-body">
        <div class="from">
          <el-form :model="editForm" :rules="rules" label-width="120px" ref="editForm">
            <el-form-item label="所属机构" prop="CompanyId">
              <el-select v-model="editForm.CompanyId" style="width:100%" placeholder="请选择">
                <el-option v-for="item in companyOpption" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="所属驿站" prop="StationId">
              <el-select v-model="editForm.StationId	" style="width:100%" placeholder="请选择">
                <el-option v-for="item in stationOpption" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="姓名" prop="Name" :rules="[{ required: true, message: '姓名不能为空'}]">
              <el-input v-model="editForm.Name" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="性别" prop="Sex">
              <el-radio-group v-model="editForm.Sex">
                <el-radio :label="0">男</el-radio>
                <el-radio :label="1">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="身份证号" prop="CardId">
              <el-input v-model="editForm.CardId" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="出生日期" :rules="[{ required: true, message: '请选择出生日期'}]">
              <el-date-picker v-model="editForm.Birthday" type="date" placeholder="出生日期" style="width:100%">
              </el-date-picker>
            </el-form-item>

            <el-form-item label="联系电话" prop="Phone">
              <el-input v-model="editForm.Phone" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="联系地址" prop="Addr" :rules="[{ required: true, message: '联系地址不能为空'}]">
              <el-input v-model="editForm.Addr" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="状态" prop="State">
              <el-radio-group v-model="editForm.State">
                <el-radio :label="0">启用</el-radio>
                <el-radio :label="1">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="自我介绍" prop="SelfIntroduce" :rules="[{ required: true, message: '自我介绍不能为空'}]">
              <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="editForm.SelfIntroduce" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="logo">
          <div class="show-img" v-if="editForm.HeadUrl">
            <img :src="editForm.HeadUrl" class="avatar">
            <i class="el-icon-error uploader-delete" @click="delectImg"></i>
          </div>
          <el-upload v-else class="avatar-uploader" :http-request="editUploadFile" action="http://210.76.124.66:86/api/v1/file/push" :show-file-list="false">
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="editFormClose">取消</el-button>
          <el-button type="primary" @click.native="editSubmit('editForm')">提交</el-button>
        </div>
      </div>
    </el-dialog>

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
      } else if (value !== this.addForm.Passwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      
      // 校验规则
      rules: {
        //主要通过validator来指定验证器名称
        CardId: [{ required: true, validator: validateCard, trigger: 'blur' }],
        Phone: [{ required: true, validator: validateTelephone, trigger: 'blur'}],
        AccountName: [{ required: true, validator: validateuserName, trigger: 'blur'}],
        Passwd: [
          { required: true, message: '请输入密码', trigger: 'blur'},
          { pattern: /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W_]).{6,20}$/, message: '密码为数字+字母+特殊字符，6-20位'},
          { required: true, validator: validatePass2, trigger: 'blur'}
        ],
        AccPasswd: [
          { required: true, message: '请输入密码', trigger: 'blur'},
          { required: true, validator: validatePass2, trigger: 'blur'}
        ]
      },
      department: "",
      typeData: [],
      //表格数据
      tableData: [],
      totalItems: 0, //列表条数
      currentPage: 1, //初始页
      pageSize: 5, //页数大小
      //列表查询条件
      searchForm: {
       nameOrphone: this.$route.query.nameOrphone,
      },
      //新增界面是否显示
      addFormVisible: false,
      //新增驿站的表单
      addForm: {
        CompanyId: "", //(integer, optional): 所属机构id
        StationId: "",
        Name: "", // (string, optional): 名称 ,
        Sex: 0, // (integer, optional): 性别,
        Birthday: "", //(string, optional): 生日 ,
        Weight: "", // (integer, optional): 体重g ,
        Height: "", // (integer, optional): 身高cm ,
        CardId: "", // (string, optional): 身份证号 ,
        Addr: "", //(string, optional): 地址 ,
        State: 0, // (integer, optional): 状态,
        Phone: "", // (string, optional): 联系电话 ,
        HeadUrl: "", //(string, optional): 头像 ,
        SelfIntroduce: "", // (string, optional): 自我介绍,
        AccountName: "",
        Passwd: "",
        AccPasswd:""
      },
      //修改
      editFormVisible: false,
      editForm: {
        CompanyId: "", //(integer, optional): 所属机构id
        StationId: "",
        Name: "", // (string, optional): 名称 ,
        Sex: "", // (integer, optional): 性别,
        Birthday: "", //(string, optional): 生日 ,
        Weight: "", // (integer, optional): 体重g ,
        Height: "", // (integer, optional): 身高cm ,
        CardId: "", // (string, optional): 身份证号 ,
        Addr: "", //(string, optional): 地址 ,
        State: "", // (integer, optional): 状态,
        Phone: "", // (string, optional): 联系电话 ,
        HeadUrl: "", //(string, optional): 头像 ,
        SelfIntroduce: "" // (string, optional): 自我介绍,
      },
      //机构列表
      companyOpption: [],
      //驿站列表
      stationOpption: [],
      //用户id
      accountId: ""
    };
  },
  computed: {
      tableList() {
          return this.tableData;
      }
  },
  /**
   * mounted 加载
   */
  mounted() {
    const role = sessionStorage.getItem("role");
    if (role) {
      const accountId = JSON.parse(role).AccountId;
      this.accountId = accountId;
    }
    this.getListData();
    this.const();
  },
  methods: {
    roleIndexMethod(index) {
      return (this.currentPage - 1) * this.pageSize + index + 1;
    },
    /**
     * const 获取常量
     */
    const() {
      this.$http.get(`/api/v1/staff/${this.accountId}/company`)
      .then(res => {
        res.data.Obj.map(item => {
          this.companyOpption.push({
            value: item.Id + "",
            label: item.Name
          });
        });
      });
      this.$http.get(`/api/v1/user/${this.accountId}/station`)
      .then(res => {
        res.data.Obj.map(item => {
          this.stationOpption.push({
            value: item.Id + "",
            label: item.Name
          });
        });
        console.log(this.stationOpption);
      });
    },
    /**
     * handleSizeChange 列表一页的数量进行改变
     * @param val 改变的数量
     */
      handleSizeChange(val) {
        this.pageSize = val;
        this.getListData();
      },
      /**
       * handleCurrentChange 列表页数进行改变
       * @param val 改变的页数
       */
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getListData();
      },
      /**
       * dateFormat 时间格式化
       * @param date 时间戳
       * @returns currentdate  格式化时间    YYYY-MM-DD HH:MM:SS
       */
      dateFormat(date, flag) {
        var flag = flag || false;
        var date = new Date(date);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        if (hour >= 0 && hour <= 9) {
          hour = "0" + hour;
        }
        if (minute >= 0 && minute <= 9) {
          minute = "0" + minute;
        }
        if (second >= 0 && second <= 9) {
          second = "0" + second;
        }
        if (flag) {
          return year + "-" + month + "-" + strDate;
        } else {
          var currentdate =
          year +
          "-" +
          month +
          "-" +
          strDate +
          " " +
          hour +
          ":" +
          minute +
          ":" +
          second;
          return currentdate;
        }
      },
      //查询数量
      getnumber(){
        const role = sessionStorage.getItem('role')
        if(role) {
          const accountId = JSON.parse(role).AccountId;
          this.accountId = accountId;
          const excludeAccountIds = []; 
          const nameOrphone = this.searchForm.nameOrphone
          this.$http.post(`/api/v1/staff/${this.accountId}/allstaff/cnt?nameOrphone=${nameOrphone}`,excludeAccountIds)
          .then(res=>{
            console.log(res.data.Obj)
            this.totalItems = res.data.Obj
          })
        }
      },
      //查询
      srarch(){
        const role = sessionStorage.getItem('role')
        if(role) {
          const accountId = JSON.parse(role).AccountId;
          this.accountId = accountId;
          const excludeAccountIds = []; 
          const nameOrphone = this.searchForm.nameOrphone
          this.$router.replace({
            path:'/integral',
            query:Object.assign({},this.$route.query,this.searchForm)
          })
          this.$http.post(`/api/v1/staff/${this.accountId}/allstaffinfos?nameOrphone=${nameOrphone}`,excludeAccountIds)
          .then(res =>{
            console.log(res)
            this.tableData = res.data.Obj || []
            this.currentPage = 1;
            this.getnumber()
          })
        }
      },
      // currentChangePage(nursing, currentPage) {
      //   let from = (this.currentPage - 1) * this.pagesize;
      //   let to = this.currentPage * this.pagesize;
      //   for (; from < to; from++) {
      //     if (nursing[from]) {
      //         this.data.push(nursing[from]);
      //     }
      //   }
      // },
      /**
       * addUploadFile 新增上传文件
       * @param params 改变的数量
       */
      addUploadFile(params) {
        const _file = params.file;
        var formData = new FormData();
        let fileName = _file.name.split(",");
        formData.append("file", _file);
        formData.append("accountId", this.accountId);
        formData.append("extension", fileName[fileName.length - 1]);
        return this.$http.post(`/api/v1/file/push`, formData).then(res => {
            this.addForm.HeadUrl = res.data.Obj[0];
        });
      },
      /**
       * addFormDelImg 修改头像
       */
      addFormDelImg() {
        this.addForm.HeadUrl = "";
      },
      /**
       * handleClose 关闭新建页面
       */
      handleClose() {
        this.addFormVisible = false;
        this.addForm = {
          CompanyId: "", //(integer, optional): 所属机构id
          StationId: "",
          Name: "", // (string, optional): 名称 ,
          Sex: 0, // (integer, optional): 性别,
          Birthday: "", //(string, optional): 生日 ,
          Weight: "", // (integer, optional): 体重g ,
          Height: "", // (integer, optional): 身高cm ,
          CardId: "", // (string, optional): 身份证号 ,
          Addr: "", //(string, optional): 地址 ,
          State: 0, // (integer, optional): 状态,
          Phone: "", // (string, optional): 联系电话 ,
          HeadUrl: "", //(string, optional): 头像 ,
          SelfIntroduce: "", // (string, optional): 自我介绍,
          AccountName: "",
          Passwd: "",
          AccPasswd:""
        };
      },
      /**
       * addSubmit 新增
       * @param formName 表单名称
       */
      addSubmit(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            const StationId = this.addForm.StationId;
            const CompanyId = this.addForm.CompanyId;
            const _josn = {
              Info: this.addForm,
              accountName: this.addForm.AccountName,
              passwd: this.addForm.Passwd,
              AccPasswd: this.addForm.AccPasswd
            };
            if (StationId && StationId != "") {
              this.$http.post(`/api/v1/station/${StationId}/staff`, _josn)
              .then(res => {
                this.handleClose();
                this.getListData();
                // this.tableData.unshift(res.data.Obj)
                this.totalItems ++;
                this.currentPage = 1
              });
            } else {
              this.$http.post(`/api/v1/company/${CompanyId}/staffinfo`,_josn)
              .then(res=>{
                this.handleClose();
                this.getListData();
                // this.tableData.unshift(res.data.Obj)
                this.totalItems ++;
                this.currentPage = 1
              })
            }
          }else{
            console.log("error submit!!");
            return false;
          }
        });
      },
    /**
     * srarch 查询
     */
    // srarch() {
    //   var _josn = {};
    //   if (this.searchForm.stationName) {
    //     _josn["stationName"] = this.searchForm.stationName;
    //   }
    //   if (this.searchForm.phone) {
    //     _josn["phone"] = this.searchForm.phone;
    //   }
    //   if (this.searchForm.state) {
    //     _josn["state"] = this.searchForm.state;
    //   }
    //   _josn["AccountId"] = this.accountId;
    //   this.$http.get("/api/v1/station/search", _josn).then(res => {
    //     this.tableData = res.data.Obj || [];
    //     this.totalItems = this.tableData.length;
    //   });
    // },
      /**
       * getListData 获取列表信息
       */
      getListData() {
        const role = sessionStorage.getItem("role");
        if (role) {
          const accountId = JSON.parse(role).AccountId;
          this.accountId = accountId;
          const excludeAccountIds = [];
          this.$http.post(`/api/v1/staff/${this.accountId}/allstaff/cnt`)
          .then(res => {
            if (res.data.Obj > 0) {
              this.totalItems = res.data.Obj;
              var row = '';
              if(this.pageSize * this.currentPage > this.totalItems && this.totalItems % this.pageSize > 0){
                row = this.totalItems % this.pageSize
              }else{
                row = this.pageSize;
              }
              this.$http.post(`/api/v1/staff/${this.accountId}/allstaffinfos?page=${this.currentPage}&row=${row}&phone=${this.searchForm.phone}&name=${this.searchForm.name}`,excludeAccountIds)
              .then(res => {
                console.log(res);
                this.tableData = res.data.Obj;
                console.log(this.tableData)
              });
            }
          });
        }
      },
      /**
       * deleteData 列表中删除
       * @param index s 列表的index
       * @param row  列表的一条数据
       */
      deleteData: function(index, row) {
        console.log(row);
        this.$confirm("确认删除该记录吗？", "提示", {
            type: "warning"
        }).then(() => {
          console.log(row);
          console.log(row.BelongInfo[0].split(",")[2]);
          const stationId = row.BelongInfo[0].split(",")[2];
          const companyId = row.BelongInfo[0].split(",")[0];
          const AccountId = row.StaffInfo.AccountId;
          if (stationId) {
            var _josn = {
                accountId: AccountId,
                stationId: stationId
            };
            this.$http.delete("/api/v1/stafftostation?accountId=" +AccountId +"&stationId=" +stationId,_josn)
            .then(res => {
              this.$http.delete( "/api/v1/staffinfo?id=" + row.StaffInfo.Id)
              .then(res => {
                this.getListData();
              });
            });
          } else {
            var _josn = {
              accountId: AccountId,
              companyId: companyId
            };
            this.$http.delete("/api/v1/stafftocompany?accountId=" +AccountId +"&companyId=" +companyId,_josn)
            .then(res => {
              this.$http.delete("/api/v1/staffinfo?id=" + row.StaffInfo.Id)
                .then(res => {
                  this.getListData();
                });
              });
            }
        });
      },
      /**
       * EditData 显示列表
       * @param index s 列表的index
       * @param row  列表的一条数据
       */
      EditData(index, row) {
        if (row.StaffInfo) {
          const stationId = row.BelongInfo[0].split(",")[2];
          const companyId = row.BelongInfo[0].split(",")[0];
          if (companyId == -1) {
            this.editForm.StationId = stationId;
          } else if (stationId == -1) {
            this.editForm.CompanyId = companyId;
          }
          this.editForm = Object.assign(this.editForm, row.StaffInfo);
          // this.editForm = Object.assign(this.editForm, _josn);
          this.editFormVisible = true;
          console.log(this.editForm);
        }
      },
      /**
       * editFormClose 关闭修改弹出层
       */
      editFormClose() {
        this.editFormVisible = false;
        this.editForm = {
          CompanyId: "", //(integer, optional): 所属机构id
          StationId: "",
          Name: "", // (string, optional): 名称 ,
          Sex: "", // (integer, optional): 性别,
          Birthday: "", //(string, optional): 生日 ,
          Weight: "", // (integer, optional): 体重g ,
          Height: "", // (integer, optional): 身高cm ,
          CardId: "", // (string, optional): 身份证号 ,
          Addr: "", //(string, optional): 地址 ,
          State: "", // (integer, optional): 状态,
          Phone: "", // (string, optional): 联系电话 ,
          HeadUrl: "", //(string, optional): 头像 ,
          SelfIntroduce: "" // (string, optional): 自我介绍,
        };
      },
      editSubmit(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.$http.put(`/api/v1/staffinfo`, this.editForm)
            .then(res => {
              this.editFormClose();
              this.getListData();
            });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      /**
       * delectImg 修改头像
       */
      delectImg() {
        this.editForm.HeadUrl = "";
      },
      /**
       * editUploadFile 新增上传文件
       * @param params 改变的数量
       */
      editUploadFile(params) {
        const _file = params.file;
        var formData = new FormData();
        let fileName = _file.name.split(",");
        formData.append("file", _file);
        formData.append("accountId", this.accountId);
        formData.append("extension", fileName[fileName.length - 1]);
        return this.$http.post(`/api/v1/file/push`, formData).then(res => {
          this.editForm.HeadUrl = res.data.Obj[0];
        });
      }
    }
};
</script>
<style lang="scss">
.el-table .cell {
    height: 50px;
}
</style>

<style lang="scss" scoped>
.dialog-body {
    .from {
        width: 380px;
    }
    .logo {
        position: absolute;
        top: 50px;
        right: 100px;
        .show-img {
            width: 120px;
            height: 120px;
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
    /*上传组件样式*/
    .avatar-uploader {
        border: 1px solid #d9d9d9 !important;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
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
    .dialog-footer {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 30px;
    }
}
.nursing_form {
    display: flex;
    justify-content: space-between;
}
</style>
