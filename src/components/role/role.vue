<template>
    <div class="_Role_Management">
        <div>
            <el-row class="toolbar" style="padding-bottom: 0px;">
                <el-col :span="24">
                    <el-form :inline="true" class="_Role_Management_form">
                        <div>
                            <el-form-item label="编号">
                                <el-input auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="名称">
                                <el-input auto-complete="off"></el-input>
                            </el-form-item>
                        </div>
                        <div>
                            <el-form-item>
                                <el-button type="primary" @click="roles_False = true">+ 新增</el-button>
                                <el-button type="primary" @click="next(5)">授权</el-button>
                            </el-form-item>
                        </div>
                    </el-form>
                </el-col>
            </el-row>
            <el-table style="100%" :data="listData">
                <el-table-column prop="Id" label="序号"></el-table-column>
                <el-table-column prop="PageRcIds" label="编号"></el-table-column>
                <el-table-column prop="Name" label="角色名称"></el-table-column>
                <el-table-column prop="DescDetail" label="角色描述"></el-table-column>
                <el-table-column prop="CreateTime" label="创建时间"></el-table-column>
                <el-table-column label="操作" width="140" fixed="right">
                    <template slot-scope="scope">
                        <el-button size="small" icon="el-icon-edit">权限设置</el-button>
                        <el-button size="small" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">修改
                        </el-button>
                        <el-button type="danger" size="small" icon="el-icon-delete"
                                   @click="handleDel(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div v-bind:class="{'_Add_roles' : roles_True,'_Add_roles _Add_roles_False' : roles_False}">
                <div class="_Add_roles_div">
                    <div class="_Add_roles_header">
                        <p>添加角色</p>
                        <button type="button" aria-label="Close" class="dialog__headerbtn" @click="rolesFlag(3)"><i
                                class="el-dialog__close el-icon el-icon-close"></i></button>
                    </div>
                    <div class="_Add_roles_section">
                        <el-form :model="roleForm">
                            <el-form-item label="Name" prop="Name">
                                <el-input auto-complete="off" v-model="roleForm.Name"></el-input>
                            </el-form-item>
                            <el-form-item label="PageRcIds" prop="PageRcIds">
                                <el-input auto-complete="off" v-model="roleForm.PageRcIds"></el-input>
                            </el-form-item>
                            <el-form-item label="DescDetail" prop="DescDetail">
                                <el-input type="textarea" v-model="roleForm.DescDetail"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="_Add_roles_footer">
                        <el-button type="success" @click="rolesFlag(1)" :disabled="roleForm.ctrl">确认</el-button>
                        <el-button type="danger" @click="rolesFlag(2)">关闭</el-button>
                    </div>
                </div>
            </div>
            <!-- 编辑页面 -->
            <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
                <el-form :model="editForm" label-width="120px" ref="editForm">
                    <el-form-item label="Name" prop="Name">
                        <el-input auto-complete="off" v-model="editForm.Name"></el-input>
                    </el-form-item>
                    <el-form-item label="PageRcIds" prop="PageRcIds">
                        <el-input auto-complete="off" v-model="editForm.PageRcIds"></el-input>
                    </el-form-item>
                    <el-form-item label="DescDetail" prop="DescDetail">
                        <el-input type="textarea" v-model="editForm.DescDetail"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click.native="editFormVisible = false">取消</el-button>
                    <el-button type="primary" @click.native="editSubmit">提交</el-button>
                </div>
            </el-dialog>
            <!-- 角色授权 -->
            <div class="_Role_authorization"
                 v-bind:class="{'_Role_authorization' : authorizationTrue,'_Role_authorization _Role_authorization_Block' : authorizationFalse}">
                <div class="_Editing_interface">
                    <p class="el-dialog__header">
                        <span>新增商品</span>
                        <button type="button" aria-label="Close" class="dialog__headerbtn" @click="next(4)"><i
                                class="el-dialog__close el-icon el-icon-close"></i></button>
                    </p>
                    <div class="_Role_authorization_content_title">
                        <el-steps :active="active" finish-status="success" simple style="margin-top: 20px">
                            <el-step title="系统功能"></el-step>
                            <el-step title="系统按钮"></el-step>
                        </el-steps>
                    </div>
                    <div class="_Role_authorization_section">
                        <div v-if="active === 0" class="_Jurisdiction_edit_content_form_div1">
                            <el-tree
                                    :data="data1"
                                    show-checkbox
                                    node-key="id"
                                    :default-expanded-keys="[2, 3]"
                                    :props="defaultProps">
                            </el-tree>
                        </div>
                        <div v-if="active === 1" class="_Jurisdiction_edit_content_form_div1">
                            <el-tree
                                    :data="data2"
                                    show-checkbox
                                    node-key="id"
                                    :default-expanded-keys="[2, 3]"
                                    :props="defaultProps">
                            </el-tree>
                        </div>
                    </div>
                    <div slot="footer" class="dialog-footer">
                        <div v-if="active === 0">
                            <el-button style="margin-top: 12px;" @click="next(1)" disabled>上一步</el-button>
                            <el-button style="margin-top: 12px;" @click="next(2)">下一步</el-button>
                            <el-button style="margin-top: 12px;" @click="next(3)">完成</el-button>
                        </div>
                        <div v-if="active === 1">
                            <el-button style="margin-top: 12px;" @click="next(1)">上一步</el-button>
                            <el-button style="margin-top: 12px;" @click="next(2)" disabled>下一步</el-button>
                            <el-button style="margin-top: 12px;" @click="next(3)">完成</el-button>
                        </div>
                    </div>
                </div>
            </div>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total='list.length'>
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'

    // 添加角色时的原始值
    let roleForm = {
        Name: '',
        DescDetail: '',
        PageRcIds: '',
        ctrl: false
    };

    export default {
        data() {
            return {
                filters: '',
                roles_True: true,
                roles_False: false,
                currentPage: 1, //初始页
                pagesize: 5,
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                active: 0,
                data1: [{
                    id: 1,
                    label: '一级 One',
                    children: [{
                        id: 9,
                        label: '二级 1-1',
                    }]
                }, {
                    id: 2,
                    label: '一级 Two',
                    children: [{
                        id: 10,
                        label: '二级 2-1'
                    }, {
                        id: 11,
                        label: '二级 2-2'
                    }]
                }, {
                    id: 3,
                    label: '一级 Three',
                    children: [{
                        id: 12,
                        label: '二级 3-1'
                    }, {
                        id: 13,
                        label: '二级 3-2'
                    }]
                }, {
                    id: 4,
                    label: '一级 3',
                    children: [{
                        id: 14,
                        label: '二级 3-1'
                    }, {
                        id: 15,
                        label: '二级 3-2'
                    }]
                }, {
                    id: 5,
                    label: '一级 3',
                    children: [{
                        id: 7,
                        label: '二级 3-1'
                    }, {
                        id: 8,
                        label: '二级 3-2'
                    }]
                }, {
                    id: 6,
                    label: '一级 3',
                    children: [{
                        id: 7,
                        label: '二级 3-1'
                    }, {
                        id: 8,
                        label: '二级 3-2'
                    }]
                }, {
                    id: 7,
                    label: '一级 3',
                    children: [{
                        id: 7,
                        label: '二级 3-1'
                    }, {
                        id: 8,
                        label: '二级 3-2'
                    }]
                }, {
                    id: 8,
                    label: '一级 3',
                    children: [{
                        id: 7,
                        label: '二级 3-1'
                    }, {
                        id: 8,
                        label: '二级 3-2'
                    }]
                }, {
                    id: 9,
                    label: '一级 3',
                    children: [{
                        id: 7,
                        label: '二级 3-1'
                    }, {
                        id: 8,
                        label: '二级 3-2'
                    }]
                }, {
                    id: 10,
                    label: '一级 3',
                    children: [{
                        id: 7,
                        label: '二级 3-1'
                    }, {
                        id: 8,
                        label: '二级 3-2'
                    }]
                }, {
                    id: 11,
                    label: '一级 3',
                    children: [{
                        id: 7,
                        label: '二级 3-1'
                    }, {
                        id: 8,
                        label: '二级 3-2'
                    }]
                }, {
                    id: 12,
                    label: '一级 3',
                    children: [{
                        id: 7,
                        label: '二级 3-1'
                    }, {
                        id: 8,
                        label: '二级 3-2'
                    }]
                }, {
                    id: 13,
                    label: '一级 3',
                    children: [{
                        id: 7,
                        label: '二级 3-1'
                    }, {
                        id: 8,
                        label: '二级 3-2'
                    }]
                }, {
                    id: 14,
                    label: '一级 3',
                    children: [{
                        id: 7,
                        label: '二级 3-1'
                    }, {
                        id: 8,
                        label: '二级 3-2'
                    }]
                }],
                data2: [{
                    id: 1,
                    label: '一级 1',
                    children: [{
                        id: 9,
                        label: '二级 1-1',
                    }]
                }, {
                    id: 2,
                    label: '一级 2',
                    children: [{
                        id: 10,
                        label: '二级 2-1'
                    }, {
                        id: 11,
                        label: '二级 2-2'
                    }]
                }, {
                    id: 3,
                    label: '一级 3',
                    children: [{
                        id: 12,
                        label: '二级 3-1'
                    }, {
                        id: 13,
                        label: '二级 3-2'
                    }]
                }, {
                    id: 4,
                    label: '一级 3',
                    children: [{
                        id: 14,
                        label: '二级 3-1'
                    }, {
                        id: 15,
                        label: '二级 3-2'
                    }]
                }, {
                    id: 5,
                    label: '一级 3',
                    children: [{
                        id: 7,
                        label: '二级 3-1'
                    }, {
                        id: 8,
                        label: '二级 3-2'
                    }]
                }, {
                    id: 6,
                    label: '一级 3',
                    children: [{
                        id: 7,
                        label: '二级 3-1'
                    }, {
                        id: 8,
                        label: '二级 3-2'
                    }]
                }, {
                    id: 7,
                    label: '一级 3',
                    children: [{
                        id: 7,
                        label: '二级 3-1'
                    }, {
                        id: 8,
                        label: '二级 3-2'
                    }]
                }, {
                    id: 8,
                    label: '一级 3',
                    children: [{
                        id: 7,
                        label: '二级 3-1'
                    }, {
                        id: 8,
                        label: '二级 3-2'
                    }]
                }, {
                    id: 9,
                    label: '一级 3',
                    children: [{
                        id: 7,
                        label: '二级 3-1'
                    }, {
                        id: 8,
                        label: '二级 3-2'
                    }]
                }, {
                    id: 10,
                    label: '一级 3',
                    children: [{
                        id: 7,
                        label: '二级 3-1'
                    }, {
                        id: 8,
                        label: '二级 3-2'
                    }]
                }, {
                    id: 11,
                    label: '一级 3',
                    children: [{
                        id: 7,
                        label: '二级 3-1'
                    }, {
                        id: 8,
                        label: '二级 3-2'
                    }]
                }, {
                    id: 12,
                    label: '一级 3',
                    children: [{
                        id: 7,
                        label: '二级 3-1'
                    }, {
                        id: 8,
                        label: '二级 3-2'
                    }]
                }, {
                    id: 13,
                    label: '一级 3',
                    children: [{
                        id: 7,
                        label: '二级 3-1'
                    }, {
                        id: 8,
                        label: '二级 3-2'
                    }]
                }, {
                    id: 14,
                    label: '一级 3',
                    children: [{
                        id: 7,
                        label: '二级 3-1'
                    }, {
                        id: 8,
                        label: '二级 3-2'
                    }]
                }],
                authorizationTrue: true,
                authorizationFalse: false,
                list: [],
                editFormVisible: false,//编辑界面是否显示
                //编辑界面数据
                editForm: {
                    // id: 0,
                    // name: '',
                    // code: '',
                    // statutory: '',
                    // phone: '',
                    // date: '',
                },
                editIndex: null,
                list1: [],
                Obj: {},
                roleForm: JSON.parse(JSON.stringify(roleForm))
            }
        },
        computed: {
            listData() {
                let newList = [];
                let sonList = [];
                var _this = this;
                var NewItems = [];
                let pages = Math.ceil(_this.list.length / _this.pagesize);//8为每页设置数量
                for (let i = 0; i < pages; i++) {
                    sonList = _this.list.slice(i * _this.pagesize, i * _this.pagesize + _this.pagesize);//8为每页设置数量
                    newList.push(sonList)
                }
                if (_this.filters !== '') {
                    _this.list.map(item => {
                        if (item.name.indexOf(_this.filters) != -1) {
                            NewItems.push(item);
                        }
                    })
                    _this.totalItems = NewItems.length
                    return NewItems;
                }
                _this.totalItems = _this.list.length
                return newList[_this.currentPage - 1];
            },
        },
        methods: {
            rolesFlag(id) {
                // 保存，提交
                if (id === 1) {
                    this.roleForm.ctrl = true;
                    this.addRole().then(() => {
                        this.roles_False = false;
                        // 重置role form
                        this.roleForm = JSON.parse(JSON.stringify(roleForm));
                        // 添加完成后也需要重新更新一下列表
                        this.getRoles();
                    });
                    return;
                }
                this.roles_False = false
            },
            handleSizeChange(val) {
                this.pagesize = val;
                this.handleCurrentChange(this.currentPage)
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                if (!this.flag) {
                    this.currentChangePage(this.data)
                } else {
                    this.currentChangePage(this.filterTableDataEnd)
                }
            },
            currentChangePage(nursing, currentPage) {
                let from = (this.currentPage - 1) * this.pagesize;
                let to = this.currentPage * this.pagesize;
                for (; from < to; from++) {
                    if (nursing[from]) {
                        this.data.push(nursing[from])
                    }
                }
            },
            next(id) {
                // if (this.active++ > 2) this.active = 0;
                if (id === 1) {
                    this.active = 0;
                } else if (id === 2) {
                    this.active = 1;
                    // this.activeFlag = false;
                } else if (id === 3) {
                    this.authorizationFalse = false
                    // this.commodityFlase = false;
                } else if (id === 4) {
                    this.authorizationFalse = false
                } else {
                    this.authorizationFalse = true
                }
            },
            //显示编辑界面
            handleEdit(index, row) {
                console.log(3424)
                this.editFormVisible = true;
                // console.log(row);
                this.editForm = Object.assign({}, row);
                this.editIndex = index;
            },
            //编辑
            editSubmit: function (row) {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true;

                            // 修改 role
                            this.editRole(this.editForm).then(() => {
                                this.editLoading = false;
                                this.editFormVisible = false;

                                // 重新获取数据
                                this.getRoles();
                            });

                        });
                    }
                });
            },
            handleDel: function (index, current) {
                this.$confirm('确认删除该角色吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                    // 调用接口删除当前角色
                    this.deleteRole(current.Id).then(() => {
                        // 删除成功后，从列表种移出该项
                        this.list.splice(index, 1);
                    });
                    // this.$http.delete(``)
                })
            },
            // 获取角色列表
            getRoles() {
                return this.$http.get(`/api/v1/user/${this.Obj.Unicode}/roles`)
                    .then(res => {
                        console.log(res);
                        this.list = res.data.Obj;
                    })
            },
            // 添加角色
            addRole() {
                return this.$http.post('/api/v1/role', {
                    Name: this.roleForm.Name,
                    DescDetail: this.roleForm.DescDetail,
                    PageRcIds: this.roleForm.PageRcIds,
                    AccountId: this.Obj.Unicode
                })
            },
            // 删除角色
            deleteRole(id) {
                return this.$http.delete(`/api/v1/role/${id}`);
            },
            editRole(role) {
                return this.$http.put(`/api/v1/role`, role)
            }
        },
        created() {
            let Obj = localStorage.getItem('Obj');
            this.Obj = Obj = JSON.parse(Obj);
            // fetch('../../../static/data/role.json').then((res) => {
            //     return res.json()
            // }).then(data => {
            //     console.log(data)
            //     this.list = data
            //     this.leng = data.length
            // })
        },
        mounted() {
            // axios({
            //   method:'POST',
            //   url:'http://192.168.0.181:86/api/v1/role'
            // }).then((res)=>{
            //   console.log(res)
            // })
            // axios.post('http://192.168.0.181:86/api/v1/role')三甲医院 : 解放军第309医院  北京大学第三医院  二甲医院 : 北京市海淀医院  
            // .then((res)=>{
            //   // let data = res.data;
            //   console.log(res)
            // })
            this.getRoles();
        }
    }
