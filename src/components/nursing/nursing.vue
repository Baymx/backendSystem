<template>
  <div class="nursing">
    <el-row class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" class="nursing_form">
        <div class="">
          <el-form-item>
            <el-input v-model="searchForm.stationName" placeholder="请输入名称" style="width:220px;font-size:12px;"></el-input>
            <el-input v-model="searchForm.phone" placeholder="请输入手机号" style="width:220px;font-size:12px;"></el-input>
          </el-form-item>
          <!-- <el-form-item label="状态" prop="date">
                        <el-select v-model="searchForm.state" placeholder="全部类型" style="width:130px;">
                            <el-option style="height:45px;" v-for="item in stateSelectOpption" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item> -->
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
      <el-table-column fixed prop="Id" label="序号"></el-table-column>

      <el-table-column prop="CompanyId" label="所属机构">
        <template slot-scope="scope">
          <span> {{ CompanyFilter(scope.row.CompanyId) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="CompanyId" label="所属驿站">
        <!-- <template slot-scope="scope">
          <span> {{ CompanyFilter(scope.row.CompanyId) }}</span>
        </template> -->
      </el-table-column>
      <el-table-column prop="Name" label="姓名"></el-table-column>
      <el-table-column prop="Sex" label="性别">
        <template slot-scope="scope">
          <span> {{ scope.row.Sex == 0 ? "男" : "女" }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="Birthday" label="出生日期">
        <template slot-scope="scope">
          <span> {{ dateFormat( scope.row.Birthday, true) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="Phone" label="联系电话"></el-table-column>
      <el-table-column prop="Addr" label="联系地址"></el-table-column>
      <el-table-column prop="State" label="状态">
        <template slot-scope="scope">
          <span> {{ scope.row.State == 0 ? "启用" : "禁用" }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="HeadUrl" label="头像">
        <template slot-scope="scope">
          <img style="width:50px;height:50px" @click="imgBtn(scope.row.BusinessLicenseImg)" :src="scope.row.HeadUrl" />
        </template>
      </el-table-column>
      <el-table-column prop="CreateTime" label="创建时间">
        <template slot-scope="scope">
          <span> {{ dateFormat( scope.row.CreateTime) }}</span>
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
          <el-form :model="addForm" label-width="120px" ref="addForm">
            <el-form-item label="所属机构" prop="CompanyId" :rules="[{ required: true, message: '请选择所属机构'}]">
              <el-select v-model="addForm.CompanyId" style="width:100%" @change="companyChange" placeholder="请选择">
                <el-option v-for="item in companyOpption" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="所属驿站" prop="StationId">
              <el-select v-model="addForm.StationId	" style="width:100%" placeholder="请选择">
                <el-option v-for="item in postOpption" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="账号" prop="AccountName" :rules="[{ required: true, message: '账号不能为空'}]">
              <el-input v-model="addForm.AccountName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="Passwd" :rules="[{ required: true, message: '密码不能为空'}]">
              <el-input v-model="addForm.Passwd" auto-complete="off"></el-input>
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
            <el-form-item label="身份证号" prop="CardId" :rules="[{ required: true, message: '身份证号不能为空'}]">
              <el-input v-model="addForm.CardId" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="出生日期" :rules="[{ required: true, message: '请选择出生日期'}]">
              <el-date-picker v-model="addForm.Birthday" type="date" placeholder="出生日期" style="width:100%">
              </el-date-picker>
            </el-form-item>

            <el-form-item label="联系电话" prop="Phone" :rules="[{ required: true, message: '联系电话不能为空'}]">
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
          <el-upload v-else class="avatar-uploader" :http-request="addUploadFile" action="http://210.76.124.110:86/api/v1/file/push" :show-file-list="false">
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="handleClose">取消</el-button>
          <el-button type="primary" @click.native="addSubmit('addForm')">提交</el-button>
        </div>
      </div>
    </el-dialog>

  </div>
</template>
<script>
export default {
    data() {
        return {
            department: "",
            typeData: [],
            currentPage: 1, //初始页
            pagesize: 5,
            totalItems: 0,
            //表格数据
            tableData: [],
            totalItems: 0, //列表条数
            currentPage: 1, //初始页
            pageSize: 5, //页数大小
            //列表查询条件
            searchForm: {
                stationName: "",
                phone: "",
                state: "",
                accountId: ""
            },
            //新增界面是否显示
            addFormVisible: false,
            //新增驿站的表单
            addForm: {
                CompanyId: "", //(integer, optional): 所属机构id
                StationId: "",
                Name: "", // (string, optional): 名称 ,
                Sex: 0, // (integer, optional): 性别,
                Birthday: "", //(string, optional): 生日 ,
                Weight: "", // (integer, optional): 体重g ,
                Height: "", // (integer, optional): 身高cm ,
                CardId: "", // (string, optional): 身份证号 ,
                Addr: "", //(string, optional): 地址 ,
                State: 0, // (integer, optional): 状态,
                Phone: "", // (string, optional): 联系电话 ,
                HeadUrl: "", //(string, optional): 头像 ,
                SelfIntroduce: "", // (string, optional): 自我介绍,
                AccountName: "",
                Passwd: ""
            },
            //机构列表
            companyOpption: [],
            //驿站列表
            postOpption: [],
            //用户id
            accountId: ""
        };
    },
    computed: {
        tableList() {
            return this.tableData.slice(
                (this.currentPage - 1) * this.pageSize,
                this.currentPage * this.pageSize
            );
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
        /**
         * const 获取常量
         */
        const() {
            this.$http
                .get(`/api/v1/staff/${this.accountId}/company`)
                .then(res => {
                    res.data.Obj.map(item => {
                        this.companyOpption.push({
                            value: item.Id,
                            label: item.Name
                        });
                    });
                });
        },
        /**
         * handleSizeChange 列表一页的数量进行改变
         * @param val 改变的数量
         */
        handleSizeChange(val) {
            this.pageSize = val;
        },
        /**
         * handleCurrentChange 列表页数进行改变
         * @param val 改变的页数
         */
        handleCurrentChange(val) {
            this.currentPage = val;
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
        CompanyFilter(id) {
            console.log(id);
            var value = "";
            this.companyOpption.map(item => {
                if (id == item.value) {
                    value = item.label;
                    return;
                }
                return;
            });
            return value;
        },
        currentChangePage(nursing, currentPage) {
            let from = (this.currentPage - 1) * this.pagesize;
            let to = this.currentPage * this.pagesize;
            for (; from < to; from++) {
                if (nursing[from]) {
                    this.data.push(nursing[from]);
                }
            }
        },
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
                CompanyId: "", //(integer, optional): 所属机构id
                Name: "", //(string, optional): 名称
                DescDetail: "", // (string, optional): 机构详情
                Address: "", //(string, optional): 地址
                State: "", //(integer, optional): 状态，字典获取
                Expired: "", //(string, optional): 到期时间
                ResponsiblePersonName: "", //(string, optional): 负责人姓名
                ResponsiblePersonSex: 0, //(integer, optional): 负责人性别，字典接口获取
                ResponsiblePersonPhone: "" //(string, optional): 负责人联系
            };
        },
        /**
         * srarch 查询
         */
        srarch() {
            var _josn = {};
            if (this.searchForm.stationName) {
                _josn["stationName"] = this.searchForm.stationName;
            }
            if (this.searchForm.phone) {
                _josn["phone"] = this.searchForm.phone;
            }
            if (this.searchForm.state) {
                _josn["state"] = this.searchForm.state;
            }
            _josn["AccountId"] = this.accountId;
            this.$http.get("/api/v1/station/search", _josn).then(res => {
                this.tableData = res.data.Obj || [];
                this.totalItems = this.tableData.length;
            });
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
                        passwd: this.addForm.Passwd
                    };
                    if (StationId && StationId != "") {
                        this.$http
                            .post(`/api/v1/station/${StationId}/staff`, _josn)
                            .then(res => {
                                this.handleClose();
                                this.getListData();
                            });
                    } else {
                        this.$http
                            .post(`/api/v1/station/${CompanyId}/staff`, _josn)
                            .then(res => {
                                this.handleClose();
                                this.getListData();
                            });
                    }
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        /**
         * getListData 获取列表信息
         */
        getListData() {
            const role = sessionStorage.getItem("role");
            if (role) {
                const accountId = JSON.parse(role).AccountId;
                this.accountId = accountId;
                const excludeAccountIds = [];
                this.$http
                    .post(
                        `/api/v1/staff/${this.accountId}/allstaffinfos?page=
                    ${this.currentPage}&row=${this.pageSize}
                    &excludeAccountIds=${excludeAccountIds}`
                    )
                    .then(res => {
                        console.log(res);
                        this.tableData = res.data.Obj || [];
                        this.totalItems = this.tableData.length;
                    });
            }
        },
        /**
         * deleteData 列表中删除
         * @param index s 列表的index
         * @param row  列表的一条数据
         */
        deleteData: function(index, row) {
            this.$confirm("确认删除该记录吗？", "提示", {
                type: "warning"
            }).then(() => {
                console.log(row);
                if (row.StationId) {
                    this.$http
                        .delete("/api/v1/staffinfo?accountId=" + row.AccountId + "&stationId="+row.StationId, row)
                        .then(res => {
                           
                        });
                } else {
                  this.$http
                        .delete("/api/v1/staffinfo?accountId=" + row.AccountId + "&companyId="+row.StationId, row)
                        .then(res => {
                            
                        });
                }
                this.$http
                    .delete("/api/v1/staffinfo?id=" + row.Id, row)
                    .then(res => {
                        this.getListData();
                    });
            });
        },
        /**
         * EditData 列表中删除
         * @param index s 列表的index
         * @param row  列表的一条数据
         */
        EditData(index, row) {},
        /**
         * companyChange 机构改变时调用
         * @param val 选择的值
         */
        companyChange(val) {
            console.log(val);
            this.$http.get(`/api/v1/company/${val}/station`).then(res => {
                res.data.Obj.map(item => {
                    this.postOpption.push({
                        value: item.Id,
                        label: item.Name
                    });
                });
            });
        }
    }
};
</script>
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
        border: 1px dashed #d9d9d9;
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
