<template>
    <li>
        <span>{{ title }}</span>
        <ul>
            <slot></slot>
        </ul>
    </li>
</template>

<script>
    export default {
        props: [
            'title'
        ]
    }
</script>

<style scoped="">
    li{
        position: relative;
        display: inline-block;
        padding: 0.2em 0.8em;
        list-style-type: none;
    }
    li:hover{
        background: #2c2c2c;
        cursor: default;
    }
    li ul{
        display: none;
        position: absolute;
        left: 0;
        background: #535353;
        color: #f0f0f0;
        list-style-type: none;
        border: 0.1em solid #6a6a6a;
        box-shadow: 0.1em 0.1em 2em #000000;
        padding: 0.1em;
    }
    li:hover ul{
        display: block;
    }
</style>