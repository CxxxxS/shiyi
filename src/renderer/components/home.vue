<template>
  <div>
    <el-row>
      <el-col :span="24"
        ><div class="line1">
          <img src="../assets/img66.png" /></div
      ></el-col>
    </el-row>
    <el-divider></el-divider>
    <div style="text-align: center">
      
        <font face="华文中宋">您想要做些什么？</font>
        <!-- <h4>
        <img src="../assets/img999.png" />
      </h4> -->
    </div>
    <div id="frozen-btn">
      <button class="green" @click="toNote">Note</button>
      <button class="purple" @click="toTodo">Todo</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    // toSetting() {
    //   this.$router.push("/setting")
    // },
    toNote() {
      this.$router.push("/note");
    },
    toTodo() {
      this.$router.push("/todo");
    },
  },
};
</script>

<style>
.line1 {
  text-align: center;
}
#frozen-btn {
  display: flex;
  align-items: center;
  justify-content: center;
}

button {
  border: 0;
  margin: 20px;
  text-transform: uppercase;
  font-size: 20px;
  font-weight: bold;
  padding: 15px 50px;
  border-radius: 50px;
  color: white;
  outline: none;
  position: relative;
}

button:before{
  content: '';
  display: block;
  background: linear-gradient(to left, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.4) 50%);
  background-size: 210% 100%;
  background-position: right bottom;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  bottom:0;
  right:0;
  left: 0;
  border-radius: 50px;
  transition: all 1s;
  -webkit-transition: all 1s;
}

.green {
   background-image: linear-gradient(to right, #25aae1, #40e495);
   box-shadow: 0 4px 15px 0 rgba(49, 196, 190, 0.75);
}

.purple {
   background-image: linear-gradient(to right, #6253e1, #852D91);
   box-shadow: 0 4px 15px 0 rgba(236, 116, 149, 0.75);
}
  
.purple:hover:before {
  background-position: left bottom;
}

.green:hover:before {
  background-position: left bottom;
}


</style>