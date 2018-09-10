<template>
  <div class="login">
	  <img src="../assets/loginLeft.png" title="wt" height="420">
		<el-form :model="ruleForm"  ref="ruleForm" :rules="rules" label-width="60px" class="login-form">
	    <div class="logo-img"> 
        <img src="../assets/loginLogo.png" title="logo" alt="logo">
      </div>
			<el-form-item label="名称" prop="username">
				<el-input v-model="ruleForm.username" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="pwd">
				<el-input type="password" v-model="ruleForm.pwd" auto-complete="off"></el-input>
			</el-form-item>
			<div class="formsubmit">	
				<el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
			</div>
		</el-form>
  </div>
</template>
<script>
  export default {
    name:'login',
    data () {
      return {
        logining: '',
        ruleForm: {   
              username: '',         
              pwd: ''
        },
        rules: {
              username: [
                { required: true, message: '请输入名称', trigger: 'blur' },
                { min: 3, max: 7, message: '长度在 3 到 7 个字符', trigger: 'blur' }
          ],
          pwd: [
                { required: true, message: '请输入密码', trigger: 'blur' }
              ],
        }
	  }
  },
	 methods: {
     submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {   
            this.$api.post('/login',{
              params: {
                obj:this.ruleForm // 选择FormData方式传参
                }  
            })
            .then(r => {
              this.logining = r.data.status;
              if (this.logining == true){
                sessionStorage.setItem('user', JSON.stringify(this.ruleForm));//存储在web
                this.$message({
                    message: '登录成功',
                    type: 'success'
                  }); 
                  this.$router.push({ path: '/index' });
              }else{
                this.$message({
                  message: '用户名或密码错误',
                  type: 'warning'
                });
              }
          })                            
        } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style>
 html{
	background:url(../assets/loginBg.png) #95c7ec;
}
body{
	height:100%;
}
.login{
	position: absolute;
	top:50%;
	left:50%;
	margin-top:-210px;
	margin-left:-500px;
	width:958px;
	height:420px;
}
.logo-img{
    margin:50px 0;
    text-align: center;
}
.logo-img img{
    vertical-align: bottom;
}
.logo-img span{
    font-size:30px;
    line-height: 60px;
}
.login .login-form{
	float: right;
	width:360px;
	height:420px;
	background: #fff;
}
.login-form .el-radio-group{
    margin-left:50px;
    margin-bottom: 50px;
}
.login-form .el-form-item{
   padding:0 30px;
}
.login-form .el-form-item--small.el-form-item{
  margin-bottom: 30px;
}
.login-form .el-form-item--small .el-form-item__label{
    line-height: 42px;
}
.login-form .el-input--small .el-input__inner{
    height: 42px;
    line-height: 42px;
}
.login-form .el-button--primary{
    margin-top: 30px;
    width: 100%;
    color: #fff;
    font-size: 16px;
    border-radius: 50px;
    background: #377ef1;
    padding:12px 15px;
}
.formsubmit{
    padding: 0 30px;
}
</style>