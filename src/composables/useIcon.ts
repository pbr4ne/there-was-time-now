import { h, Component } from 'vue'
import { NIcon } from 'naive-ui'

export default function useIcon() {

  function renderIcon (icon: Component, color: string) {
    return () => h(NIcon, { color }, { default: () => h(icon) })
  }

  return {
    renderIcon,
  }
}