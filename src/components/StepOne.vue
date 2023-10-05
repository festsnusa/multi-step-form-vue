<script lang="ts">
interface arrItems {
  "title": string,
  "name": string,
  "placeholder": string,
}
export default {
  name: "StepOne",
  data() {
    return {
      arr: [
        { "title": "Name", "name": "name", "placeholder": "e.g. Stephen King" },
        { "title": "Email Address", "name": "email", "placeholder": "e.g. stephenking@lorem.com" },
        { "title": "Phone Number", "name": "phone", "placeholder": "e.g. +1 234 567 890" }
      ] as arrItems[],
      schema: {
        name: "required|alpha_spaces",
        email: "required|email",
        phone: "required|min:11|max:12|numeric",
      },
    }
  },
}
</script>

<template lang="pug">
.card
  VeeForm(:validation-schema="schema")
    h1.card__title Personal info
    p.card__subtitle Please provide your name, email address, and phone number.
    .input
      .input__header(v-for="value in arr" :key="value")
        p.input__title {{ value.title }}
        VeeField.input__box(:name="value.name" :placeholder="value.placeholder" type="text")
        ErrorMessage(:name="value.name")
</template>