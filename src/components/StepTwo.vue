<template lang="pug">
.card
  VeeForm(:validation-schema="schema")
    h1.card__title Select your plan
    p.card__subtitle You have the option of monthly or yearly billing.
    .options 
      .options__box(v-for="(value, index) in arr" :key="value" :class="index === active ? 'options__box_active' : ''" @click="changePlan(value, index)")
        img.options__image(:class="`options__image_${value.class}`", :alt= "value.title")
        .options__group 
          .options__title {{value.title}}
          .options__subtitle {{monthly ? value.monthly : value.yearly}}
          .options__bonus(v-show="!monthly") 2 months free
    .toggle 
      p.toggle__monthly.toggle__active Monthly 
      li.toggle__item
        label.toggle__label
          input.toggle__input(type="checkbox" @click="toggle")
      p.toggle__yearly Yearly
</template>

<script>
import { mapStores } from 'pinia';
import useStatesStore from '@/stores/states'

export default {
  name: "StepTwo",
  props: ["arr", "toggle"],
  computed: {
    ...mapStores(useStatesStore),
  },
  data() {
    return {
      active: 0,
      currentPlan: ["Arcade", "$9/mo"],
      monthly: true
    }
  },
  methods: {
    changePlan(value, index) {
      this.currentPlan = [value.title, this.monthly ? value.monthly : value.yearly]

      document.querySelectorAll('.options__box').forEach((e, j) => {
        (j == index) ? e.classList.add('options__box_active') : e.classList.remove('options__box_active')
      })

      this.$emit('updatePlan', this.currentPlan)

    },
    img(name) {
      return new URL(`./src/assets/images/${name}`, import.meta.url)
    }
  },
  created() {
    this.monthly = this.statesStore.monthly

    this.statesStore.$subscribe((mutation, state) => {
      this.monthly = state.monthly
    })
  }
}
</script>