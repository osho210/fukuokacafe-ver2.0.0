<template>
    <div class="container">
        <form class="contact_form" name="contact" method="POST" data-netlify="true" netlify>
            <input type="hidden" name="form-name" :value="contact" />
            <div class="contact_item">
                <label for="name">お名前</label>
                <input type="text" id="name" name="name" autocomplete="name" />
            </div>
            <div class="contact_item">
                <label for="email">メールアドレス</label>
                <input type="email" id="email" name="email" autocomplete="email" />
            </div>
            <div class="contact_item">
                <label for="message">お問い合わせ内容</label>
                <textarea id="message" rows="12" name="message"></textarea>
            </div>
            <div class="contact_submit">
                <button type="submit">送信</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    }
}
</script>

<style scoped>
.container {
    max-width: 800px;
    margin: 0 auto;
}

.contact_form .contact_item {
    display: flex;
    margin-bottom: 2%;
}

.contact_form .contact_item label {
    width: 20%;
}

.contact_form .contact_item input,
.contact_form .contact_item textarea {
    width: 80%;
}

.contact_form .contact_submit {
    text-align: center;
}
</style>