<template>
<div class="index-bg">
	<!--搜索-->
	  <div class="search">
		  <div class="all-content">
        <span class="layui-breadcrumb search-breadcrumb" lay-separator=">" style="visibility: visible;">
            <span> 当前位置：</span>
            <a>首页</a><span lay-separator="">&gt;</span>
            <a>成绩统计</a>
        </span>
      <div class="form-search">
          <el-form ref="form" :model="form" :inline="true">
              <el-form-item>
                <el-input v-model="form.search" placeholder="请输入任务"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input v-model="form.textype" placeholder="请输入所属课程"></el-input>
              </el-form-item>
              <el-form-item>
              <el-button type="primary" @click="searchSubmit">搜索</el-button>
              </el-form-item>
          </el-form>
        </div>
      </div>
   </div>
   <div class="all-content teaching-search">
      <div class="manage-button">
         <el-button type="text" size="medium"  class="kejian-a" icon="el-icon-star-off" @click="cardFenxi">成绩分析</el-button>
        <el-button type="text" size="medium"  class="import-a" icon="icon-import">导出成绩</el-button>
      </div>
    </div>
    <el-dialog
    title="成绩分析"
    :visible.sync="dialogVisible"
    width="80%"
    :before-close="handleClose">
    <div id="myChart" class="chart">123</div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
    <div class="all-content manage-body">
      <div class="manage-table" style="min-height: 387px;">
        <el-table
          ref="multipleTable"
          :data="listData"
          border
          stripe
          tooltip-effect="dark"
          style="width: 100%"  >
          </el-table-column>
          <el-table-column
            prop="id"
            label="序号"
            width="50">
          </el-table-column>
          <el-table-column
            prop="name"
            label="任务名称">
          </el-table-column>
          <el-table-column
            prop="textype"
            label="所属课程">
          </el-table-column>
          <el-table-column
            prop="date"
            sortable
            label="完成时间">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="card"
            sortable
            label="成绩">
            <template slot-scope="scope">
              <span style="margin-left: 10px;color:red">{{ scope.row.card }}分</span>
            </template>
          </el-table-column>
           <el-table-column
            prop="content"
            label="评语"         
            width="140">
          </el-table-column>
        </el-table>
        </div>
      </div>


</div>
</template>

<script>
//按需 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/bar')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')

export default {
  name: 'help',
  data () {
    return {
      dialogVisible: false,
      form:{
        search:'',
        textype:''
      },
      listData:[],
      tableData:[
        {
          id:1,
          name:'期中考试',
          textype:'数学',
          date:'2017-12-12 08:00',
          card:80,
          content:'做的不错'
        },
        {
          id:2,
          name:'期中考试',
          textype:'英语',
          date:'2017-12-13 08:00',
          card:90,
          content:'优秀'
        },
        {
          id:3,
          name:'期中考试',
          textype:'数据结构',
          date:'2017-12-13 13:00',
          card:70,
          content:'及格'
        },
        {
          id:4,
          name:'期中考试',
          textype:'地理',
          date:'2017-12-13 08:00',
          card:60,
          content:'及格'
        },
        {
          id:5,
          name:'小测',
          textype:'数学',
          date:'2017-12-14 08:00',
          card:80,
          content:'良'
        },
        {
          id:6,
          name:'小测',
          textype:'语文',
          date:'2017-12-15 09:00',
          card:100,
          content:'优秀'
        },
        {
          id:7,
          name:'小测',
          textype:'语文',
          date:'2017-12-15 09:00',
          card:10,
          content:'差'
        },
        {
          id:8,
          name:'小测',
          textype:'英语',
          date:'2017-12-15 09:00',
          card:15,
          content:'差'
        }
      ]
    }
  },
  created() {
    this.setmanageList();
  },
  mounted() {
   // this.$nextTick(()=> { this.drawLine(); })
    setTimeout(() => { this.drawLine();},10)
  },
  methods: {
    handleClose(done) {
        this.dialogVisible = false;
    },
    setmanageList(){
       this.listData = this.tableData
    },
	  //搜索
	  searchSubmit(){
       var arrData =[];
       for(var i=0;i<this.tableData.length;i++){
         if(this.tableData[i].name.search(this.form.search) != -1 && this.tableData[i].textype.search(this.form.textype) != -1){
           arrData.push(this.tableData[i]);
         }
       }
      this.listData = arrData;
    },
    cardFenxi(){
      this.dialogVisible = true;
    },
     drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        title: { text: 'ECharts 入门示例' },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      });
    }
  }
    
}
</script>

<style scoped>
.kejian-a {
    font-size: 16px;
}
.chart{
  height:500px;
  width:100%;
}
</style>