</script>
<style scoped>
    ._Role_Management > div {
        overflow-y: auto;
    }

    ._Role_Management .toolbar ._Role_Management_form {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        overflow: hidden;
    }

    ._Add_roles {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background-color: #000;
        background: rgba(0, 0, 0, 0.5);
        z-index: 999;
        display: none;
    }

    ._Add_roles_False {
        display: block;
    }

    ._Add_roles ._Add_roles_div {
        width: 60%;
        margin: 4% auto;
        background-color: #fff;
    }

    ._Add_roles_header {
        height: 40px;
        background-color: rgb(112, 112, 228);
        display: flex;
        justify-content: space-between;
    }

    ._Add_roles_header p {
        line-height: 24px;
        font-size: 18px;
        margin-left: 20px;
        line-height: 40px;
        color: #fff;
    }

    ._Add_roles_header .dialog__headerbtn {
        background: 0 0;
        border: none;
        outline: 0;
        cursor: pointer;
        font-size: 16px;
        margin-right: 10px;
    }

    ._Add_roles_div ._Add_roles_section {
        padding: 5% 10% 0 10%;
    }

    ._Add_roles_div ._Add_roles_section form .el-input, ._Add_roles_div ._Add_roles_section form .el-textarea {
        width: 75%;
    }

    ._Add_roles_div ._Add_roles_footer {
        padding: 10px 3% 0 0;
        text-align: right;
        border-top: 1px solid #999;
        background-color: #ccc;
    }

    ._Role_authorization {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background-color: #000;
        background: rgba(0, 0, 0, 0.5);
        z-index: 999;
        display: none;
    }

    ._Role_authorization_Block {
        display: block;
    }

    ._Role_authorization ._Editing_interface {
        width: 50%;
        background-color: #fff;
        margin: 30px auto;
        border-radius: 2px;
    }

    ._Role_authorization ._Editing_interface .el-dialog__header {
        padding: 20px 20px 10px;
        display: flex;
        background-color: rgb(112, 112, 228);
        justify-content: space-between;
    }

    ._Role_authorization ._Editing_interface .el-dialog__header span {
        line-height: 24px;
        font-size: 18px;
        color: #fff;
    }

    ._Role_authorization ._Editing_interface .el-dialog__header .dialog__headerbtn {
        background: 0 0;
        border: none;
        outline: 0;
        cursor: pointer;
        font-size: 16px;
    }

    ._Role_authorization_content_title {
        border-bottom: 1px solid #eee;
    }

    ._Role_authorization_content_title .el-steps {
        width: 35%;
    }

    ._Role_authorization_section {
        height: 370px;
        overflow-y: scroll;
        background-color: #fff;
    }

    ._Role_authorization_section .el-tree {
        height: 100%;
    }

    ._Role_authorization ._Editing_interface .dialog-footer {
        text-align: right;
        padding: 0 10px 5px 0;
        border-top: 1px solid #999;
        background-color: rgb(230, 230, 230);
    }

    ._Role_authorization_content_title .el-steps {
        width: 50%;
    }

    ._Role_authorization_content_title /deep/ .el-step {
        flex-basis: 40% !important;
    }

    ._Role_authorization_content_title /deep/ .el-step__main {
        flex-grow: 0.5;
    }

    ._Role_authorization_content_title .el-step.is-simple:not(:last-of-type) /deep/ .el-step__title {
        max-width: 95%
    }

    ._Role_authorization_content_title /deep/ .el-step__arrow {
        margin-left: 20px;
        flex-grow: 0.5
    }
</style>
