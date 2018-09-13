<template>
<div>
  <el-dialog
  title="分配任务"
  :visible.sync="an"
  width="50%"
  :before-close="handleClose">
  <div class="manage-table">
   <el-table
    ref="multipleTable"
    :data="tableform"
    tooltip-effect="dark"
    border
    stripe
    style="width: 100%"
    @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="id"
        label="ID"
        width="85">
      </el-table-column>
      <el-table-column
        prop="name"
        label="班级">
      </el-table-column>
      <el-table-column
        label="开始时间">
        <template slot-scope="scope">
          <el-date-picker
            v-model="tableform[scope.$index].startDate"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
         </template>
      </el-table-column>
      <el-table-column
        label="结束时间">
        <template slot-scope="scope">
          <el-date-picker
            v-model="tableform[scope.$index].endDate"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
         </template>
      </el-table-column>
    </el-table>
  </div>
  <div slot="footer" class="dialog-footer">
    <el-button @click="quxiao">取 消</el-button>
    <el-button type="primary" @click="queding" :disabled="this.multipleSelection.length === 0">确 定</el-button>
  </div>
</el-dialog>
</div>
</template>

<script>
export default {
  name: 'task',
  data () {
    return {
      isanpai:'',
      tableform:[
        { id:1,name:'2017年一班',startDate:'',endDate:''},
        { id:2,name:'2017年二班',startDate:'',endDate:''},
        { id:3,name:'2017年三班',startDate:'',endDate:''},
        { id:4,name:'2017年四班',startDate:'',endDate:''},
        { id:5,name:'2017年五班',startDate:'',endDate:''},
      ],
      multipleSelection:[]
    }
  },
  props:{
    an:'',
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    quxiao(){ 
        this.isanpai = false;
        this.$emit('childAn',this.isanpai)
    },
    queding(){
        console.log(this.multipleSelection)
    },
	   handleClose(done) {
      this.isanpai = false;
      this.$emit('childAn',this.isanpai)
    }
  }
    
}
</script>

<style scoped>

</style>
