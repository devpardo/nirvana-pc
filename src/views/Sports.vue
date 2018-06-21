<template>
  <div class="sportspage">
    <div class="container">
      <div class="sportcontent">
        <iframe id="frame"
          v-if="loaded"
          :src="iframe.src"
          type="web"
          frameborder="0"
          style="background: #fff"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Login from "@/components/Shared/Login.vue";
import { mapGetters } from "vuex";
export default {
  name: "PageSports",
  components: {
    Login
  },
  data() {
    return {
      loaded: false,
      iframe: {
        src: null,
        style: null,
        wrapperStyle: null
      }
    }
  },
  async created() {

  },
  async mounted() {
    try {
      await this.$store.dispatch("getAuth");
    } catch (error) {
      console.log(error)
    }

    if(!this.auth) {
      this.$store.dispatch("setLoginFlag", true);
      this.$router.push({name: "Home"});
      return
    }
    let editor = this.$refs.editor;
    this.loaded = true;
    await this.fetchUrl();
  },
  computed: {
    ...mapGetters(["auth"]),
    loginFlag: function() {
      return this.$store.state.sundry.loginFlag;
    }
  },
  methods: {
    async fetchUrl() {
      const res = await this.api.launchSportsBook();
      console.log(res.data.launch_url);
      this.iframe.src = res.data.launch_url
    },
    login() {
      this.$store.dispatch("setLoginFlag", !this.loginFlag);
      this.enter.register = false;
      this.enter.login = true;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/stylesheets/public';

  .sportspage{
    background-image: url('../assets/images/sports-bg.jpg');
    background-position: center;
    background-size: cover;
    width: 100%;
    height: 800px;
    margin-top: 95px;
    .container {
      width: 1200px;
      display: block;
      height: auto;
      margin: 0 auto;
    }

    #frame {
      margin-top: 80px;
      height: 600px;
      width: 100%;
    }
  }

  @media(max-width: 1024px){
    .sportspage{
      width: 1280px;
    }
  }
</style>
