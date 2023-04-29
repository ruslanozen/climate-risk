<template>
  <div class="year-select">
    <a-select
      v-model:value="locationSelect"
      :options="locationOptions"
      placeholder="Select a location"
    >
    </a-select>
  </div>
  <a-card>
    <div class="chart">
      <canvas ref="chart"></canvas>
    </div>
  </a-card>
</template>

<script>
import Chart from "chart.js/auto";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "chart-comp",
  data() {
    return {
      chart: null,
      locationOptions: {
        label: null,
        value: null,
      },
      locationSelect: null,
      selectedLocation: null,
    };
  },
  created() {
    this.sumLocations();
    this.valuesLabelesCombine();
  },
  computed: {
    ...mapGetters(["locations", "combinedLocations", "locationNames"]),
    chartDataValues() {
      if (this.selectedLocation) {
        return this.selectedLocation.map((data) => data.E);
      } else {
        return null;
      }
    },
    chartDataLabels() {
      if (this.selectedLocation) {
        return this.selectedLocation.map((data) => data.G);
      } else {
        return null;
      }
    },
    chartLabel() {
      if (this.selectedLocation) {
        let label = [];
        label.push(this.selectedLocation.map((data) => data.A));
        return label[0][0];
      } else {
        return null;
      }
    },
  },
  mounted() {
    this.renderChart();
  },
  watch: {
    locationSelect: function () {
      this.chart.destroy();
      this.searchLocation();
      this.renderChart();
    },
  },
  methods: {
    ...mapActions(["sumLocations", "render"]),
    valuesLabelesCombine() {
      this.locationOptions = this.locationNames.map((item) => ({
        label: item,
        value: item,
      }));
    },
    renderChart() {
      const chartConfig = {
        type: "line",
        data: {
          labels: this.chartDataLabels,
          datasets: [
            {
              label: this.chartLabel,
              data: this.chartDataValues,
              backgroundColor: "rgba(54, 162, 235, 0.9)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          plugins: {
            tooltip: {
              callbacks: {
                label: (tooltipItem) => {
                  let dataIndex = tooltipItem.dataIndex;
                  let fData = this.$data.selectedLocation[dataIndex].F;
                  let keys = Object.keys(JSON.parse(fData));
                  let values = Object.values(JSON.parse(fData));
                  let res = [];
                  for (let x = 0; x < keys.length; x++) {
                    res.push(keys[x] + ": " + values[x]);
                  }
                  return res;
                },
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      };
      this.chart = new Chart(this.$refs.chart, chartConfig);
      return this.chart;
    },
    searchLocation() {
      for (let x in this.combinedLocations) {
        if (this.locationSelect == x) {
          this.selectedLocation = this.combinedLocations[x];
        }
      }
      this.selectedLocation.sort((a, b) => (a.G > b.G ? 1 : -1));
    },
  },
};
</script>

<style>
.chart {
  max-width: 600px;
  margin-inline: auto;
}
</style>
