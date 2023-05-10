<template lang="pug">
.component
  header.component__header
    .header
      ul.header__link 
        .header__box(v-for="index in 4")
          li.header__item(:class= "(index == page) ? 'header__item_active' : ''") {{index}}
          .header__text-section
            p.header__title Step {{ index }}

  main.component__card
    StepOne(v-show="page == 1")
    StepTwo(v-show="page == 2" @updatePlan="updatePlan" :toggle="toggle" :arr="arr")
    StepThree(v-show="page == 3" @updateAddons="updateAddons")
    StepFour(v-show="page == 4" :changePlan="changePlan")
    StepFive(v-show="page == 5")
  footer.component__footer
    .footer
      .footer__button.footer__button_previous(@click="previous" v-show="range.includes(page)") Go Back
      .footer__button.footer__button_next(@click="forward" :class="page == 4 ? 'footer__button_blue': ''" v-show="page !== 5") {{page == 4 ? 'Confirm' : 'Next Step'}}
  </template>

<script>
import StepOne from '@/components/StepOne.vue';
import StepTwo from '@/components/StepTwo.vue';
import StepThree from '@/components/StepThree.vue';
import StepFour from '@/components/StepFour.vue';
import StepFive from '@/components/StepFive.vue';

import { mapStores } from 'pinia';
import useStatesStore from '@/stores/states'

export default {
  name: "App",
  components: {
    StepOne,
    StepTwo,
    StepThree,
    StepFour,
    StepFive
  },
  computed: {
    ...mapStores(useStatesStore)
  },
  data() {
    return {
      page: 1,
      range: [2, 3, 4],
      arr: [
        { "title": "Arcade", "monthly": "$9/mo", "yearly": "$90/yr", "class": "arcade" },
        { "title": "Advanced", "monthly": "$12/mo", "yearly": "$120/yr", "class": "advanced" },
        { "title": "Pro", "monthly": "$15/mo", "yearly": "$150/yr", "class": "pro" }
      ],
    }
  },
  methods: {
    previous() {
      this.statesStore.selectedAddons = []
      this.page--
    },
    forward() {
      const checksPassed = this.check()

      if (!checksPassed) return
      this.page++
    },
    toggle() {
      this.statesStore.monthly = !this.statesStore.monthly
      this.statesStore.selectedAddons = []
    },
    updatePlan(value) {
      this.statesStore.selectedPlan = this.arr.find(x => x.title === value[0])
    },
    updateAddons(value, checked) {

      const found = this.statesStore.selectedAddons.find(x => x.title === value.title)

      if (found && !checked) {
        this.statesStore.selectedAddons = this.statesStore.selectedAddons.filter(e => e.title !== value.title)
        return
      }

      this.statesStore.selectedAddons.push({ "title": value.title, "price": this.statesStore.monthly ? value.monthly : value.yearly })

    },
    changePlan() {
      this.page = 2
      this.statesStore.selectedAddons = []
    },
    check() {

      if (this.page === 1) {
        const alert = document.querySelector('[role="alert"]')
        if (alert !== null) return false
        const inputs = document.querySelectorAll('.input__box')
        return Array.from(inputs).some(input => input.value == '' ? false : true)
      }

      else if (this.page === 3 && this.statesStore.selectedAddons.length == 0) return false
      return true
    }
  }
}
</script>
