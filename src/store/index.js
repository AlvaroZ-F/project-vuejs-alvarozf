import Vue from "vue";
import Vuex from "vuex";

import service from "@/services/serviceWeather.js";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        weather: {},
        dataIsReceived: false
    },
    mutations: {
        UPDATE_WEATHER(state) {
            service
                .getWeather()
                .then(response => {
                    state.weather = response.data.data[0];
                    state.dataIsReceived = true;
                    console.log(response);
                })
                .catch(error => {
                    console.log("There was an error: ", error.response);
                    state.dataIsReceived = false;
                }
            );
        }
    },
    actions: {
        updateWeather(context) {
            context.commit("UPDATE_WEATHER");
        }
    },
  modules: {}
});
