<template>
  <div class="_Post_Management">
    <el-row class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" class="_Post_Management_form">
        <div class="_Post_Management_form_left">
          <el-form-item>
            <el-input v-model="filters" placeholder="请输入名称/手机查询关键字"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="date">
            <el-select v-model="department" placeholder="全部类型" style="width:130px;">
              <el-option style="height:45px;" v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getUsers">查询</el-button>
          </el-form-item>
        </div>
        <div class="_Post_Management_right">
          <el-form-item style="float:right;">
            <el-button-group>
              <el-button type="primary" @click=" addFormVisible = true">+新增</el-button>
              <el-button type="primary">修改</el-button>
              <el-button type="primary">删除</el-button>
            </el-button-group>
          </el-form-item>
        </div>
      </el-form>
    </el-row>
    <el-table :data="listData" style="width: 100%">
      <el-table-column fixed prop="name" label="序号"></el-table-column>
      <el-table-column prop="type" label="驿站名称"></el-table-column>
      <el-table-column prop="experience" label="所属机构"></el-table-column>
      <el-table-column prop="age" label="负责人"></el-table-column>
      <el-table-column prop="place" label="性别"></el-table-column>
      <el-table-column prop="education" label="联系电话"></el-table-column>
      <el-table-column prop="blood" label="驿站地址"></el-table-column>
      <el-table-column prop="zodiac" label="状态"></el-table-column>
      <el-table-column prop="constellation" label="创建时间"></el-table-column>
      <!-- <el-table-column fixed="right" label="操作" width="140">
      <template slot-scope="scope">
        <el-button size="small" icon="el-icon-edit" @click="compileEdit(scope.$index, scope.row)"></el-button>
        <el-button type="danger" size="small" icon="el-icon-delete" @click="deleteAdd(scope.$index, scope.row)"></el-button>
      </template>
    </el-table-column> -->
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 15, 20]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total='totalItems'>
    </el-pagination>

    <!--新增界面-->
    <el-dialog title="新增" :visible.sync="addFormVisible" width="30%" :before-close="handleClose">
      <div class="_order_elasticFrame" v-show="addFormVisible">
        <div class="_elastic_frame">
          <div class="el-dialog__body">
            <div class="_organization_from">
              <el-form :model="addForm" label-width="120px" ref="addForm">
                <el-form-item label="所属机构" prop="Type" :rules="[{ required: true, message: '请选择所属机构'}]">
                  <el-select v-model="addForm.CompanyId" style="width:100%" placeholder="请选择">
                    <el-option v-for="item in companyOpption" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="驿站名称" prop="Name" :rules="[{ required: true, message: '机构名称不能为空'}]">
                  <el-input v-model="addForm.Name" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="负责人" prop="ResponsiblePersonName" :rules="[{ required: true, message: '负责人不能为空'}]">
                  <el-input v-model="addForm.ResponsiblePersonName" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="性别" prop="ResponsiblePersonSex">
                  <el-radio-group v-model="addForm.ResponsiblePersonSex">
                    <el-radio :label="0">男</el-radio>
                    <el-radio :label="1">女</el-radio>
                  </el-radio-group>
                </el-form-item>

                <el-form-item label="联系电话" prop="ResponsiblePersonPhone" :rules="[{ required: true, message: '联系电话不能为空'}]">
                  <el-input v-model="addForm.ResponsiblePersonPhone" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="驿站地址" prop="Address" :rules="[{ required: true, message: '驿站地址不能为空'}]">
                  <el-input v-model="addForm.Address" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="状态" prop="State" :rules="[{ required: true, message: '请选择状态'}]">
                  <el-select v-model="addForm.State" style="width:100%" placeholder="请选择">
                    <el-option v-for="item in stateSelectOpption" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="到期时间" :rules="[{ required: true, message: '请选择到期时间'}]">
                  <el-date-picker v-model="addForm.Expired" type="date" placeholder="选择日期" style="width:217px">
                  </el-date-picker>
                  <!-- <el-radio>永久</el-radio> -->
                </el-form-item>
              </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click.native="addFormVisible = false">取消</el-button>
              <el-button type="primary" @click.native="addSubmit('addForm')">提交</el-button>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>

  </div>
