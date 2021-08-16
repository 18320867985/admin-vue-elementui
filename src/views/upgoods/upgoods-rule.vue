<template>
	<div class=" upgoods upgoods-rule">

		<!-- 表格 -->
		<div class="upgoods-rule-table">
			<el-table :data="tableData" border style="width: 100%">

				<el-table-column prop="id" label="序号" width="80">
				</el-table-column>

				<el-table-column label="发货省" width="180">
					江苏省
				</el-table-column>

				<el-table-column prop="address" label="发货市" width="200">
					苏州市
				</el-table-column>

				<el-table-column label="提货范围">
					姑苏区
				</el-table-column>

				<el-table-column label="是否启用包提服务">
					是
				</el-table-column>

				<el-table-column label="规则">
					票重组合包提
				</el-table-column>

				<el-table-column label="限定重量">
					2000
				</el-table-column>

				<el-table-column label="限定票数">
					3
				</el-table-column>

			</el-table>
		</div>
		
		<!-- 分页 -->
		<div class="upgoods-page">
			  <div class="block">
				<el-pagination background layout=" prev, pager, next, jumper,total, sizes" :total="1000">
				</el-pagination>
		
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [{
						id: 1,
						name: '王小虎',
						address: '上海市普陀区金沙江路 1518 弄'
					}, {
						id: 2,
						name: '王小虎',
						address: '上海市普陀区金沙江路 1518 弄'
					},
					{
						id: 3,
						name: '王小虎',
						address: '上海市普陀区金沙江路 1518 弄'
					},
					{
						id: 4,
						name: '王小虎',
						address: '上海市普陀区金沙江路 1518 弄'
					},
					{
						id: 5,
						name: '王小虎',
						address: '上海市普陀区金沙江路 1518 弄'
					},
					{
						id: 6,
						name: '王小虎',
						address: '上海市普陀区金沙江路 1518 弄'
					},
					{
						id: 7,
						name: '王小虎',
						address: '上海市普陀区金沙江路 1518 弄'
					},
					{
						id: 8,
						name: '王小虎',
						address: '上海市普陀区金沙江路 1518 弄'
					},
					{
						id: 9,
						name: '王小虎',
						address: '上海市普陀区金沙江路 1518 弄'
					},
					{
						id: 10,
						name: '王小虎',
						address: '上海市普陀区金沙江路 1518 弄'
					}

				]
			}
		}
	}
</script>
<style>

</style>
