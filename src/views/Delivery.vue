<template>
    <div class="delivery">
        <a href="#" class="delivery__out">
            <i class="fa fa-arrow-left"></i>
            <p>Back to cart</p>
        </a>
        <div class="delivery__grid">

            <div class="delivery__details">
                <h1 style="font-family: 'InterUI-Bold';">Delivery details</h1>

                <div class="delivery__input">
                    <div class="group" :class="formDelivery.delivery_name == '' ? 'invalid' : (formDelivery.delivery_name == null ? '' : 'valid')">
                        <input type="text" v-model="formDelivery.delivery_name" @keyup="validate()" activePanelspellcheck="false">
                        <label>Name</label>
                        <p v-if="formDelivery.delivery_name == ''">Harus diisi</p>
                    </div>
                    <div class="group" :class="formValid.delivery_email ? 'valid' : (formDelivery.delivery_email == null ? '' : 'invalid')">
                        <input type="text" v-model="formDelivery.delivery_email" @keyup="validate()" activePanelspellcheck="false">
                        <label>Email</label>
                        <p v-if="formDelivery.delivery_email == ''">Harus diisi</p>
                        <p v-if="formDelivery.delivery_email != '' && formValid.delivery_email == false">Email tidak valid</p>
                    </div>
                    <div class="group" :class="formValid.delivery_phone ? 'valid' : (formDelivery.delivery_phone == null ? '' : 'invalid')">
                        <input type="text" v-model="formDelivery.delivery_phone" @keyup="validate()" activePanelspellcheck="false">
                        <label>Phone Number</label>
                        <p v-if="formDelivery.delivery_phone == ''">Harus diisi</p>
                        <p v-if="formDelivery.delivery_phone != '' && formValid.delivery_phone == false">Phone number tidak valid</p>
                    </div>
                    <div class="text-area" :class="formValid.delivery_address ? 'valid' : (formDelivery.delivery_address == null ? '' : 'invalid')">
                        <textarea spellcheck="false" v-model="formDelivery.delivery_address" placeholder="Delivery Address" @keyup="validate()" required></textarea>
                        <p>{{formValid.delivery_address_length}}/120</p>
                        <p v-if="formDelivery.delivery_address == ''">Harus diisi</p>
                        <p v-if="formDelivery.delivery_address != '' && formValid.delivery_address_length > 120">Maksimal 120 karakter</p>
                    </div>

                </div>
            </div>

            <div class="delivery__dropship">
                <div class="checkbox">
                    <label>Send as dropshipper <span @click="onChecked()"><div v-if="formDelivery.delivery_dropshiper_status"></div></span></label>
                </div>
                <div class="delivery__input" v-if="formDelivery.delivery_dropshiper_status">
                    <div class="group" :class="formDelivery.delivery_dropshiper_name == '' ? 'invalid' : (formDelivery.delivery_dropshiper_name == null ? '' : 'valid')">
                        <input type="text" v-model="formDelivery.delivery_dropshiper_name" @keyup="validate()" activePanelspellcheck="false" :disabled="!formDelivery.delivery_dropshiper_status">
                        <label>Dropshipper Name</label>
                        <p v-if="formDelivery.delivery_dropshiper_name == ''">Harus diisi</p>
                    </div>
                    <div class="group" :class="formValid.delivery_dropshiper_phone ? 'valid' : (formDelivery.delivery_dropshiper_phone == null ? '' : 'invalid')">
                        <input type="text" v-model="formDelivery.delivery_dropshiper_phone" @keyup="validate()" activePanelspellcheck="false" :disabled="!formDelivery.delivery_dropshiper_status">
                        <label>Dropshipper Phone Number</label>
                        <p v-if="formDelivery.delivery_dropshiper_phone == ''">Harus diisi</p>
                        <p v-if="formDelivery.delivery_dropshiper_phone != '' && formValid.delivery_dropshiper_phone == false">Phone number tidak valid</p>
                    </div>
                </div>
            </div>

            <div class="delivery__summary">
                <app-summary></app-summary>
            </div>
        </div>

    </div>
</template>

<script>
import { defineComponent, computed, ref } from 'vue';
import { useStore } from 'vuex';
import summary from './Summary.vue'

export default defineComponent({
    components: {
        'app-summary' : summary,
    },
    setup() {
        const store = useStore();
        const emailRegex = /^[a-z]+((_|\.|-)?[a-z\d]+)*@[a-z\d]+((-)?[a-z\d]+)*\.[a-z]{2,8}(\.[a-z]{2,8})?$/;
        const phoneRegex = /^(0|\+62|\(\d{3,4}\))[\d\-]{5,19}$/;

        const storedState = computed(() => store.state);
        const formDelivery = ref(storedState.value.formDelivery);
        const formValid = ref(storedState.value.formValid);
        const formSummary = ref(storedState.value.formSummary);

        const validate = () => {
            if (formDelivery.value.delivery_email != null) {
                formValid.value.delivery_email = emailRegex.test(formDelivery.value.delivery_email);
            }
            if (formDelivery.value.delivery_phone != null) {
                formDelivery.value.delivery_phone = formDelivery.value.delivery_phone.replace(/[^0-9\-+()]/g, '');
                formValid.value.delivery_phone = phoneRegex.test(formDelivery.value.delivery_phone);
            }
            if (formDelivery.value.delivery_address != null) {
                formValid.value.delivery_address = formDelivery.value.delivery_address == '' || formDelivery.value.delivery_address.length > 120 ? false : true;
                formValid.value.delivery_address_length = formDelivery.value.delivery_address.length ? formDelivery.value.delivery_address.length : 0
            }
            if (formDelivery.value.delivery_dropshiper_phone != null) {
                formDelivery.value.delivery_dropshiper_phone = formDelivery.value.delivery_dropshiper_phone.replace(/[^0-9\-+()]/g, '');
                formValid.value.delivery_dropshiper_phone = phoneRegex.test(formDelivery.value.delivery_dropshiper_phone);
            }

            store.commit('SET_FORM_DELIVERY',formDelivery);
            store.commit('SET_FORM_VALID',formValid);

            store.dispatch('saveStateToLocalStorage');
        };

        const onChecked = () => {
            formDelivery.value.delivery_dropshiper_status = formDelivery.value.delivery_dropshiper_status ? false : true;

            if (formDelivery.value.delivery_dropshiper_status) {
                formSummary.value.summary_total = parseInt(formSummary.value.summary_cost + formSummary.value.summary_dropfee)
            }
            else {
                formDelivery.value.delivery_dropshiper_name = null
                formDelivery.value.delivery_dropshiper_phone = null
                formSummary.value.summary_total = formSummary.value.summary_cost
            }

            store.commit('SET_FORM_DELIVERY',formDelivery);
            store.commit('SET_FORM_SUMMARY',formSummary);
            store.commit('SET_FORM_VALID',formValid);
            store.dispatch('saveStateToLocalStorage');
        };

        return {
            formDelivery,
            formValid,
            validate,
            onChecked
        };
    },
});
</script>

