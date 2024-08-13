<script setup lang="ts">
const props = defineProps<{
  name: string
  depth: number
}>()

const emit = defineEmits<{
  (e: 'add'): void
  (e: 'edit'): void
  (e: 'remove'): void
}>()

const count = ref(0)
const blockList = ref<Array<{ name: string }>>([])
const editVisible = ref(false)
function add() {
  count.value++
  blockList.value.push({ name: `Block ${count.value}` })
}

function edit() {
  editVisible.value = true
}

function remove(name: string) {
  blockList.value = blockList.value.filter(block => block.name !== name)
}

const menu = ref()
function onBlockRightClick(event: MouseEvent) {
  menu.value.show(event)
}
const items = ref([
  {
    label: 'Create block',
    icon: 'i-ph-plus-square',
    command: () => {
      add()
    },
  },
  {
    label: 'Edit',
    icon: 'i-ph-note-pencil',
    command: () => {
      edit()
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
  {
    visible: () => props.depth > 0,
    separator: true,
  },
  {
    label: 'Create block in parent',
    icon: 'i-ph-plus-square',
    command: () => {
      emit('add')
    },
    visible: () => props.depth > 0,
  },
  {
    label: 'Edit parent',
    icon: 'i-ph-note-pencil',
    command: () => {
      emit('edit')
    },
    visible: () => props.depth > 0,
  },
])

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

type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse'
const wrap = ref<FlexWrap>('nowrap')
const wrapOptions = ref([
  { value: 'nowrap', icon: 'i-ph-arrow-line-right' },
  { value: 'wrap', icon: 'i-ph-arrow-elbow-down-left' },
  { value: 'wrap-reverse', icon: 'i-ph-arrow-elbow-up-left' },
])

const style = reactive({
  flexDirection: computed(() => direction.value),
  flexWrap: computed(() => wrap.value),
})
</script>

<template>
  <div
    class="flex b-2 b-dashed hover:b-2 hover:b-solid"
    :class="dephtColor"
    :style="style"
    aria-haspopup="true"
    @contextmenu="onBlockRightClick"
  >
    <!-- <span v-if="blockList.length === 0">{{ props.name }}</span> -->
    <div
      v-if="blockList.length === 0"
      class="text-muted h-full w-full flex items-center justify-center text-center"
    >
      Right click to interact
    </div>
    <Block
      v-for="block in blockList"
      :key="block.name"
      :name="block.name"
      :depth="props.depth + 1"
      @add="add"
      @edit="edit"
      @remove="remove(block.name)"
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
      <div class="mb-4 flex items-center gap-4">
        <label for="wrap" class="w-24 font-semibold">Wrap</label>
        <SelectButton
          id="wrap"
          v-model="wrap"
          option-label="value"
          option-value="value"
          data-key="value"
          :options="wrapOptions"
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
