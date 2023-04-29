<template>
  <a-tabs v-model:activeKey="activeKey" centered>
    <a-tab-pane key="1" tab="Task 1">
      <Map />
    </a-tab-pane>
    <a-tab-pane key="2" tab="Task 2" force-render>
      <Table />
    </a-tab-pane>
    <a-tab-pane key="3" tab="Task 3">
      <Chart />
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import { ref } from "vue";

import Map from "@/components/Map.vue";
import Table from "@/components/Table.vue";
import Chart from "@/components/Chart.vue";

export default {
  name: "App",
  data() {
    return {
      activeKey: ref("1"),
    };
  },
  components: {
    Table,
    Map,
    Chart,
  },
};
</script>

<style lang="scss">
#app {
  font-family: "Nunito";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
