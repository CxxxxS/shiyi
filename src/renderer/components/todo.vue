<template>
  <div>
    <div style="text-align: center">
      <img src="../assets/img77.png" />
    </div>
    <el-divider></el-divider>
    <div align="center" style="margin-bottom: 10px"><font face="华文中宋">待办</font></div>
    <div style="position: fixed; right: 100px; bottom: 90px; z-index: 1">
      <el-button
        type="primary"
        icon="el-icon-s-home"
        circle
        @click="toHome"
      ></el-button>
      <div style="position: fixed; right: 100px; bottom: 150px; z-index: 1">
        <el-button
          type="primary"
          icon="el-icon-plus"
          circle
          @click="addTodo"
        ></el-button>
      </div>
    </div>
    <el-row :gutter="20">
      <el-col :span="8"
        ><div>
          <el-alert
            class="alert"
            title="待办"
            center
            show-icon
            type="warning"
            :closable="false"
            style="margin-bottom: 10px"
          >
          </el-alert>
          <draggable
            v-model="arry1"
            group="todo"
            filter=".forbid"
            animation="300"
            @start="onStart"
            @end="onEnd"
          >
            <transition-group>
              <div
                class="item"
                :class="item == '这里是待办' ? 'item forbid' : 'item'"
                v-for="item in arry1"
                :key="item"
              >
                <el-card style="margin-bottom: 10px">
                  {{ item }}
                  <el-button
                    type="danger"
                    @click="deleteFun(item)"
                    v-if="item != '这里是待办'"
                    icon="el-icon-delete"
                    style="float: right"
                    circle
                    size="mini"
                  ></el-button>
                </el-card>
              </div>
            </transition-group>
          </draggable></div
      ></el-col>
      <el-col :span="8"
        ><div>
          <el-alert
            class="alert"
            title="进行中"
            center
            show-icon
            :closable="false"
            style="margin-bottom: 10px"
          >
          </el-alert>
          <draggable
            v-model="arry2"
            group="todo"
            filter=".forbid"
            animation="300"
            @start="onStart"
            @end="onEnd"
          >
            <transition-group>
              <div
                class="item"
                :class="item == '这里是正在进行中' ? 'item forbid' : 'item'"
                v-for="item in arry2"
                :key="item"
              >
                <el-card style="margin-bottom: 10px">
                  {{ item }}
                  <el-button
                    type="danger"
                    @click="deleteFun1(item)"
                    v-if="item != '这里是正在进行中'"
                    icon="el-icon-delete"
                    style="float: right"
                    circle
                    size="mini"
                  ></el-button>
                </el-card>
              </div>
            </transition-group>
          </draggable></div
      ></el-col>
      <el-col :span="8"
        ><div>
          <el-alert
            class="alert"
            title="已完成"
            center
            type="success"
            show-icon
            :closable="false"
            style="margin-bottom: 10px"
          >
          </el-alert>
          <draggable
            v-model="arry3"
            group="todo"
            animation="300"
            filter=".forbid"
            @start="onStart"
            @end="onEnd"
          >
            <transition-group>
              <div
                class="item"
                :class="item == '这里是已完成' ? 'item forbid' : 'item'"
                v-for="item in arry3"
                :key="item"
              >
                <el-card style="margin-bottom: 10px">
                  {{ item }}
                  <el-button
                    type="danger"
                    @click="deleteFun2(item)"
                    v-if="item != '这里是已完成'"
                    icon="el-icon-delete"
                    style="float: right"
                    circle
                    size="mini"
                  ></el-button>
                </el-card>
              </div>
            </transition-group>
          </draggable></div
      ></el-col>
    </el-row>

    <el-drawer :visible.sync="drawer" :with-header="false">
      <h4 style="text-align: center">新增</h4>
      <el-divider></el-divider>
      <el-input
        style="margin-left: 10px;"
        type="textarea"
        :rows="8"
        placeholder="请输入待办内容"
        v-model="textarea"
      >
      </el-input>
      <el-button
        style="margin-top: 10px; float: right; margin-right: 10px"
        type="success"
        round
        size="mini"
        @click="addNewTodo"
        >保存</el-button
      >
    </el-drawer>
  </div>
</template>

<script>
var fs = require("fs");
import draggable from "vuedraggable";
export default {
  components: {
    draggable,
  },
  data() {
    return {
      //arry1,aary2,arry3是初始默认值
      arry1: ["这里是待办", "b", "c"],
      arry2: ["这里是正在进行中", "e", "z"],
      arry3: ["这里是已完成", "h", "i"],
      drawer: false,
      listObj: {
        //不存在则使用默认值
        will: this.arry1,
        ing: this.arry2,
        ed: this.arry3,
      },
      textarea: "",
    };
  },
  methods: {
    addNewTodo() {
      this.arry1.push(this.textarea)
      this.textarea = ""
      this.drawer = false;
    },
    addTodo() {
      this.drawer = true;
    },
    toHome() {
      this.$router.push("/home");
    },
    onStart() {
      this.drag = true;
    },
    onEnd() {
      this.drag = false;
      // console.log(this.arry3)
    },
    fun() {
      this.drawer = true;
    },
    deleteFun(item) {
      //待办事项数组
      let index = 0;
      for (var i = 0; i < this.arry1.length; i++) {
        if (this.arry1[i] === item) {
          index = i;
        }
      }
      this.arry1.splice(index, 1);
    },
    deleteFun1(item) {
      //进行中事项数组
      let index = 0;
      for (var i = 0; i < this.arry2.length; i++) {
        if (this.arry2[i] === item) {
          index = i;
        }
      }
      this.arry2.splice(index, 1);
    },
    deleteFun2(item) {
      //完成事项数组
      let index = 0;
      for (var i = 0; i < this.arry1.length; i++) {
        if (this.arry3[i] === item) {
          index = i;
        }
      }
      this.arry3.splice(index, 1);
    },
  },
  mounted() {
    var that = this;
    fs.readFile("./file/todoList.txt", "utf8", function (err, data) {
      if (err) {
        //不存在则新建，默认值已设定
        //以JSON字符串的形式存储
        fs.writeFile(
          "./file/todoList.txt",
          JSON.stringify(that.listObj),
          "utf8",
          function (error) {
            if (error) {
              console.log(error);
              return false;
            }
          }
        );
      } else {
        var aim = JSON.parse(data);
        // that.listObj = {
        //   will: aim.will,
        //   ing: aim.ing,
        //   ed: aim.ed,
        // };
        that.arry1 = aim.will;
        that.arry2 = aim.ing;
        that.arry3 = aim.ed;
      }
    });
  },
  beforeDestroy() {
    //页面跳转前将最新状态存储
    this.listObj = {
      will: this.arry1,
      ing: this.arry2,
      ed: this.arry3,
    };
    var that = this;
    fs.writeFile(
      "./file/todoList.txt",
      JSON.stringify(that.listObj),
      "utf8",
      function (error) {
        if (error) {
          console.log(error);
          return false;
        }
      }
    );
  },
};
</script>

<style>
</style>