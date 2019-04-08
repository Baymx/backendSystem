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
         <el-table-column prop="name" label="设备" width="270"></el-table-column>
          <el-table-column prop="file" label="编号" width="270"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" icon="el-icon-delete" @click="handleDel(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 新建 -->
        <el-dialog title="添加新设备" v-if="addFormVisible" :visible.sync="addFormVisible" width="400px" :before-close="handleClose">
          <el-form :model="addForm" label-width="100px" ref="addForm">
            <el-form-item label="设备类型:">
              <el-select v-model="content" style="width:100%" placeholder="请选择">
                <el-option>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="医院名称:">
              <el-input autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" size="mini">提交</el-button>
            <el-button size="mini" @click.native="handleClose">关闭</el-button>
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
          name: '王小虎',
          file: '123kb'
        }, {
          name: '王小虎',
          file: '123kb'
        }, {
          name: '王小虎',
          file: '123kb'
        }, {
          name: '王小虎',
          file: '123kb'
        }],
        //新建
        addFormVisible:false,
        content:''
      }
    },
    methods:{
      handleDel:function(){
        this.$confirm('确认删除该设备吗？','删除',{
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
  color: #DD2F15;
  letter-spacing: 0.46px;
  /* color: #3685D7 */
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
