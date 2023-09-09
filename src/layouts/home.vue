<template>
    <div>
        <Header :showMobileActive="showMobileActive" :showPcActive="showPcActive" />
        <div class="content">
            <div class="contentMain">
                <slot :showMobileActive="showMobileActive" :showPcActive="showPcActive" />
            </div>
            <Sidebar />
        </div>
        <Footer />
        <FooterNavigation :showMobileActive="showMobileActive" :showPcActive="showPcActive" />
    </div>
</template>

<script setup lang="ts">
const layout = "home";
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
