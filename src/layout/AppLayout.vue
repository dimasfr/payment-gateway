<script setup>
import { watch, computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

const store = useStore();
const route = new useRoute();
const activeLink = computed(() => store.state.activeLink);

watch(route, async () => {
  const storedState = computed(() => store.state);
  const formSummary = ref(storedState.value.formSummary);
  const formDelivery = ref(storedState.value.formDelivery);
  const formPayment = ref(storedState.value.formPayment);
  const activeLink = ref(storedState.value.activeLink);

  if(route.name == 'delivery') {
    activeLink.value.payment = false
    activeLink.value.finish = false
    formSummary.value.label_estimation = null
    formSummary.value.label_method = null
    formSummary.value.label_button = 'Continue to payment'
    formSummary.value.button_to = 'payment'
    formSummary.value.button_visibility = true
    if (formDelivery.value.delivery_dropshiper_status) {
        formSummary.value.summary_total = parseInt(formSummary.value.summary_cost + formSummary.value.summary_dropfee)
    }
    else {
        formSummary.value.summary_total = formSummary.value.summary_cost
    }
  }
  else if (route.name == 'payment') {
    activeLink.value.payment = true
    activeLink.value.finish = false
    formSummary.value.label_estimation = 'Delivery Estimation'
    formSummary.value.label_method = null
    formSummary.value.label_button = 'Pay with ' + formPayment.value.payment_method[formPayment.value.payment_chosen_method]
    formSummary.value.button_to = 'finish'
    formSummary.value.button_visibility = true
    if (formDelivery.value.delivery_dropshiper_status) {
        formSummary.value.summary_total = parseInt(formSummary.value.summary_cost + formSummary.value.summary_dropfee + formPayment.value.payment_prices[formPayment.value.payment_chosen_prices])
    }
    else {
        formSummary.value.summary_total = (formSummary.value.summary_cost + formPayment.value.payment_prices[formPayment.value.payment_chosen_prices])
    }
  }
  else if (route.name == 'finish') {
    activeLink.value.payment = true
    activeLink.value.finish = true
    formSummary.value.label_estimation = 'Delivery Estimation'
    formSummary.value.label_method = 'Payment Method'
    formSummary.value.button_visibility = false
  }

  store.commit('SET_FORM_DELIVERY',formDelivery);
  store.commit('SET_FORM_SUMMARY',formSummary);
  store.dispatch('saveStateToLocalStorage');
})
</script>

<template>
    <div class="layout">
        <div class="layout__container">
            <ul class="layout__breadcrumbs">
                <li><p :class="{ 'activelink' : activeLink.delivery }">1</p>Delivery</li>
                <span></span>
                <li><p :class="{ 'activelink' : activeLink.payment }">2</p>Payment</li>
                <span></span>
                <li><p :class="{ 'activelink' : activeLink.finish }">3</p>Finish</li>
            </ul>
            <div class="layout__content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<style lang="stylus" scoped>
// Stylus mixin
mobile()
  @media (max-width: 768px)
    {block}

.layout
  width: 100%
  height: 100vh
  background: #fffae6

  +mobile()
    position: relative
    height: auto

  .layout__container
    width: 70%
    position: relative
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)

    +mobile()
      width: 95%
      position: static
      top: 0
      left: 0
      transform: none
      margin: 0 auto

    .layout__breadcrumbs
      position: relative
      transform: translateY(50%)
      width: 45%
      background: #fffae6
      padding: 0 30px 20px 30px
      border-radius: 30px
      margin: 0 auto
      display: flex
      justify-content: space-between
      align-items: center

      +mobile()
        width: 95%
        font-size: 12px
        padding: 5px

      li
        display: flex
        align-items: center
        color: #ff8a00

        p
          background: #ffdfba
          width: 25px
          height: 25px
          border-radius: 50%
          text-align: center
          padding: 1px
          margin-right: 5px
          color: #ff8a00

          +mobile()
            width: 20px
            height: 20px
            margin-right: 2px

        .activelink
          background: #ff8a00
          color: #fff

      span
        width: 8px
        height: 8px
        border-right: 2px solid #ff8a00
        border-bottom: 2px solid #ff8a00
        transform: rotate(-45deg)

    .layout__content
      width: 100%
      height: 80vh
      background: #fff
      box-shadow: 0px 7px 30px #fbebd6
      border-radius: 5px

      +mobile()
        height: auto

</style>
