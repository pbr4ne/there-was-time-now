<template>
  <n-menu
    :collapsed="collapsed"
    :collapsed-width="64"
    :collapsed-icon-size="32"
    :icon-size="32"
    :options="sidebar"
  />
</template>

<script>
import { computed, defineComponent, h } from 'vue'
import { NMenu } from 'naive-ui'
import TGameSiderItem from '@/components/TGameSiderItem.vue'
import useInitialize from '@/composables/useInitialize'
import useIcon from '@/composables/useIcon'

function renderLabel(research) {
  return () => h(TGameSiderItem, { research });
}

export default defineComponent({
  components: {
    NMenu,
  },
  props: {
    collapsed: {
      type: Boolean,
      required: true,
    },
  },
  setup() {
    const { personList, researchList } = useInitialize();
    const { renderIcon } = useIcon();

    //todo - make this better
    const sidebar = computed(() => {
      const sidebarData = [];
      const unlockedPersonList = Object.values(personList).filter(person => person.isUnlocked);
      const deviceGroup = [];
      const personGroup = [];

      unlockedPersonList.forEach(person => {
        const personResearchList = [];
        Object.values(researchList)
          .filter(research => research.isUnlocked && !research.isDevice && research.personKey == person.key)
          .forEach(research => personResearchList.push({
            label: renderLabel(research),
            key: research.label,
            icon: renderIcon(research.icon, research.color),
          }));
        Object.values(researchList)
          .filter(research => research.isUnlocked && research.isDevice && research.personKey == person.key)
          .forEach(research => deviceGroup.push({
            label: renderLabel(research),
            key: research.label,
            icon: renderIcon(research.icon, research.color),
          }));
        personGroup.push(personResearchList);
      });

      let i = 0;
      personGroup.forEach(personResearchList => {
        if(i > 0 && personResearchList.length > 0) {
          sidebarData.push({
            key: 'divider-' + i,
            type: 'divider',
          });
        }
        sidebarData.push(...personResearchList);
        i++;
      });

      if(deviceGroup.length > 0) {
        sidebarData.push({
          key: 'divider-device',
          type: 'divider',
        });
        sidebarData.push({
          key: 'devices',
          label: 'D E V I C E S'
        });
        sidebarData.push({
          key: 'divider-device2',
          type: 'divider',
        });
        sidebarData.push(...deviceGroup);
      }

      return sidebarData;
    });

    return {
      sidebar,
      TGameSiderItem,
    }
  },
})
</script>