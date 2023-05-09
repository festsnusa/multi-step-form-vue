<template lang="pug">
.card 
  h1.card__title Pick add-ons
  p.card__subtitle Add-ons help enhance your gaming experience.
  .checkbox(v-for="(value, index) in arr")
    label.checkbox__label
      .checkbox__item
        .checkbox__group
          input.checkbox__input(:checked="value.checked" type="checkbox" @click="updateAddons(value, index)")
          .checkbox__box 
            .checkbox__title {{value.title}}
            .checkbox__subtitle {{value.subtitle}}
        p.checkbox__price {{ monthly ? value.monthly : value.yearly}}
</template>

<script>
import { mapStores } from 'pinia';
import useStatesStore from '@/stores/states'

export default {
  name: "StepThree",
  data() {
    return {
      arr: [
        { "title": "Online service", "subtitle": "Access to multiplayer games", "monthly": "$1/mo", "yearly": "$10/yr", "checked": false },
        { "title": "Larger storage", "subtitle": "Extra 1TB of cloud save", "monthly": "$2/mo", "yearly": "$20/yr", "checked": false },
        { "title": "Customizable Profile", "subtitle": "Custom theme on your profile", "monthly": "$2/mo", "yearly": "$20/yr", "checked": false }
      ],
      monthly: true,
      selectedAddons: []
    }
  },
  computed: {
    ...mapStores(useStatesStore)
  },
  methods: {
    updateAddons(value, index) {
      const checked = document.querySelectorAll('.checkbox__input')[index].checked
      this.$emit('updateAddons', value, checked)
    }
  },
  updated() {
    this.selectedAddons = []
    document.querySelectorAll('.checkbox__input').forEach(e => e.checked = false)
  },
  created() {
    this.monthly = this.statesStore.monthly
    this.selectedAddons = this.arr

    this.statesStore.$subscribe((mutation, state) => {
      this.monthly = state.monthly
      this.selectedAddons = state.selectedAddons
    })
  }
}
</script>