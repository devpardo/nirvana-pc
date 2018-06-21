<template lang="html">
  <div>
    <div v-for="(item, index) in tasks">
      <p class="task-name"><span class="fa">{{ thumb }}</span>{{ item.task_cate_name }}</p>
      <div class="list dl" v-for="quest in item.quests">
        <div class="coupon hand" @click="toggleFold(quest)">
          <span class="dl"><img :src="quest.image_url" width="100%" height="100%"></span>
          <span class="title dl">
            <p class="h5">{{quest.name}}</p>
            <p class="h6">奖励：{{quest.desc}}</p>
            <p class="coupon-info hand"><span class="fa">{{exclamation}}</span>点击查看此任务进度</p>
          </span>
        </div>
        <div class="content" v-if="quest.$unfold">
          <p>任务进度:</p>
          <ul v-if="quest.schedules && quest.schedules.length">
            <span v-for="schedule in quest.schedules">
              <li v-if="schedule.finished">{{schedule.text}}<span class="check-blue fa">{{ check }}</span></li>
              <li v-else class="color-grey">{{schedule.text}}<span class="check-grey fa">{{ check }}</span></li>
            </span>
          </ul>
          <ul class="none" v-else-if="!loading">
            无
          </ul>
          <loading :loading="loading" v-else-if="loading"></loading>
        </div>
        <div class="footer">
          <p @click="taskMakeProcess(quest)" class="button orange hand" v-if="quest.status === 'status_created'">开始任务</p>
          <p class="button gray hand" v-if="quest.status === 'status_processing'">{{quest.percent}}%</p>
          <p @click="taskMakeReceived(quest)" class="button red hand" v-if="quest.status === 'status_completed'">领取奖励</p>
          <p class="button gray hand" v-if="quest.status === 'status_received'">已领取</p>
        </div>
      </div>
    </div>
    <loading :loading="!tasks.length" v-if="!tasks.length"></loading>
    <award :award="award" v-if="award.flag"></award>
  </div>
</template>

<script>
import Loading from "@/components/Shared/Loading.vue";
import Award from "@/components/Task/TaskAward.vue";

export default {
  data() {
    return {
      check: this.$fontawesome("check-circle-o"),
      exclamation: this.$fontawesome("exclamation-circle"),
      thumb: this.$fontawesome("thumb-tack"),
      loading: true,
      tasks: [],
      award: {
        flag: false,
        privileges: []
      }
    };
  },
  components: { Loading, Award },
  mounted() {
    this.getTasks();
  },
  methods: {
    getTasks() {
      this.api.getTasks().then((res) => {
        this.tasks = res.data.items || [];
      });
    },
    toggleFold(quest) {
      this.$set(quest, "$unfold", !quest.$unfold);
      if (!quest.schedules) {
        this.$set(quest, "schedules", {});
      }
      if (quest.$unfold) {
        this.getTask(quest);
      }
    },
    getTask(quest) {
      this.loading = true;
      this.api.getTask(quest.id, {klass_name: quest.klass_name}).then(res => {
        this.loading = false;
        Object.assign(quest, res.data);
      }).catch(() => {
        this.loading = false;
      });
    },
    taskMakeProcess(quest) {
      if (quest._isQuestProcess) {
        return;
      }
      quest._isQuestProcess = true;
      this.api.postTaskMakeProcess(quest.id, {klass_name: quest.klass_name}).then(res => {
        Object.assign(quest, res.data);
        // quest.klass_name = 'Quest'
        this.getTask(quest);
      }).catch(() => {
        quest._isQuestProcess = false;
      });
    },
    taskMakeReceived(quest) {
      this.award.flag = true;
      this.api.postTaskMakeReceived(quest.id, {klass_name: quest.klass_name}).then(res => {
        // Object.assign(quest, res.data)
        this.award.privileges = res.data.items;
        this.getTask(quest);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

ul, li {
  list-style: decimal;
  margin: 0px;
}
ul {
  padding: 10px;
}
li {
  padding-bottom: 10px;
}
.task-name {
  color: $color-yellow13;
  font-weight: bold;
  font-size: $font-h4;
  padding-bottom: 15px;
  .fa {
    padding-right: 5px;
    font-size: $font-h4;
  }
}
.list {
  width: 300px;
  margin-bottom: 20px;
  margin-right: 15px;
  background-color: $color-blue8;
  margin-bottom: 20px;
  padding-bottom: 20px;
  vertical-align: top;
  border: $px solid $color-yellow13;
  position: relative;
  &:after {
    position: absolute;
    top: -2.2px;
    right: -7px;
    content: '';
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid $color-yellow13;
    transform: rotate(45deg);
  }
}
.coupon {
  padding-bottom: 10px;
  border-bottom: $px solid $color-yellow13;
  padding: 20px;
  .coupon-info {
    color: $color-yellow13;
    padding-top: 5px;
    .fa {
      padding-right: 5px;
    }
  }
  img {
    width: 36px;
    height: 36px;
    border-radius: 5px;
  }
  .title {
    vertical-align: top;
    padding-left: 10px;
    width: 82%;
    text-align: justify;
  }
  .h5 {
    color: $color-yellow13;
    font-size: $font-h4;
    font-weight: bold;
    padding-bottom: 5px;
  }
  .h6 {
    color: $color-white;
  }
}
.content {
  color: $color-white;
  padding: 10px 20px;
  .none {
    color: $color-white;
  }
  .check-blue {
    color: $color-blue1;
    padding-left: 10px;
    font-size: $font-h4;
  }
  .check-grey {
    color: $color-gray3;
    padding-left: 10px;
    font-size: $font-h4;
  }
  .color-grey {
    color: $color-gray3;
  }
}
.footer {
  height: 40px;
  width: 100%;
  padding: 15px 20px;
  .button {
    width: 150px;
    margin: 0 auto;
    @include line-height(30px);
    @include spacing(2px);
    text-align: center;
    border-radius: 20px;
    color: $color-blue8;
  }
  .gray {
    background-color: $color-gray7;
  }
  .orange {
    background-color: $color-yellow13;
  }
  .red {
    background-color: $color-red9;
  }
}
</style>
