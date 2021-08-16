<template>
	<div class="account">

		<!-- 表单 -->
		<el-form :inline="true" class="form-inline">
			
			<el-form-item label="">
				<el-input  placeholder="提现记录ID" v-model="pageObj.id"></el-input>
			</el-form-item>
			
			<el-form-item label="">
				<el-input placeholder="用户/公司名称" v-model="pageObj.userOrCompanyName"></el-input>
			</el-form-item>

			<el-form-item label="">
				<el-select v-model="pageObj.drawType" placeholder="提现类型">
					<el-option v-for="item in drawTypeList" :key="item.value" :label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="">
				<el-select v-model="pageObj.drawStatus" placeholder="提现状态">
					<el-option v-for="item in drawStatusList" :key="item.value" :label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="">
				<el-select placeholder="所属区域平台" v-model="pageObj.sysOrgCode">
					<el-option v-for="item in sysOrgCodeList" :key="item.value" :label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			
			
			<el-form-item label="">
				<el-select v-model="pageObj.payType" placeholder="付款方式">
					<el-option v-for="item in payTypeList " :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="">
				<el-date-picker type="date" placeholder="创建时间起" v-model="pageObj.startDate"
					:value-format="'yyyy-MM-dd hh:mm:ss'">
				</el-date-picker>

			</el-form-item>
			<el-form-item label="">
				<el-date-picker type="date" placeholder="创建时间止" v-model="pageObj.endDate"
					:value-format="'yyyy-MM-dd hh:mm:ss'">
				</el-date-picker>
			</el-form-item>
			
			<el-form-item label="">
				<el-date-picker type="date" placeholder="审核时间起" v-model="pageObj.startAuditTime"
					:value-format="'yyyy-MM-dd hh:mm:ss'">
				</el-date-picker>
			
			</el-form-item>
			<el-form-item label="">
				<el-date-picker type="date" placeholder="审核时间止" v-model="pageObj.endAduitTime"
					:value-format="'yyyy-MM-dd hh:mm:ss'">
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
			<el-scrollbar wrap-class="scrollbar-wrapper" >
				<el-table :data="tableData" border style="width: 100%" v-loading="loading">
				
				<el-table-column label="操作"  width="160">
					<template slot-scope="scope">
						<el-button type="text" class="_ok"   @click="ok_drawRecord(scope.row)">通过</el-button>
						<el-button type="text"  class="_no" @click="no_drawRecord(scope.row)" >拒绝</el-button>
					</template>
				</el-table-column>

				<el-table-column prop="id" label="提现记录ID" width="160">
				</el-table-column>
				
				<el-table-column prop="drawType" label="提现类型" width="">
					<template slot-scope="scope">
						<span v-for="item in drawTypeList" :key="item.value" v-if="scope.row.drawType==item.value">{{item.label}}</span>
					</template>			
				</el-table-column>
				
				<el-table-column prop="drawStatus" label="提现状态" width="">
					<template slot-scope="scope">
						<span v-for="item in drawStatusList" :key="item.value" v-if="scope.row.drawStatus==item.value">{{item.label}}</span>
					</template>			
				</el-table-column>

				<el-table-column prop="bankNo" label="提现金额" width="">
					<template slot-scope="scope">
						<span v-if="scope.row.bankNo">￥{{scope.row.bankNo}}</span>
					</template>		
				</el-table-column>
				
				<el-table-column prop="" label="审请信息" width="200">
					<!-- <template slot-scope="scope">
						<div style="margin: 0;"  v-if="scope.row.auditBy">{{scope.row.auditBy}} </div>
						<div style="margin: 0;"  v-if="scope.row.auditTime">{{scope.row.auditTime}}</div>						
					</template>	 -->
				</el-table-column>
			
				<el-table-column prop="auditReason" label="申请备注" width="200">
				
				</el-table-column>
			
				<el-table-column prop="" label="提现人信息" width="200">	
					<template slot-scope="scope">
						<div style="margin: 0;"  v-if="scope.row.applyName"> {{scope.row.applyName}} <span v-if="scope.row.applyPhone">/{{applyPhone}}</span></div>
						<div style="margin: 0;">{{scope.row.applyTime}}</div>						
					</template>
				</el-table-column>
				
				<el-table-column prop="sysOrgCode" label="所属区域平台" width="">
					<template slot-scope="scope">
							<span v-for="item in sysOrgCodeList" :key="item.value" v-if="scope.row.sysOrgCode==item.value">{{item.label}}</span>
					</template>
				</el-table-column>
				
				<el-table-column prop="auditReason" label="银行信息" width="150">
				<template slot-scope="scope">
					<div style="margin: 0;"  v-if="scope.row.bankName"> {{scope.row.bankName}}</div>
					<div style="margin: 0;"  v-if="scope.row.bankNo"> {{scope.row.bankNo}}</div>
					<div style="margin: 0;">{{scope.row.bankId}}</div>						
				</template>
				</el-table-column>
				
				<el-table-column prop="" label="审核信息" width="200">
					<template slot-scope="scope">
						<div style="margin: 0;"  v-if="scope.row.auditBy">{{scope.row.auditBy}} </div>
						<div style="margin: 0;"  v-if="scope.row.auditTime">{{scope.row.auditTime}}</div>						
					</template>	
				</el-table-column>
							
				<el-table-column prop="auditReason" label="申请备注" width="200">
				</el-table-column>
				
				<el-table-column prop="payType" label="付款方式" width="">
					<template slot-scope="scope">
							<span v-for="item in payTypeList" :key="item.value" v-if="scope.row.payType==item.value">{{item.label}}</span>
					</template>
				</el-table-column>
				
				<el-table-column prop="accountType" label="账户类型" width="">
					<template slot-scope="scope">
							<span v-for="item in accountTypeList" :key="item.value" v-if="scope.row.accountType==item.value">{{item.label}}</span>
					</template>
				</el-table-column>
				
				<el-table-column prop="" label="提现方式" width="">
					<template slot-scope="scope">
							<span v-for="item in payTypeList" :key="item.value" v-if="scope.row.payType==item.value">{{item.label}}</span>
					</template>
				</el-table-column>
			
			</el-table>
		</el-scrollbar>
	
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

	</div>
