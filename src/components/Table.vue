<template>
  <a-input v-model="searchText"></a-input>
  <a-table
    v-if="searchText"
    class="table"
    :columns="columns"
    :data-source="filteredRows"
    :row-key="(record) => record.__EMPTY"
  >
    <template #expandedRowRender="{ record }">
      <div
        v-for="(value, key) in JSON.parse(record.F)"
        :key="key"
        class="expanded-row"
      >
        <p>
          {{ key }}:
          <a-tag :color="getColor(value)">
            {{ value }}
          </a-tag>
        </p>
      </div>
    </template>
    <template #E="{ record }">
      <a-tag :color="getColor(record.E)">{{ record.E }}</a-tag>
    </template>
  </a-table>
  <a-table
    v-else
    class="table"
    :columns="columns"
    :data-source="locations"
    :row-key="(record) => record.__EMPTY"
  >
    <template #expandedRowRender="{ record }">
      <div
        v-for="(value, key) in JSON.parse(record.F)"
        :key="key"
        class="expanded-row"
      >
        <p>
          {{ key }}:
          <a-tag :color="getColor(value)">
            {{ value }}
          </a-tag>
        </p>
      </div>
    </template>
    <template #E="{ record }">
      <a-tag :color="getColor(record.E)">{{ record.E }}</a-tag>
    </template>
  </a-table>
</template>
<script>
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
const columns = [
  {
    title: "Name",
    dataIndex: "A",
    key: "A",
    fixed: "left",
  },
  {
    title: "Business category",
    dataIndex: "D",
    key: "D",
  },
  {
    title: "Risk rating",
    dataIndex: "E",
    key: "E",
    slots: { customRender: "E" },
    sorter: {
      compare: (a, b) => a.E - b.E,
    },
  },
  {
    title: "Year",
    dataIndex: "G",
    key: "G",
    sorter: {
      compare: (a, b) => a.G - b.G,
      multiple: 3,
    },
    fixed: "right",
  },
];
export default defineComponent({
  name: "table-comp",
  setup() {
    return {
      columns,
    };
  },
  data() {
    return {
      searchText: null,
    };
  },
  watch: {
    searchText: function () {
      this.filteredRows();
    },
  },
  methods: {
    ...mapActions(["getClimateData"]),
    getColor(risk) {
      if (risk > 0.65) return "red";
      else if (risk > 0.2) return "orange";
      else return "green";
    },
    filteredRows() {
      return this.locations.filter((row) => {
        const name = row.A.toLowerCase();
        const b_category = row.D.toLowerCase();
        const risk = row.E;
        const searchTerm = this.searchText.toLowerCase();

        return (
          name.includes(searchTerm) ||
          b_category.includes(searchTerm) ||
          risk == searchTerm
        );
      });
    },
  },
  computed: {
    ...mapGetters(["locations"]),
  },
  created() {
    this.getClimateData();
  },
});
</script>

<style>
.ant-pagination {
  justify-content: center !important;
}
</style>
