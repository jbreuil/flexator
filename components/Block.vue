<script setup lang="ts">
import Textarea from 'primevue/textarea'

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
const content = ref('')
const editVisible = ref(false)
const editExtendedOptions = ref(false)
function add() {
  count.value++
  blockList.value.push({ name: `Block ${count.value}` })
}

function edit() {
  editVisible.value = true
  editExtendedOptions.value = false
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

type WidthUnit = 'px' | '%' | 'vw' | 'rem' | 'em' | 'auto'
const widthUnit = ref<WidthUnit>('auto')
const width = ref(100)

type HeightUnit = 'px' | '%' | 'vh' | 'rem' | 'em' | 'auto'
const heightUnit = ref<HeightUnit>('auto')
const height = ref(100)

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

type FlexOrder = number
const order = ref<FlexOrder>(0)

type FlexJustifyContent = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
const justifyContent = ref<FlexJustifyContent>('flex-start')
const justifyContentOptions = ref([
  { value: 'flex-start', icon: 'i-material-symbols-align-justify-flex-start' },
  { value: 'flex-end', icon: 'i-material-symbols-align-justify-flex-end' },
  { value: 'center', icon: 'i-material-symbols-align-justify-center' },
  { value: 'space-between', icon: 'i-material-symbols-align-justify-space-between' },
  { value: 'space-around', icon: 'i-material-symbols-align-justify-space-around' },
  { value: 'space-evenly', icon: 'i-material-symbols-align-justify-space-even' },
])

type FlexAlignItems = 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline'
const alignItems = ref<FlexAlignItems>('stretch')
const alignItemsOptions = ref([
  { value: 'stretch', icon: 'i-material-symbols-align-items-stretch' },
  { value: 'flex-start', icon: 'i-material-symbols-align-start' },
  { value: 'flex-end', icon: 'i-material-symbols-align-end' },
  { value: 'center', icon: 'i-material-symbols-align-center' },
  { value: 'baseline', icon: 'i-material-symbols-format-color-text' },
])

type FlexAlignContent = 'normal' | 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
const alignContent = ref<FlexAlignContent>('normal')
const alignContentOptions = ref([
  { value: 'normal', icon: 'i-material-symbols-border-all' },
  { value: 'stretch', icon: 'i-material-symbols-align-items-stretch' },
  { value: 'flex-start', icon: 'i-material-symbols-align-start' },
  { value: 'flex-end', icon: 'i-material-symbols-align-end' },
  { value: 'center', icon: 'i-material-symbols-align-center' },
  { value: 'space-between', icon: 'i-material-symbols-align-justify-space-between' },
  { value: 'space-around', icon: 'i-material-symbols-align-justify-space-around' },
  { value: 'space-evenly', icon: 'i-material-symbols-align-justify-space-even' },
])

type FlexRowGapUnit = 'px' | 'rem' | 'em' | 'vh' | 'vw' | '%'
const rowGapUnit = ref<FlexRowGapUnit>('px')
const rowGap = ref(0)

type FlexColumnGapUnit = 'px' | 'rem' | 'em' | 'vh' | 'vw' | '%'
const columnGapUnit = ref<FlexColumnGapUnit>('px')
const columnGap = ref(0)

const grow = ref(0)
const shrink = ref(1)

type FlexBasisUnit = 'px' | '%' | 'vw' | 'rem' | 'em' | 'auto'
const basisUnit = ref<FlexBasisUnit>('auto')
const basis = ref(0)

type FlexAlignSelf = 'auto' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'
const alignSelf = ref<FlexAlignSelf>('auto')
const alignSelfOptions = ref([
  { value: 'auto', icon: 'i-material-symbols-square-outline-rounded' },
  { value: 'flex-start', icon: 'i-material-symbols-align-start' },
  { value: 'flex-end', icon: 'i-material-symbols-align-end' },
  { value: 'center', icon: 'i-material-symbols-align-center' },
  { value: 'baseline', icon: 'i-material-symbols-format-color-text' },
  { value: 'stretch', icon: 'i-material-symbols-align-items-stretch' },
])

const style = reactive({
  flexDirection: computed(() => direction.value),
  flexWrap: computed(() => wrap.value),
  order: computed(() => order.value),
  justifyContent: computed(() => justifyContent.value),
  alignItems: computed(() => alignItems.value),
  alignContent: computed(() => alignContent.value),
  rowGap: computed(() => `${rowGap.value}${rowGapUnit.value}`),
  columnGap: computed(() => `${columnGap.value}${columnGapUnit.value}`),
  grow: computed(() => grow.value),
  shrink: computed(() => shrink.value),
  alignSelf: computed(() => alignSelf.value),
  basis: computed(() => basisUnit.value === 'auto' ? 'auto' : `${basis.value}${basisUnit.value}`),
  width: computed(() => widthUnit.value === 'auto' ? 'auto' : `${width.value}${widthUnit.value}`),
  height: computed(() => heightUnit.value === 'auto' ? 'auto' : `${height.value}${heightUnit.value}`),
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
    <div
      v-if="blockList.length === 0 && content === ''"
      class="text-muted h-full w-full flex items-center justify-center text-center"
    >
      <i class="i-ph-mouse-right-click-fill" /> to interact
    </div>
    <div v-else>
      {{ content }}
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
      :style="{ width: '70vw' }"
    >
      <div class="mb-4 flex items-center gap-4">
        <label id="direction" class="w-24 text-emerald">Direction</label>
        <SelectButton
          v-model="direction"
          aria-labelledby="direction"
          option-label="value"
          option-value="value"
          data-key="value"
          :options="directionOptions"
        >
          <template #option="slotProps">
            <i v-tooltip.bottom="slotProps.option.value" :class="slotProps.option.icon" />
          </template>
        </SelectButton>
      </div>
      <div class="mb-4 flex items-center gap-4">
        <label id="wrap" class="w-24 text-emerald">Wrap</label>
        <SelectButton
          v-model="wrap"
          aria-labelledby="wrap"
          option-label="value"
          option-value="value"
          data-key="value"
          :options="wrapOptions"
        >
          <template #option="slotProps">
            <i v-tooltip.bottom="slotProps.option.value" :class="slotProps.option.icon" />
          </template>
        </SelectButton>
      </div>
      <div class="mb-4 flex items-center gap-4">
        <label id="justifyContent" class="w-24 text-emerald">Justify content</label>
        <SelectButton
          v-model="justifyContent"
          aria-labelledby="justifyContent"
          option-label="value"
          option-value="value"
          data-key="value"
          :options="justifyContentOptions"
        >
          <template #option="slotProps">
            <i v-tooltip.bottom="slotProps.option.value" :class="slotProps.option.icon" />
          </template>
        </SelectButton>
      </div>
      <div class="mb-4 flex items-center gap-4">
        <label id="alignItems" class="w-24 text-emerald">Align items</label>
        <SelectButton
          id="alignItems"
          v-model="alignItems"
          option-label="value"
          option-value="value"
          data-key="value"
          aria-labelledby="alignItems"
          :options="alignItemsOptions"
        >
          <template #option="slotProps">
            <i v-tooltip.bottom="slotProps.option.value" :class="slotProps.option.icon" />
          </template>
        </SelectButton>
      </div>
      <div v-if="editExtendedOptions">
        <div v-if="props.depth > 0" class="mb-4 flex items-center gap-4">
          <label for="width" class="w-24">Width</label>
          <InputNumber
            v-if="widthUnit !== 'auto'"
            v-model="width"
            input-id="width"
            show-buttons
          />
          <Select
            id="widthUnit"
            v-model="widthUnit"

            :options="['px', '%', 'vw', 'rem', 'em', 'auto']"
          />
        </div>
        <div v-if="props.depth > 0" class="mb-4 flex items-center gap-4">
          <label for="height" class="w-24">Height</label>
          <InputNumber
            v-if="heightUnit !== 'auto'"
            v-model="height"
            input-id="height"
            show-buttons
          />
          <Select
            id="heightUnit"
            v-model="heightUnit"
            :options="['px', '%', 'vh', 'rem', 'em', 'auto']"
          />
        </div>

        <div class="mb-4 flex items-center gap-4">
          <label for="grow" class="w-24 text-pink">Grow</label>
          <InputNumber
            v-model="grow"
            input-id="grow"
            show-buttons
          />
        </div>

        <div class="mb-4 flex items-center gap-4">
          <label for="shrink" class="w-24 text-pink">Shrink</label>
          <InputNumber
            v-model="shrink"
            input-id="shrink"
            show-buttons
          />
        </div>

        <div class="mb-4 flex items-center gap-4">
          <label for="basis" class="w-24 text-pink">Basis</label>
          <InputNumber
            v-if="basisUnit !== 'auto'"
            v-model="basis"
            input-id="basis"
            show-buttons
          />
          <Select
            id="basisUnit"
            v-model="basisUnit"
            :options="['px', '%', 'vw', 'rem', 'em', 'auto']"
          />
        </div>
        <div class="mb-4 flex items-center gap-4">
          <label for="alignContent" class="w-24 text-emerald">Align content</label>
          <SelectButton
            v-model="alignContent"
            aria-labelledby="alignContent"
            option-label="value"
            option-value="value"
            data-key="value"
            :options="alignContentOptions"
          >
            <template #option="slotProps">
              <i v-tooltip.bottom="slotProps.option.value" :class="slotProps.option.icon" />
            </template>
          </SelectButton>
        </div>

        <div class="mb-4 flex items-center gap-4">
          <label for="rowGap" class="w-24 text-emerald">Row gap</label>
          <InputNumber
            v-model="rowGap"
            input-id="rowGap"
            show-buttons
          />
          <Select
            id="rowGapUnit"
            v-model="rowGapUnit"
            :options="['px', 'rem', 'em', 'vh', 'vw', '%']"
          />
        </div>

        <div class="mb-4 flex items-center gap-4">
          <label for="columnGap" class="w-24 text-emerald">Column gap</label>
          <InputNumber
            v-model="columnGap"
            input-id="columnGap"
            show-buttons
          />
          <Select
            id="columnGapUnit"
            v-model="columnGapUnit"
            :options="['px', 'rem', 'em', 'vh', 'vw', '%']"
          />
        </div>

        <div class="mb-4 flex items-center gap-4">
          <label for="alignSelf" class="w-24 text-pink">Align self</label>
          <SelectButton
            v-model="alignSelf"
            aria-labelledby="alignSelf"
            option-label="value"
            option-value="value"
            data-key="value"
            :options="alignSelfOptions"
          >
            <template #option="slotProps">
              <i v-tooltip.bottom="slotProps.option.value" :class="slotProps.option.icon" />
            </template>
          </SelectButton>
        </div>

        <div class="mb-4 flex items-center gap-4">
          <label for="order" class="w-24 text-pink">Order</label>
          <InputNumber
            v-model="order"
            input-id="order"
            show-buttons
          />
        </div>
        <div class="mb-4 flex items-center gap-4">
          <label for="content" class="w-24 text-pink">Content</label>
          <Textarea
            v-model="content"
            input-id="content"
          />
        </div>
      </div>
      <template #footer>
        <div class="w-full flex font-size-3">
          <div class="mr-auto flex gap-10">
            <div class="text-emerald font-italic">
              Container properties
            </div>
            <div class="text-pink font-italic">
              Item properties
            </div>
          </div>
          <div
            v-if="!editExtendedOptions"
            class="text-muted text-right underline hover:cursor-pointer"
            @click="editExtendedOptions = true"
          >
            Click here to show more
          </div>
          <div
            v-else
            class="text-muted text-right underline hover:cursor-pointer"
            @click="editExtendedOptions = false"
          >
            Show less
          </div>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<style scoped>
</style>
