<template>
	<div class="upgoods">

		<!-- 表单 -->
		<el-form :inline="true" class="form-inline">
			<el-form-item label="">
				<el-input placeholder="所属区域平台"></el-input>
			</el-form-item>

			<el-form-item label="">
				<el-input placeholder="供应商名称"></el-input>
			</el-form-item>

			<el-form-item label="">
				<el-input placeholder="联系人/联系方式"></el-input>
			</el-form-item>

			<el-form-item label="">
				<el-input placeholder="发货市"></el-input>
			</el-form-item>
			<el-form-item label="">
				<el-date-picker type="date" placeholder="创建时间起">
				</el-date-picker>

			</el-form-item>
			<el-form-item label="">
				<el-date-picker type="date" placeholder="创建时间止">
				</el-date-picker>
			</el-form-item>

			<el-form-item label="">
				<el-button type="primary" icon="el-icon-search">搜索</el-button>
			</el-form-item>

			<el-form-item label="">
				<el-button type="primary" icon="el-icon-refresh-right">重置</el-button>
			</el-form-item>

			<el-form-item label="">
				<el-button type="primary" icon="el-icon-download">导出</el-button>
			</el-form-item>

		</el-form>

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
	import {
		pageList
	} from  "../../common/dictionary.js";
	export default {
		data() {
			return {
				pageList,
				pageMax: 1,
				loading: true,
				pageObj: {
					contact: "",
					// createBegin:"",
					// createEnd:"",
					// id:"",
					// startCity:"",
					// supplerId:"",
					// sysOrgCode:"",
					
					// pageNo: 1,
					// pageSize: 10,
					// pageToal: 0,
				
				},
				tableData: [],
				dialogTableVisible: false,
				dialogTableVisible_edit: false,
				pageObjDtl: {},
			}
		},
		async  created(){
			console.log(this.pageObj)
			this.getList(this.pageObj);
			
		},
		methods:{
			async getList(params) {
				this.loading = true;
				// let res = await this.$axios.upgoods_rule(params);
				let res = await this.$axios.upgoods_query(params);
				
				console.log(res)
				this.loading = false;
				if (!res) {
					return;
				}
			
				// let data = res.result;
				// this.pageObj.pageNo = data.pages;
				// this.pageObj.pageToal = data.total;
				// this.pageObj.pageMax = Math.ceil(this.pageObj.pageToal / this.pageObj.pageSize);
				// this.pageObj.pageNo = this.pageObj.pageNo >= this.pageObj.pageMax ? this.pageObj.pageMax : this.pageObj.pageNo;
				// this.tableData = data.list;
				// this.loading = false;
				// console.log(this.tableData)
				//console.log(this.pageObj)
			
			},
			
		}
	}
</script>
<style>
	

</style>
