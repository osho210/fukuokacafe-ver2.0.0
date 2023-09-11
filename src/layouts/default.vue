<template>
    <div>
        <Header :showMobileActive="showMobileActive" :showPcActive="showPcActive" />
        <SliderContent />
        <div class="content">
            <div class="contentMain">
                <ul>
                    <li v-for="country in countries" :key="country.id">{{ country.name }}</li>
                </ul>
                <slot :showMobileActive="showMobileActive" :showPcActive="showPcActive" />
            </div>
            <Sidebar />
        </div>
        <Footer />
        <FooterNavigation :showMobileActive="showMobileActive" :showPcActive="showPcActive" />
    </div>
</template>

<script setup lang="ts">
import { createClient } from '@supabase/supabase-js'
const $config = useRuntimeConfig()
const supabaseUrl = $config.public.VITE_SUPABASE_URL
console.log(supabaseUrl+"supabaseUrlx")
const supabaseApiKey = $config.public.VITE_SUPABASE_API_KEY
const supabase = createClient(supabaseUrl, supabaseApiKey)
const countries = ref<any[]>([]);

let showMobileActive = ref(true)
let showPcActive = ref(true)

async function getCountries() {
    const { data } = await supabase.from('countries').select()
    countries.value = data as any[]
}

onMounted(() => {
    getCountries()
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
