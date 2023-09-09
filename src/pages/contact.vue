<template>
    <div class="container">
        <h1>お問い合わせ</h1>
        <form name="contact" method="POST" data-netlify="true">
            <div>
                <label for="name">お名前（必須）</label>
                <input name="name" type="text" required />
            </div>
            <div>
                <label for="email">メールアドレス（必須）</label>
                <input name="email" type="email" required />
            </div>
            <div>
                <label for="content">お問い合わせ内容</label>
                <textarea name="content" rows="10" required></textarea>
            </div>
            <button type="submit">送信する</button>
        </form>
    </div>
</template>