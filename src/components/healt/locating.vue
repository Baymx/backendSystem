<template>
  <div class="newest_box">
    <el-table :data="tableData" border style="width: 95%;margin-left:2.5%;">
      <el-table-column prop="project" label="地址" width="190"></el-table-column>
      <el-table-column prop="result" label="经纬" width="180"></el-table-column>
      <el-table-column prop="analyze" label="维度" width="180"></el-table-column>
      <el-table-column prop="date" label="时间" width="180"></el-table-column>
      <el-table-column label="查看">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleDel(scope.$index, scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
 
</template>
<script>
export default {
  data() {
    return {
      tableData: [{
        project: '北京市海淀区软件园系二路',
        result: '40.0590591430664',
        analyze: '40.0590591430664',
        date: '2019-08-29 18.02'

      }, {
        project: '北京市海淀区软件园系二路',
        result: '40.0590591430664',
        analyze: '40.0590591430664',
        date: '2019-08-29 18.02'
      }, {
        project: '北京市海淀区软件园系二路',
        result: '40.0590591430664',
        analyze: '40.0590591430664',
        date: '2019-08-29 18.02'
      }, {
        project: '北京市海淀区软件园系二路',
        result: '40.0590591430664',
        analyze: '40.0590591430664',
        date: '2019-08-29 18.02'
      }]
    }
  }
}
</script>
<style scoped>
.newest_box p {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #999999;
  letter-spacing: 0.62px;
  padding:16px 40px;
}
</style>
