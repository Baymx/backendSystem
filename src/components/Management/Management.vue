<template>
    <div class="bar">
      <el-row class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" class="bar_form">
          <div class="bar_form_left">
            <el-form-item>
              <el-input v-model="searchForm.filter" placeholder="请输入名称查询"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"  @click="srarch">查询</el-button>
            </el-form-item>
          </div>
          <div class="bar_form_right">
            <el-form-item style="float:right">
              <el-button-group>
                <el-button type="primary" @click="addFormVisible = true">+新增</el-button>
              </el-button-group>
            </el-form-item>
          </div>
        </el-form>
      </el-row>
        <el-table :data="tableData" style="100%">
          <el-table-column type="index" label="序号" :index="roleIndexMethod"></el-table-column>
          <!-- <el-table-column label="所属机构" prop="CompanyId"> -->
            <!-- <template slot-scope="scope">
              <span>{{C}}</span>
            </template> -->
          <!-- </el-table-column> -->
          <el-table-column prop=" " label="所属驿站"></el-table-column>
          <el-table-column prop="Name" label="名称"></el-table-column>
          <el-table-column prop="Descript" label="备注"></el-table-column>
          <el-table-column prop="CreateTime" label="创建时间" :formatter="formatter"></el-table-column>
          <el-table-column fixed="right" label="操作" width="140">
            <template slot-scope="scope">
              <el-button size="small" icon="el-icon-edit" @click="EditData(scope.$index, scope.row)"></el-button>
              <el-button type="danger" size="small" icon="el-icon-delete" @click="deleteData(scope.$index, scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
         <el-pagination @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total='totalItems'>
        </el-pagination>
        <!-- 新增内容 -->
        <el-dialog title="新增" v-if="addFormVisible" :visible.sync="addFormVisible" width="50%" :before-close="handleClose">
          <div class="dialog-body">
            <div class="Management_form">
              <el-form :model="addForm" label-width="120px" ref="addForm">
                <el-form-item label="所属机构" prop="CompanyId" :rules="[{ required: true, message: '请选择所属机构'}]">
                  <el-select v-model="addForm.CompanyId" style="width:100%" placeholder="请选择">
                    <el-option v-for="item in companyOpption" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="所属驿站" prop="StationId" :rules="[{ required: true, message: '请选择所属驿站'}]">
                  <el-select v-model="addForm.StationId	" style="width:100%" placeholder="请选择" @change="companyChange">
                    <el-option v-for="item in stationOpption" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="名称" prop="Name" :rules="[{ required: true, message: '名称不能为空'}]">
                  <el-input v-model="addForm.Name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="Descript" :rules="[{ required: true, message: '备注不能为空'}]">
                  <el-input v-model="addForm.Descript" auto-complete="off"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click.native="handleClose">取消</el-button>
              <el-button type="primary" @click.native="addSubmit('addForm')">提交</el-button>
            </div>
          </div>
        </el-dialog>
        <!-- 编辑内容 -->
        <el-dialog title="编辑" v-if="editFormVisible" :visible.sync="editFormVisible" width="50%" :before-close="editClose">
          <div class="dialog-body">
            <div class="Management_form">
              <el-form :model="editForm" label-width="120px" ref="editForm">
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
                <el-form-item label="名称" prop="Name" :rules="[{ required: true, message: '名称不能为空'}]">
                  <el-input v-model="editForm.Name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="Descript" :rules="[{ required: true, message: '备注不能为空'}]">
                  <el-input v-model="editForm.Descript" auto-complete="off"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click.native="editClose">取消</el-button>
              <el-button type="primary" @click.native="editSubmit('editForm')">提交</el-button>
            </div>
          </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
  data(){
    return {
      tableData: [], //表格数据
      totalItems: 0, //列表条数
      currentPage: 1, //初始页
      pageSize: 5, //页数大小
      //列表查询条件
      searchForm: {
        filter:this.$route.query.filter
      },
      addFormVisible: false,//新增界面是否显示
      //新增服务的表单
      addForm: {
        CompanyId: "", //(integer, optional): 所属机构id
        StationId: "",
        MerchantId:"",
        Name: "",
        Descript: ""
      },
      editFormVisible: false,//编辑界面是否显示
      editForm: {
        CompanyId: "", //(integer, optional): 所属机构id
        StationId: "",
        name:"",
        Descript:""
      },
      //机构列表
      companyOpption: [],
      //驿站列表
      stationOpption: [],
      //用户id
      accountId: ""
    }
  },  
  computed: {
    // ordert(){
    //   return this.tableData.slice(
    //     (this.currentPage - 1) * this.pageSize,
    //     this.currentPage * this.pageSize
    //   )
    // }
  },
  mounted(){
    const role = sessionStorage.getItem('role');
    // console.log(role)
    if(role) {
      const accountId = JSON.parse(role).AccountId;
      this.accountId = accountId;
    }
    this.getListnumber()
    this.const()
    // this.getListData()
  },
  methods: {
    //获取常量
     const() {
      this.$http.get(`/api/v1/staff/${this.accountId}/company`)
      .then(res => {
        res.data.Obj.map(item => {
          this.companyOpption.push({
            value: item.Id,
            label: item.Name
          });
        });
      });
      console.log(this.companyOpption)
      this.$http.get(`/api/v1/user/${this.accountId}/station`)
      .then(res => {
        res.data.Obj.map(item => {
          this.stationOpption.push({
            value: item.Id,
            label: item.Name
          });
        });
        console.log(this.stationOpption);
      });
     },
     companyChange(val){
			// console.log(val)
			this.$http.get(`/api/v1/merchant/station?stationId=${val}`)
			.then(res=>{
				console.log(res)
				this.addForm.MerchantId = res.data.Obj
			})
		},
    //序号
    roleIndexMethod(index) {
      return (this.currentPage - 1) * this.pageSize + index + 1;
    },
    //时间格式化
    formatter(row, column) {
      var time = row.CreateTime;
      var dateee = new Date(time).toJSON();
      var times = new Date(+new Date(dateee) + 16 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
      return times;
    },
    //分页
    //handleSizeChange 列表一页的数量进行改变
    handleSizeChange(val){
      this.pageSize = val;
      this.getListnumber()
    },
    //handleCurrentChange 列表页数进行改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getListnumber()
    },
    //列表数量
    getListnumber(){
      const role = sessionStorage.getItem('role');
      if(role){
        const accountId = JSON.parse(role).AccountId;
        this.accountId = accountId;
        this.$http.get(`/api/v1/merchantcustomcategory/count?accountId=${this.accountId}`)
        .then(res => {
          console.log(res)
          this.totalItems = res.data.Obj
          this.getListData()
        })
      }
    },
    //列表信息
    getListData(){
      const role = sessionStorage.getItem('role');
      if(role){
        const accountId = JSON.parse(role).AccountId;
        this.accountId = accountId;
        this.$http.get(`/api/v1/merchantcustomcategory?page=${this.currentPage}&row=${this.pageSize}&accountId=${this.accountId}`)
        .then(res =>{
          console.log(res)
          this.tableData = res.data.Obj || [];
        })
      }
    },
    //查询数量
    getnumber(){
      const role = sessionStorage.getItem('role');
      if(role){
        const accountId = JSON.parse(role).AccountId;
        this.accountId = accountId;
        const filter = this.searchForm.filter
        this.$http.get(`/api/v1/merchantcustomcategory/count?accountId=${this.accountId}&filter=${filter}`)
        .then(res=>{
          console.log(res)
          this.totalItems = res.data.Obj
          // this.getListData()
        })
      }
     
    },
    //查询
    srarch(){
      const filter = this.searchForm.filter
      this.$router.replace({
        path:'/Management',
        query:Object.assign({},this.$route.query,this.searchForm)
      })
      this.$http.get(`/api/v1/merchantcustomcategory?page=${this.currentPage}&row=${this.pageSize}&accountId=${this.accountId}&filter=${filter}`)
      .then(res=>{
        console.log(res)
        this.tableData = res.data.Obj || [];
        this.getnumber()
      })
    },
    //新增界面显示
    handleClose(){
      this.addFormVisible = false;
      this.addForm = {
        // CompanyId: "", //(integer, optional): 所属机构id
        // StationId: "",
        Name: "",
        Descript: "",
      }
    },
    addSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if(valid) {
          this.$http.post(`/api/v1/merchantcustomcategory`,this.addForm)
          .then(res=>{
            console.log(res)
            this.handleClose()
            this.getListnumber()
            // this.getListData()
            // this.tableData.unshift(res.data.Obj)
            // this.totalItems++
          })
        }else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    //编辑界面显示
    EditData(index,row){
      this.editFormVisible = true;
      this.editForm = Object.assign({},row)
    },
    editClose(){
      this.editFormVisible = false;
      this.editForm = {
        Id:'',
        Name:"",
        Descript:""
      }
    },
    editSubmit: function(formName){
      this.$refs[formName].validate((valid) => {
        const Id = this.editForm.Id
        const Name = this.editForm.Name
        const Descript = this.editForm.Descript
        if(valid) {
          this.$confirm('确认提交吗','提示',{}).then(()=>{
             this.$http.patch(`/api/v1/merchantcustomcategory?id=${Id}&name=${Name}&descript=${Descript}`,this.editForm)
             .then(res=>{
               console.log(res)
               this.editClose();
               this.getListnumber()
             })
          })
        }
      })
    },
    //删除
    /**
     * index 列表的index
     * row 列表的每一数据
     */
    deleteData:function(index,row){
      this.$confirm("确认删除该记录吗？","提示",{
        type:"warning"
      }).then(() =>{
        this.$http.delete("/api/v1/merchantcustomcategory?id=" + row.Id,row)
        .then(res => {
           this.getListnumber()
           console.log(this.getListnumber())
        })
      })
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
