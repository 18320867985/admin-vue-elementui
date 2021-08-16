<template>
	<div class="account">

		<!-- 表单 -->
		<el-form :inline="true" class="form-inline">
			<el-form-item label="">
				<el-input placeholder="用户/公司名称" v-model="pageObj.userOrCompanyName"></el-input>
			</el-form-item>

			<el-form-item label="">
				<el-select v-model="pageObj.accountSource" placeholder="账户余额来源">
					<el-option v-for="item in accountSourceList" :key="item.value" :label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="">
				<el-select v-model="pageObj.accountType" placeholder="账户类型">
					<el-option v-for="item in accountTypeList" :key="item.value" :label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
			</el-form-item>

			<!-- <el-form-item label="">
				<el-select v-model="pageObj.status" placeholder="账户状态">
					<el-option v-for="item in statusList " :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item> -->

			<el-form-item label="">
				<el-date-picker type="date" placeholder="申请时间起" v-model="pageObj.auditDateStart"
					:value-format="'yyyy-MM-dd hh:mm:ss'">
				</el-date-picker>

			</el-form-item>
			<el-form-item label="">
				<el-date-picker type="date" placeholder="申请时间止" v-model="pageObj.auditDateEnd"
					:value-format="'yyyy-MM-dd hh:mm:ss'"  :default-time="['23:59:59']">
				</el-date-picker>
			</el-form-item>

			<el-form-item label="">
				<el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
			</el-form-item>

			<el-form-item label="">
				<el-button type="primary" icon="el-icon-refresh-right" @click="resetPageObj">重置</el-button>
			</el-form-item>

			<el-form-item label="">
				<el-button type="primary" icon="el-icon-download">导出</el-button>
			</el-form-item>

		</el-form>

		<!-- 表格 -->
		<div class="upgoods-table">
			<el-table :data="tableData" border style="width: 100%" v-loading="loading">

				<el-table-column prop="id" label="账户ID" width="160">
				</el-table-column>

				<el-table-column prop="userOrCompanyName" label="用户/公司名称" width="180">

				</el-table-column>
				
				<el-table-column prop="userType" label="用户类型">
					<template slot-scope="scope">
						<span v-for="item in userTypeList" :key="item.value" v-if="scope.row.userType==item.value">{{item.label}}</span>
					</template>
				</el-table-column>

				<el-table-column prop="accountSource" label="账户余额来源" width="">
					<template slot-scope="scope">
						<span v-for="item in accountSourceList" :key="item.value" v-if="scope.row.accountSource==item.value">{{item.label}}</span>
					</template>

				</el-table-column>

				<el-table-column prop="accountType" label="账户类型">	
					<template slot-scope="scope">
						<span v-for="item in accountTypeList" :key="item.value" v-if="scope.row.accountType==item.value">{{item.label}}</span>
					</template>
				</el-table-column>
					
				<el-table-column prop="auditStatus" label="审核状态">	
					<template slot-scope="scope">
						<span v-for="item in auditStatusList" :key="item.value" v-if="scope.row.auditStatus==item.value"
						 :class="{'text-danger':item.value==2,'text-success':item.value==1}">{{item.label}}</span>
					</template>
				</el-table-column>

		
				<el-table-column prop="createTime" label="申请时间" width="150">
				</el-table-column>

				<el-table-column prop="sumBalance" label="账户总额">
					<template slot-scope="scope">
						<span >￥{{scope.row.sumBalance}}</span>		
					</template>
				</el-table-column>

				<el-table-column prop="balance" label="账户余额">
					<template slot-scope="scope">
						<span >￥{{scope.row.balance}}</span>				
					</template>
				</el-table-column>

				<el-table-column prop="frozenBalance" label="冻结金额">
					<template slot-scope="scope">
						<span >￥{{scope.row.frozenBalance}}</span>				
					</template>
				</el-table-column>
				
				
				<el-table-column prop="amount" label="调整金额">
					<template slot-scope="scope">
						<span >￥{{scope.row.amount}}</span>				
					</template>
				</el-table-column>

				<el-table-column label="操作">
					<template slot-scope="scope">
						<div v-if="scope.row.auditStatus==0">
							<el-button @click="gotodtl(scope.row)" type="text" size="small">详情</el-button>
							<el-button @click="gotodtlEdit(scope.row)" type="text" size="small">审核</el-button>
						</div>
						<div v-if="scope.row.auditStatus!=0">
							<el-button @click="gotodtl(scope.row)" type="text" size="small">详情</el-button>
							 <el-link type="info" disabled style="margin-left: 10px;">已审核</el-link>						
						</div>
						
					</template>
				</el-table-column>

			</el-table>
		</div>

		<!-- 分页 -->
		<div class="upgoods-page" v-if="tableData.length>0">
			<div class="block">
				<el-pagination background layout=" prev, pager, next, jumper,total, sizes" :total="pageObj.pageToal"
					:page-size="pageObj.pageSize" :current-page="pageObj.paegsNo" @size-change="handleSizeChange"
					@current-change="handleCurrentChange" :page-sizes="pageList">
				</el-pagination>

			</div>
		</div>

		<el-dialog title="账户详情" :visible.sync="dialogTableVisible">
			<ul>
				<li><label>用户/公司名称 </label> <span>{{pageObjDtl.companyName}}</span></li>
				<li><label>公司编码 </label> <span>{{pageObjDtl.id}}</span></li>
				<li><label>联系电话</label> <span>{{pageObjDtl.phone}}</span></li>
				<li><label>认证通过时间 </label> <span>{{pageObjDtl.createTime}}</span></li>
				<li><label>账户总余额 </label> <span>￥{{pageObjDtl.sumBalance}}</span></li>
				<li><label>账户冻结金额 </label> <span>￥{{pageObjDtl.frozenBalance}}</span></li>
				<li><label>账户余额 </label> <span>￥{{pageObjDtl.balance}}</span></li>
			
			</ul>
		</el-dialog>

		<el-dialog title="调整账户余额" :visible.sync="dialogTableVisible_edit" >
			<ul class="_edit">

				<li><label>用户/公司名称 </label> <span>{{pageObjDtl.companyName}}</span></li>
				<li><label>账户类型</label>
					<span v-for="item in accountTypeList" :key="item.value" v-if="pageObjDtl.accountType==item.value">{{item.label}}</span>
				</li>
				<li><label>账户原总余额 </label> <span v-if="pageObjDtl.sumBalance">￥{{pageObjDtl.sumBalance}}</span></li>

				<li>
					<label>选择费用类别</label>
					<span v-for="item in feeTypeList" :key="item.value" v-if="pageObjDtl.feeType==item.value">{{item.label}}</span>
				</li>
				
				<li>
					<label>调整金额</label>
					<span v-if="pageObjDtl.amount">￥{{pageObjDtl.amount}}</span>
				</li>
				
				<li>
					<label>备注</label>
					<span>{{pageObjDtl.auditReason}}</span>
				</li>
				
				<li>
					<el-form :inline="true"  class="demo-form-inline">
					 <el-form-item label="审核结果">
						  <el-radio-group v-model="pageObjDtl.auditStatus">
							  <el-radio label="1">审核通过</el-radio>
							  <el-radio label="2">审核不通过</el-radio>
						  </el-radio-group>
					     		  
					  </el-form-item>
					</el-form>
				</li>
				
				<li>
					<el-form :inline="true" class="demo-form-inline" style="text-align: center;" >
						<el-form-item >	
							<el-button size="medium" @click="cancelEdit">取消</el-button>
							<el-button type="primary" style ="margin-left: 20px;" size="medium" @click="saveAccountBalance">保存</el-button>						
						</el-form-item>
					</el-form>
				</li>
			</ul>
		</el-dialog>

 
	</div>