</template>
<script>
export default {
    data() {
        return {
            filters: "",
            totalItems: 0,
            department: "",
            typeData: [],
            currentPage: 1, //初始页
            pagesize: 5,
            totalItems: 0,
            options: [
                {
                    value: 0,
                    label: "保姆保洁"
                },
                {
                    value: 1,
                    label: "月嫂"
                },
                {
                    value: 2,
                    label: "育婴师"
                },
                {
                    value: 3,
                    label: "小时工"
                },
                {
                    value: 4,
                    label: "养老陪护"
                }
            ],

            //新增界面是否显示
            addFormVisible: true,
            //新增驿站的表单
            addForm: {
                CompanyId: 0, //(integer, optional): 所属机构id
                Name: "string", //(string, optional): 名称
                DescDetail: "string", // (string, optional): 机构详情
                Address: "string", //(string, optional): 地址
                State: 0, //(integer, optional): 状态，字典获取
                Expired: "2019-02-27T08:33:37.329Z", //(string, optional): 到期时间
                ResponsiblePersonName: "string", //(string, optional): 负责人姓名
                ResponsiblePersonSex: 0, //(integer, optional): 负责人性别，字典接口获取
                ResponsiblePersonPhone: "string" //(string, optional): 负责人联系
            },
            //机构列表
            companyOpption: [],
            //状态列表
            stateSelectOpption: []
        };
    },
    created() {
        let _this = this;
        fetch("../../../static/data/list.json")
            .then(function(res) {
                return res.json();
            })
            .then(function(stories) {
                console.log(stories);
                _this.typeData = stories;
            })
            .then(function(err) {
                console.log(err);
            });
    },
    computed: {
        listData() {
            let newList = [];
            let sonList = [];
            var _this = this;
            var NewItems = [];
            let pages = Math.ceil(_this.typeData.length / _this.pagesize); //8为每页设置数量
            for (let i = 0; i < pages; i++) {
                sonList = _this.typeData.slice(
                    i * _this.pagesize,
                    i * _this.pagesize + _this.pagesize
                ); //8为每页设置数量
                newList.push(sonList);
            }
            if (_this.filters !== "") {
                _this.typeData.map(item => {
                    if (item.name.indexOf(_this.filters) != -1) {
                        NewItems.push(item);
                    }
                });
                _this.totalItems = NewItems.length;
                return NewItems;
            }
            _this.totalItems = _this.typeData.length;
            return newList[_this.currentPage - 1];
        }
    },
    /**
     * mounted 加载
     */
    mounted() {
        this.getListData();
        var parentId = this.$route.query.parentId || 62;
        this.$http
            .get("/api/v1/consts", {
                parentId: 62
            })
            .then(res => {
                console.log(res);
                res.data.Obj.map(item => {
                    this.stateSelectOpption.push({
                        value: item.Id,
                        label: item.Name
                    });
                });
            });
        this.$http
            .get("/api/v1/consts", {
                parentId: 66
            })
            .then(res => {
                console.log(res);
                res.data.Obj.map(item => {
                    this.companyOpption.push({
                        value: item.Id,
                        label: item.Name
                    });
                });
            });
    },
    methods: {
        //分页
        handleSizeChange(val) {
            this.pagesize = val;
            this.handleCurrentChange(this.currentPage);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            if (!this.flag) {
                this.currentChangePage(this.data);
            } else {
                this.currentChangePage(this.filterTableDataEnd);
            }
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
         * handleClose 关闭新建页面
         */
        handleClose() {
            this.addFormVisible = false;
        },
        //查询
        getUsers() {},
        /**
         * addSubmit 新增机构
         * @param formName 表单名称
         */
        addSubmit(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    // alert('submit!');
                    this.addForm.CreateAccountId = this.accountId;
                    this.addForm.ParentId = this.$route.query.parentId || -1;
                    this.$http.post(`/api/v1/staff/${this.accountId}/stafftocompany`,this.addForm)
                        .then(res=>{
                          this.addFormVisible = false;
                          this.getList();
                        })
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
                this.$http
                    .get(`/api/v1/user/${this.accountId}/station `)
                    .then(res => {
                        console.log(res);
                    });
            }
        }
    }
};
</script>
<style scoped>
._Post_Management_form {
    display: flex;
    justify-content: space-between;
}
</style>
