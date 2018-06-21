<template>
  <notice-modal v-model="modal"></notice-modal>
</template>

<script>
  import NoticeModal from "@/components/Shared/NoticeModal.vue";
  export default {
    name: "Notice",
    components: {
      NoticeModal
    },
    data() {
      return {
        modal: true
      };
    }
  };
</script>


