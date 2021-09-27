<template>
  <div>
    <div style="text-align: center">
      <img src="../assets/img88.png"/>
    </div>
    <el-divider></el-divider>
    <div class="button">
      <el-button
        type="primary"
        icon="el-icon-plus"
        circle
        @click="addNewNote"
      ></el-button>
    </div>
    <div style="position: fixed; right: 100px; bottom: 90px">
      <el-button
        type="primary"
        icon="el-icon-s-home"
        circle
        @click="toHome"
      ></el-button>
    </div>
    <div align="center" style="margin-bottom: 10px"><font face="华文中宋">笔记列表</font></div>
    <div v-for="item in fileList" :key="item" align="center">
      <el-card style="width: 100vh; margin-bottom: 10px">
        <span>{{ item }}</span>
        <div style="float: right; margin-left: 10px">
          <el-button
            type="primary"
            icon="el-icon-reading"
            circle
            size="mini"
            @click="read(item)"
          ></el-button>
        </div>
        <div style="float: right; margin-left: 10px">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            size="mini"
            @click="edit(item)"
          ></el-button>
        </div>
        <div style="float: right">
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            circle
            @click="deleteFile(item)"
          ></el-button>
        </div>
      </el-card>
    </div>
    <el-drawer :visible.sync="drawer" :with-header="false">
      <div v-html="html" style="margin-left: 20px"></div>
    </el-drawer>
  </div>
</template>

<script>
var fs = require("fs");
var fileList = [];
import marked from "marked";

export default {
  data() {
    return {
      fileList: [],
      drawer: false,
      html: "",
    };
  },
  inject: ["reload"],
  methods: {
    addNewNote() {
      this.$router.push("/editAndCreate");
    },
    toHome() {
      this.$router.push("/home");
    },
    read(item) {
      this.html = marked(fs.readFileSync(`./file/note/${item}.md`).toString());
      this.drawer = true;
    },
    edit(item) {
      // console.log(item);
      this.$router.push({
        path: "/editAndCreate",
        query: {
          title: item,
        },
      });
    },
    getFileList() {
      this.fileList = [];
      var that = this;
      fs.readdir("./file/note/", function (err, files) {
        if (err) {
          fs.mkdir("./file/note/", function (err) {
            // console.log(1);
            if (err) {
              return console.error(err);
            }
          });
        }
        files.forEach(function (file) {
          file = file.substring(0, file.length - 3);
          that.fileList.push(file);
        });
      });
    },
    deleteFile(item) {
      var that = this;
      this.$confirm("删除该随笔?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          fs.unlink(`./file/note/${item}.md`, function (err) {});
          // location.reload();
          that.reload();
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  created() {
    fs.readdir("./file", function (err, files) {
      if (err) {
        fs.mkdir("./file", function (err) {
          if (err) {
            return console.error(err);
          }
        });
      }
    });
  },
  mounted() {
    // var that = this;
    // fs.readdir("./file/note/", function (err, files) {
    //   if (err) {
    //     fs.mkdir("./file/note/", function (err) {
    //       // console.log(1);
    //       if (err) {
    //         return console.error(err);
    //       }
    //     });
    //   }
    //   files.forEach(function (file) {
    //     file = file.substring(0, file.length - 3);
    //     that.fileList.push(file);
    //   });
    // });
    this.getFileList();
    var rendererMD = new marked.Renderer();
    marked.setOptions({
      renderer: rendererMD,
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
    });
  },
  destroyed() {
    this.fileList = [];
  },
};
</script>

<style>
.button {
  position: fixed;
  right: 100px;
  bottom: 150px;
}
</style>