<style scoped lang="scss">
    @mixin if-lessThan-768px{
          @media (max-width: 768px){
              @content;
          }
      }
    .fa{
      font-size: 13px;
      margin-right: 10px;
      @include if-lessThan-768px{
          font-size: 12px;
        }
    }
    .delivery{
      padding: 40px;
      height: 100%;
      @include if-lessThan-768px{
        padding: 25px;
      }
      .delivery__out{
        display: flex;
        align-items: center;
        color: #656567;
        @include if-lessThan-768px{
          font-size: 12px;
        }
      }
      .delivery__grid{
        display: grid;
        height: 65vh;
        grid-template-columns: 3fr 2fr 2fr;
        grid-gap: 25px;
        margin-top: 20px;
        @include if-lessThan-768px{
          grid-template-columns: 1fr;
          grid-gap: 5px;
          height: 100%;
        }
        .delivery__details{
          h1{
            padding-bottom: -5px;
            font-weight: bold;
            color: #ff8a00;
            font-size: 27px;
            position: relative;
            z-index: 1;
            @include if-lessThan-768px{
              font-size: 20px;
            }
            &::after{
              position: absolute;
              content: ' ';
              width: 8em;
              height: 7px;
              background: #e9e9ec;
              left: 0;
              z-index: -1;
              bottom: 2px;
            }
          }
        }
        .delivery__dropship{
          .checkbox{
            display: flex;
            padding: 7px;
            align-items: center;
            justify-content: flex-end;
            color: #656567;
            @include if-lessThan-768px{
              font-size: 15px;
            }
            :checked > div{
              display: block;
            }
           label{
             position: relative;
              span{
                position: absolute;
                width: 18px;
                height: 18px;
                border: 1px solid #1BD97B;
                top: 0;
                left: -25px;
                cursor: pointer;
                div{
                  position: absolute;
                  left: 5px;
                  content: ' ';
                  top: 2px;
                  width: 6px;
                  height: 10px;
                  border: solid #1BD97B;
                  border-width: 0 2px 2px 0;
                  -webkit-transform: rotate(45deg);
                  -ms-transform: rotate(45deg);
                  transform: rotate(45deg);
                }
              }
           }
          }
        }
        .delivery__summary{
          height: 100%;
          border-left: 2px solid #fff3e5;
          padding-left: 20px;
        }
      }
      .delivery__input{
        margin-top: 25px;
        width: 100%;
        .group{
          width: 100%;
          height: 60px;
          margin-bottom: 15px;
          border: 1px solid #b8b7ba;
          padding: 10px;
          position: relative;
          p{
            font-size: 12px;
            margin-top: -10px;
          }
          input{
            padding:10px 10px 10px 5px;
            width: 100%;
            border: none;
            font-size: 16px;
            &:focus{
               outline: none;
            }
            &:focus ~ label, &:valid ~ label {
              font-size: 12px;
              top: 5px;
            }
          }
          label{
            position: absolute;
            pointer-events: none;
            top: 20px;
            left: 10px;
            color: #999;
            font-size: 15px;
            transition: all 0.4s ease;
          }
        }

        .text-area{
          width: 100%; 
          height: 130px;
          border: 1px solid #b8b7ba;
          position: relative;
          textarea{
            font-size: 16px;
            padding: 10px 20px 10px 10px;
            width: 100%;
            height: 100%;
            border: none;
            resize: none;
            outline: none;
            &::focus{
              outline: none;
            }
            &::placeholder{
              color: #999;
              font-size: 15px;
            }
          }
          p{
            color: #000;
            position: absolute;
            bottom: 2px;
            right: 2px;
            font-size: 12px;
            &:nth-child(odd){
              left: 10px;
            }
          }
        }
  
        .valid{
          border: 1px solid #a7edc3;
          position: relative;
          &::after{
            content: ' ';
            position: absolute;
            top: 25px;
            right: 10px;
            width: 10px;
            height: 5px;
            border-left: 2px solid #25df8b;
            border-bottom: 2px solid #25df8b;
            transform: rotate(-45deg);
          }
          label{
            color: #25df8b;
          }
        }
        .invalid{
          border: 1px solid #ff943f;
          position: relative;
          &::after{
            content: 'x';
            position: absolute;
            top: 20px;
            right: 10px;
            width: 10px;
            height: 10px;
            color: #ff943f;
          }
          label{
            color: #ff943f;
          }
        }

      }
    }
  </style>