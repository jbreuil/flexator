<script setup lang="ts">
const props = defineProps<{
  name: string
  depth: number
}>()
const emit = defineEmits<{
  (e: 'remove'): void
}>()
const menu = ref()
const editVisible = ref(false)
const blockList = ref<Array<{ name: string }>>([])
const count = ref(0)
const items = ref([
  {
    label: 'Create block',
    icon: 'i-ph-plus-square',
    command: () => {
      count.value++
      blockList.value.push({ name: `Block ${count.value}` })
    },
  },
  {
    label: 'Edit',
    icon: 'i-ph-note-pencil',
    command: () => {
      editVisible.value = true
    },
  },
  {
    label: 'Remove',
    icon: 'i-ph-trash',
    command: () => {
      emit('remove')
    },
    visible: () => props.depth > 0,
  },
])

function onBlockRightClick(event: MouseEvent) {
  menu.value.show(event)
}

function removeBlock(name: string) {
  blockList.value = blockList.value.filter(block => block.name !== name)
}

const dephtColor = computed(() => {
  switch (props.depth) {
    case 0:
      return 'b-white'
    case 1:
      return 'b-green'
    case 2:
      return 'b-teal'
    case 3:
      return 'b-sky'
    case 4:
      return 'b-indigo'
    case 5:
      return 'b-purple'
    case 6:
      return 'b-pink'
    default:
      return 'b-gray'
  }
})

// flex attributes
type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse'
const direction = ref<FlexDirection>('row')
const directionOptions = ref([
  { value: 'row', icon: 'i-ph-arrow-right' },
  { value: 'row-reverse', icon: 'i-ph-arrow-left' },
  { value: 'column', icon: 'i-ph-arrow-down' },
  { value: 'column-reverse', icon: 'i-ph-arrow-up' },
])

const style = reactive({
  flexDirection: computed(() => direction.value),
})
</script>

<template>
  <div
    class="flex b-1 b-dashed"
    :class="dephtColor"
    :style="style"
    aria-haspopup="true"
    @contextmenu="onBlockRightClick"
  >
    <span v-if="blockList.length === 0">{{ props.name }}</span>
    <Block
      v-for="block in blockList"
      :key="block.name"
      :name="block.name"
      :depth="props.depth + 1"
      @remove="removeBlock(block.name)"
    />
    <ContextMenu
      ref="menu"
      :model="items"
    />
    <Dialog
      v-model:visible="editVisible"
      modal
      header="Edit block"
      :style="{ width: '50vw' }"
    >
      <div class="mb-4 flex items-center gap-4">
        <label for="direction" class="w-24 font-semibold">Direction</label>
        <SelectButton
          id="direction"
          v-model="direction"
          option-label="value"
          option-value="value"
          data-key="value"
          :options="directionOptions"
        >
          <template #option="slotProps">
            <i :class="slotProps.option.icon" />
          </template>
        </SelectButton>
      </div>
    </Dialog>
  </div>
</template>

<style scoped>

</style>
