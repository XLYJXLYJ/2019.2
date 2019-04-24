<template>
 <div id="chat-contain">
        <alert v-model="alertShow">{{errorType}}</alert>
        <!-- 聊天头开始 -->
        <div class="head-content">
            <div class="busy-line-prompt">{{busyText}}</div>
            <button class="human-answer-button" v-if="humanButton" @click="clickHumanButton()">{{humanButtonText}}</button>
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
                                    <div :class="item.textfold?'text-fold':'text-unfold'" v-show="!item.imgData && item.msg !== ''" v-html="$options.filters.urlMsg(item.msg)">
<!--                                  <div class="text" v-show="!item.imgData && item.msg !== ''" v-html="urlMsg(item.msg)">-->
                                    </div>
                                    <div class="fold" @click='handleFold(true,index)' v-if="item.msg.length>250 && item.istextfold == 1"> 展开详情 >>></div>
                                    <div class="fold"@click='handleFold(false,index)' v-if="item.msg.length>250 && item.istextfold == 2"> <<< 收起详情 </div>
                                    <div class="text-select" v-if="!item.imgData && item.selectposition==1">
                                        <div v-if="item.selectposition==1">
                                            <ul>
                                                <li  v-for="(selectItem,selectIndex) in item.select" :key="selectIndex" @click="select(selectItem)"><img src="../../assets/star.png">{{selectItem}}</li>
                                            </ul>
                                        </div>
                                    </div>
                                <div class="text" v-show="item.imgData">
                                    <img :src="item.msg" v-if="item.imgData" class="text-img" @click="show(index)">
                                    <div v-transfer-dom>
                                        <previewer :list="msgs" ref="previewer" @on-index-change="logIndexChange"></previewer>
                                    </div>
                                </div>
                                <div class="whether-ul" v-if="item.whetherposition==1">
                                    <ul>
                                        <li  v-for="(whetherItem,whetherIndex) in item.whether" :key="whetherIndex" @click="selectWhether(whetherItem,index)">{{whetherItem}}</li>
                                    </ul>
                                </div>
                                <div class="text-ul" v-if="!item.imgData && item.zan == 1 || item.robotZan == 2 && item.whetherposition == 0 && item.select == [] || item.overzan == 0">
                                    <span v-if=" item.msg !== '以上回答是否解决您的问题?' && item.zan == 1 || item.robotZan == 1 && item.overzan !== 1">以上回答是否解决您的问题?</span>
                                    <span v-if="item.zan ==0 && item.robotZan == 2 || item.overzan == 1">感谢您的反馈,我们将继续努力</span>
                                    <ul v-if="item.zan == 1 || item.overzan == 1">
                                        <li @click="clickUp(index,item.target)"><img src="../../assets/zan1.png">已解决</li>
                                        <li @click="clickDown(index,item.target)"><img style="position:relative;top:1px" src="../../assets/zan2.png">未解决</li>
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

                                    <img v-if="item.imgData" :src="item.msg" class="text-img" @click="rightShow(index)">
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
        <div class="foot-content" id="foot-contain" ref="foot-contain">
            <img class="qs" src="../../assets/questionsOne.png" v-if="isOpenquestion && isOpenquestionIcon" @click="swiperControl()">
            <img class="qs" src="../../assets/questionsTwo.png" v-if="!isOpenquestion && isOpenquestionIcon" @click="swiperControl()">
            <img class="qs" v-if="!isOpenquestionIcon">
            <input class="send-text" id="fileImg" type="text" v-model="userText" @focus="closeSwipe()" @blur="leaveFocus()" @keyup.enter="sendMessage()">
            <input v-if="inputImg" class="picture-input"  ref="file_el" @change="choise_file" type="file" name="file" accept="image/*"/>
            <img v-if="inputImg" class="picture-input-img" src="../../assets/uploadImg.png">
            <button  :class="{button01:isbutton,button02:!isbutton}" @click="sendMessage()">发送</button>
            <!-- 轮播文字开始 -->
            <swiper  dots-position="center" :show-dots="showDots" v-if="isOpenSwiper == true">
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

