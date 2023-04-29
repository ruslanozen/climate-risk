import { createStore } from "vuex";

import { read, utils } from "xlsx";

export default createStore({
  state: {
    locations: [],
    combinedLocations: null,
    locationNames: [],
  },
  getters: {
    locations(state) {
      return state.locations;
    },
    combinedLocations(state) {
      return state.combinedLocations;
    },
    locationNames(state) {
      return state.locationNames;
    },
  },
  mutations: {
    SET_LOCATIONS(state, locations) {
      state.locations = locations;
    },
    SET_COMBINED(state, combinedLocations) {
      state.combinedLocations = combinedLocations;
    },
    SET_NAMES(state, locationNames) {
      state.locationNames = locationNames;
    },
  },
  actions: {
    async getClimateData(context) {
      try {
        const f = await fetch(
          "https://docs.google.com/spreadsheets/d/1Y_yiT-_7IimioBvcqiCPwLzTLazfdRyzZ4k3cpQXiAw/edit#gid=681415175"
        );
        const ab = await f.arrayBuffer();
        const wb = read(ab);

        let res = utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
        res.shift();
        context.commit("SET_LOCATIONS", res);
      } catch (error) {
        console.log(error.message);
      }
    },
    sumLocations(context) {
      let locations = this.state.locations;
      let namesArr = [];

      // Use reduce() method to combine the data by place
      const combinedData = locations.reduce((acc, obj) => {
        const place = obj.A;

        // Check if the place already exists in the accumulator object
        if (!acc[place]) {
          // If the place doesn't exist, create a new array with the object as the first element
          acc[place] = [obj];
          namesArr.push(place);
        } else {
          // If the place exists, push the object to the array
          acc[place].push(obj);
        }
        return acc;
      }, {});

      context.commit("SET_COMBINED", combinedData);
      context.commit("SET_NAMES", namesArr);
    },
  },
  modules: {},
});
