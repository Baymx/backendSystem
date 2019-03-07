<template>
    <div class="_Post_Management">
        <el-row class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" class="_Post_Management_form">
                <div class="_Post_Management_form_left">
                    <el-form-item>
                        <el-input v-model="searchForm.stationName" placeholder="请输入名称" style="width:220px;font-size:12px;"></el-input>
                        <el-input v-model="searchForm.phone" placeholder="请输入手机号" style="width:220px;font-size:12px;"></el-input>
                    </el-form-item>
                    <el-form-item label="状态" prop="date">
                        <el-select v-model="searchForm.state" placeholder="全部类型" style="width:130px;">
                            <el-option style="height:45px;" v-for="item in stateSelectOpption" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="srarch">查询</el-button>
                    </el-form-item>
                </div>
                <div class="_Post_Management_right">
                    <el-form-item style="float:right;">
                        <el-button-group>
                            <el-button type="primary" @click=" addFormVisible = true">+新增</el-button>
                            <!-- <el-button type="primary">修改</el-button>
              <el-button type="primary">删除</el-button> -->
                        </el-button-group>
                    </el-form-item>
                </div>
            </el-form>
        </el-row>
        <el-table :data="tableList" style="width: 100%">
            <el-table-column fixed prop="Id" label="序号"></el-table-column>
            <el-table-column prop="Name" label="驿站名称"></el-table-column>
            <el-table-column prop="CompanyId" label="所属机构">
                <template slot-scope="scope">
                    <span> {{ CompanyFilter(scope.row.CompanyId) }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="ResponsiblePersonName" label="负责人"></el-table-column>
            <el-table-column prop="ResponsiblePersonSex" label="性别">
                <template slot-scope="scope">
                    <span> {{ scope.row.ResponsiblePersonSex == 0 ? "男" : "女" }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="ResponsiblePersonPhone" label="联系电话"></el-table-column>
            <el-table-column prop="Address" label="驿站地址"></el-table-column>
            <el-table-column prop="State" label="状态">
                <template slot-scope="scope">
                    <span> {{ stateFilter(scope.row.State) }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="CreateTime" label="创建时间">
                <template slot-scope="scope">
                    <span> {{ dateFormat( scope.row.CreateTime ) }}</span>
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
        <el-dialog title="新增" v-if="addFormVisible" :visible.sync="addFormVisible" width="40%" :before-close="handleClose">
            <div class="dialog-body">
                <div class="_organization_from">
                    <el-form :model="addForm" label-width="120px" ref="addForm">
                        <el-form-item label="所属机构" prop="CompanyId" :rules="[{ required: true, message: '请选择所属机构'}]">
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
                Name: "", //(string, optional): 名称
                DescDetail: "", // (string, optional): 机构详情
                Address: "", //(string, optional): 地址
                State: "", //(integer, optional): 状态，字典获取
                Expired: "", //(string, optional): 到期时间
                ResponsiblePersonName: "", //(string, optional): 负责人姓名
                ResponsiblePersonSex: 0, //(integer, optional): 负责人性别，字典接口获取
                ResponsiblePersonPhone: "" //(string, optional): 负责人联系
            },
            //机构列表
            companyOpption: [],
            //状态列表
            stateSelectOpption: [],
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
            const parentId = this.$route.query.parentId || 62;
            this.$http
                .get("/api/v1/consts", {
                    parentId: 62
                })
                .then(res => {
                    res.data.Obj.map(item => {
                        this.stateSelectOpption.push({
                            value: item.Id,
                            label: item.Name
                        });
                    });
                });
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
         * stateFilter 状态内容匹配
         * @param state 状态
         * @returns value  枚举的label
         */
        stateFilter(state) {
            var value = "";
            this.stateSelectOpption.map(item => {
                if (state == item.value) {
                    value = item.label;
                    return;
                }
                return;
            });
            return value;
        },
        /**
         * dateFormat 时间格式化
         * @param date 时间戳
         * @returns currentdate  格式化时间    YYYY-MM-DD HH:MM:SS
         */
        dateFormat(date) {
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
            if (minute >= 1 && minute <= 9) {
                minute = "0" + minute;
            }
            if (second >= 0 && second <= 9) {
                second = "0" + second;
            }
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
        },
        CompanyFilter(id) {
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
         * addSubmit 新增机构
         * @param formName 表单名称
         */
        addSubmit(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.addForm.CreateAccountId = this.accountId;
                    this.$http
                        .post(
                            `/api/v1/user/${this.accountId}/stafftostation`,
                            this.addForm
                        )
                        .then(res => {
                            this.handleClose();
                            this.getListData();
                        });
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
                this.$http
                    .delete("/api/v1/station?id=" + row.Id, row)
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
        EditData(index, row) {}
    }
};
</script>
<style lang="scss" scoped>
.dialog-body {
    .dialog-footer {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 30px;
    }
}

._Post_Management_form {
    display: flex;
    justify-content: space-between;
}
</style>
