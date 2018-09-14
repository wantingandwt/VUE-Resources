<template>
<div class="index-bg">
	<!--搜索-->
	  <div class="search">
		  <div class="all-content">
        <span class="layui-breadcrumb search-breadcrumb">
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
    <!-- <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span> -->
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
require('echarts/lib/chart/line')
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
      this.$nextTick(()=> { this.drawLine(); })//异步更新
    },
     drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        xAxis: {
          name: '所属课程',
          axisTick: {
              show: false
          },
          splitLine: {
              show: false
          },
          splitArea: {
              show: false
          },
          data: ['英语', '数学', '地理', '语文', '计算机', '物理', '化学', '生物', '政治', '奥数'],
          axisLabel: {         
              interval: 0,
              fontSize: 14,
              fontWeight: 100,
              textStyle: {
                  color: '#333',

              },
        formatter:function(value) 
        {   
          var ret = "";//拼接加\n返回的类目项  
          var maxLength = 4;//每项显示文字个数  
          var valLength = value.length;//X轴类目项的文字个数  
          var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数  
          if (rowN > 1)//如果类目项的文字大于3,  
          {  
            for (var i = 0; i < rowN; i++) {  
              var temp = "";//每次截取的字符串  
              var start = i * maxLength;//开始截取的位置  
              var end = start + maxLength;//结束截取的位置  
              //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧  
              temp = value.substring(start, end) + "\n";  
              ret += temp; //凭借最终的字符串  
            }  
            return ret;  
          }  
          else {  
            return value;  
          }  
        }  
          },
          axisLine: {
              lineStyle: {
                  color: '#bebebc',//X轴颜色
          width: 4//x轴宽度
              },
          }
     },
    yAxis: {
      name: '成绩',
      nameTextStyle:{
        fontSize: 14,
        color:'#333',
      },
      nameGap: 40,//距轴线的高度
          axisTick: {
              show: false
          },
          splitLine: {
              show: true 
          },
          splitArea: {
              show: false
          },
          axisLabel: {
              textStyle: {
                  color: '#333',
                  fontSize: 14,
              }
          },
          axisLine: {
              lineStyle: {
                  color: '#bebebc',
          width:4
              }
          }
     },
    tooltip: {
      "trigger": "item",
      "textStyle": {
        "fontSize": 12
      },
      "formatter": "{b0}:{c0}"
    },
    series: [
		{  name:'成绩',
			type:"bar",
			itemStyle: {
				normal: {
					color: {
						type: 'linear',
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [{
							offset: 0,
							color: '#79dcf9' // 0% 处的颜色
						}, {
							offset: 1,
							color: '#294bea' // 100% 处的颜色
						}],
						globalCoord: false // 缺省为 false
					},
					barBorderRadius: 30,
				}
			},
			barWidth: 15,
			data: [ 103, 78, 64, 94, 79, 83,100,105,80,67]
		},
		{
			type:"line",
			label: {
        normal: {
          show: true,
          position: 'top',//在线上显示该data
					formatter: '{c} 分'//显示的样子
         }
      },
			itemStyle: {
				normal: {
					color:'#2a4be8' 
				}
			},
	  	data: [ 103, 78, 64, 94, 79, 83,100,105,80,67]
		}
	],
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
