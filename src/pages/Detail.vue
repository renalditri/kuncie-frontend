<script>
export default {
  data() {
    return {
      class_id: this.$route.params.id,
      class_data: { mentors: [{ id: 1, name: "asd" }] },
      attendeeFullName: "",
      attendeeEmail: "",
    };
  },
  methods: {
    async getClass() {
      try {
        const data = await fetch(
          `https://baee0c5d-15e7-45e2-ae1b-392ba74406a9.mock.pstmn.io/learning-class?id=${this.class_id}`
        );
        const json = await data.json();
        this.class_data = json;
      } catch (e) {
        console.error(e);
      }
    },
    async sendData() {
      const formData = new URLSearchParams({
        classId: parseInt(this.class_id),
        attendeeFullName: this.attendeeFullName,
        attendeeEmail: this.attendeeEmail,
      });
      try {
        const data = await fetch(
          "https://baee0c5d-15e7-45e2-ae1b-392ba74406a9.mock.pstmn.io/join-class",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formData,
          }
        );
        const json = await data.json();
        if (json.code != 200) {
          alert("Terjadi kesalahan saat mendaftarkan kelas");
        } else {
          alert("Kelas sukses terdaftar");
        }
      } catch (e) {
        console.error(e);
      }
    },
  },
  created() {
    this.getClass();
  },
};
</script>

<template>
  <header>
    <router-link to="/" class="back-icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        class="bi bi-arrow-left-circle"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
        />
      </svg>
    </router-link>
  </header>
  <main>
    <h3>{{ this.class_data.description }}</h3>
    <div
      :v-if="class_data.mentors"
      class="mentor"
      v-for="(item, index) in this.class_data.mentors"
      :key="index"
    >
      <h4>Mentor {{ index + 1 }}</h4>
      <p>{{ item.name }} - {{ item.description }}</p>
    </div>
    <div class="card">
      <label>Full name:</label><br />
      <input
        id="name_input"
        type="text"
        v-model="attendeeFullName"
        placeholder="Full name"
      /><br />
      <label>Email:</label><br />
      <input id="email_input" type="email" v-model="attendeeEmail" placeholder="Email" /><br />
      <button id="form_submit" @click="sendData">Submit</button>
    </div>
  </main>
</template>

<style>
@import "../assets/base.css";

.back-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
