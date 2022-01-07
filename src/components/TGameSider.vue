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
/*eslint-disable*/
import { computed, defineComponent, h, ref } from 'vue'
import { NLayoutSider, NMenu } from 'naive-ui'
import TGameSiderItem from '@/components/TGameSiderItem.vue'
import useInitialize from '@/composables/useInitialize'
import useIcon from '@/composables/useIcon'

function renderLabel(research) {
  return () => h(TGameSiderItem, { research });
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
            key: science.label,
            icon: renderIcon(science.icon),
          }))
        );
      sidebar.push({
        key: 'divider-1',
        type: 'divider',
      });
      //todo THIS IS redundant
      personList
        .filter(person => person.isUnlocked)
        .forEach(person => person.engineeringList
          .filter(engineering => engineering.isUnlocked)
          .forEach(engineering => sidebar.push({
            label: renderLabel(engineering),
            key: engineering.label,
            icon: renderIcon(engineering.icon),
          }))
        );
      sidebar.push({
        key: 'divider-2',
        type: 'divider',
      });
      personList
        .filter(person => person.isUnlocked)
        .forEach(person => person.deviceList
          .filter(device => device.isUnlocked)
          .forEach(device => sidebar.push({
            label: renderLabel(device),
            key: device.label,
            icon: renderIcon(device.icon),
          }))
        );

      return sidebar;
    });

    return {
      collapsed: ref(collapsed),
      sidebar,
      TGameSiderItem,
    }
  },
})
</script>