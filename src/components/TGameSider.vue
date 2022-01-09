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

    //todo - make this better
    const sidebar = computed(() => {
      const sidebar = [];
      const unlockedPersonList = Object.values(personList).filter(person => person.isUnlocked);
      const scienceGroup = [];
      const engineeringGroup = [];
      const deviceGroup = [];

      unlockedPersonList.forEach(person => person.scienceList
          .filter(science => science.isUnlocked)
          .forEach(science => scienceGroup.push({
            label: renderLabel(science),
            key: science.label,
            icon: renderIcon(science.icon, science.color),
          }))
        );

      sidebar.push(...scienceGroup);
      
      unlockedPersonList.forEach(person => person.engineeringList
          .filter(engineering => engineering.isUnlocked)
          .forEach(engineering => engineeringGroup.push({
            label: renderLabel(engineering),
            key: engineering.label,
            icon: renderIcon(engineering.icon, engineering.color),
          }))
        );
      
      if(engineeringGroup.length > 0) {
        sidebar.push({
          key: 'divider-1',
          type: 'divider',
        });
        sidebar.push(...engineeringGroup);
      }

      unlockedPersonList.forEach(person => person.deviceList
          .filter(device => device.isUnlocked)
          .forEach(device => deviceGroup.push({
            label: renderLabel(device),
            key: device.label,
            icon: renderIcon(device.icon, device.color),
          }))
        );
      
      if(deviceGroup.length > 0) {
        sidebar.push({
          key: 'divider-2',
          type: 'divider',
        });
        sidebar.push(...deviceGroup);
      }

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