export default {
  data() {
    return {
      paginateMeta: {},
      loading: false,
      items: [],
      data: null
    };
  },
  methods: {
    beforeFetch() {
      this.items = [];
      this.loading = true;
    },
    fetchData() {},
    _fetchData(promise) {
      this.beforeFetch();
      promise.then((res) => {
        this.afterFetch(res.data);
      }).catch(() => {
        this.loading = false;
      });
    },
    afterFetch(data) {
      this.loading = false;
      this.paginateMeta = data.paginate_meta;
      this.data = data;
      this.items = data.items;
    }
  },
  watch: {
    "$route": ["fetchData"]
  },
  mounted() {
    this.fetchData();
  }
};
