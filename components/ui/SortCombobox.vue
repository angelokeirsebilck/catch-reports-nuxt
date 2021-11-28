<template>
  <div>
    <v-select
      v-model.trim="value"
      :label="label"
      :items="items"
      outlined
      hide-details=""
      @change="changeValue"
    >
      <template v-slot:selection="{ item }">
        <div class="">
          <span>{{ item.text }}</span>

          <v-icon :size="iconSize" class="ps-2" color="primary">
            {{ item.icon }}
          </v-icon>
        </div>
      </template>
      <template v-slot:item="{ item }">
        <div class="py-2">
          <span>{{ item.text }}</span>

          <v-icon :size="iconSize" class="ps-2" color="primary">
            {{ item.icon }}
          </v-icon>
        </div>
      </template>
    </v-select>
  </div>
</template>

<script>
export default {
  emits: ['change-value'],
  props: {
    label: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      value: this.items[0],
      iconSize: 30,
    }
  },
  methods: {
    changeValue() {
      this.$emit('change-value', this.value)
    },
  },
}
</script>