</template>

<script>
	
	import {
		pageList,
		accountSourceList,  // 账户来源字典列表
		accountTypeList,    // 账户类型字典列表
		auditStatusList,	// 余额调整-审核状态
		feeTypeList,        // 费用类别
		userTypeList,  		//用户类型,
		statusList          //启用状态
	
	} from  "../../common/dictionary.js";
	
	
	export default {
		props: {
			typeId: {
				default: 0,
				type: Number
			}
		},
		data() {
			return {
				accountSourceList,
				accountTypeList,
				auditStatusList,
				feeTypeList,
				userTypeList,
				statusList,
				pageList,
				pageMax: 1,
				loading: true,
				pageObj: {			
					pageNum: 1,
					pageSize: 10,
					pageToal: 0,
					
					auditStatus:0,    //审核状态 待审核:0/已审核:1
					accountSource: "", //账户来源
					accountType: "",    // 账户类型
					auditDateEnd:"",    // 申请时间止
					auditDateStart:"",  // 申请时间起
					userOrCompanyName:"", // 账户/公司名称
					
				},
				tableData: [],
				dialogTableVisible: false,
				dialogTableVisible_edit: false,
				pageObjDtl: {},
			}
		},
		async created() {
			console.log(this.typeId)
			this.pageObj.auditStatus = this.typeId;
			this.getList(this.pageObj);
		},
		watch: {
			typeId() {
				this.pageObj.auditStatus = this.typeId;
			}
		},
		methods: {
			async getList(params) {
				this.loading = true;
				let res = await this.$axios.account_balanceAdjustQuery(params);
				this.loading = false;
				if (!res) {
					return;
				}
				console.log("res",res)
				let data = res.data ;
				//this.pageObj.pageNum = data.pages;
				this.pageObj.pageToal = data.total;
				this.pageObj.pageMax = Math.ceil(this.pageObj.pageToal / this.pageObj.pageSize);
				this.pageObj.pageNum = this.pageObj.pageNum >= this.pageObj.pageMax ? this.pageObj.pageMax : this.pageObj.pageNum;
				this.tableData = data.result;
				this.loading = false;
		
			},

			async handleSizeChange(pageSize) {			
				this.pageObj.pageSize = pageSize;
				this.pageObj.pageNum = 1;
				this.getList(this.pageObj);
			},

			async handleCurrentChange(pageNum) {
				this.pageObj.pageNum = pageNum;
				this.getList(this.pageObj);
			},

			async search() {
				console.log("pageObj", this.pageObj)
				this.pageObj.pageNum = 1;
				this.getList(this.pageObj);
			},

			async resetPageObj() {
				this.pageObj.pageNum = 1;
				this.pageObj.pageSize = 10;
				this.pageObj.pageToal = 0;
				this.pageObj.accountSource = "";
				this.pageObj.accountType = "";
				this.pageObj.userOrCompanyName = "";
				this.pageObj.auditDateEnd = "";
				this.pageObj.auditDateStart = "";
				console.log("pageObj", this.pageObj)
				this.getList(this.pageObj);
			},
			
			async gotodtl(item) {
				console.log("id", item.id)
				this.dialogTableVisible = true;
				let res = await this.$axios.account_accountDetail({id:item.id})
				//console.log("res", res)
				this.loading = false;
				if (!res) {
					return;
				}
				this.pageObjDtl = res.data;
			},

			async gotodtlEdit(item) {
				console.log("id", item.id)
				this.dialogTableVisible_edit = true;
				let res = await this.$axios.account_balanceAdjustPrepareAudit({id:item.id})
				console.log("gotodtlEdit", res)
				this.loading = false;
				if (!res) {
					return;
				}
				this.pageObjDtl = res.data;		
			},
			
			cancelEdit(){
				this.dialogTableVisible_edit=false;
			},
		async saveAccountBalance(){
				
			let res= await this.$axios.account_balanceAdjustAudit({id:this.pageObjDtl.id,pass:this.pageObjDtl.auditStatus});

				if(!res){ return;}
				
				this.dialogTableVisible_edit = false;
				if (res.success) {	
					
					this.resetPageObj();
					this.$message({
						type: 'success',
						message: '保存成功!'
					});
								 
				} else {
					this.$message({
						type: 'error',
						message: res.msg
					});
				}
				
			}

		}

	}
</script>
<style>

</style>
