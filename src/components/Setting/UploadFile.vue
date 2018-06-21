<template lang="html">
  <div class="mask-layer">
    <div class="upload-file">
      <p class="title">上传头像<span class="hand fr" @click="close()">+</span></p>
      <div class="content">
        <p class="img"><img v-if="image" :src="image" width="100%" height="100%"/></p>
        <p class="input hand" :class="{ 'disabled': disabled}">
           本地上传
           <input class="hand" :disabled="disabled" value="本地上传" type="file" accept='image/*' @change="fileSelected($event)"/>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["upload", "refresh"],
  data() {
    return {
      image: "",
      file: "",
      disabled: false
    };
  },
  mounted() {
    this.fetchProfile();
  },
  methods: {
    close() {
      this.upload.flag = false;
    },
    fetchProfile() {
      this.api.getProfile().then((res) => {
        this.image = res.data.aws_url;
      });
    },
    fileSelected(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      if (files.length === 1) {
        this.file = files[0];
        this.image = window.URL.createObjectURL(files[0]);
        this.uploadAvatar();
      } else {
        this.$message({
          message: "请上传一张头像",
          type: "info"
        });
        return;
      }
    },
    uploadAvatar() {
      if (!this.file) {
        this.$message({
          message: "请上传一张头像",
          type: "error"
        });
        return;
      }
      let message = this.$message({
        message: "图片上传中...",
        type: "info",
        duration: 0
      });
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      let fd = new FormData();
      fd.append("file", this.file);
      this.disabled = true;
      this.api.postUploadAvatar(fd, config).then(() => {
        this.fetchProfile();
        message.close();
        this.$message({
          message: "上传图片成功",
          type: "success"
        });
        this.close();
        this.refresh();
        this.disabled = false;
      }).catch((error) => {
        message.onClose();
        this.disabled = false;
        console.log(error);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.mask-layer {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2001;
}
.upload-file {
  position: absolute;
  width: 500px;
  top: 180px;
  left: 35%;
  background-color: $color-blue9;
  border-radius: 5px;
  padding-bottom: 25px;
  .title {
    width: 100%;
    @include line-height(50px);
    color: $color-white;
    font-size: $font-h4;
    padding: 0px 20px;
    font-weight: bold;
    background-color: $color-blue8;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    .fr {
      color: $color-white;
      font-weight: bold;
      font-size: $font-h;
      transform: rotate(45deg);
    }
  }
}
.content {
  .img {
    width: 122px;
    height: 122px;
    margin: 30px auto;
    img {
      border-radius: 50%;
    }
  }
  .disabled {
    opacity: 0.5;
  }
  .input {
    margin: 10px auto;
    width: 200px;
    text-align: center;
    font-size: $font-h4;
    color: $color-blue9;
    background-color: $color-yellow;
    border-radius: 25px;
    @include line-height(40px);
    position: relative;
    input {
      opacity: 0;
      position: absolute;
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
      width: 200px;
      height: 40px;
    }
  }
}
</style>
