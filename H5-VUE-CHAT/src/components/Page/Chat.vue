<template>
 <div class="chat-contain">
        <alert v-model="alertShow">{{errorType}}</alert>
        <!-- 聊天头开始 -->
        <div class="head-content">
            <div class="busy-line-prompt">{{busyText}}</div>
            <!-- <button class="human-answer-button" v-show="humanButton" @click="clickHumanButton()">{{humanButtonText}}</button> -->
        </div>
        <!-- 聊天头结束 -->
        <!-- 聊天窗口开始 -->
        <div class="chatting-content" id="chattingContent" ref="chattingContent">
            <!-- 欢迎语开始 -->
            <transition name="pull-up">
                <div class="slogon">
                    <img :src="avatar_big">
                    <p class="one">{{aimi_name}}</p>
                    <p class="two">{{slogon}}</p>
                </div>
            </transition>

            <!-- 欢迎语结束 -->
            <!-- 左边对话开始 -->
            <div v-for="(item,index) in msgs" :key="index">
                <div v-show="!item.self">
                    <div class="item">
                        <div class="left">
                            <div class="text-content">
                                <img :src="avatar_small">
                                <div class="text" v-show="!item.imgData" v-html="item.msg">
                                </div>
                                <div class="text" v-show="item.imgData">
                                    <img :src="item.msg" v-show="item.imgData" class="text-img" @click="show(index)">
                                    <div v-transfer-dom>
                                        <previewer :list="msgs" ref="previewer" @on-index-change="logIndexChange"></previewer>
                                    </div>
                                </div>
                                <div class="text-ul" v-show="!item.imgData && item.zan ==1">
                                    <ul v-show="item.zan ==1">
                                        <li @click="clickUp(index)"><img src="../../assets/zan1.png">已解决</li>
                                        <li @click="clickDown(index)"><img src="../../assets/zan2.png">未解决</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 左边对话结束 -->
                <!-- 右边对话开始 -->
                <div v-show="item.self">
                    <div class="item">
                        <div class="right">
                            <div class="text-content">
                                <div class="text" v-show="!item.imgData">
                                    {{item.msg}}
                                </div>
                                <div class="text" v-show="item.imgData">

                                    <!-- <img :src="item.msg" class="text-img" @click="rightShow(index)"> -->

                                    <img :src="item.msg" class="text-img" @click="rightShow(index)">
                                    <div v-transfer-dom>
                                        <previewer :list="msgs" ref="rightpreviewer" @on-index-change="logIndexChange"></previewer>
                                    </div>

                                    <!-- <img class="text-img" :src="item.msg"> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 右边对话结束 -->
            </div>
        </div>
        <!-- 聊天窗口结束 -->

        <!-- 聊天尾部开始 -->
        <div class="foot-content">
            <img class="qs" src="../../assets/questionsOne.png" v-if="isOpenquestion && isOpenquestionIcon" @click="swiperControl()">
            <img class="qs" src="../../assets/questionsTwo.png" v-if="!isOpenquestion && isOpenquestionIcon" @click="swiperControl()">
            <img class="qs" v-if="!isOpenquestionIcon">
            <input class="send-text" id="fileImg" type="text" v-model="userText" @focus="closeSwipe()" @keyup.enter="sendMessage()">
            <input v-show="inputImg" class="picture-input"  ref="file_el" @change="choise_file" type="file" name="file" accept="image/gif,image/jpeg,image/x-png"/>
            <img v-show="inputImg" class="picture-input-img" src="../../assets/uploadImg.png"> 
            <button  :class="{button01:isbutton,button02:!isbutton}" @click="sendMessage()">发送</button>
            <!-- 轮播文字开始 -->
            <swiper  dots-position="center" :show-dots="showDots" v-show="isOpenSwiper">
                <swiper-item class="black">
                    <ul>
                        <li v-for="item in qas.slice(0,6)" :key="item" @click="select(item)">{{item}}</li>
                    </ul>
                </swiper-item>
                <swiper-item class="black" v-if="qas.length>6">
                    <ul>
                        <li v-for="item in qas.slice(6)" :key="item" @click="select(item)">{{item}}</li>
                    </ul>
                </swiper-item>
            </swiper>
            <!-- 轮播文字结束>-->
        </div>
        <!-- 聊天尾部结束 -->
    </div>
</template>
<script src='./chat.js'></script>
<style lang="less" src='./chat.less' scoped></style>

