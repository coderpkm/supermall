<template>
    <div id="tab-bar">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'TabBar',

};
</script>

<style  scoped>
#tab-bar {
  display: flex;
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #eee;
  box-shadow: 0 -2px 1px  rgba(0, 0, 0, 0.1);
  z-index: 9;
}



</style>