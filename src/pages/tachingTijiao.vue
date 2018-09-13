<template>
<div>
  <el-dialog
  title="提交任务"
  :visible.sync="an"
  width="50%"
  :before-close="handleClose">
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="任务名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="上传文件">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList3">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
    </el-form>

  <div slot="footer" class="dialog-footer">
    <el-button @click="quxiao">取 消</el-button>
    <el-button type="primary" @click="queding" :disabled="this.form.name.length === 0">确 定</el-button>
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
        //上传文件
      fileList3: [],
      length:29,
      form:{
        'id':'',
        'name':'',
        'type':'项目实训',
        'textnunm':'0',
        'date':'2017-12-12',
        'author':'wt',
        'status':'未分配',
        'imgurl':'', 
        'content':''
      }        
    }
  },
  props:{
    an:'',
  },
  methods: {
      //上传文件
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    quxiao(){ 
        this.isanpai = false;
        this.$emit('childAn',this.isanpai)
    },
    queding(){
      this.$confirm('是否提交?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.length =this.length+1;
        this.form.id = this.length;//获取当前id
        //获取当前时间
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;

        this.form.date = currentdate;//获取当前时间

        this.$api.post('/resourceAdd',{
          params: {
            obj: this.form
            }
          })
        .then(res=>{
          this.$emit("childdata",res.data)
        })
        this.$message({
          type: 'success',
          message: '提交成功!'
        });
        this.dialogFormVisible = false
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消提交'
        });          
      });
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
