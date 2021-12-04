<template>
  <NuxtLink v-if="nuxtLink" nuxt :to="to">
    <v-hover v-slot="{ hover }">
      <div @click="clickHandler" :class="[defaultBtnClass, btnClass]">
        <v-icon
          v-if="icon && iconPos == 'left'"
          :size="iconSize"
          :color="hover ? iconHoverColor : iconColor"
        >
          {{ icon }}
        </v-icon>
        <span
          :class="[
            labelSpacingClass,
            hover ? nuxtLabelHoverClass : nuxtLabelClass,
            defaultLabelClass,
          ]"
          >{{ label }}</span
        >
        <v-icon
          v-if="icon && iconPos == 'right'"
          :size="iconSize"
          :color="hover ? iconHoverColor : iconColor"
        >
          {{ icon }}
        </v-icon>
      </div>
    </v-hover>
  </NuxtLink>
  <button v-else class="h-full">
    <v-hover v-slot="{ hover }">
      <div @click="clickHandler" :class="[btnClass, defaultBtnClass]">
        <v-icon
          v-if="icon && iconPos == 'left'"
          :size="iconSize"
          :color="hover ? iconHoverColor : iconColor"
        >
          {{ icon }}
        </v-icon>
        <span :class="[labelSpacingClass, labelClass, defaultLabelClass]">{{
          label
        }}</span>
        <v-icon
          v-if="icon && iconPos == 'right'"
          :size="iconSize"
          :color="hover ? iconHoverColor : iconColor"
        >
          {{ icon }}
        </v-icon>
      </div>
    </v-hover>
  </button>
</template>

<script>
export default {
  emits: ['click-handler'],
  props: {
    nuxtLink: {
      type: Boolean,
      default: false,
    },
    to: {
      type: String,
      default: '/',
    },
    icon: {
      type: String,
      default: null,
    },
    iconPos: {
      type: String,
      validator: (val) => ['right', 'left'].includes(val),
      default: 'left',
    },
    label: {
      type: String,
      required: true,
    },
    btnStyle: {
      type: String,
      validator: (val) => ['primary', 'primary-outline'].includes(val),
      default: 'primary',
    },
  },
  data() {
    return {
      iconSize: 30,
      defaultBtnClass:
        'cursor-pointer flex items-center justify-center px-3 py-1 group text-btn transition-colors',
      defaultLabelClass: 'font-medium transition-colors',
    }
  },
  computed: {
    labelSpacingClass() {
      if (this.icon && this.iconPos == 'left') {
        return 'ps-2'
      } else if (this.icon && this.iconPos == 'right') {
        return 'pe-2'
      }
      return ''
    },
    labelClass() {
      if (this.btnStyle == 'primary-outline') {
        return 'text-primary-default group-hover:text-white'
      } else if (this.btnStyle == 'primary') {
        return 'text-white group-hover:text-primary-default'
      }
    },
    btnClass() {
      if (this.btnStyle == 'primary-outline') {
        return 'border-2 border-primary-default hover:bg-primary-default'
      } else if (this.btnStyle == 'primary') {
        return 'border-2 border-primary-default bg-primary-default hover:bg-white'
      }
    },
    iconColor() {
      if (this.btnStyle == 'primary-outline') {
        return 'primary'
      } else if (this.btnStyle == 'primary') {
        return 'white'
      }
    },
    iconHoverColor() {
      if (this.btnStyle == 'primary-outline') {
        return 'white'
      } else if (this.btnStyle == 'primary') {
        return 'primary'
      }
    },
    nuxtLabelClass() {
      if (this.btnStyle == 'primary-outline') {
        return 'primary--text'
      } else if (this.btnStyle == 'primary') {
        return 'white--text'
      }
    },
    nuxtLabelHoverClass() {
      if (this.btnStyle == 'primary-outline') {
        return 'white--text'
      } else if (this.btnStyle == 'primary') {
        return 'primary--text'
      }
    },
  },

  methods: {
    clickHandler() {
      this.$emit('click-handler')
    },
  },
}
</script>
