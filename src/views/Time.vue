<template>
    <div class="time">
        <weatherWidget></weatherWidget>
    </div>
</template>

<script>
    import weatherWidget from "@/components/weatherWidget.vue";

    export default {
        name: "time",
        components: {
            weatherWidget
        },
    };
</script>

<style lang="scss" scoped>
    .time {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }
</style>