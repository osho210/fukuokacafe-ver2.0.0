<template>
    <div>
        <Header />
        <FooterNavigation />
        <slot />
        <Footer />
    </div>
</template>

<script setup lang="ts">
const { $handleResize } = useNuxtApp()
onMounted(() => {
    if ($handleResize) {
        console.log($handleResize)
        $handleResize
    }
    else {
        console.log("none")
    }
})
</script>



