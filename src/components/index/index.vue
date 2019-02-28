<template>
    <section class="index" style="width:100%">
        <header class="header">
            <ul>
                <li>
                    <p>下单金额</p>
                    <h4>0.00</h4>
                    <i class="icon iconfont icon-gouwuche"></i>
                </li>
                <li>
                    <p>下单量</p>
                    <h4>100</h4>
                    <i class="icon iconfont icon-yqfxiadanliang"></i>
                </li>
                <li>
                    <p>新增会员</p>
                    <h4>20</h4>
                    <i class="icon iconfont icon-huiyuan"></i>
                </li>
                <li>
                    <p>会员数量</p>
                    <h4>4</h4>
                    <i class="icon iconfont icon-xinhuiyuanshuliang"></i>
                </li>
                <li>
                    <p>新增商品</p>
                    <h4>22</h4>
                    <i class="icon iconfont icon-iconSVG-"></i>
                </li>
                <li>
                    <p>商品数量</p>
                    <h4>107</h4>
                    <i class="icon iconfont icon-shangpinshuliang"></i>
                </li>
                <li>
                    <p>新增店铺</p>
                    <h4>1</h4>
                    <i class="icon iconfont icon-dianpu"></i>
                </li>
                <li>
                    <p>店铺数量</p>
                    <h4>5</h4>
                    <i class="icon iconfont icon-dianpushuliang"></i>
                </li>
            </ul>
        </header>
        <div class="section">
            <div class="_section_left">
                <div id="myChart"></div>
                <div id="nursing"></div>
                <div id="san"></div>
                <div id="right"></div>
                <div id="histogram"></div>
            </div>
            <div class="_section_right">
                <div id="canvas"></div>
                <div id="top"></div>
            </div>
        </div>
    </section>
</template>
<script>
    import axios from 'axios';

    export default {

    }
</script>
<style scoped>
    .index {
        display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
        display: -moz-box; /* 老版本语法: Firefox (buggy) */
        display: -ms-flexbox; /* 混合版本语法: IE 10 */
        display: -webkit-flex; /* 新版本语法: Chrome 21+ */
        display: flex;
        flex-direction: column;
        margin-top: 5px;
    }

    .index .header {
        width: 100%;
        height: 205px;
        background: #D9E0E7;
    }

    .index .header ul {
        height: 198px;
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        display: -ms-flexbox;
        flex-wrap: wrap;
        -ms-justify-content: space-evenly;
        -webkit-justfy-content: space-evenly;
        justify-content: space-evenly
    }

    .index .header ul li {
        width: 24%;
        height: 89px;
        border-radius: 5px;
        margin: 10px 0.5% 0 0.5%;
        position: relative;
    }

    .index .header ul li p, h4 {
        margin-left: 10px;
        line-height: 2;
        color: #fff;
        font-weight: normal;
    }

    .index .header ul li i {
        position: absolute;
        right: 20px;
        top: 10px;
        font-size: 30px;
        color: rgba(247, 245, 245, 0.692);
    }

    .index .header ul li:nth-child(1) {
        background: #727CB6;
    }

    .index .header ul li:nth-child(2) {
        background: #338FE1;
    }

    .index .header ul li:nth-child(3) {
        background: #49B6D6;
    }

    .index .header ul li:nth-child(4) {
        background: #FE5A56;
    }

    .index .header ul li:nth-child(5) {
        background: #02ACAC;
    }

    .index .header ul li:nth-child(6) {
        background: #40BD59;
    }

    .index .header ul li:nth-child(7) {
        background: #F59C1B;
    }

    .index .header ul li:nth-child(8) {
        background: #BB3C9E;
    }

    .index .section {
        background: #D9E0E7;
        height: 900px;
        margin-top: 8px;
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
    }

    ._section_left {
        flex: 6;
        display: flex;
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        flex-wrap: wrap;
    }

    ._section_left div, ._section_right div {
        background: #fff;
        width: 100%;
    }

    ._section_left div:nth-child(1) {
        width: 32%;
        height: 240px;
    }

    ._section_left div:nth-child(2) {
        width: 32%;
        height: 240px;
    }

    ._section_left div:nth-child(3) {
        width: 32%;
        height: 240px;
    }

    ._section_left div:nth-child(1), ._section_left div:nth-child(2), ._section_left div:nth-child(3) {
        margin: 0.5%;
    }

    ._section_left div:nth-child(4) {
        width: 98%;
        height: 240px;
    }

    ._section_left div:nth-child(4), ._section_left div:nth-child(5) {
        margin: -150px 0 0 3px;
    }

    ._section_left div:nth-child(5) {
        width: 98%;
        height: 240px;

    }

    ._section_right {
        flex: 4;
    }

    ._section_right div {
        width: 100%;
        height: 240px;
        margin: 0.7% 0 10px 0;
    }

</style>
