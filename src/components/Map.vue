<template>
  <!-- year selection start -->
  <div class="year-select">
    <a-select
      class="select"
      v-model:value="selected_year"
      placeholder="Select a year"
      type="select"
      name="select"
      :options="years"
    ></a-select>
  </div>
  <!-- year selection end -->

  <!-- map section start  -->
  <GoogleMap
    api-key="API_KEY"
    style="width: 100%; height: 500px; border-radius: 8px; overflow: hidden"
    :center="center"
    :zoom="3"
  >
    <Marker
      v-for="position in selected_info"
      :key="position.A"
      :options="{
        position: { lat: position.B, lng: position.C },
        icon: getColor(position.E),
      }"
    >
      <InfoWindow>
        <div class="row">
          <div class="key">Asset Name:</div>
          <div class="value">{{ position.A }}</div>
        </div>
        <div class="row">
          <div class="key">Business category:</div>
          <div class="value">{{ position.D }}</div>
        </div>
        <div class="row">
          <div class="key">Risk rating:</div>
          <div class="value">{{ position.E }}</div>
        </div>
        <div class="row">
          <div class="key">Risk factors:</div>
          <div
            v-for="(value, key) in JSON.parse(position.F)"
            :key="key"
            class="factors"
          >
            <div class="row">
              <div class="key">{{ key }}:</div>
              <div class="value">
                {{ value }}
              </div>
            </div>
          </div>
        </div>
      </InfoWindow>
    </Marker>
  </GoogleMap>
  <!-- map section end -->

  <!-- description start -->
  <div class="description">
    <h3 class="mt-4">Description</h3>
    <p class="mt-3">
      <strong>Select a year </strong> to see locations with risk indicators
    </p>
    <div class="col mt-3">
      <div class="row">
        <img :src="red" alt="red-map-marker" />
        <span>Appears when risk is <strong>bigger</strong> than 0.8</span>
      </div>
      <div class="row">
        <img :src="orange" alt="orange-map-marker" />
        <span>Appears when risk is <strong>bigger</strong> than 0.5</span>
      </div>
      <div class="row">
        <img :src="blue" alt="blue-map-marker" />
        <span>Appears when risk is <strong>smaller</strong> than 0.5</span>
      </div>
    </div>
  </div>
  <!-- description end -->
</template>

<script>
import { GoogleMap, Marker, InfoWindow } from "vue3-google-map";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "map-comp",
  data() {
    return {
      years: [
        {
          value: 2030,
          label: 2030,
        },
        {
          value: 2040,
          label: 2040,
        },
        {
          value: 2050,
          label: 2050,
        },
        {
          value: 2060,
          label: 2060,
        },
        {
          value: 2070,
          label: 2070,
        },
      ],
      selected_year: null,
      selected_info: [],
      iconColor: null,
      red: require("@/assets/map-marker-red.svg"),
      orange: require("@/assets/map-marker-yellow.svg"),
      blue: require("@/assets/map-marker-green.svg"),
    };
  },
  components: { GoogleMap, Marker, InfoWindow },
  computed: {
    ...mapGetters(["locations"]),
  },
  watch: {
    selected_year: function () {
      this.filterYear(this.selected_year);
    },
  },
  methods: {
    ...mapActions(["getClimateData", "getColor", "filterYear"]),
    filterYear(year) {
      for (let x = 0; x < this.locations.length; x++) {
        if (this.locations[x].G == year) {
          this.selected_info.push(this.locations[x]);
        }
      }
    },
    getColor(risk) {
      if (risk > 0.8) return (this.iconColor = this.red);
      else if (risk > 0.5) return (this.iconColor = this.orange);
      else return (this.iconColor = this.blue);
    },
  },
  created() {
    this.getClimateData();
  },
  setup() {
    const center = { lat: 55, lng: 270 };

    const markers = [];
    const currentPlace = null;

    return { center, markers, currentPlace };
  },
};
</script>

<style lang="scss" scoped>
.year-select {
  margin: 2rem;
  .select {
    width: 100% !important;
  }
}
.col {
  .row {
    margin-top: 1rem;
  }
}
.row {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  .key {
    color: tomato;
    font-weight: 600;
  }
  .factors {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    .key {
      color: darkgray;
      font-weight: 500;
    }
  }
  img {
    width: 40px;
    height: 40px;
  }
}
</style>
