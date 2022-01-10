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
      const deviceGroup = [];
      const personGroup = [];

      unlockedPersonList.forEach(person => {
        const personResearchList = [];
        person.scienceList
          .filter(science => science.isUnlocked)
          .forEach(science => personResearchList.push({
            label: renderLabel(science),
            key: science.label,
            icon: renderIcon(science.icon, science.color),
          }));
        person.deviceList
          .filter(device => device.isUnlocked)
          .forEach(device => deviceGroup.push({
            label: renderLabel(device),
            key: device.label,
            icon: renderIcon(device.icon, device.color),
          }));
        personGroup.push(personResearchList);
      });

      let i = 0;
      personGroup.forEach(personResearchList => {
        if(i > 0 && personResearchList.length > 0) {
          sidebar.push({
            key: 'divider-' + i,
            type: 'divider',
          });
        }
        sidebar.push(...personResearchList);
        i++;
      });

      if(deviceGroup.length > 0) {
        sidebar.push({
          key: 'divider-device',
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