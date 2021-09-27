<template>
  <div>
    <div class="imgg">
      <img src="../assets/title1.png" height="200px" />
    </div>

    <div><mavon-editor ref="md" id="editor" v-model="form" /></div>

    <div>
      <el-button
        type="primary"
        icon="el-icon-arrow-left"
        circle
        @click="back"
        class="button1"
      ></el-button>
    </div>
    <el-button
      type="primary"
      icon="el-icon-folder-checked"
      circle
      @click="saveFile"
      class="button2"
    ></el-button>
  </div>
</template>

<script>
var fs = require("fs");
var buf = new Buffer.alloc(1024);
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";

export default {
  data() {
    return {
      form: "",
      title: "",
    };
  },
  components: {
    mavonEditor,
  },
  methods: {
    ddd() {
      console.log(this.$route.query.fileName);
    },
    back() {
      this.$router.go(-1);
    },
    saveFile() {
      this.$prompt("请输入title", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "保存成功",
          });
          fs.writeFile(`./file/note/${value}.md`, this.form, function (err) {
            if (err) {
              return console.error(err);
            }
          });
          fs.unlink(`./file/note/${this.$route.query.title}.md`, function (err) {
            
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    randomString(e) {
      e = e || 32;
      var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
        a = t.length,
        n = "";
      for (var i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
      return n;
    },
  },
  mounted() {
    if (this.$route.query.title != undefined) {
      this.form = fs
        .readFileSync(`./file/note/${this.$route.query.title}.md`)
        .toString();
      console.log(this.form);
    }
  },
};
</script>

<style>
.button1 {
  position: fixed;
  right: 100px;
  bottom: 150px;
  z-index: 10;
}
.button2 {
  position: fixed;
  right: 100px;
  bottom: 90px;
  z-index: 10;
}
.imgg {
  text-align: center;
  height: 100px;
}
#editor {
  height: 500px;
  z-index: 0;
}
</style>