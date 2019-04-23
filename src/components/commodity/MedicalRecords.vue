<template>
  <div class="medical_box">
    <div class="medical_top">
      <header>咨询中</header>
      <ul class="liuyan" @scroll="getMassage">
      <!-- <ul class="liuyan"> -->
        <li class="load-more"><i class="el-icon-loading"></i>加载更多</li>
        <li class="clearfix" :class="item.ResponderAccountId !== accountId ? 'ly_L' : 'ly_R'" v-for="(item , i) in list" :key="i">
          <img src="../../assets/user.png" alt="" :class="item.ResponderAccountId !== accountId ? 'wx_head_l' : 'wx_head_r'">
          <div :class="item.ResponderAccountId !== accountId ? 'ly_L_T' : 'ly_R_T'">
            <span>{{item.CteateTime}}</span>
            <P>注意控制血压</P>
          </div>
        </li>
      </ul>
      <div class="shuru">
        <img src="../../../static/img/tupian1.png" alt="">
        <div class="inputText">
          <textarea ref="text" placeholder="咨询内容..." v-model="resourceConsulr.Content"></textarea>
        </div>
        <input type="button" value="发送" class="button" @click="sendBtn()">
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import $ from "jquery";
import { mapActions, mapGetters } from "vuex";
import { resolve } from "url";
export default {
    data() {
        return {
            accountId: this.$route.query.id, //用户id
            accountId: 269,
            //咨询回复
            resourceConsulr: {
                ResourceId: "", //资源主表id
                ResponderAccountId: "", //回复者
                Urls: [], //附件集合
                Content: "" //回复内容
            },
            list: [],
            page: 1,
            row: 10
        };
    },
    computed: {
        ...mapGetters(["accountGetters"]),
        computedAccountId() {
            return this.accountGetters;
        }
    },
    mounted() {
        let role = sessionStorage.getItem("role");
        if (role) {
            let accountId = JSON.parse(role).AccountId;
            console.log(this.computedAccountId);
            // this.$http
            //     .get(
            //         `/api/v2/resource/consult?doctorAccountId=${accountId}&userAccountId=${
            //             this.computedAccountId
            //         }&page=${this.page}&row=${this.row}`
            //     )
            //     .then(res => {
            //       console.log(res)
            //     });
            for (var i = 0; i < this.row; i++) {
                this.list.push({
                    id: i,
                    ResponderAccountId: 269,
                    ResponderName: "xxx name",
                    ResponderHead: "",
                    Urls: [],
                    CteateTime: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
                });
            }
        }
    },
    updated() {
        if (this.page == 1) {
            let wrap_height = $(".liuyan").height(); //容器的高度
            // let scroll_top = $(".liuyan").scrollTop(); //滚动条的scrolltop
            let scroll_height = $(".liuyan").prop("scrollHeight"); //内容的高度
            $(".liuyan").scrollTop(
                scroll_height - wrap_height > 0
                    ? scroll_height - wrap_height
                    : 0
            );
        }
    },
    methods: {
        //咨询回复
        sendBtn() {
            this.$http
                .post("/api/v1/resource/consult", {
                    Releaseld: this.resourceConsulr.Releaseld,
                    ReceiveId: this.resourceConsulr.ReceiveId,
                    Content: this.resourceConsulr.Content
                })
                .then(res => {
                    if (this.resourceConsulr.Content == "") {
                        alert("请输入内容");
                        return;
                    }

                    this.resourceConsulr = {
                        Content: "" //咨询内容
                    };
                    console.log(res);
                });
        },

        //查询指定咨询的交流记录
        back() {
            // this.$http.get(`/api/v2/resource/consult?page=${}&`)
        },
        getMassage() {
            let wrap_height = $(".liuyan").height(); //容器的高度
            let scroll_top = $(".liuyan").scrollTop(); //滚动条的scrolltop
            let scroll_height = $(".liuyan").prop("scrollHeight"); //内容的高度
            // $(".liuyan").scrollTop = scroll_height - wrap_height;
            if (scroll_top == 0) {
                new Promise(resolve => {
                  setTimeout(()=>{
                    for (var i = 0; i < this.row; i++) {
                        this.list.unshift({
                            id: i,
                            ResponderAccountId: 269,
                            ResponderName: "xxx name",
                            ResponderHead: "",
                            Urls: [],
                            CteateTime: moment(new Date()).format(
                                "YYYY-MM-DD HH:mm:ss"
                            )
                        });
                    }
                    this.page++;
                    $(".liuyan").scrollTop(this.row * 61);
                  },2000)
                });               
            }
        }
    },
    watch: {
        $route(n) {
            this.accountId = n.query.id;
        }
    }
};
</script>
<style <style lang="scss" scoped>
@import url("../../css/Medical.css");
.liuyan {
    height: 530px;
    overflow: scroll;
    display: flex;
    flex-direction: column;
    padding-bottom: 0px;
    .load-more {
        text-align: center;
        color: #5fb4f5;
    }
}
</style>
