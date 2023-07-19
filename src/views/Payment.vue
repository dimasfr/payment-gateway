<template>
    <div class="payment">
       <router-link to="/" class="payment__out">
            <i class="fa fa-arrow-left"></i>
            <p>Back to delivery</p>
       </router-link>
       <div class="payment__grid">
           <div class="payment__details">
               <h1 style="font-family: 'InterUI-Bold';">Shipment</h1>
               <div class="payment__service">
                   <div 
                   class="payment__courier"
                   v-for="(courier, index) in formPayment.payment_couriers"
                   :key="courier"
                   @click="changeCourier(index)"
                   :class="{ 'activePanel' : formPayment.payment_chosen_courier == index }"
                   >
                        <div>
                            <p>{{ courier }}</p>
                            <P>{{ formPayment.payment_prices[index].toLocaleString() }}</P>
                        </div>
                   </div>
               </div>
               <h1 style="font-family: 'InterUI-Bold';">Payment</h1>
               <div class="shipment__service">
                   <div 
                   class="shipment__courier"
                   v-for="(method, index) in formPayment.payment_method"
                   :key="method"
                   @click="changeMethod(index)"
                   :class="{ 'activePanel' : formPayment.payment_chosen_method == index }"
                   >
                       <div>
                         <p>{{ method }}</p>
                         <p v-if="formPayment.payment_saldos[index] != 0">{{ formPayment.payment_saldos[index] }} left</p>
                       </div>
                   </div>
               </div>
           </div>
           <div class="payment__summary">
               <app-summary></app-summary>
           </div>
       </div>
    </div>
</template>

<script>
import { defineComponent, computed, ref } from 'vue';
import { useStore } from 'vuex';
import summary from '@/components/Summary.vue'

export default defineComponent({
    components: {
        'app-summary' : summary,
    },
    setup() {
        const store = useStore();
        const storedState = computed(() => store.state);
        const formPayment = ref(storedState.value.formPayment);
        const formSummary = ref(storedState.value.formSummary);
        const formDelivery = ref(storedState.value.formDelivery);

        const changeCourier = (index) => {
            formPayment.value.payment_chosen_estimation = index
            formPayment.value.payment_chosen_courier = index
            formPayment.value.payment_chosen_prices = index

            if (formDelivery.value.delivery_dropshiper_status) {
                formSummary.value.summary_total = parseInt(formSummary.value.summary_cost + formSummary.value.summary_dropfee + formPayment.value.payment_prices[formPayment.value.payment_chosen_prices])
            }
            else {
                formSummary.value.summary_total = (formSummary.value.summary_cost + formPayment.value.payment_prices[formPayment.value.payment_chosen_prices])
            }

            store.commit('SET_FORM_PAYMENT',formPayment);
            store.dispatch('saveStateToLocalStorage');
        };

        const changeMethod = (index) => {
            formPayment.value.payment_chosen_method = index
            formSummary.value.label_button = 'Pay with ' + formPayment.value.payment_method[formPayment.value.payment_chosen_method]

            store.commit('SET_FORM_PAYMENT',formPayment);
            store.commit('SET_FORM_SUMMARY',formSummary);
            store.dispatch('saveStateToLocalStorage');
        };

        return {
            formPayment,
            changeCourier,
            changeMethod
        }
    },
});
</script>

<style lang="stylus">
mobile()
  @media (max-width: 768px)
    {block}

.payment
  padding: 40px
  height: 100%

  +mobile()
    padding: 25px

  .fa
    font-size: 13px
    margin-right: 10px

    +mobile()
      font-size: 12px

  .payment__out
    display: flex
    align-items: center
    color: #656567

    +mobile()
      font-size: 12px

  .payment__grid
    display: grid
    height: 65vh
    grid-template-columns: 3fr 2fr 2fr
    grid-gap: 25px
    margin-top: 20px

    +mobile()
      grid-template-columns: 1fr
      grid-gap: 5px
      height: 100%

    .payment__details
      grid-column: 1/3
      h1
        padding-bottom: -5px
        margin-bottom: 25px
        font-weight: bold
        color: #ff8a00
        font-size: 27px
        position: relative
        z-index: 1

        +mobile()
          font-size: 20px

        &::after
          position: absolute
          content: ' '
          width: 8em
          height: 7px
          background: #e9e9ec
          left: 0
          z-index: -1
          bottom: 2px

      .payment__service
        width: 85%
        display: grid
        grid-template-columns: repeat(3, 1fr)
        grid-gap: 20px
        margin-bottom: 65px

        +mobile()
          width: 100%
          grid-gap: 5px

        .payment__courier
          height: 55px
          display: grid
          align-items: center
          justify-items: center
          border: 1px solid #999
          cursor: pointer
          position: relative
          p
            font-size: 13px

            +mobile()
              font-size: 10px

        .activePanel
          border: 1px solid #19c874
          background: #e5fce9
          &::after
            position: absolute
            content: ' '
            width: 10px
            height: 5px
            border-left: 2px solid #19c874
            border-bottom: 2px solid #19c874
            right: 10px
            top: 20px
            transform: rotate(-45deg)

      .shipment__service
        @extend .payment__service
        .shipment__courier
          @extend .payment__courier

        .activePanelpay
          @extend .activePanel

    .payment__summary
      height: 100%
      border-left: 2px solid #fff3e5
      padding-left: 20px

</style>