<template>
    <div class="management" style="width:100%">
        <div class="_management_Jurisdiction_left">
            <p>功能目录</p>
            <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        </div>
        <div class="_management_Jurisdiction_right">
            <p>功能信息</p>
            <el-row class="toolbar" style="padding-bottom: 0px;">
                <el-col :span="24">
                    <el-form :inline="true" :model="filters">
                        <el-form-item>
                            <el-button type="primary" @click="getUsers">刷新</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary">新增</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="handleAdd">编辑</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary">删除</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <el-table ref="singleTable" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                      style="width: 100%">
                <el-table-column type="index"></el-table-column>
                <el-table-column property="name" label="名称" width="120"></el-table-column>
                <el-table-column property="address" label="地址" width="200"></el-table-column>
                <el-table-column property="target" label="目标" width="120"></el-table-column>
                <el-table-column property="describe" label="描述" width="280"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="small" icon="el-icon-edit"
                                   @click="compileEdit(scope.$index, scope.row)"></el-button>
                        <el-button type="danger" size="small" icon="el-icon-delete"
                                   @click="deleteAdd(scope.$index, scope.row)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 编辑页面 -->
        <div v-bind:class="{ '_Jurisdiction_edit' :　commodityTrue,'_Jurisdiction_edit block' : commodityFlase}">
            <div class="_Editing_interface">
                <p class="el-dialog__header">
                    <span>新增商品</span>
                    <button type="button" aria-label="Close" class="dialog__headerbtn" @click="next(3)"><i
                            class="el-dialog__close el-icon el-icon-close"></i></button>
                </p>
                <div class="_Jurisdiction_edit_content_title">
                    <el-steps :active="active" finish-status="success" simple style="margin-top: 20px">
                        <el-step title="系统功能"></el-step>
                        <!-- <el-step title="系统按钮" ></el-step> -->
                    </el-steps>
                </div>
                <div class="_Jurisdiction_edit_content_form">
                    <div v-if="active === 0" class="_Jurisdiction_edit_content_form_div1">
                        <el-form :model="addForm" label-width="120px">
                            <el-form-item label="名称" prop="read">
                                <el-input auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="排序" prop="issue">
                                <el-input auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="目标" prop="date">
                                <el-cascader
                                        :options="options"
                                        v-model="selectedOptions"
                                        @change="handleChange">
                                </el-cascader>
                            </el-form-item>
                            <el-form-item label="上级" prop="date">
                                <el-cascader
                                        :options="options"
                                        v-model="selectedOptions1"
                                        @change="handleChange1">
                                </el-cascader>
                            </el-form-item>
                            <el-form-item label="地址" prop="read" class="_Jurisdiction_edit_content_form_address">
                                <el-input auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="选项" prop="read" class="_Jurisdiction_edit_content_form_option">
                                <el-checkbox v-model="checked">备选项</el-checkbox>
                            </el-form-item>
                            <el-form-item label="描述" class="_Jurisdiction_edit_content_form_describe">
                                <el-input type="textarea" v-model="addForm.desc"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div v-if="active === 1" class="_Jurisdiction_edit_content_form_div2">
                        <el-form :inline="true">
                            <el-form-item>
                                <el-button type="primary" @click="NewlyAdded">新增</el-button>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary">编辑</el-button>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary">删除</el-button>
                            </el-form-item>
                        </el-form>
                        <el-table style="100%">
                            <el-table-column prop="id"></el-table-column>
                            <el-table-column prop="id" label="名称"></el-table-column>
                            <el-table-column prop="order" label="编号"></el-table-column>
                            <el-table-column prop="payment" label="地址"></el-table-column>
                        </el-table>
                    </div>
                </div>
                <div slot="footer" class="dialog-footer">
                    <div v-if="active === 0">
                        <!-- <el-button style="margin-top: 12px;" @click="next(1)" disabled>上一步</el-button>
                        <el-button style="margin-top: 12px;" @click="next(2)">下一步</el-button> -->
                        <el-button style="margin-top: 12px;" @click="next(3)">完成</el-button>
                    </div>
                    <div v-if="active === 1">
                        <!-- <el-button style="margin-top: 12px;" @click="next(1)">上一步</el-button>
                        <el-button style="margin-top: 12px;" @click="next(2)" disabled>下一步</el-button> -->
                        <el-button style="margin-top: 12px;" @click="next(3)">完成</el-button>
                    </div>
                </div>
            </div>
            <!-- 编辑新增按钮 -->
            <div v-bind:class="{'_edit_NewlyAdded_Button' :btnTrue,'_edit_NewlyAdded_Button block':btnFalse}">
                <div class="_edit_NewlyAdded_Button_content">
                    <p class="el-dialog__header">
                        <span>添加按钮</span>
                        <button type="button" aria-label="Close" class="dialog__headerbtn" @click="footerClick(3)"><i
                                class="el-dialog__close el-icon el-icon-close"></i></button>
                    </p>
                    <el-form label-width="120px">
                        <el-form-item label="目标" prop="date">
                            <el-cascader
                                    :options="options"
                                    v-model="selectedOptions"
                                    @change="handleChange">
                            </el-cascader>
                        </el-form-item>
                        <el-form-item label="地址" prop="read">
                            <el-input auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="名称" prop="read">
                            <el-input auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="名称" prop="read">
                            <el-input auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="名称" prop="read">
                            <el-input auto-complete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button style="margin-top: 12px;" @click="footerClick(1)">确认</el-button>
                        <el-button style="margin-top: 12px;" @click="footerClick(2)">关闭</el-button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 新增页面  @click="flagClick"  -->
        <!-- <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
          <el-form :model="addForm" label-width="120px" ref="addForm">
            <el-form-item label="名称" prop="name">
                <el-input v-model="addForm.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="address">
                <el-input v-model="addForm.address" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="目标" prop="target">
                <el-input v-model="addForm.target" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="describe">
                <el-input v-model="addForm.describe" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click.native="addFormVisible = false">取消</el-button>
            <el-button type="primary" @click.native="addSubmit" :loading="addLoading" v-model="addFormVisible">提交</el-button>
          </div>
        </el-dialog>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total='total'>
        </el-pagination> -->
    </div>
