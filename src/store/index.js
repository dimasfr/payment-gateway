import { createStore } from 'vuex'

const store = createStore({
  state: {
    formDelivery : {
      delivery_name: null,
      delivery_email: null,
      delivery_phone: null,
      delivery_address: null,
      delivery_dropshiper_status: false,
      delivery_dropshiper_name: null,
      delivery_dropshiper_phone: null,
    },
    formValid: {
      delivery_email: null,
      delivery_phone: null,
      delivery_address: null,
      delivery_address_length: 0,
      delivery_dropshiper_phone: null,
    },
    formPayment: {
      payment_estimations: ['today', '2 days', '1 day'],
      payment_couriers: ['GO-SEND', 'JNE', 'Personal Courier'],
      payment_prices: [15000, 9000, 29000],
      payment_saldos: [1500000, 0, 0],
      payment_method: ['e-Wallet', 'Bank Transfer', 'Virtual Account'],
      payment_chosen_estimation: 0,
      payment_chosen_courier: 0,
      payment_chosen_prices: 0,
      payment_chosen_method: 0,
    },
    formSummary: {
      summary_purchased: 10,
      summary_cost: 500000,
      summary_dropfee: 5900,
      summary_total: 500000,
      summary_label_price: '',
      label_estimation : null,
      label_method : null,
      label_button : 'Continue to payment',
      label_order : '',
      button_to : 'payment',
      button_visibility : true,
    },
    activeLink: {
      delivery: true,
      payment: false,
      finish: false
    }
   },
  mutations: {
    SET_FORM_DELIVERY (state, payload) {
      state.formDelivery = payload;
    },
    SET_FORM_VALID (state, payload) {
      state.formValid = payload;
    },
    SET_FORM_PAYMENT (state, payload) {
      state.formPayment = payload;
    },
    SET_FORM_SUMMARY (state, payload) {
      state.formSummary = payload;
    },
    SET_ACTIVE_LINK (state, payload) {
      state.activeLink = payload;
    },
    RESET_STATE (state, payload) {
      Object.assign(state, payload);
      localStorage.removeItem('vuex_state');
    }
  },
  actions: {
    saveStateToLocalStorage({ state }) {
      const serializedState = JSON.stringify(state);

      localStorage.setItem('vuex_state', serializedState);
    },
    restoreStateFromLocalStorage({ commit }) {
      const serializedState = localStorage.getItem('vuex_state');

      if (serializedState) {
        const parsedState = JSON.parse(serializedState);
        commit('SET_FORM_DELIVERY', parsedState.formDelivery);
        commit('SET_FORM_VALID', parsedState.formValid);
        commit('SET_FORM_PAYMENT',parsedState.formPayment);
        commit('SET_FORM_SUMMARY',parsedState.formSummary);
        commit('SET_ACTIVE_LINK',parsedState.activeLink);
      }
    },
  }
})


export default store;