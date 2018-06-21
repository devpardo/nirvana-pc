<template lang="html">
  <div>
    <div class="g-list-outer">
      <div class="g-list-inner">
        <ul class="g-list hand">
          <li v-for="item in images">
            <span class="g-img">
              <img :src="item.image_url" width="100%" height="100%"/>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["images"]
};
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.g-list-outer {
  position: relative;
  overflow: hidden;
  min-height: 250px;
  margin-top: 10px;
}
.g-list-inner {
  position: absolute;
  left: 0;
  right: 10px;
  overflow-x: scroll;
  overflow-y: hidden;
  border-bottom: $px solid $color-gray1;
  &::-webkit-scrollbar {
    display: none;
  }
}
.g-list {
  list-style: none;
  margin-left: -10px;
  padding-left: 0;
  white-space: nowrap;
  li {
    margin: 0px;
    list-style: none;
    display: inline-block;
    width: 403px;
    height: 250px;
    vertical-align: top;
    border-radius: 5px;
    background-color: $color-white;
    margin-right: 20px;
    img {
      border-radius: 0px;
    }
    .g-img { display: block; width: 100%; height: 100%}
  }
}
</style>
