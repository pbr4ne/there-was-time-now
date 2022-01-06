<template>
  <n-layout-sider
    bordered
    show-trigger
    collapse-mode="width"
    :collapsed-width="64"
    :collapsed="collapsed"
    :width="240"
    :native-scrollbar="false"
    @collapse="collapsed = true"
    @expand="collapsed = false" 
  >
    <n-menu
      :collapsed="collapsed"
      :collapsed-width="64"
      :collapsed-icon-size="32"
      :icon-size="32"
      :options="sidebar"
    />
  </n-layout-sider>
</template>

<script>
import { computed, defineComponent, h, ref } from 'vue'
import { NLayoutSider, NMenu } from 'naive-ui'
import TMenuItem from './TMenuItem.vue'
import useInitialize from '../composables/useInitialize'
import useIcon from '../composables/useIcon'

function renderLabel(science) {
  return () => h(TMenuItem, { science });
}

export default defineComponent({
  components: {
    NLayoutSider,
    NMenu,
  },
  setup() {
    const { personList } = useInitialize();
    const { renderIcon } = useIcon();

    //initially collapse the sider for smol windows
    let collapsed = window.innerWidth < 700;

    const sidebar = computed(() => {
      const sidebar = [];
      personList
        .filter(person => person.isUnlocked)
        .forEach(person => person.scienceList
          .filter(science => science.isUnlocked)
          .forEach(science => sidebar.push({
            label: renderLabel(science),
            key: science.key,
            icon: renderIcon(science.icon),
          }))
        );
      sidebar.push({
        key: 'divider-1',
        type: 'divider',
      });
      return sidebar;
    });

    return {
      collapsed: ref(collapsed),
      sidebar,
      TMenuItem,
    }
  },
})
</script>