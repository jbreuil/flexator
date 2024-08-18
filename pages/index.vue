<script setup lang="ts">
import { useStorage } from '@vueuse/core'
import type { TreeExpandedKeys, TreeSelectionKeys } from 'primevue/tree'
import type { TreeNode } from 'primevue/treenode'
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

const isExplorerVisible = ref(false)

const menuItems = [
  {
    label: 'Explorer',
    icon: 'i-material-symbols-menu',
    command: () => isExplorerVisible.value = !isExplorerVisible.value,
  },
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

const nodes = computed(() => {
  const nodes: TreeNode[] = []
  nodes.push(root.value.getNode())
  return nodes
})
const selectedKey = ref<TreeSelectionKeys | undefined>(undefined)
const selectedBlock = computed(() => {
  const keys = Object.keys(selectedKey.value || {})
  if (keys.length !== 1)
    return null

  const keyAsId = keys[0]
  const targetBlock = root.value.getBlockById(keyAsId)
  if (!targetBlock)
    return null

  return targetBlock
})
const expandedKeys = ref<TreeExpandedKeys>({})

function expandNode(node: TreeNode) {
  if (node.children && node.children.length) {
    expandedKeys.value[node.key] = true

    for (const child of node.children) {
      expandNode(child)
    }
  }
}
function expandAll() {
  for (const node of nodes.value) {
    expandNode(node)
  }

  expandedKeys.value = { ...expandedKeys.value }
}

function collapseAll() {
  expandedKeys.value = {}
}

const confirm = useConfirm()
const confirmName = ref('')
function editName() {
  if (selectedBlock.value === null)
    return

  confirmName.value = selectedBlock.value.name
  confirm.require({
    header: 'Edit name',
    rejectLabel: 'Cancel',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true,
    },
    acceptProps: {
      label: 'Save',
    },
    accept: () => {
      selectedBlock.value?.setName(confirmName.value)
    },
    reject: () => {},
  })
}

provide('selectedKey', selectedKey)
</script>

<template>
  <div>
    <ClientOnly>
      <Menubar class="mb-1 h-5vh min-h-5vh" :model="menuItems">
        <template #start>
          <div class="mr-4 w-fit from-green via-blue to-pink from-10% to-90% bg-gradient-to-r bg-clip-text text-40px text-transparent font-title">
            FLEXATOR
          </div>
        </template>
      </Menubar>
      <div class="flex">
        <div
          v-if="isExplorerVisible"
          class="bg-surface-9 min-w-20vw flex flex-col gap-2"
        >
          <div class="flex gap-2 px-2 pt-2">
            <Button
              type="button"
              icon="i-material-symbols-expand-all"
              aria-label="Expand all"
              @click="expandAll"
            />
            <Button
              type="button"
              icon="i-material-symbols-collapse-all"
              aria-label="Collapse all"
              @click="collapseAll"
            />
            <Button
              v-if="selectedKey"
              type="button"
              icon="i-material-symbols-edit"
              aria-label="Edit name"
              @click="editName()"
            />
            <ConfirmDialog>
              <template #message>
                <InputText
                  v-model="confirmName"
                  placeholder="Name"
                  class="w-full"
                />
              </template>
            </ConfirmDialog>
          </div>
          <Tree
            v-model:selectionKeys="selectedKey"
            v-model:expandedKeys="expandedKeys"
            :value="nodes"
            class="grow-1 !p-0 !pr-1"
            selection-mode="single"
          />
        </div>
        <Block
          v-model="root"
          class="flex grow-1 !h-90vh !w-100%"
        />
      </div>
    </ClientOnly>
    <div class="align-center mt-2 flex justify-center">
      BREUIL Julien
      <a href="https://github.com/jbreuil"><span class="i-ph-github-logo ml-2 text-white" /></a>
    </div>
  </div>
</template>
