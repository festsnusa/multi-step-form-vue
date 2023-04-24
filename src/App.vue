<script>
import StepOne from './components/StepOne.vue';
import StepTwo from './components/StepTwo.vue';
import StepThree from './components/StepThree.vue';
import StepFour from './components/StepFour.vue';
import StepFive from './components/StepFive.vue';

export default {
  name: "App",
  components: {
    StepOne,
    StepTwo,
    StepThree,
    StepFour,
    StepFive
  },
  data() {
    return {
      page: 2,
      monthly: true,
      selectedPlan: { "title": "Arcade", "price": "$9/mo" },
      selectedAddons: [],
      range: [2, 3, 4],
      arr: [
        { "title": "Arcade", "monthly": "$9/mo", "yearly": "$90/yr", "src": "/assets/images/icon-arcade.svg" },
        { "title": "Advanced", "monthly": "$12/mo", "yearly": "$120/yr", "src": "/assets/images/icon-advanced.svg" },
        { "title": "Pro", "monthly": "$15/mo", "yearly": "$150/yr", "src": "/assets/images/icon-pro.svg" }
      ],
    }
  },
  methods: {
    forward() {
      const checksPassed = this.check()

      if (!checksPassed) return
      this.page++
    },
    toggle() {
      this.monthly = !this.monthly
      this.selectedPlan.price = (this.monthly) ? this.selectedPlan.price : this.arr.find(x => x.title === this.selectedPlan.title).yearly
    },
    updatePlan(value) {
      this.selectedPlan = { "title": value[0], "price": value[1] }
    },
    updateAddons(value, checked) {

      const found = this.selectedAddons.find(x => x.title === value.title)

      if (found && !checked) {
        this.selectedAddons = this.selectedAddons.filter(e => e.title !== value.title)
        return
      }

      this.selectedAddons.push({ "title": value.title, "price": this.monthly ? value.monthly : value.yearly })

    },
    changePlan() {
      this.page = 2
    },
    check() {

      if (this.page === 1) {
        const alert = document.querySelector('[role="alert"]')
        if (alert !== null) return false
        const inputs = document.querySelectorAll('.input__box')
        return Array.from(inputs).some(input => input.value == '' ? false : true)
      }

      else if (this.page === 3) {
        if (this.selectedAddons.length == 0) return false
      }

      return true
    }
  }
}
</script>

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
    StepTwo(v-show="page == 2" @updatePlan="updatePlan" :monthly="monthly" :toggle="toggle" :arr="arr")
    StepThree(v-show="page == 3" @updateAddons="updateAddons" :monthly="monthly")
    StepFour(v-show="page == 4" :monthly="monthly" :selectedPlan="selectedPlan" :selectedAddons="selectedAddons" :changePlan="changePlan")
    StepFive(v-show="page == 5")
  footer.component__footer
    .footer
      .footer__button.footer__button_previous(@click="page--" v-show="range.includes(page)") Go Back
      .footer__button.footer__button_next(@click="forward" :class="page == 4 ? 'footer__button_blue': ''" v-show="page !== 5") {{page == 4 ? 'Confirm' : 'Next Step'}}
</template>
