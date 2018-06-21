export default {
  data() {
    return {
      q: {}
    };
  },
  watch: {
    "$route": ["fillData"]
  },
  methods: {
    fillData() {
      let q = {
        page: 1,
        per_page: 10
      };
      // full data from url query, if admin just refresh page, can not load q_xxx keys.
      for (let key in this.$route.query) {
        if (key.startsWith("q_")) {
          q[key] = this.$route.query[key];
        } else if (key.match(/page/)) {
          q[key] = parseInt(this.$route.query[key]);
          if (!q[key] && key === "page") {
            q[key] = 1;
          } else if (!q[key] && key === "per_page") {
            q[key] = 10;
          }
        } else {
          q[key] = this.$route.query[key];
        }
      }
      let q2 = {};
      this.searches && this.searches.forEach(item => {
        if (item.control && item.control.match("checkbox")) {
          if (this.$route.query[item.key] === "true") {
            q2[item.key] = true;
          } else if (this.$route.query[item.key] === "false") {
            q2[item.key] = false;
          } else {
            q2[item.key] = this.$route.query[item.key] || "";
          }
        } else if (item.control && item.control.match("range-date")) {
          if (this.$route.query[item.key1]) {
            q2[item.key] = [new Date(this.$route.query[item.key1]), new Date(this.$route.query[item.key2])];
          } else {
            q2[item.key] = [];
          }
        } else if (item.key.match(/_id_eq$/) && this.$route.query[item.key]) {
          q2[item.key] = parseInt(this.$route.query[item.key]);
        } else {
          q2[item.key] = this.$route.query[item.key];
        }
      });
      // console.log(q, q2)
      this.q = Object.assign(q, q2);
    }
  },
  mounted() {
    this.fillData();
  }
};
