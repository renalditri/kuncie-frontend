<script>
export default {
  data() {
    return {
      classes: [{ id: 1, name: "contoh" }],
      classesFilter: [{ id: 1, name: "contoh" }],
    };
  },
  methods: {
    async getClasses() {
      try {
        const data = await fetch(
          "https://baee0c5d-15e7-45e2-ae1b-392ba74406a9.mock.pstmn.io/available-classes"
        );
        const json = await data.json();
        this.classes = json.items;
        this.classesFilter = json.items;
      } catch (e) {
        console.error(e);
      }
    },
    updateSearch(e) {
      this.classesFilter = this.classes.filter((item) => {
        if (
          item.name
            .toLowerCase()
            .trim()
            .includes(e.target.value.toLowerCase().trim())
        ) {
          return true;
        }
        return false;
      });
    },
  },
  created() {
    this.getClasses();
  },
};
</script>

<template>
  <header>
    <nav>
      <input
        id="search"
        class="search"
        type="text"
        v-model="attendeeFullName"
        @change="updateSearch"
        placeholder="Search"
      />
    </nav>
  </header>
  <main>
    <h2>Daftar Kelas</h2>
    <div class="card-wrapper">
      <router-link
        v-for="(item, index) in this.classesFilter"
        :id="'card-' + item.id"
        :key="index"
        :to="'/detail/' + item.id"
        class="card"
      >
        {{ item.id }}. {{ item.name }}
      </router-link>
    </div>
  </main>
</template>

<style>
@import "../assets/base.css";
.card {
  display: block;
  padding: 0.5rem 1rem;
  border: solid 1px black;
  border-radius: 10px;
  margin-bottom: 0.75rem;
}
</style>
