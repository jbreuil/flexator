<script setup lang="ts">
import { useStorage } from '@vueuse/core'

const { empty, test } = usePreset()

const save = useStorage('flexator', { block: empty() })
const root = reactive({ block: empty() })

if (save.value.block !== empty())
  root.block = save.value.block

watchDeep(() => root, (newValue) => {
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
        command: () => root.block = empty(),
      },
      {
        label: 'Admin panel',
        command: () => root.block = test(),
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
        v-model="root.block"
        class="flex !h-90vh !w-100%"
      />
    </ClientOnly>
    <div class="align-center mt-2 flex justify-center">
      BREUIL Julien
      <a href="https://github.com/jbreuil"><span class="i-ph-github-logo ml-2 text-white" /></a>
    </div>
  </div>
</template>