</template>

<script>
	
	import {
		pageList,
		drawTypeList,
		drawStatusList,
		auditStatusList,
		payTypeList,
		sysOrgCodeList,
		accountTypeList
	
	} from  "../../common/dictionary.js";
	
	export default {
		props: {
			typeId: {
				default: 1,
				type: Number
			}
		},
		data() {
			return {
				drawTypeList,
				drawStatusList,
				auditStatusList,
				payTypeList,
				sysOrgCodeList,
				accountTypeList,
			
				pageList,
				pageMax: 1,
				loading: true,
				pageObj: {
					userType: 3, //	账户类型(1.总平台,2.区域平台,3.货主,4.承运商)
					pageNum: 1,
					pageSize: 10,
					pageToal: 0,
					
					drawStatus: "",  //提现状态(1.申请中,1.已完成)
					drawType:null,  //提现类型(1.微信,2.支付宝,3.银行转账.4.余额提现)
					endAduitTime:"", //审核时间止,
					endDate:"",   //创建时间止 
					id:null,  //  主键id
					payType:"",     // 付款方式(1.微信,2.支付宝,3.银行转账)
					phone:""  ,     // 手机号
					startAuditTime:"", // 审核时间起
					startDate:"" ,  //   创建时间起
					sysOrgCode:"",  //  战区组织id
					userOrCompanyName:"",    // 账户名称
				},
				tableData: [],
				dialogTableVisible: false,
				dialogTableVisible_edit: false,
				pageObjDtl: {},
			}
		},
		async created() {
			console.log(this.typeId)
			this.pageObj.userType = this.typeId;
			this.getList(this.pageObj);
		},
		watch: {
			typeId() {
				this.pageObj.userType = this.typeId;
			}
		},
		methods: {

			async getList(params) {
				this.loading = true;
				let res = await this.$axios.drawRecord_query(params);
				this.loading = false;
				if (!res) {
					return;
				}

				let data = res.data;
				this.pageObj.pageNum = data.pages;
				this.pageObj.pageToal = data.total;
				this.pageObj.pageMax = Math.ceil(this.pageObj.pageToal / this.pageObj.pageSize);
				this.pageObj.pageNum = this.pageObj.pageNum >= this.pageObj.pageMax ? this.pageObj.pageMax : this.pageObj.pageNum;
				this.tableData = data.result;
				this.loading = false;
				//console.log(this.tableData)
				//console.log(this.pageObj)

			},

			async handleSizeChange(pageSize) {
				console.log(this.pageObj)
				console.log("handleSizeChange:", pageSize)
				this.pageObj.pageSize = pageSize;
				this.pageObj.pageNum = 1;
				this.getList(this.pageObj);
			},

			async handleCurrentChange(pageNum) {

				//console.log("handleCurrentChange:", pageNum)
				this.pageObj.pageNum = pageNum;
				this.getList(this.pageObj);
			},

			async search() {

				console.log("pageObj", this.pageObj)
				this.pageObj.pageNum = 1;
				this.getList(this.pageObj);

			},

			async resetPageObj() {

				let obj={
					pageNum: 1,
					pageSize: 10,
					pageToal: 0,		
					drawStatus: "",  //提现状态(1.申请中,1.已完成)
					drawType:null,  //提现类型(1.微信,2.支付宝,3.银行转账.4.余额提现)
					endAduitTime:"", //审核时间止,
					endDate:"",   //创建时间止 
					id:null,  //  主键id
					payType:"",     // 付款方式(1.微信,2.支付宝,3.银行转账)
					phone:""  ,     // 手机号
					startAuditTime:"", // 审核时间起
					startDate:"" ,  //   创建时间起
					sysOrgCode:"",  //  战区组织id
					userOrCompanyName:"",    // 账户名称
				};
				Object.assign(this.pageObj,obj);
				console.log("pageObj", this.pageObj)
				this.getList(this.pageObj);
			},
			
		async ok_drawRecord(item){
			
				 this.$confirm('确认同意提现付款?', '提示', {
				 	confirmButtonText: '确定',
				 	cancelButtonText: '取消',
				 	type: 'warning'
				 }).then(async () => {
				 
				 	var res = await this.$axios.drawRecord_audit({
				 		id: item.id,
				 		pass: true
				 	});
				 
				 	if (!res) {
				 		return
				 	}
				 
				 	console.log(res.success)
				 	if (res.success) {
				 
				 		item.drawStatus = 4; // 已完成
				 		this.$message({
				 			type: 'success',
				 			message: '已确认通过!'
				 		});
				 
				 	} else {
				 		this.$message({
				 			type: 'error',
				 			message: res.msg
				 		});
				 	}
				 
				 })
				 			
				 
			},
			no_drawRecord(item){
				this.$confirm('拒绝申请?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
				
					var res = await this.$axios.drawRecord_audit({
						id: item.id,
						pass: false
					});
				
					if (!res) {
						return
					}
				
					console.log(res.success)
					if (res.success) {
				
						item.drawStatus = 2; // 拒绝
						this.$message({
							type: 'error',
							message: '已拒绝!'
						});
				
					} else {
						this.$message({
							type: 'error',
							message: res.msg
						});
					}
				
				})
							
			},
					

		}

	}
</script>
<style scoped="" >
	 .upgoods-table {
		._ok{}
		._no{
			span{
				color:#f56c6c;
			}
			
		}
		
	 }
	 
	 .scrollbar-wrapper{
		 width: 100%;
		 overflow-y: hidden;
		 overflow-x: scroll;
	 }

</style>
