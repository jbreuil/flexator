<script setup lang="ts">
import { useStorage } from '@vueuse/core'
import { Block as BlockClass } from '~/objects/Block'

const save = useStorage<BlockClass>('flexator', BlockClass.resetRoot(), undefined, {
  serializer: {
    write: (v: any) => JSON.stringify(v),
    read: (v: any) => v
      ? JSON.parse(v, BlockClass.reviver)
      : null,
  },
})
const root = ref<BlockClass>(save.value)

watchDeep(() => root.value, (newValue) => {
  if (newValue !== null && newValue !== undefined)
    save.value = newValue
})

const { copy, isSupported } = useClipboard()
const toast = useToast()

const items = [
  {
    label: 'Reset',
    icon: 'i-material-symbols-refresh',
    command: () => root.value = BlockClass.resetRoot(),
  },
  {
    label: 'HTML to clipboard',
    icon: 'i-material-symbols-file-copy',
    command: async () => {
      const html = root.value.getHTML()
      await copy(html)
      toast.add({
        severity: 'success',
        summary: 'HTML copied',
        detail: 'The HTML has been copied to the clipboard',
        life: 3000,
      })
    },
    visible: () => isSupported.value,
  },
]
</script>

<template>
  <div>
    <ClientOnly>
      <Menubar class="mb-1 h-5vh min-h-5vh" :model="items">
        <template #start>
          <div class="mr-4 w-fit from-green via-blue to-pink from-10% to-90% bg-gradient-to-r bg-clip-text text-40px text-transparent font-title">
            FLEXATOR
          </div>
        </template>
      </Menubar>
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
