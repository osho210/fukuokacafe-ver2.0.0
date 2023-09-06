<template>
    <div>
        <Header :showMobileActive="showMobileActive" :showPcActive="showPcActive" />
        <SliderContent />
        <div>
            <slot :showMobileActive="showMobileActive" :showPcActive="showPcActive" />
            <Sidebar />
        </div>
        <Footer />
        <FooterNavigation :showMobileActive="showMobileActive" :showPcActive="showPcActive" />
    </div>
</template>

<script setup lang="ts">
let showMobileActive = ref(true)
let showPcActive = ref(true)
onMounted(() => {
    const handleResize = () => {
        if (window.innerWidth <= 550) {
            showMobileActive.value = true
            showPcActive.value = false
        } else {
            showMobileActive.value = false
            showPcActive.value = true
        }
    }
    handleResize()
    window.addEventListener('resize', handleResize)

    onUnmounted(() => {
        window.removeEventListener('resize', handleResize)
    })
})
</script>
