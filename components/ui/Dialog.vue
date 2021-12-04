<template>
  <v-dialog v-model="showDialogLocal" persistent max-width="450">
    <div class="p-2 bg-white rounded-none">
      <slot name="title"></slot>
      <slot name="body"></slot>

      <div class="flex mt-5">
        <div class="me-5">
          <slot name="decline-btn"></slot>
        </div>
        <slot name="accept-btn"></slot>
      </div>
    </div>
  </v-dialog>
</template>

<script>
export default {
  emits: ['accept-handler', 'decline-handler'],
  props: {
    showDialog: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  data() {
    return {
      showDialogLocal: this.showDialog,
    }
  },
  watch: {
    showDialog() {
      return (this.showDialogLocal = this.showDialog)
    },
  },
  methods: {
    decline() {
      this.$emit('decline-handler')
    },
    accept() {
      this.$emit('accept-handler')
    },
  },
}
</script>