</template>
<script>
    export default {
        data() {
            return {
                active: 0,
                activeFlag: true,
                total: 6,
                currentPage: 1, //初始页
                pagesize: 5,
                editIndex: null,
                filters: '',
                btnTrue: true,
                btnFalse: false,
                commodityTrue: true,
                commodityFlase: false,
                editFormVisible: false,//编辑页面是否显示
                // 编辑页面数据
                editForm: {
                    name: '',
                    address: '',
                    target: '',
                    describe: ''
                },
                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                checked: true,
                options: [{
                    value: 'zhinan',
                    label: '指南'
                }, {
                    value: 'zujian',
                    label: '组件'
                }, {
                    value: 'ziyuan',
                    label: '资源'
                }],
                selectedOptions: [],
                selectedOptions1: [],
                addForm: {
                    name: '',
                    address: '',
                    target: '',
                    describe: ''
                },
                filters: {
                    name: ''
                },
                tableData: [{
                    id: 1,
                    name: '保姆保洁',
                    address: '非受控电脑上就开始',
                    target: 'iframe',
                    describe: '的火山口商家第三节课的京津冀的教科书'
                }, {
                    id: 2,
                    name: '养老陪护',
                    address: '第十四考点就是地方1517 弄',
                    target: 'iframe',
                    describe: '的防静电服就算了就分手到家了'
                }, {
                    id: 3,
                    name: '小时工',
                    address: '第三科技雕刻世家哦是',
                    target: 'iframe',
                    describe: '第三个上打开地方'
                }, {
                    id: 4,
                    name: '育婴师',
                    address: '计算机康师傅会计师',
                    target: 'iframe',
                    describe: '沙漏计时京东到家点击'
                }, {
                    id: 5,
                    name: '月嫂',
                    address: '大家都是来得快上都是',
                    target: 'iframe',
                    describe: '大家都是解放军是多少'
                }, {
                    id: 6,
                    name: '小时工',
                    address: '第三科技雕刻世家哦是',
                    target: 'iframe',
                    describe: '第三个上打开地方'
                }],
                data: [{
                    label: '一级 1',
                    children: [{
                        label: '二级 1-1'
                    }]
                }, {
                    label: '一级 2',
                    children: [{
                        label: '二级 2-1',
                    }, {
                        label: '二级 2-2',
                    }, {
                        label: '二级 3-2',
                    }, {
                        label: '二级 3-2',
                    }, {
                        label: '二级 3-2',
                    }]
                }, {
                    label: '一级 3',
                    children: [{
                        label: '二级 3-1',
                    }, {
                        label: '二级 3-2',
                    }, {
                        label: '二级 3-2',
                    }, {
                        label: '二级 3-2',
                    }, {
                        label: '二级 3-2',
                    }, {
                        label: '二级 3-2',
                    }, {
                        label: '二级 3-2',
                    }, {
                        label: '二级 3-2',
                    }, {
                        label: '二级 3-2',
                    }]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            }
        },
        methods: {
            handleSizeChange(val) {
                this.pagesize = val;
            },
            handleCurrentChange(val) {
                this.currentPage = val;
            },
            handleNodeClick(data) {
                console.log(data);
            },
            //查询
            getUsers() {
                // if(this.filters == ''){
                //   this.$message.warning('查询条件不能为空')
                //   return
                // }
                // this.arr = []
                // this.tableData.forEach((value,index)=>{
                //   if(value.name){
                //     if(value.name.indexOf(this.filters)>=0){
                //       this.arr.push(value)
                //     }
                //   }
                // })
                // this.currentPage=1;
                // this.total = this.arr.length
                let arr = []
                for (var item in this.tableData) {
                    if (Object.values(this.tableData[item]).indexOf(this.filters.name) !== -1) {
                        console.log(this.tableData[item])
                        arr.push(this.tableData[item])
                    }
                }
                this.tableData = arr
            },
            //新增
            handleAdd: function () {
                // this.addFormVisible = true
                // this.addForm = {
                //   name:'',
                //   address:'',
                //   target:'',
                //   describe:''
                // }
                this.commodityFlase = true;
                this.active = 0;
            },
            addSubmit: function () {
                this.addForm = {
                    name: this.addForm.name,
                    address: this.addForm.address,
                    target: this.addForm.target,
                    describe: this.addForm.describe
                }
                this.tableData.push(this.addForm)
                this.addFormVisible = false;
            },
            //修改
            compileEdit(index, row) {
                this.editFormVisible = true;
                this.editForm = Object.assign({}, row);
                this.editIndex = index
            },
            editSubmit: function (row) {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提交', {}).then(() => {
                            this.editLoading = true;
                            this.editForm = {
                                name: this.editForm.name,
                                address: this.editForm.address,
                                target: this.editForm.target,
                                describe: this.editForm.describe,
                            }
                            let bar = Object.assign({}, this.editForm);
                            this.tableData.splice(this.editIndex, 1, bar);
                            this.editFormVisible = false
                        })
                    }
                })
            },
            //删除
            deleteAdd: function (index) {
                this.$confirm('确认删除该记录吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.tableData.splice(index, 1)
                })
            },
            handleChange(value) {
                console.log(value);
            },
            handleChange1(value) {
                console.log(value);
            },
            next(id) {
                // if (this.active++ > 2) this.active = 0;
                if (id === 1) {
                    this.active = 0;
                } else if (id === 2) {
                    this.active = 1;
                    this.activeFlag = false;
                } else {
                    this.commodityFlase = false;
                }
                console.log(11)
            },
            NewlyAdded() {
                this.btnFalse = true;
            },
            footerClick(id) {
                if (id === 1) {
                    this.btnFalse = false;
                } else if (id == 2) {
                    this.btnFalse = false;
                } else {
                    this.btnFalse = false;
                }
            },
            // 获取权限列表
            getAllPagercs() {
                return this.$http.get(`/api/v1/user/${this.Obj.Unicode}/allpagercs`)
                    .then(res => {
                        console.log(res);
                        this.list = res.Obj;
                    })
            }
        },
        created() {
            let Obj = localStorage.getItem('Obj');
            this.Obj = Obj = JSON.parse(Obj);
            this.getAllPagercs();
        }
    }
