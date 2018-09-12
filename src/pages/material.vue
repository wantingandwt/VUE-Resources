<template>
<div class="index-bg">
<div class="search">
		  <div class="all-content">
			<span class="layui-breadcrumb search-breadcrumb" style="visibility: visible;">
				  <span> 当前位置：</span>
				  <a href="/index">首页</a><span>&gt;</span>
				  <a>素材库{{ id }}</a><span></span>
			</span>
			  <ul class="material-ul">
				  <li>
					  <span class="material-span">{{ details.type }}:</span>
            <template v-for="(item,index) in details.typrch">
              <span  @click="getIndex(index)">
					     <router-link :to="item.url" active-class="active">{{ item.name }}</router-link>
               </span>
            </template>
				  </li>		
          <li v-for="(ir,numa) in details.dataList">
					  <span class="material-span">{{ ir.type }}:</span>
             <template v-for="(irc,numac) in ir.namech">
					     <a :class="{'active':numac==0}" href="javascript:;">{{ irc.name }}</a>
            </template>
				  </li>			  		 
			  </ul>
        <div class="form-search">
          <el-form ref="form" :model="form" :inline="true">
              <el-form-item>
                <el-input v-model="form.search" placeholder="请输入素材名称"></el-input>
              </el-form-item>
              <el-form-item>
              <el-button type="primary" @click="searchSubmit">搜索</el-button>
              </el-form-item>
          </el-form>
          <div class="search-right">
            <router-link :to="{path:'/materialmanage'}">素材管理</router-link>
          </div>
       </div>
		   </div>
	  </div>
    <div class="all-content">
        <div class="material-li">

            <div class="material-item" v-for="(item,index) in list.slice((currentPage-1)*pagesize,currentPage*pagesize)">
              <router-link :to="'/materialDetails/'+item.id+'/?materId='+id">
                <div class="index-materialimg">
                  <img :src="item.imgurl" class="materialImg">
                </div>
                <p>{{ item.name }}</p>
                <span class="material-blue">{{ item.texttype }}</span><span class="material-hui">下载量：{{ item.downnum }}次</span>
              </router-link>
            </div>
           <!--分页-->
          <div class="page">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            background
            :page-size="6"
            layout="prev, pager, next"
            :total="length">
            </el-pagination>
          </div>
          <!--分页 end-->
        </div>
   	</div>
</div>
</template>

<script>
export default {
  name: 'material',
  data () {
    return {
      id: this.$route.params.id,
			details:[],
			tableData:[],
			currentPage: 1,
      pagesize: 6,
      length:29,
      form:{
        'search':'',
      },
      list:[]
    }
  },
  methods:{
		  getIndex:function(index){
				//console.log(index)
					this.id=index;
			},
      getData(){
          this.$api.post('/material/list')
          .then((response) => {
              this.details = response.seller;
          })
			},
		//获取列表
    setmanageList:function(){
        this.$api.get('/material/data','')
        .then(res => {
          //console.log(res.data);
          this.tableData = res.data;
          this.list = res.data;
          this.length= this.list.length
        });
		},
		//分页
    handleSizeChange: function (size) {
      this.pagesize = size
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
    },
    //搜索
    searchSubmit:function(){
        //逻辑-->根据input的value值筛选tableData中的数据
        var arrByZM = [];//声明一个空数组来存放数据
        for (var i=0;i<this.tableData.length;i++){
            //for循环数据中的每一项（根据name值）
            if(this.tableData[i].name.search(this.form.search) != -1){
                //判断输入框中的值是否可以匹配到数据，如果匹配成功
                arrByZM.push(this.tableData[i]);
                //向空数组中添加数据
            }
        }
        this.list = arrByZM;
        this.length= this.list.length
        //console.log(this.list)
    }
    
  }, 
  created (){
		this.getData();
    this.setmanageList();
  }
    
}
</script>

<style scoped>

</style>
