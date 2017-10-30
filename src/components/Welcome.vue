<template>
<div id="welcome">
    <div class="header">
        <div class="logo">
            <img src="../image/icon.png" alt="">
            <h1>Pixelshop</h1>
            <p> - a small Phtoshop for Web</p>
        </div>
        <ul class="about">
            <li class="fa fa-github"><a href="https://github.com/vimcaw/pixelshop">Change Log & Source Code</a></li>
            <li class="fa fa-commenting">
                <span>Feedback</span>
                <ul>
                    <li class="fa fa-github"><a href="https://github.com/vimcaw/pixelshop/issues">GitHub Issues</a></li>
                    <li class="fa fa-envelope"><a href="mailto:vimcaw@gmail.com">vimcaw@gmail.com</a></li>
                </ul>
            </li>
            <li class="fa fa-github"><a href="https://github.com/vimcaw">My GitHub</a></li>
            <li class="fa fa-globe"><a href="https://vimcaw.github.io/blog/">My blog</a></li>
        </ul>
    </div>
    <ul class="handle">
        <li>
            <button type="button" id="welcome-new">New...</button>
        </li>
        <li>
            <button type="button" id="welcome-openFromLocal" @click="openFromLocal">Open From Local...</button>
        </li>
        <li>
            <button type="button" id="welcome-openFromUrl">Open From URL...</button>
        </li>
    </ul>
    <div class="recent-file">
        <p>Recent file</p>
        <ul>
            <li id="empty-recent-file" v-if="recentFiles.length === 0">Your recent Work will appear here.</li>
            <li v-for="file in recentFiles" @click="open(file.src, file.fileName)" :title="file.fileName">
                <div class="thumb"><img :src="file.src" alt="file.fileName"></div>
                <div class="info">
                    <p class="file-name">{{file.fileName.trimLength(16)}}</p>
                    <p class="date">{{file.date}}</p>
                </div>
                <div class="remove" @click.stop="remove(file)" title="Remove this image">X</div>
            </li>
        </ul>
    </div>
</div>
</template>


<script>
import {$} from '../element';
import {mapGetters} from 'vuex';
import instruction from '../instruction';

export default {
    mixins: [instruction],
    computed: mapGetters([
        'recentFiles'
    ]),
    methods: {
        open(src, fileName) {
            this.$store.commit('openImage', {src: src, fileName: fileName});
        },
        remove(fileName) {
            this.$store.commit('removeRecentFile', fileName);
        }
    }
};

window.onbeforeunload = null;
</script>


<style>
#welcome{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 3em;
    background: #212121;
    z-index: 100;
}
#welcome .header{
    margin-bottom: 2em;
}
#welcome .header img{
    width: 5em;
    height: 5em;
    vertical-align: -1em;
}
#welcome .header h1{
    display: inline-block;
    margin-left: 0.5em;
    margin-bottom: 0.5em;
    font-size: 3em;
}
#welcome .header p{
    display: inline-block;
    margin-left: 1em;
}
#welcome .header>.logo, #welcome .header>ul{
    display: inline-block;
}
#welcome .header>ul{
    margin-left: 5em;
}
#welcome .header>ul>li{
    position: relative;
    transition: all .8s;
}
#welcome .header>ul>li>ul{
    display: none;
}
#welcome .header>ul>li:hover>ul{
    display: block;
    position: absolute;
    left: 0;
    top: 2em;
    z-index: 500;
}
#welcome .header>ul>li:hover>ul>li{
    display: block;
}
#welcome .header ul li{
    display: inline-block;
    padding: 0.5em 1em;
    background: #262439;
    white-space: nowrap;
}
#welcome .header ul li:hover{
    background: #2e2b47;
}
#welcome .header ul li a{
    text-decoration: none;
    color: #ffffff;
}
#welcome ul{
    list-style-type: none;
}
#welcome .handle, #welcome .recent-file{
    display: inline-block;
    vertical-align: top;
}
#welcome .handle{
    padding-top: 3em;
}
#welcome .handle li{
    padding: 0.5em 0;
}
#welcome .recent-file{
    margin-left: 3em;
}
#welcome .recent-file ul{
    position: absolute;
    top: 16em;
    right: 10em;
    bottom: 10em;
    left: 15em;
    padding: 0.5em;
    overflow: auto;
    /*border: 1px solid #6a6a6a;*/
    background: #262626;
}
#welcome .recent-file li{
    position: relative;
    display: inline-block;
    margin: 0.5em;
}
#welcome .recent-file li{
    width: 10em;
    padding: 1em 2em;
    background: #2c2c2c;
    cursor: pointer;
    border: 1px solid transparent;
}
#welcome .recent-file li:hover{
    border-color: #8F8F8F;
}
#welcome .recent-file .thumb{
    position: relative;
    width: 100%;
    height: 6em;
    text-align: center;
}
#welcome .recent-file img{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 10em;
    max-height: 6em;
    background: url("../image/TransparentGrid.jpg");
    -webkit-background-size: cover;
    background-size: cover;
    line-height: 6em;
}
#welcome .recent-file .info{
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
}

#welcome .recent-file .date{
    font-size: 0.8em;
    line-height: 0.1em;
    color: #616161;
}
#welcome .recent-file #empty-recent-file{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: block;
    background: none;
    border: none;
    cursor: default;
    white-space: nowrap;
}
#welcome .recent-file li .remove{
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    font-size: 0.5em;
    width: 1.2em;
    height: 1.2em;
    padding: 0.2em;
    margin: 0.8em;
    text-align: center;
    border-radius: 50%;
}
#welcome .recent-file li:hover .remove{
    display: block;
}
#welcome .recent-file li:hover .remove:hover{
    background: #982c24;
}
</style>