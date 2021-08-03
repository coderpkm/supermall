<template>
    <div class="tab-control">
        <div v-for="(item, index) in titles" :key="index" 
            class="tab-control-item"
            :class="{active: index === currentIndex}"
            @click="itemClick(index)">
            <span>{{item}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Tabcontrol',
    props: {
        titles: {
            type: Array,
            default() {
                return []
            }
        }
    },
    data() {
        return {
            currentIndex: 0
        }
    },
    methods: {
        itemClick(index) {
            this.currentIndex = index;
            this.$emit('tabClick', index);
        }
    },

};
</script>

<style>
    .tab-control {
        display: flex;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background-color: #fff;
    }
    .tab-control-item {
        flex: 1
    }
    .tab-control-item span {
        padding: 5px
    }
    .active {
        color: var(--color-high-text);
        
    }
    .active span {
        border-bottom: 3px solid var(--color-tint);
    }
</style>