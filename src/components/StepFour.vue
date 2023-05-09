<template lang="pug">
.card 
  h1.card__title Finishing up
  p.card__subtitle Double-check everything looks OK before confirming.
  .card__cart
    .cart 
      .cart__option
        .cart__group 
          .cart__option--title {{`${selectedPlan.title} ${monthly ? '(Monthly)': '(Yearly)'}`}}
          p.cart__option--change(@click="changePlan") Change
        .cart__option--price {{this.monthly ? selectedPlan.monthly : selectedPlan.yearly}}
      .cart__addons 
        .addons(v-for="addon in selectedAddons")
          p.addons__title {{ addon.title }}
          p.addons__price +{{ addon.price }}
  .card__total 
    .total 
      p.total__title Total (per {{ monthly ? 'month': 'year'}})
      p.total__result
</template>

<script>
import { mapStores } from 'pinia';
import useStatesStore from '@/stores/states'

export default {
  name: "StepFour",
  props: ["changePlan"],
  data() {
    return {
      total: 0,
      selectedPlan: {},
      selectedAddons: [],
      monthly: true,
    }
  },
  computed: {
    ...mapStores(useStatesStore)
  },
  updated() {
    console.log(this.monthly)
    let sum = 0
    if (this.selectedAddons.length == 0) return
    sum += (this.monthly) ? +this.selectedPlan.monthly.replace(/[^0-9]/g, "") : +this.selectedPlan.yearly.replace(/[^0-9]/g, "")
    this.selectedAddons.forEach(e => sum += +e.price.replace(/[^0-9]/g, ""))

    document.querySelector('.total__result').innerHTML = `+$${sum}${this.monthly ? '/mo' : '/yr'}`
  },
  created() {
    this.monthly = this.statesStore.monthly
    this.selectedPlan = this.statesStore.selectedPlan
    this.selectedAddons = this.statesStore.selectedAddons

    this.statesStore.$subscribe((mutation, state) => {
      this.monthly = state.monthly
      this.selectedPlan = state.selectedPlan
      this.selectedAddons = state.selectedAddons
    })
  }
}
</script>