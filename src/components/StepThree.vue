<template lang="pug">
.card 
  h1.card__title Pick add-ons
  p.card__subtitle Add-ons help enhance your gaming experience.
  .checkbox(v-for="(value, index) in arr")
    label.checkbox__label
      .checkbox__item
        .checkbox__group
          input.checkbox__input(type="checkbox" @click="updateAddons(value, index)")
          .checkbox__box 
            .checkbox__title {{value.title}}
            .checkbox__subtitle {{value.subtitle}}
        p.checkbox__price {{ monthly ? value.monthly : value.yearly}}
</template>

<script>
export default {
  name: "StepThree",
  props: ["monthly"],
  data() {
    return {
      arr: [
        { "title": "Online service", "subtitle": "Access to multiplayer games", "monthly": "$1/mo", "yearly": "$10/yr" },
        { "title": "Larger storage", "subtitle": "Extra 1TB of cloud save", "monthly": "$2/mo", "yearly": "$20/yr" },
        { "title": "Customizable Profile", "subtitle": "Custom theme on your profile", "monthly": "$2/mo", "yearly": "$20/yr" }
      ]
    }
  },
  methods: {
    updateAddons(value, index) {
      const checked = document.querySelectorAll('.checkbox__input')[index].checked
      this.$emit('updateAddons', value, checked)
    }
  }
}
</script>