<script setup lang="ts">
import { useStorage } from '@vueuse/core'
import { Block as BlockClass } from '~/objects/Block'

const { empty, adminPanel } = usePreset()

const save = useStorage<BlockClass>('flexator', empty(), undefined, {
  serializer: {
    write: (v: any) => JSON.stringify(v),
    read: (v: any) => v
      ? JSON.parse(v, (key, value) => {
        if (key === '') {
          return Object.assign(new BlockClass(0), value)
        }
        return value
      })
      : null,
  },
})
const root = ref<BlockClass>(save.value)

watchDeep(() => root.value, (newValue) => {
  if (newValue !== null && newValue !== undefined)
    save.value = newValue
})

const items = [
  {
    label: 'Presets',
    icon: 'i-material-symbols-auto-awesome-mosaic',
    items: [
      {
        label: 'Empty',
        command: () => root.value = empty(),
      },
      {
        label: 'Admin panel',
        command: () => root.value = adminPanel(),
      },
    ],
  },
]
</script>

<template>
  <div>
    <Menubar class="mb-1 h-5vh min-h-5vh" :model="items">
      <template #start>
        <div class="mr-4 w-fit from-green via-blue to-pink from-10% to-90% bg-gradient-to-r bg-clip-text text-40px text-transparent font-title">
          FLEXATOR
        </div>
      </template>
    </Menubar>
    <ClientOnly>
      <Block
        v-model="root"
        class="flex !h-90vh !w-100%"
      />
    </ClientOnly>
    <div class="align-center mt-2 flex justify-center">
      BREUIL Julien
      <a href="https://github.com/jbreuil"><span class="i-ph-github-logo ml-2 text-white" /></a>
    </div>
  </div>
</template>
