<script setup></script>
<template>
  <div class="mainApp"></div>
  <headerComp v-if="fullPath != '/'"></headerComp>
  <router-view></router-view>
</template>
<style lang="scss"></style>
