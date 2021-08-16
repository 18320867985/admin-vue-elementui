<template>
    <div>
        <div style="margin-bottom: 20px">
            <el-select v-model="queryInfo.areaId" placeholder="区域平台" class="input-style">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-input v-model="queryInfo.payeeType" placeholder="请输入抽佣方" class="input-style"></el-input>
            <el-input v-model="queryInfo.draweeType" placeholder="请输入被抽佣方" class="input-style"></el-input>
            <el-date-picker
                    v-model="queryInfo.createStartTime"
                    type="date"
                    placeholder="创建日期起"
                    value-format="yyyy-MM-dd"
                    class="input-style">
            </el-date-picker>
            <el-date-picker
                    v-model="queryInfo.endTime"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="创建日期止"
                    class="input-style">
            </el-date-picker>
        </div>
        <div style="margin-bottom: 20px">
            <el-button type="primary" icon="el-icon-search" @click="getData">查询</el-button>
            <el-button type="primary" icon="el-icon-refresh-right" @click="resetFn">重置</el-button>
            <el-button type="primary" icon="el-icon-plus" @click="addFn">新增设置</el-button>
            <el-button type="primary" icon="el-icon-folder-add">导入</el-button>
        </div>
        <el-table
                :data="tableData"
                border
                :max-height="tableMaxHeight"
                :header-cell-style="{'text-align': 'center'}"
                :cell-style="{'text-align': 'center'}"
                style="width: 90%">
            <el-table-column
                    fixed
                    label="序号"
                    width="60">
                <template slot-scope="scope">
                    {{ scope.$index*queryInfo.pageNum + 1 }}
                </template>
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="佣金比例名称"
                    width="180">
            </el-table-column>
            <el-table-column
                    label="佣金配比"
                    width="120">
                <template slot-scope="scope">
                    {{ scope.row.payeeRatio}} : {{ scope.row.draweeRatio}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="payeeType"
                    label="抽佣方"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="draweeType"
                    label="被抽佣方"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="remark"
                    label="说明"
                    width="250">
            </el-table-column>
            <el-table-column
                    label="操作人"
                    width="120">
                <template slot-scope="scope">
                    {{ scope.row.updateBy ? scope.row.updateBy : scope.row.createBy }}
                </template>
            </el-table-column>
            <el-table-column
                    prop="updateTime"
                    label="最后修改时间"
                    width="180">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作">
                <template slot-scope="scope">
                    <el-button @click="seeFn(scope.row)" type="text" size="small">详情</el-button>
                    <el-button @click="editFn(scope.row)" type="text" style="color: red" size="small">修改</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="width: 90%;display: flex;justify-content: flex-end;padding-top: 15px">
            <el-pagination align='center' @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           background
                           :current-page="queryInfo.pageNum"
                           :page-sizes="[10,20,50,100,500]"
                           :page-size="queryInfo.pageSize"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="total">
            </el-pagination>
        </div>
        <!--新增弹窗-->
        <el-dialog
                :title="titleText"
                :visible.sync="addShow"
                width="50%">
            <div class="add-dialog">
                <div class="line-item">
                    <div class="info-item">
                        <p><span>*</span>佣金比例名称</p>
                        <el-input v-model="addList.name" placeholder="佣金比例名称" disabled style="flex: 1"></el-input>
                    </div>
                    <div class="info-item" style="margin-right: 0">
                        <p><span>*</span>佣金配比</p>
                        <el-select v-model="addList.payeeRatio" placeholder="佣金配比" :disabled="isSee" style="flex: 1">
                            <el-option
                                    v-for="item in options1"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="line-item">
                    <div class="info-item">
                        <p>抽佣方</p>
                        <el-select v-model="addList.payeeType" placeholder="抽佣方" disabled style="flex: 1">
                            <el-option
                                    v-for="item in options2"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="info-item" style="margin-right: 0">
                        <p>账款主体名称</p>
                        <el-input v-model="addList.payeeId" placeholder="账款主体名称" disabled style="flex: 1"></el-input>
                    </div>
                </div>
                <div class="line-item">
                    <div class="info-item">
                        <p><span>*</span>被抽佣方</p>
                        <el-select v-model="addList.draweeType" placeholder="被抽佣方" :disabled="isSee" style="flex: 1">
                            <el-option
                                    v-for="item in options2"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="info-item" style="margin-right: 0">
                        <p><span>*</span>账款主体名称</p>
                        <el-select v-model="addList.draweeId" placeholder="账款主体名称" :disabled="isSee" style="flex: 1">
                            <el-option
                                    v-for="item in options3"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="line-item">
                    <p>说明</p>
                    <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            style="flex: 1"
                            maxlength="50"
                            v-model="addList.remark"
                            :disabled="isSee"
                            show-word-limit>
                    </el-input>
                </div>
                <template v-if="isSee">
                    <h5>历史记录</h5>
                    <el-table
                            :data="historicalRecords"
                            border
                            size="mini"
                            :header-cell-style="headerStyle"
                            :cell-style="{'text-align': 'center'}"
                            style="width: 85%">
                        <el-table-column
                                label="佣金配比"
                                width="110">
                            <template slot-scope="scope">
                                {{ scope.row.object.payeeRatio }} : {{ scope.row.object.draweeRatio }}
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="抽佣方"
                                width="110">
                            <template slot-scope="scope">
                                {{ scope.row.object.payeeType }}
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="被抽佣方"
                                width="110">
                            <template slot-scope="scope">
                                {{ scope.row.object.draweeType }}
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="操作人"
                                width="110">
                            <template slot-scope="scope">
                                {{ scope.row.object.id }}
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="最后修改时间">
                            <template slot-scope="scope">
                                {{ scope.row.createTime}}
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button @click="addShow = false">取 消</el-button>
            <el-button type="primary" @click="addInfo">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "commission",
        data() {
            return {
                options: [{
                    value: '1',
                    label: '广州德坤'
                }, {
                    value: '2',
                    label: '苏州德坤'
                }],
                options1: [{
                    value: '1',
                    label: '1:9'
                }, {
                    value: '2',
                    label: '2:8'
                }, {
                    value: '3',
                    label: '3:7'
                },{
                    value: '4',
                    label: '4:6'
                }, {
                    value: '5',
                    label: '5:5'
                }, {
                    value: '6',
                    label: '6:4'
                }, {
                    value: '7',
                    label: '7:3'
                }, {
                    value: '8',
                    label: '8:2'
                }, {
                    value: '9',
                    label: '9:1'
                }],
                options2: [{
                    value: '1',
                    label: '总平台'
                }, {
                    value: '2',
                    label: '区域平台'
                }, {
                    value: '3',
                    label: '运力供应商'
                },{
                    value: '4',
                    label: '线路供应商'
                }, {
                    value: '5',
                    label: '其他供应商'
                }],
                options3: [{
                    value: '1',
                    label: '总平台'
                }, {
                    value: '2',
                    label: '区域平台'
                }, {
                    value: '3',
                    label: '运力供应商'
                },{
                    value: '4',
                    label: '线路供应商'
                }, {
                    value: '5',
                    label: '其他供应商'
                }],
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路',
                    zip: 200333
                }],
                addShow: false,//新增弹窗
                titleText: '新增',//弹窗标题
                headerStyle: {
                    border: 'none',
                    backgroundColor: '#f2f2f2',
                    color: '#000',
                    textAlign: 'center'
                },//历史记录表格表头样式
                isSee: false,//是否显示历史记录
                queryInfo:{
                    areaId: '',//区域平台
                    payeeType: '',//抽佣方
                    draweeType: '',//被抽佣方
                    createStartTime: '',//创建开始时间
                    createEndTime: '',//创建结束时间
                    pageNum: 1, // 当前页码
                    pageSize: 10 // 每页的数据条数
                },//查询数据
                addList:{
                    name: 1,//佣金比例名称
                    payeeRatio: '',//抽佣方比例
                    draweeRatio: '',//被抽佣方比例
                    payeeId: '123456',//抽佣方id
                    draweeId: '',//被抽佣方id
                    payeeType: '1',//抽佣方类型
                    draweeType: '',//被抽佣方类型
                    remark: ''
                },//新增数据
                total: 20, // 总条数
                historicalRecords: [],//历史记录
                tableMaxHeight: '700',//表格最大高度
            }
        },
        mounted(){
            this.getData()
            this.tableMaxHeight = document.body.offsetHeight - 350
        },
        methods: {
            //获取数据
            getData(){
                this.$api.baseCommissionList(this.queryInfo).then(res => {
                    // 网络请求畅通
                    console.log(res.data);
                    this.total = res.data.data.total;//总条数赋值
                    this.tableData = res.data.data.result//表格赋值
                }).finally(() => {
                })
            },
            //每页条数改变时触发 选择一页显示多少行
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.queryInfo.pageNum = 1;
                this.queryInfo.pageSize = val;
                this.getData()//重新获取表格数据
            },
            //当前页改变时触发 跳转其他页
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.queryInfo.pageNum = val;
                this.getData()//重新获取表格数据
            },
            //重置按钮
            resetFn(){
                this.queryInfo.areaId = '';
                this.queryInfo.payeeType = '';
                this.queryInfo.draweeType = '';
                this.queryInfo.createStartTime = '';
                this.queryInfo.createEndTime = '';
                this.getData()
            },
            //点击新增
            addFn() {
                this.addShow = true;
                this.titleText = '新增';
                this.isSee = false;
                this.addList.payeeRatio = '';
                this.addList.draweeRatio = '';
                this.addList.draweeId = '';
                this.addList.draweeType = '';
                this.addList.remark = '';
            },
            //点击查看
            seeFn(row){
                // console.log(row);
                this.addShow = true;
                this.titleText = '设置详情';
                this.isSee = true;
                this.addList = row;
                this.addList.payeeRatio = String(this.addList.payeeRatio);
                //发送新增请求
                this.$api.selectRecord({
                    setId: row.id
                }).then(res => {
                    // 网络请求畅通
                    // console.log('获取历史记录',res.data);
                    this.historicalRecords = res.data.data
                }).finally(() => {
                })
            },
            //点击修改
            editFn(row){
                // console.log(row);
                this.addShow = true;
                this.titleText = '编辑';
                this.isSee = false
                this.addList = row
            },
            //新增数据
            addInfo(){
                //判断是否有值为空
                if(!this.addList.payeeRatio){
                    this.$message.error('请选择佣金配比');
                    return false
                }else if(!this.addList.draweeType){
                    this.$message.error('请选择被抽佣方');
                    return false
                }else if(!this.addList.draweeId){
                    this.$message.error('请选择抽佣方账户主体名称');
                    return false
                }
                this.addList.payeeRatio = +this.addList.payeeRatio;
                this.addList.draweeRatio = 10 - this.addList.payeeRatio;
                this.addList.payeeType = +this.addList.payeeType;
                this.addList.draweeType = +this.addList.draweeType;
                // console.log(this.addList);

                if(this.titleText === '编辑'){
                    //发送编辑请求
                    this.$api.baseCommissionEdit(this.addList).then(res => {
                        // 网络请求畅通
                        // console.log(res.data);
                        if(res.data.code === 200){
                            this.$message({
                                message: '编辑成功',
                                type: 'success'
                            });
                            this.addShow = false;
                            this.getData()
                        }
                    }).finally(() => {
                    })
                }else if(this.titleText === '新增'){
                    //发送新增请求
                    this.$api.baseCommissionAdd(this.addList).then(res => {
                        // 网络请求畅通
                        // console.log(res.data);
                        if(res.data.code === 200){
                            this.$message({
                                message: '新增成功',
                                type: 'success'
                            });
                            this.addShow = false;
                            this.getData()
                        }
                    }).finally(() => {
                    })
                }else{
                    this.addShow = false;
                }
            }
        },
    }
</script>

<style scoped lang="scss">
    .input-style{
        margin-right: 20px;
        width: 10%;
    }
    .add-dialog {
        padding-left: 30px;
        .line-item {
            display: flex;
            margin-bottom: 10px;
            align-items: center;
            width: 85%;
            justify-content: space-between;
        }

        .info-item {
            display: flex;
            flex: 1;
            margin-right: 20px;
        }

        p {
            width: 150px;
            text-align: right;
            margin-right: 10px;
            line-height: 40px;
        }

        span{
            color: red;
        }

        h5{
            font-weight: 600;
            color: #000;
            padding-top: 30px;
        }
    }
</style>