</script>
<style scoped>
    .management {
        display: flex;
        /* background-color: #999; */
    }

    ._management_Jurisdiction_left {
        width: 15%;
        height: 470px;
        overflow-y: no-display;
        overflow-x: hidden;
        /* background-color: #fff; */
        margin-right: 10px;
    }

    ._management_Jurisdiction_left {
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
    }

    ._management_Jurisdiction_left > p, ._management_Jurisdiction_right > p {
        border-bottom: 1px solid #ccc;
        line-height: 50px;
        padding-left: 10px;
    }

    ._management_Jurisdiction_right {
        width: 85%;
        height: 100%;
    }

    ._management_Jurisdiction_right, ._management_Jurisdiction_left {
        border-top: 1px solid #ccc;
        border-left: 1px solid #ccc;
    }

    ._management_Jurisdiction_right .toolbar form {
        text-align: right;
    }

    ._Jurisdiction_edit {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background-color: #000;
        background: rgba(0, 0, 0, 0.5);
        z-index: 999;
        display: none;
        overflow-y: auto;
    }

    ._Jurisdiction_edit ._Editing_interface {
        width: 50%;
        background-color: #fff;
        margin: 30px auto;
        border-radius: 2px;
    }

    ._Jurisdiction_edit ._Editing_interface .el-dialog__header {
        padding: 20px 20px 10px;
        display: flex;
        justify-content: space-between;
    }

    ._Jurisdiction_edit ._Editing_interface .el-dialog__header span {
        line-height: 24px;
        font-size: 18px;
        color: #303133;
    }

    ._Jurisdiction_edit ._Editing_interface .el-dialog__header .dialog__headerbtn {
        background: 0 0;
        border: none;
        outline: 0;
        cursor: pointer;
        font-size: 16px;
    }

    ._Jurisdiction_edit_content_title {
        border-bottom: 1px solid #eee;
    }

    ._Jurisdiction_edit_content_title .el-steps {
        width: 50%;
    }

    ._Jurisdiction_edit_content_title /deep/ .el-step {
        flex-basis: 40% !important;
    }

    ._Jurisdiction_edit_content_title /deep/ .el-step__main {
        flex-grow: 0.5;
    }

    ._Jurisdiction_edit_content_title .el-step.is-simple:not(:last-of-type) /deep/ .el-step__title {
        max-width: 95%
    }

    ._Jurisdiction_edit_content_title /deep/ .el-step__arrow {
        margin-left: 20px;
        flex-grow: 0.5
    }

    ._Jurisdiction_edit ._Editing_interface .dialog-footer {
        text-align: right;
        padding: 0 10px 5px 0;
        border-top: 1px solid #999;
        background-color: rgb(230, 230, 230);
    }

    ._Jurisdiction_edit_content_form {
        height: 450px;
        overflow-y: no-display;
        padding-top: 20px;
    }

    ._Jurisdiction_edit_content_form ._Jurisdiction_edit_content_form_div1 form {
        display: flex;
        flex-wrap: wrap;
    }

    ._Jurisdiction_edit_content_form ._Jurisdiction_edit_content_form_div1 form .el-form-item {
        width: 45%;
    }

    ._Jurisdiction_edit_content_form_address, ._Jurisdiction_edit_content_form_option, ._Jurisdiction_edit_content_form_describe {
        width: 90% !important;
    }

    ._Jurisdiction_edit_content_form form .el-form-item__content .el-cascader {
        width: 100%;
    }

    ._Jurisdiction_edit_content_form ._Jurisdiction_edit_content_form_div2 form {
        text-align: right;
    }

    ._Jurisdiction_edit ._Editing_interface .dialog-footer button:nth-last-child(1) {
        background-color: rgb(28, 202, 28);
        color: #fff;
    }

    ._edit_NewlyAdded_Button {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background-color: #000;
        background: rgba(0, 0, 0, 0.5);
        z-index: 1000;
        display: none;
        overflow-y: auto;
    }

    ._edit_NewlyAdded_Button ._edit_NewlyAdded_Button_content {
        width: 30%;
        background-color: #fff;
        margin: 10% auto;
        border-radius: 2px;
    }

    ._edit_NewlyAdded_Button ._edit_NewlyAdded_Button_content .el-dialog__header {
        padding: 20px 20px 10px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #eee;
        margin-bottom: 10px;
        background-color: rgb(85, 85, 206);
    }

    ._edit_NewlyAdded_Button ._edit_NewlyAdded_Button_content .el-dialog__header span {
        line-height: 24px;
        font-size: 18px;
        color: #fff;
    }

    ._edit_NewlyAdded_Button ._edit_NewlyAdded_Button_content .el-dialog__header .dialog__headerbtn {
        background: 0 0;
        border: none;
        outline: 0;
        cursor: pointer;
        font-size: 16px;
    }

    ._edit_NewlyAdded_Button ._edit_NewlyAdded_Button_content .dialog-footer {
        text-align: right;
        padding: 0 10px 5px 0;
        border-top: 1px solid #999;
        background-color: rgb(230, 230, 230);
    }

    ._edit_NewlyAdded_Button ._edit_NewlyAdded_Button_content .dialog-footer button:nth-child(1) {
        background-color: rgb(6, 168, 6);
        color: #fff;
    }

    ._edit_NewlyAdded_Button ._edit_NewlyAdded_Button_content .dialog-footer button:nth-child(2) {
        background-color: rgb(223, 9, 9);
        color: #fff;
    }

    ._edit_NewlyAdded_Button_content form {
        padding-right: 20px;
    }

    ._edit_NewlyAdded_Button_content form .el-cascader {
        width: 100%;
    }

    .block {
        display: block !important;
    }
</style>
