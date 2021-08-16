<template>
	<div class="account">

		<!-- 表单 -->
		<el-form :inline="true" class="form-inline">
			<el-form-item label="">
				<el-input placeholder="充值记录ID" v-model="pageObj.id"></el-input>
			</el-form-item>

			<el-form-item label="">
				<el-input placeholder="银行流水号" v-model="pageObj.merchantNo"></el-input>
			</el-form-item>

			<el-form-item label="">
				<el-input placeholder="用户/公司名称" v-model="pageObj.userName"></el-input>
			</el-form-item>

			<el-form-item label="">
				<el-select v-model="pageObj.auditStatus" placeholder="充值状态">
					<el-option v-for="item in auditStatusList" :key="item.value" :label="item.label"
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

			<el-form-item label="">
				<el-select placeholder="所属区域平台" v-model="pageObj.sysOrgCode">
					<el-option v-for="item in sysOrgCodeList" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>


			<el-form-item label="">
				<el-select v-model="pageObj.payType" placeholder="充值渠道">
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
			<el-table :data="tableData" border style="width: 100%" v-loading="loading">

				<el-table-column prop="id" label="充值记录ID" width="160">
				</el-table-column>

				<el-table-column prop="userName" label="用户/公司名称" width="180">

				</el-table-column>

				<el-table-column prop="payType" label="充值渠道" width="200">
					<template slot-scope="scope">
						<span v-for="item in payTypeList" :key="item.value"
							v-if="scope.row.payType==item.value">{{item.label}}</span>
					</template>

				</el-table-column>

				<el-table-column prop="bankName" label="银行账户" width="">

				</el-table-column>

				<el-table-column prop="amount" label="金额" width="">
					<template slot-scope="scope">
						<span v-if="scope.row.amount">￥{{scope.row.amount}}</span>
					</template>	
				</el-table-column>

				<el-table-column prop="auditStatus" label="充值状态" width="">
					<template slot-scope="scope">
						<span v-for="item in auditStatusList" :key="item.value"
							v-if="scope.row.auditStatus==item.value">{{item.label}}</span>
					</template>
				</el-table-column>

				<el-table-column prop="sysOrgCode" label="所属区域平台" width="">
					<template slot-scope="scope">
						<span v-for="item in sysOrgCodeList" :key="item.value"
							v-if="scope.row.sysOrgCode==item.value">{{item.label}}</span>

					</template>

				</el-table-column>

				<el-table-column prop="merchantNo" label="支付流水号和备注" width="">

				</el-table-column>

				<el-table-column prop="auditTime" label="申请时间" width="160">

				</el-table-column>

				<el-table-column prop="" label="审核信息" width="160">
					<template slot-scope="scope">
						<P style="margin: 0;" v-if="scope.row.userName">/ {{scope.row.userName}} /</P>
						<P style="margin: 0;">{{scope.row.auditTime}}</P>

					</template>

				</el-table-column>


				<el-table-column label="操作">
					<template slot-scope="scope">
						<div v-if="!scope.auditStatus">
							<el-button type="text" class="_ok" @click="ok_recharge(scope.row)">确认</el-button>
							<el-button type="text" class="_no" @click="no_recharge(scope.row)">拒绝
							</el-button>
						</div>

						<div v-if="scope.auditStatus==1">
							<el-link type="success" disabled>已通过</el-link>
						</div>

						<div v-if="scope.auditStatus==2">
							<el-link type="error" disabled> 拒绝申请</el-link>
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

	</div>
</template>

<script>
	import {
		pageList,
		auditStatusList,
		accountSourceList,
		accountTypeList,
		statusList,
		payTypeList,
		sysOrgCodeList,

	} from "../../common/dictionary.js";
	export default {
		props: {
			typeId: {
				default: 1,
				type: Number
			}
		},
		data() {
			return {

				// 字典
				auditStatusList,
				accountSourceList,
				accountTypeList,
				statusList,
				payTypeList,
				sysOrgCodeList,

				// 分页
				pageList,
				pageMax: 1,
				loading: true,
				pageObj: {
					userType: 3, //	账户类型(1.总平台,2.区域平台,3.货主,4.承运商)
					pageNum: 1,
					pageSize: 10,
					pageToal: 0,

					accountType: "", // 账户类型(0.对公,1.对私)
					auditStatus: null, //审核状态(0.待审核,1通过,2.拒绝)
					endAduitTime: "", //审核时间止,
					endDate: "", //创建时间止 
					id: null, //  主键id
					merchantNo: "", // 订单流水号
					payType: "", // 付款方式(1.微信,2.支付宝,3.银行转账)
					startAuditTime: "", // 审核时间起
					startDate: "", //   创建时间起
					sysOrgCode: "", //  战区组织id
					userName: "", // 账户名称
				},
				tableData: [],
				dialogTableVisible: false,
				dialogTableVisible_edit: false,
				pageObjDtl: {},
			}
		},
		async created() {
			//console.log(this.typeId)
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
				let res = await this.$axios.recharge_query(params);
				this.loading = false;
				if (!res) {
					return;
				}

				let data = res.data;
				this.pageObj.pageNum = data.pages;
				this.pageObj.pageToal = data.total;
				this.pageObj.pageMax = Math.ceil(this.pageObj.pageToal / this.pageObj.pageSize);
				this.pageObj.pageNum = this.pageObj.pageNum >= this.pageObj.pageMax ? this.pageObj.pageMax : this.pageObj
					.pageNum;
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


				let obj = {
					pageNum: 1,
					pageSize: 10,
					pageToal: 0,

					accountType: "", // 账户类型(0.对公,1.对私)
					auditStatus: null, //审核状态(0.待审核,1通过,2.拒绝)
					endAduitTime: "", //审核时间止,
					endDate: "", //创建时间止 
					id: null, //  主键id
					merchantNo: "", // 订单流水号
					payType: "", // 付款方式(1.微信,2.支付宝,3.银行转账)
					startAuditTime: "", // 审核时间起
					startDate: "", //   创建时间起
					sysOrgCode: "", //  战区组织id
					userName: "", // 账户名称
				};
				Object.assign(this.pageObj, obj);
				console.log("pageObj", this.pageObj)
				this.getList(this.pageObj);
			},

			async ok_recharge(item) {

				this.$confirm('确认充值款已到账?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {

					var res = await this.$axios.recharge_audit({
						id: item.id,
						pass: true
					});

					if (!res) {
						return
					}

					console.log(res.success)
					if (res.success) {

						item.auditStatus = 1; //通过
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
			async no_recharge(item) {
				
				this.$confirm('拒绝申请后，按原路退款到原支付账户?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
				
					var res = await this.$axios.recharge_audit({
						id: item.id,
						pass: false
					});
				
					if (!res) {
						return
					}
				
					console.log(res.success)
					if (res.success) {
				
						item.auditStatus = 2; //通过
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


		}

	}
</script>
<style scoped="">
	.upgoods-table {
		._ok {}

		._no {
			span {
				color: #f56c6c;
			}

		}


	}
</style>
