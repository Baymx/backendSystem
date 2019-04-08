<template>
  <div class="safety_box">
    <div class="safety_top">
      <div class="safety_button">
        <button @click="addFormVisible = true">
          <img src="../../../static/img/xinjian1.png" alt="">新建
        </button>
      </div>
      <div class="safety_table">
        <el-table :data="tableData" border style="width: 100%">
         <el-table-column prop="name" label="名称" width="170"></el-table-column>
          <el-table-column prop="date" label="时间" width="170"></el-table-column>
          <el-table-column prop="file" label="文件大少" width="170"></el-table-column>
          <el-table-column prop="type" label="类型" width="170"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="small" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)" type="text">编辑</el-button>
              <el-button type="text" size="small" icon="el-icon-delete" @click="handleDel(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 新建 -->
        <el-dialog title="新建健康资料" v-if="addFormVisible" :visible.sync="addFormVisible" width="400px" :before-close="handleClose">
          <el-form :model="addForm" label-width="100px" ref="addForm">
            <el-form-item label="资料名称:">
              <el-input autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="医院名称:">
              <el-input autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="上传文件:">
              <!-- <div class="show-img" v-if="addForm.BusinessLicenseImg">
                <img  :src="addForm.BusinessLicenseImg" class="avatar">
                <i class="el-icon-error uploader-delete" @click="delectBusinessLicenseImg"></i>
              </div> -->
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" size="mini">提交</el-button>
            <el-button size="mini" @click.native="handleClose">关闭</el-button>
          </div>
        </el-dialog>
        <!-- 编辑 -->
        <el-dialog title="编辑健康资料" v-if="editFormVisible" :visible.sync="editFormVisible" width="400px" :before-close="editClose">
          <el-form :model="editForm" label-width="100px" ref="editForm">
            <el-form-item label="资料名称:">
              <el-input autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="医院名称:">
              <el-input autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="上传文件:">
              <!-- <div class="show-img" v-if="addForm.BusinessLicenseImg">
                <img  :src="addForm.BusinessLicenseImg" class="avatar">
                <i class="el-icon-error uploader-delete" @click="delectBusinessLicenseImg"></i>
              </div> -->
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click.native="editSubmit('editForm')">提交</el-button>
            <el-button @click.native="editClose">取消</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02 12:33',
          name: '王小虎',
          file: '123kb',
          type:'jpg'
        }, {
          date: '2016-05-04 12:33',
          name: '王小虎',
          file: '123kb',
          type:'jpg'
        }, {
          date: '2016-05-01 12:33',
          name: '王小虎',
          file: '123kb',
          type:'jpg'
        }, {
          date: '2016-05-03 12:33',
          name: '王小虎',
          file: '123kb',
          type:'jpg'
        }],
        //新建
        addFormVisible:false,
        //编辑
        editFormVisible:false
      }
    },
    methods:{
      //编辑
      handleEdit(){
        this.editFormVisible = true
      },
      editClose(){
        this.editFormVisible = false
      },
      handleDel:function(){
        this.$confirm('确认删除该健康资料吗？','删除',{
          type:'warning'
        })
      },
      //新建
      handleClose(){
         this.addFormVisible = false;
      }
    }
  }
</script>
<style lang="scss">
/*上传组件样式*/
.avatar-uploader {
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  i{
    color: #128DDA;
  }
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
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.show-img{
  position: relative;
  width: 178px;
  .avatar{
    display: block;
      width: 178px;
      height: 178px;
  }
  .uploader-delete{
    position: absolute;
    top: -5px;
    right: -5px;
    font-size: 20px;
  }
}
</style>
<style scoped>
.safety_box{
  display: flex;
  flex-direction: column;
  background: #F6F6F6;
  padding-bottom: 10px;
}
.safety_top{
  width: 95%;
  margin-left: 2.5%;
  margin-top: 11px;
}
.safety_button{
  float: left;
  margin-bottom: 10px;
}
.safety_button button{
  background: #409EFF;
  border: 1px solid #E6E6E6;
  border-radius: 4px;
  border: 0;
  outline: 0;
  padding:5px 10px;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #FFFFFF;
  letter-spacing: 0.46px;
}
button img{
  width: 12px;
  height: 10px;
  
}
.el-button{
  font-family: PingFangSC-Regular;
  font-size: 12px;
  /* color: #DD2F15; */
  letter-spacing: 0.46px;
  color: #3685D7
}
.el-button:nth-child(2){
  color: #DD2F15;
}
.dialog-footer{
  display:flex;
  align-items: center;
  justify-content: center;
}
.dialog-footer .el-button{
  font-family: PingFangSC-Medium;
  font-size: 14px;
  color: #FFFFFF;
  letter-spacing: 0;
}
.dialog-footer .el-button:nth-child(2){
  font-family: PingFangSC-Medium;
  font-size: 14px;
  color: #333333;
  letter-spacing: 0;
}
</style>
