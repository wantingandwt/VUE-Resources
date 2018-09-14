<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style>
@import './assets/fonts/fonts.css';

html,body,div,ul,li,ol,dl,dt,dd,p,img,i,button,h1,h2,h3,h4,h5,h6,span,input{
  margin:0;padding:0;
}
body{
	font: 14px Microsoft YaHei,Helvetica Neue,Helvetica,PingFang SC,\5FAE\8F6F\96C5\9ED1,Tahoma,Arial,sans-serif;
	min-width:1130px;
}
h1,h2,h3,h4,h5,h6{font-size:100%;}
img{border:0;}
ul,ol,li{list-style:none;}
input,button{ border:0;background:none;outline:none;}
a{text-decoration:none;color:#333;}
a:hover{text-decoration:none;color:#377ff1;}
.clearfix:after{content:"";display:block;height:0;visibility:hidden;clear:both;}
.clearfix{zoom:1;}

.nav .el-menu-item{
    margin-right: 6px;
}
.nav .el-menu-item,.nav .el-submenu .el-submenu__title{
	font-size:16px;
	color:#333;
}
.nav .el-submenu .el-submenu__title{
  padding:0 40px;
  height:60px;
  line-height:60px;
  margin-right: 6px;
}
.nav .el-menu--horizontal>.el-menu-item.is-active,.nav .el-submenu .el-submenu__title:hover,.el-menu--horizontal>.el-submenu.is-active .el-submenu__title,.nav .el-menu .el-menu-item:hover{
    color: #fff;
    background: #377ef1;
    border:0;
}
.el-menu::after, .el-menu::before{
  display:none;
}
.all-content {
    width: 1130px;
    margin: 0 auto;
}
.index-bg {
    background: #edeff0;
}
.search{
	background: #fff;
	padding: 0 0 15px;
}
.search-breadcrumb{
	padding-top: 15px;
	display: inline-block;
}
.search-breadcrumb a{
	color:#333 !important;
}
.search-breadcrumb a:hover{
	color:#377ff1 !important;
}
.material-ul{
	margin-top:20px;
}
.material-ul li{
	line-height: 49px;
	border-bottom: 1px solid #e5e5e5;
}
.material-ul li a{
	margin-right:13px;
}
.material-ul li  a{
	padding:5px 10px;
}
.material-ul li .material-span{
	width:90px;
	font-weight: 600;
	display: inline-block;
}
.material-ul li .active,.material-ul li  a:hover{
	color:#fff;
	padding:5px 10px;
	border-radius: 3px;
	background: #003b93;
}
.search-right{
	text-align: right;
	padding:30px 0;
}
.search-right a{
	display: inline-block;
	font-size:16px;
	color:#fff;
	width:100px;
	height:40px;
	line-height: 40px;
	text-align: center;
	background:#fbae4a;
	border-radius: 5px;
}
.search-right a:hover{
	background: #377ff1;
}
.mater-one{
	float:left;
}
.mater-two{
	float:right;
}
.mater-li:hover span,.mater-li:hover p{
	color:#377ff1;
}
.manage-button{
	text-align: right;
	margin-top:25px;
}
.manage-button button{
	height:50px;
	line-height: 50px;
	padding:0 15px;
	border-radius: 5px;
	cursor: pointer;
	display: inline-block;
}
.import-a{
	font-size:16px;
}
.import-a i,.del-a i,.kejian-a i,.add-a i,.el-button.is-disabled:hover i{
	font-size: 34px;
	vertical-align: -8px;
	margin-right:10px;
}
.import-a i{
	color:#11d37a;
}
.kejian-a i{
	color:#fda333;
	  vertical-align: -3px;
}
.kejian-a:hover,.kejian-this{
	background: #fda333;
}
.import-a:hover i,.import-a:hover span,.kejian-a:hover span,.kejian-a:hover i,.kejian-this i,.kejian-this{
	color:#fff;
}
.import-a:hover{
	background: #11d37a;
}
.del-a i,.el-button.is-disabled:hover i{
	color:#3377eb;
}
.del-a:hover i,.del-a:hover span{
	color:#fff;
}
.del-a:hover{
	background: #3377eb;
}
.manage-button span,.el-button.is-disabled:hover span{
  color:#333;
}

.page{
	padding:60px 0;
	text-align: center;
}

.manage-body{
	background: #fff;
	margin-top:10px;
}
.manage-table{
	padding:20px 0;
}

.el-table thead tr th{
  color:#333;
  background: #f2f6f7;
  text-align:center;
}
.el-table--striped .el-table__body tr.el-table__row--striped td{
  background: #f9fafc;
}
.el-table tr td{
  text-align:center;
}
.el-table td, .el-table th{
  padding:5px 0;
}
.el-dialog__header{
  background:#377ff1;
  padding: 15px 20px;
}
.el-dialog__title{
  color:#fff;
}
.el-dialog__headerbtn{
  top:15px;
}
.el-dialog__headerbtn .el-dialog__close{
  font-size: 30px;
  color: #fff;
}
.dialog-footer{
  text-align: center;
}
.form-search{
	margin-top: 40px;
}
.form-search .el-form{
   display: inline-block;
}
.form-search .search-right{
	float:right;
	padding:0;
}
.form-search .el-form-item__content{
	width:360px;
}
.resour-breadcrumb{
    padding-top: 15px;
    display: inline-block;
    position: absolute;
}

.search-samll{
	overflow: hidden;
	margin-top:30px;
}
.search-samll a{
	font-size:16px;
	font-weight: 600;
	margin-right:25px;
	line-height: 38px;
}
.search-samll .active{
	color:#377ff1;
}
.material-li{
	margin:0 -16px;
	text-align: center;
}
.material-item,.course-item{
	background: #fff;
	width:270px;
	display: inline-block;
	border-radius: 8px;
	margin:40px 8px 0 8px;
	padding-bottom: 10px;
}
.material-item p,.course-item p{
	font-size:16px;
	text-align: center;
	margin-top:10px;
	margin-bottom: 10px;
	height:21px;
	overflow: hidden;
}
.material-blue{
	float: left;
	color:#999;
	margin-left:10px;
}
.material-hui{
	float:right;
	color:#999;
	margin-right:10px;
}
.material-item:hover .material-blue,.material-item:hover .material-hui,.material-item:hover p{
	color:#377ff1;
}
.materialImg{
	  width: 270px;
    height: 160px;
    border-radius: 8px;
}
.resource-title span{
	color:#8995af;
	margin:0 10px;
	font-size: 18px;
}
.material-ul li .search-this a, .material-ul li span a:hover {
    color: #fff;
    padding: 5px 10px;
    border-radius: 3px;
    background: #003b93;
}
.manageform .el-input__inner{
   border:0;
   border-bottom:1px solid #dcdfe6;
	 border-radius:0;
}
.manageform  .el-form-item__label{
	font-size:16px;
}
.manageform .el-button.is-round{
	width:100%;
	font-size: 16px;
	margin-top: 16px;
}
.manageform .el-input__icon{
    color: #9d9d9d;
    font-size: 20px;
}
.manageform .el-input--prefix .el-input__inner{
	padding-left:40px;
}
</style>
