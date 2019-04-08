<template>
    <div class="bar">
        <el-row class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" class="bar_form">
                <div class="bar_form_left">
                    <el-form-item>
                        <el-input v-model="gridOps.searchFields.filter" placeholder="请输入名称查询" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary"  @click="loadSearch">查询</el-button>
                    </el-form-item>
                </div>
                <div class="bar_form_right">
                    <el-form-item style="float:right">
                        <el-button-group>
                            <el-button type="primary" icon="el-icon-plus" @click="addRow">新增</el-button>
                        </el-button-group>
                    </el-form-item>
                </div>
            </el-form>
        </el-row>
        <el-table stripe :data="gridOps.data" v-loading="listLoading" tooltip-effect="dark" style="width: 100%" @selection-change="selsChange">
            <el-table-column v-for="(col,index) in gridOps.columns" :key="index" v-if="col.show!=='false'" :prop="col.dataIndex" :label="col.text"
                             :formatter="col.renderer" :width="col.width"></el-table-column>
            <el-table-column fixed="right" label="操作" width="140">
                <template slot-scope="scope">
                    <el-button size="small" icon="el-icon-edit" @click="editData(scope.$index, scope.row)"></el-button>
                    <el-button type="danger" size="small" icon="el-icon-delete" @click="deleteData(scope.$index, scope.row)"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="block" style="margin-top: 1rem">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page="gridOps.currentPage" :page-sizes="[10, 20, 30, 50]" :page-size="gridOps.pageSize"
                           layout="total, sizes, prev, pager, next, jumper" :total="gridOps.total"
                           style="float: right"></el-pagination>
        </div>

        <el-dialog :title="title" :visible.sync="dialogVisible" :close-on-click-modal="false" label-width="40%">
            <el-form :model="addForm" :label-position="labelPosition" label-width="80px" :rules="addFormRules" ref="addForm">
                <el-row :gutter="20">
                    <el-form-item v-if="!editDisabled" label="所属机构" prop="CompanyId">
                        <el-select v-model="addForm.CompanyId" style="width:100%" placeholder="请选择" >
                            <el-option v-for="item in companyOpption" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item v-if="!editDisabled" label="所属驿站" prop="StationId">
                        <el-select v-model="addForm.StationId	" style="width:100%" placeholder="请选择" @change="companyChange">
                            <el-option v-for="item in stationOpption" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="名称" prop="Name">
                        <el-input v-model="addForm.Name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" prop="Descript">
                        <el-input v-model="addForm.Descript" auto-complete="off"></el-input>
                    </el-form-item>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addSubmit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import { parseTime } from '@/utils/time'
    export default {
        data(){
            return {
                labelPosition: 'right',
                listLoading: false,
                gridOps: {
                    columns: [{
                        text: '名称',
                        dataIndex: 'Name'
                    }, {
                        text: '创建时间',
                        width: 200,
                        dataIndex: 'CreateTime',
                        renderer: function(row) {
                            return parseTime(row.CreateTime)
                        }
                    }, {
                        text: '备注',
                        dataIndex: 'Descript'
                    }],
                    data: [],
                    searchFields: { filter: '' }, // 搜索字段
                    // 分页
                    paging: true,
                    currentPage: 1,
                    pageSize: 10,
                    total: 0
                },
                sels: [], // 列表选中列
                accountId: '',
                companyOpption: [],  // 机构列表
                stationOpption: [], //驿站列表
                // 新增
                dialogVisible: false,
                title: '新增',
                addForm: {
                    Id: '',
                    Name: '',
                    CompanyId: '',
                    StationId: '',
                    MerchantId: '',
                    CreateTime: '',
                    Descript: ''
                },
                addFormRules: {
                    Name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                        { min: 2, message: '姓名至少为两位数', trigger: 'blur' }
                    ],
                    CompanyId: [
                        { required: true, message: '请选择所属机构', trigger: 'blur' }
                    ],
                    StationId: [
                        { required: true, message: '请选择所属驿站', trigger: 'blur' }
                    ]
                },
                editDisabled: false
            }
        },
        created() {
            this.initData()
            this.loadData()
        },
        methods: {
            loadSearch: function() {
                // 避免查询页数大于1， 有搜索条件查询不到
                this.gridOps.currentPage = 1
                this.loadData()
            },
            deleteData: function(index,row) {
                var this_ = this
                this.$confirm("确认删除该记录吗？","提示",{
                    type:"warning"
                }).then(function() {
                    this_.$http.delete("/api/v1/merchantcustomcategory?id=" + row.Id, row)
                        .then(function(res) {
                            this_.loadData()
                            this_.$message.success('操作成功')
                        })
                })
            },
            editData: function(index,row) {
                this.resetFrom()
                this.title = '编辑'
                this.editDisabled = true
                this.dialogVisible = true
                this.addForm = Object.assign({}, row)
            },
            addRow: function() {
                this.resetFrom()
                this.title = '新增'
                this.dialogVisible = true
            },
            resetFrom: function() {
                this.editDisabled = false
                this.addForm = {
                    Id: '',
                    Name: '',
                    CompanyId: '',
                    StationId: '',
                    MerchantId: '',
                    CreateTime: '',
                    Descript: ''
                }
            },
            companyChange: function(val) {
                var this_ = this
                this.$http.get('/api/v1/merchant/station?stationId=' + val)
                    .then(function(res) {
                        this_.addForm.MerchantId = res.data.Obj
                    })
            },
            addSubmit: function() {
                var this_ = this
                this.$refs.addForm.validate(function(valid) {
                    if (valid) {
                        var rowId = this_.addForm.Id
                        if (!rowId) {
                            this_.$http.post('/api/v1/merchantcustomcategory',this_.addForm)
                                .then(function(res) {
                                    this_.dialogVisible = false
                                    this_.$message.success('操作成功')
                                    this_.loadData()
                                })
                        } else {
                            this_.$http.patch('/api/v1/merchantcustomcategory?id=' + this_.addForm.Id + '&name=' + this_.addForm.Name + '&descript=' + this_.addForm.Descript, this_.addForm)
                                .then(function(res) {
                                    this_.dialogVisible = false
                                    this_.$message.success('操作成功')
                                    this_.loadData()
                                })
                        }
                    }
                })
            },
            initData: function() {
                var this_ = this
                var role = sessionStorage.getItem('role')
                if(role && role !== 'null') {
                    const accountId = JSON.parse(role).AccountId
                    this.accountId = accountId
                }
                this.$http.get('/api/v1/staff/' + this.accountId + '/company')
                    .then(function(res) {
                        res.data.Obj.map(function (item) {
                            this_.companyOpption.push({
                                value: item.Id,
                                label: item.Name
                            });
                        });
                    });
                this.$http.get('/api/v1/user/' + this.accountId + '/station')
                    .then(function(res) {
                        res.data.Obj.map(function(item) {
                            this_.stationOpption.push({
                                value: item.Id,
                                label: item.Name
                            });
                        });
                    });
            },
            loadData: function() {
                this.loadList()
                this.loadCount()
            },
            loadList: function() {
                var this_ = this
                var params = {
                    'page': this.gridOps.currentPage,
                    'row': this.gridOps.pageSize,
                    'accountId': this.accountId
                }
                var filter = this.gridOps.searchFields.filter
                if (filter) {
                    params['filter'] = filter
                }
                this.$http.get('/api/v1/merchantcustomcategory', params)
                    .then(function(res) {
                        this_.gridOps.data = res.data.Obj || [];
                    })
            },
            loadCount: function() {
                var this_ = this
                var params = {
                    'accountId': this.accountId
                }
                var filter = this.gridOps.searchFields.filter
                if (filter) {
                    params['filter'] = filter
                }
                this.$http.get('/api/v1/merchantcustomcategory/count', params)
                    .then(function(res) {
                        this_.gridOps.total = res.data.Obj
                    })
            },
            // 分页
            handleCurrentChange: function(currentPage) {
                this.gridOps.currentPage = currentPage
                this.loadData()
            },
            handleSizeChange: function(val) {
                this.gridOps.pageSize = val
                this.loadData()
            },
            selsChange: function(sels) {
                this.sels = sels
            }
        }
    }
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
    .bar_form {
        display: flex;
        justify-content: space-between;
    }
</style>