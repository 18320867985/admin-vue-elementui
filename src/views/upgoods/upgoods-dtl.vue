<template>

	<div class="upgoods upgoods-dtl">

		<el-scrollbar wrap-class="scrollbar-wrapper">
			<el-table :data="tableData" style="width: 100%">

				<el-table-column>
					<el-table-column label="中心公里数" width="120">
						0-10
					</el-table-column>
				</el-table-column>

				<el-table-column label="0-300KG">

					<el-table-column label="最低收费">
						60
					</el-table-column>

					<el-table-column label="单价">
						0.3
					</el-table-column>

					<el-table-column label="佣金系数">
						1
					</el-table-column>


				</el-table-column>

				<el-table-column label="300-500KG">

					<el-table-column label="最低收费">
						90
					</el-table-column>

					<el-table-column label="单价">
						0.3
					</el-table-column>

					<el-table-column label="佣金系数">
						1
					</el-table-column>


				</el-table-column>

				<el-table-column label="500-800KG">

					<el-table-column label="最低收费">
						100
					</el-table-column>

					<el-table-column label="单价">
						0.3
					</el-table-column>

					<el-table-column label="佣金系数">
						1
					</el-table-column>


				</el-table-column>

				<el-table-column label="800-1000KG">

					<el-table-column label="最低收费">
						100
					</el-table-column>

					<el-table-column label="单价">
						0.3
					</el-table-column>

					<el-table-column label="佣金系数">
						1
					</el-table-column>


				</el-table-column>

				<el-table-column label="1000-2000KG">

					<el-table-column label="最低收费">
						150
					</el-table-column>

					<el-table-column label="单价">
						0.09
					</el-table-column>

					<el-table-column label="佣金系数">
						1
					</el-table-column>


				</el-table-column>
<!-- 
				<el-table-column label="2000-3000KG">

					<el-table-column label="最低收费">
						180
					</el-table-column>

					<el-table-column label="单价">
						0.07
					</el-table-column>

					<el-table-column label="佣金系数">
						1
					</el-table-column>


				</el-table-column>

				<el-table-column label="3000-5000KG">

					<el-table-column label="最低收费">
						180
					</el-table-column>

					<el-table-column label="单价">
						0.07
					</el-table-column>

					<el-table-column label="佣金系数">
						1
					</el-table-column>


				</el-table-column>

				<el-table-column label="8000-38000KG">

					<el-table-column label="最低收费">
						180
					</el-table-column>

					<el-table-column label="单价">
						0.07
					</el-table-column>

					<el-table-column label="佣金系数">
						1
					</el-table-column>


				</el-table-column>
 -->
			</el-table>
		</el-scrollbar>

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
