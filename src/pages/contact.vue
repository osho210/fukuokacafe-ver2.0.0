<template>
  <Form :validation-schema="schema" action="https://formsubmit.co/737e3bbe2e9b7ac2017a17a2b6ad1b0b" method="POST" enctype="multipart/form-data">
    <input type="hidden" name="_blacklist" value="spammy pattern, banned term, phrase">
    <input type="text" name="_honey" style="display:none">
    <input type="hidden" name="_autoresponse" value="フォーム入力ありがとうございました。2~3日以内に返信いたします。">
    <input type="hidden" name="_next" value="http://localhost:3000/contact">
    <div class="block">
      <span class='inputRequiredLabel'>必須</span>
      企業・会社名<br />
      <Field name="company" type="company" placeholder="企業・会社名" />
      <ErrorMessage class='errorMessage' name="company" />
    </div>
    <div class="block">
      <span class='inputRequiredLabel'>必須</span>
      代表者名<br />
      <Field name="name" type="name" placeholder="代表者名" />
      <ErrorMessage class='errorMessage' name="name" />
    </div>
    <div class="block">
      <span class='inputRequiredLabel'>必須</span>
      メールアドレス<br />
      <Field name="email" type="email" placeholder="Email" />
      <ErrorMessage class='errorMessage' name="メールアドレス" />
    </div>
    <div>
      <span class='inputRequiredLabel'>必須</span>
      メッセージ内容<br />
      <Field as="textarea" name="content" type="content" cols="50" rows="10" placeholder="メッセージ内容" />
      <ErrorMessage class='errorMessage' name="content" />
    </div>
    <input type="submit" class='formSubmitButton' value="送信">
  </Form>
</template>
<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
const schema = yup.object({
  company: yup.string().required("企業・会社名を入力してください"),
  name: yup.string().required("代表者名を入力してください"),
  email: yup.string().required("メールアドレスを入力してください"),
  content: yup.string().required("メッセージ内容を入力してください"),
  // email: yup.string().eemail("正しい形式のメールアドレスを指定してください"),
});
</script>
<style>
input {
  width: 100%;
  padding: 10px;
  margin-top: 15px;
  border: 1px solid #d0d5d8;
  border-radius: 3px;
  height: 40px;
}

.block {
  margin-bottom: 20px;
}

input[type='checkbox'] {
  width: 2em;
  margin: 0 !important;
}

textarea {
  width: 100%;
  padding: 10px;
  margin-top: 3vw;
  border: 1px solid #d0d5d8;
  border-radius: 3px;
  height: 80px;
}

.contactItems {
  max-width: 800px;
  margin: 0 auto;
}

.contactItems p {
  display: flex;
  margin: auto 0;
}

.checkLabel {
  margin: auto 0 auto 2em;
}

.inputRequiredLabel {
  color: #fff;
  margin-right: 10px;
  padding: 2px 4px;
  background: #926f55;
  border-radius: 5px;
}

.inputOptionalLabel {
  color: #926f55;
  margin-right: 10px;
  padding: 2px 4px;
  background: #fff;
  border-radius: 5px;
  border: solid 1px #926f55;
}

.formSubmitButton {
  width: 100%;
  height: 60px;
  background: #926f55;
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  border-radius: 5px;
  margin: 2em 0;
}
</style>