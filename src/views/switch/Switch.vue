<template>
  <div class="page-content server">
    <!-- 这里添加一个搜索框和一个添加交换机按钮 -->
    <div class="search-box">
      <el-row justify="space-between">
        <el-col :lg="6" :md="6" :sm="14" :xs="16">
          <el-input
            :prefix-icon="Search"
            clearable
            placeholder="输入交换机关键字查询"
            @keyup.enter=""
          />
        </el-col>

        <el-col :lg="6" :md="6" :sm="10" :xs="6" style="display: flex; justify-content: end">
          <el-button @click="showDialog('add')" type="primary">新增交换机</el-button>
        </el-col>
      </el-row>
      <!-- <el-input v-model="searchText" placeholder="请输入交换机名称" /> -->
    </div>

    <div class="list">
      <div class="middle">
        <div class="item" v-for="item in serverList" :key="item.name">
          <div class="header">
            <span class="name">{{ item.name }}</span>
            <span>
              <el-tag
                type="info"
                @click="
                  $router.push({
                    path: '/switch/switch_port',
                    query: { name: item.name, ip: item.ip }
                  })
                "
                >查看端口</el-tag
              >
              <el-tag type="success">编辑</el-tag>
              <el-tag type="danger">删除</el-tag>
            </span>
          </div>
          <div class="box">
            <div class="left">
              <img src="@imgs/switch/switch.png" alt="服务器" />
              <el-tag type="info">华为CE6820-{{ item.ip }}</el-tag>
              <el-tag :type="item.status == 1 ? 'success' : 'danger'">{{
                item.status == 1 ? 'SNMP状态正常' : 'SNMP状态异常'
              }}</el-tag>
            </div>
            <div class="right">
              <div>
                <p>CPU</p>
                <el-progress :percentage="item.cup" :text-inside="true" :stroke-width="17" />
              </div>
              <div>
                <p>RAM</p>
                <el-progress
                  :percentage="item.memory"
                  status="success"
                  :text-inside="true"
                  :stroke-width="17"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 这里增加一个交换机添加的界面 -->
    <el-dialog v-model="dialogVisible" width="30%">
      <el-form ref="formRef" label-width="120px">
        <el-form-item label="交换机名称" prop="username">
          <el-input />
        </el-form-item>
        <el-form-item label="IP" prop="phone">
          <el-tooltip
            class="box-item"
            effect="dark"
            content="如果交换机SNMP端口不是161，请填写xxx.xx.xx.xxx:xxx格式"
            placement="bottom-start"
          >
            <el-input />
          </el-tooltip>
        </el-form-item>
        <el-form-item label="是否收集流量" prop="sex">
          <el-switch v-model="value1" />
        </el-form-item>
        <el-form-item label="交换机型号" prop="phone">
          <el-input />
        </el-form-item>
        <el-form-item label="SNMP读团体名" prop="phone">
          <el-input />
        </el-form-item>
        <el-form-item label="SNMP写团体名" prop="phone">
          <el-input />
        </el-form-item>
        <el-form-item label="IDC机房位置" prop="phone">
          <el-input />
        </el-form-item>
        <el-form-item label="备注" prop="phone">
          <el-input :rows="2" type="textarea" placeholder="Please input" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="">提交</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
  import { reactive, onMounted, onUnmounted } from 'vue'
  import { Search } from '@element-plus/icons-vue'
  import { ref } from 'vue'
  // 定义响应式变量
  const value1 = ref(false) // false 为默认值，表示开关的初始状态
  interface ServerInfo {
    name: string
    ip: string
    cup: number
    memory: number
    status: number
  }

  const serverList = reactive<ServerInfo[]>([
    {
      name: 'SD-济阳电信',
      ip: '182.40.124.170',
      cup: 85,
      memory: 65,
      status: 1
    },
    {
      name: '测试服务器',
      ip: '192.168.1.101',
      cup: 32,
      memory: 78,
      status: 0
    },
    {
      name: '预发布服务器',
      ip: '192.168.1.101',
      cup: 32,
      memory: 78,
      status: 1
    },
    {
      name: '线上服务器',
      ip: '192.168.1.101',
      cup: 32,
      memory: 78,
      status: 0
    }
  ])

  // 生成随机数据的函数
  function generateRandomValue(min = 0, max = 100): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  // 更新服务器数据
  function updateServerData() {
    serverList.forEach((server) => {
      server.cup = generateRandomValue()
      server.memory = generateRandomValue()
    })
  }

  // 修改 timer 类型为 number | null
  let timer: number | null = null
  const dialogVisible = ref(false)
  const showDialog = (type: string, row?: any) => {
    dialogVisible.value = true
  }
  onMounted(() => {
    timer = window.setInterval(updateServerData, 3000)
  })

  onUnmounted(() => {
    if (timer !== null) {
      window.clearInterval(timer)
      timer = null
    }
  })
</script>

<style lang="scss" scoped>
  .server {
    .list {
      width: 100%;
      margin-top: 20px;
      .middle {
        display: flex;
        flex-wrap: wrap;
        width: calc(100% + 10px);

        .item {
          box-sizing: border-box;
          width: 32%;
          margin: 0 10px 10px 0;
          border: 1px solid var(--el-border-color-light);
          border-radius: 4px;

          .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px;
            border-bottom: 1px solid var(--el-border-color-light);

            .name {
              font-size: 15px;
              font-weight: 500;
            }
            .el-tag {
              margin-left: 10px;
            }
            .ip {
              font-size: 14px;
              color: var(--el-text-color-secondary);
            }
          }

          .box {
            display: flex;
            align-items: center;
            padding: 20px;

            .left {
              margin: 0 40px;
              display: flex;
              flex-direction: column;
              align-items: center;

              img {
                display: block;
                width: 150px;
                margin-bottom: 10px;
              }

              .el-tag {
                margin-bottom: 5px;
              }

              .el-button-group {
                display: flex;
                justify-content: center;
                margin-top: -10px;
              }
            }

            .right {
              flex: 1;
              margin-top: 5px;

              > div {
                margin: 15px 0;

                p {
                  margin-bottom: 4px;
                  font-size: 14px;
                }
              }
            }
          }
        }
      }
    }
  }

  @media (max-width: $device-notebook) {
    .server {
      .list {
        .middle {
          .item {
            .header {
              padding: 10px 20px;
            }

            .box {
              padding: 20px;

              .left {
                margin: 0 20px 0 0;
              }

              .right {
                margin-top: 0;
              }
            }
          }
        }
      }
    }
  }

  @media (max-width: $device-ipad-pro) {
    .server {
      .list {
        .middle {
          .item {
            width: 100%;
          }
        }
      }
    }
  }

  @media (max-width: $device-phone) {
    .server {
      .list {
        .middle {
          .item {
            width: 100%;

            .header {
              padding: 10px 20px;
            }

            .box {
              display: block;
              padding: 20px;

              .left {
                margin: 0;

                img {
                  width: 150px;
                  margin: 0 auto;
                }

                .el-button-group {
                  margin-top: 10px;
                }
              }

              .right {
                margin-top: 30px;
              }
            }
          }
        }
      }
    }
  }
</style>
