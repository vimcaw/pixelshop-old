<template>
    <div id="about">
        <div class="logo">
            <img src="../../image/icon.png" alt="">
            <h1>Pixelshop</h1>
            <p class="version">V0.4.2</p>
        </div>

        <hr>

        <ul>
            <li><a class="fa fa-github" target="_blank" href="https://github.com/vimcaw/pixelshop">Change Log & Source Code</a></li>
            <li><a class="fa fa-github" target="_blank" href="https://github.com/vimcaw">My GitHub</a></li>
            <li><a class="fa fa-globe" target="_blank" href="https://vimcaw.github.io/blog/">My blog</a></li>
        </ul>


        <hr>

        <p>Thank following project: </p>
        <ol>
            <li><a class="fa fa-github" target="_blank" href="https://github.com/vuejs/vue">vue</a></li>
            <li><a class="fa fa-github" target="_blank" href="https://github.com/tovic/color-picker">color-picker</a></li>
        </ol>

        <hr>

        <p>Copyright © 2017 Rico Zhu (朱昌盛)</p>
    </div>
</template>

<script>
    export default {

    }
</script>

<style>
    #about {
        padding: 2em;
    }
    #about img{
        width: 5em;
        height: 5em;
        vertical-align: -1em;
    }
    #about h1{
        display: inline-block;
        margin-left: 0.5em;
        font-size: 3em;
    }
    #about p{
        margin-left: 1em;
    }
    #about ul{
        list-style-type: none;
        margin-left: 2em;
    }
    #about li{
        margin: 1em 0;
    }
    #about li a{
        padding: 0.4em 0.6em;
        background: #414141;
        white-space: nowrap;
        text-decoration: none;
        color: #ffffff;
        transition: all .8s;
    }
    #about li a:hover{
        background: #313131;
    }
</style>