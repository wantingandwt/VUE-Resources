<template>
<div class="index-bg">
   <div class="all-content">
     <div class="help-top">
			<span class="layui-breadcrumb search-breadcrumb">
				  <span> 当前位置：</span>
				  <a>首页</a><span lay-separator="">&gt;</span>
				  <a>个人信息</a>
			</span>
		</div>
    <div class="help-body">
      <div class="help-img">
          <img src="../assets/portrait.jpg">
      </div>
      <el-form :model="form" status-icon :rules="rules" ref="form" class="manageform">
        <el-form-item  prop="username">
          <el-input v-model.number="form.username" auto-complete="off" placeholder="请输入用户名" prefix-icon="icon-use"></el-input>
        </el-form-item>
        <el-form-item  prop="pwd">
          <el-input type="password" v-model="form.pwd" auto-complete="off" placeholder="请输入密码" prefix-icon="icon-password"></el-input>
        </el-form-item>
        <el-form-item  prop="checkPass">
          <el-input type="password" v-model="form.checkPass" auto-complete="off" placeholder="请输入确认密码" prefix-icon="icon-password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" round @click="submitForm('form')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>

   </div>
</div>
</template>

<script>

export default {
  name: 'info',
  data () {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }else{
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.form.checkPass !== '') {
            this.$refs.form.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.pwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      form:{
          username:'',
          pwd:'',
          checkPass:''
      },
      rules: {
        pwd: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        username: [
          { validator: checkAge, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.setmanageList();
  },
  methods: {   
    setmanageList(){
       this.$api.get('/login','')
       .then(res =>{
          this.form.username = res.data.data.username;
          this.form.pwd = res.data.data.pwd;
       })
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             this.$confirm('是否提交?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                this.$api.post('/loginEdit',{
                params:{
                  obj:this.form
                }
              })
                .then(res =>{
                    this.form.username = res.data.data.username;
                    this.form.pwd = res.data.data.pwd;
                    this.$message({
                      type: 'success',
                      message: '提交成功!'
                    });
                })
             }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消提交'
              });          
            });
             
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
  }
    
}
</script>

<style scoped>
.help-top {
    background: #fff;
    padding: 0 40px;
}
.help-body {
    background: #fff;
    padding: 0 0 0 40px;
    min-height: 500px;
}
.manageform {
    width: 350px;
    margin: 0 auto;
    padding: 30px 0 80px;
}
.help-img{
 text-align:center;
padding-top:50px;
}
.help-img img{
  width:200px;
  height:200px;
  border-radius:50%;
}

</style>
