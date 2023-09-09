<template>
    <form name="contact" method="POST" data-netlify="true" @submit.prevent="handleSubmit">
        <input type="hidden" name="form-name" value="contact">
        <p>
            <label>Name: <input type="text" name="name" /></label>
        </p>
        <p>
            <label>Your Email: <input type="email" name="email" /></label>
        </p>
        <p>
            <label>Role: <select name="role[]" multiple>
                    <option value="leader">Leader</option>
                    <option value="follower">Follower</option>
                </select></label>
        </p>
        <p>
            <label>Message: <textarea name="message"></textarea></label>
        </p>
        <p>
            <button type="submit">Send</button>
        </p>
    </form>
</template>

<script setup>
import { ref } from 'vue';

const handleSubmit = (event) => {
    const formData = new FormData(event.target);

    fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
    })
        .then(() => console.log("Form successfully submitted"))
        .catch((error) => alert(error));
};
</script>