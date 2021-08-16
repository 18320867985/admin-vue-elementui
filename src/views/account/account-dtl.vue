<template>
	<div class="upgoods">

		<!-- 表格 -->
		<div class="upgoods-table">
			<el-table :data="tableData" border style="width: 100%">

				<el-table-column prop="id" label="序号" width="80">
				</el-table-column>

				<el-table-column label="操作" width="180">

				</el-table-column>

				<el-table-column prop="address" label="区域ID" width="200">
				</el-table-column>

				<el-table-column label="供应商名称">
				</el-table-column>

				<el-table-column label="联系人姓名">
				</el-table-column>

				<el-table-column label="联系人电话">
				</el-table-column>

				<el-table-column label="所属战区">
				</el-table-column>

				<el-table-column label="报价组织">
				</el-table-column>

				<el-table-column label="提货服务范围">
				</el-table-column>

				<el-table-column label="创建时间">
				</el-table-column>

			</el-table>
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
		},
		created(){
			console.log(this.$route.params.id)
		}
	}
</script>
<style>

</style>
