<script setup lang="ts">
import type { Block } from '~/objects/Block'

const emit = defineEmits<{
  (e: 'add'): void
  (e: 'edit'): void
  (e: 'remove'): void
}>()

const block = defineModel<Block>({ required: true })

const dephtColor = computed(() => {
  switch (block.value.depth) {
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

const style = reactive({
  flexDirection: computed(() => block.value.flexDirection),
  flexWrap: computed(() => block.value.flexWrap),
  order: computed(() => block.value.order),
  justifyContent: computed(() => block.value.justifyContent),
  alignItems: computed(() => block.value.alignItems),
  alignContent: computed(() => block.value.alignContent),
  rowGap: computed(() => `${block.value.rowGap}${block.value.rowGapUnit}`),
  columnGap: computed(() => `${block.value.columnGap}${block.value.columnGapUnit}`),
  flexGrow: computed(() => block.value.flexGrow),
  flexShrink: computed(() => block.value.flexShrink),
  alignSelf: computed(() => block.value.alignSelf),
  flexBasis: computed(() => block.value.flexBasisUnit === 'auto' ? 'auto' : `${block.value.flexBasis}${block.value.flexBasisUnit}`),
  width: computed(() => block.value.widthUnit === 'auto' ? 'auto' : `${block.value.width}${block.value.widthUnit}`),
  height: computed(() => block.value.heightUnit === 'auto' ? 'auto' : `${block.value.height}${block.value.heightUnit}`),
})

// context menu
const menu = ref()
const editVisible = ref(false)
const editExtendedOptions = ref(false)
const { directionOptions, wrapOptions, justifyContentOptions, alignItemsOptions, alignContentOptions, alignSelfOptions } = useOptions()

function onBlockRightClick(event: MouseEvent) {
  menu.value.show(event)
}

function add() {
  block.value.addChild()
}

function edit() {
  editVisible.value = true
  editExtendedOptions.value = false
}

function remove(id: number) {
  block.value.removeChild(id)
}

const items = [
  {
    label: 'Create block',
    icon: 'i-ph-plus-square',
    command: () => {
      block.value.addChild()
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
    visible: () => block.value.depth > 0,
  },
  {
    visible: () => block.value.depth > 0,
    separator: true,
  },
  {
    label: 'Create block in parent',
    icon: 'i-ph-plus-square',
    command: () => {
      emit('add')
    },
    visible: () => block.value.depth > 0,
  },
  {
    label: 'Edit parent',
    icon: 'i-ph-note-pencil',
    command: () => {
      emit('edit')
    },
    visible: () => block.value.depth > 0,
  },
]

const content = ref('')
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
      v-if="block.children.length === 0 && content === ''"
      class="text-muted h-full w-full flex items-center justify-center text-center"
    >
      <i class="i-ph-mouse-right-click-fill" /> to interact
    </div>
    <div v-else>
      {{ content }}
    </div>
    <Block
      v-for="(child, index) in block.children"
      :key="child.id"
      v-model="block.children[index]"
      @add="add"
      @edit="edit"
      @remove="remove(child.id)"
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
          v-model="block.flexDirection"
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
          v-model="block.flexWrap"
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
          v-model="block.justifyContent"
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
          v-model="block.alignItems"
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
        <div v-if="block.depth > 0" class="mb-4 flex items-center gap-4">
          <label for="width" class="w-24">Width</label>
          <InputNumber
            v-if="block.widthUnit !== 'auto'"
            v-model="block.width"
            input-id="width"
            show-buttons
          />
          <Select
            id="widthUnit"
            v-model="block.widthUnit"

            :options="['px', '%', 'vw', 'rem', 'em', 'auto']"
          />
        </div>
        <div v-if="block.depth > 0" class="mb-4 flex items-center gap-4">
          <label for="height" class="w-24">Height</label>
          <InputNumber
            v-if="block.heightUnit !== 'auto'"
            v-model="block.height"
            input-id="height"
            show-buttons
          />
          <Select
            id="heightUnit"
            v-model="block.heightUnit"
            :options="['px', '%', 'vh', 'rem', 'em', 'auto']"
          />
        </div>

        <div class="mb-4 flex items-center gap-4">
          <label for="grow" class="w-24 text-pink">Grow</label>
          <InputNumber
            v-model="block.flexGrow"
            input-id="grow"
            show-buttons
          />
        </div>

        <div class="mb-4 flex items-center gap-4">
          <label for="shrink" class="w-24 text-pink">Shrink</label>
          <InputNumber
            v-model="block.flexShrink"
            input-id="shrink"
            show-buttons
          />
        </div>

        <div class="mb-4 flex items-center gap-4">
          <label for="basis" class="w-24 text-pink">Basis</label>
          <InputNumber
            v-if="block.flexBasisUnit !== 'auto'"
            v-model="block.flexBasis"
            input-id="basis"
            show-buttons
          />
          <Select
            id="basisUnit"
            v-model="block.flexBasisUnit"
            :options="['px', '%', 'vw', 'rem', 'em', 'auto']"
          />
        </div>
        <div class="mb-4 flex items-center gap-4">
          <label for="alignContent" class="w-24 text-emerald">Align content</label>
          <SelectButton
            v-model="block.alignContent"
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
            v-model="block.rowGap"
            input-id="rowGap"
            show-buttons
          />
          <Select
            id="rowGapUnit"
            v-model="block.rowGapUnit"
            :options="['px', 'rem', 'em', 'vh', 'vw', '%']"
          />
        </div>

        <div class="mb-4 flex items-center gap-4">
          <label for="columnGap" class="w-24 text-emerald">Column gap</label>
          <InputNumber
            v-model="block.columnGap"
            input-id="columnGap"
            show-buttons
          />
          <Select
            id="columnGapUnit"
            v-model="block.columnGapUnit"
            :options="['px', 'rem', 'em', 'vh', 'vw', '%']"
          />
        </div>

        <div class="mb-4 flex items-center gap-4">
          <label for="alignSelf" class="w-24 text-pink">Align self</label>
          <SelectButton
            v-model="block.alignSelf"
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
            v-model="block.order"
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
