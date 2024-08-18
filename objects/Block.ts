import type { TreeNode } from 'primevue/treenode'
import { ulid } from 'ulid'
import type { FlexAlignContent, FlexAlignItems, FlexAlignSelf, FlexBasisUnit, FlexColumnGapUnit, FlexDirection, FlexJustifyContent, FlexRowGapUnit, FlexWrap, HeightUnit, WidthUnit } from '~/types/BlockProperties'

export class Block {
  // Properties
  public id: string
  public depth: number
  public name: string

  public children: Block[]

  public width: number
  public widthUnit: WidthUnit

  public height: number
  public heightUnit: HeightUnit

  public flexDirection: FlexDirection
  public flexWrap: FlexWrap
  public justifyContent: FlexJustifyContent
  public alignItems: FlexAlignItems
  public alignContent: FlexAlignContent
  public rowGap: number
  public rowGapUnit: FlexRowGapUnit
  public columnGap: number
  public columnGapUnit: FlexColumnGapUnit
  public flexBasis: number
  public flexBasisUnit: FlexBasisUnit
  public alignSelf: FlexAlignSelf
  public order: number
  public flexGrow: number
  public flexShrink: number

  // Constructor
  public constructor(depth: number) {
    this.id = ulid()
    this.depth = depth
    this.name = `Block ${this.id.substring(20, 26)}`

    this.children = []

    this.width = 0
    this.widthUnit = 'auto'

    this.height = 0
    this.heightUnit = 'auto'

    this.flexDirection = 'row'
    this.flexWrap = 'nowrap'
    this.justifyContent = 'flex-start'
    this.alignItems = 'stretch'
    this.alignContent = 'normal'
    this.rowGap = 0
    this.rowGapUnit = 'px'
    this.columnGap = 0
    this.columnGapUnit = 'px'
    this.flexBasis = 0
    this.flexBasisUnit = 'auto'
    this.alignSelf = 'auto'
    this.order = 0
    this.flexGrow = 0
    this.flexShrink = 1
  }

  // Methods
  public addChild(): void {
    this.children.push(new Block(this.depth + 1))
  }

  public removeChild(id: string): void {
    this.children = this.children.filter(child => child.id !== id)
  }

  public getBlockById(id: string): Block | null {
    if (this.id === id) {
      return this
    }
    for (const child of this.children) {
      const block = child.getBlockById(id)
      if (block) {
        return block
      }
    }
    return null
  }

  public setName(name: string): void {
    this.name = name
  }

  public getHTML(): string {
    const width = this.widthUnit === 'auto' ? 'auto' : `${this.width}${this.widthUnit}`
    const height = this.heightUnit === 'auto' ? 'auto' : `${this.height}${this.heightUnit}`
    const flexBasis = this.flexBasisUnit === 'auto' ? 'auto' : `${this.flexBasis}${this.flexBasisUnit}`
    return `
      <div style="
        flex: 1;
        width: ${width};
        height: ${height};
        flex-direction: ${this.flexDirection};
        flex-wrap: ${this.flexWrap};
        justify-content: ${this.justifyContent};
        align-items: ${this.alignItems};
        align-content: ${this.alignContent};
        row-gap: ${this.rowGap}${this.rowGapUnit};
        column-gap: ${this.columnGap}${this.columnGapUnit};
        flex-basis: ${flexBasis};
        align-self: ${this.alignSelf};
        order: ${this.order};
        flex-grow: ${this.flexGrow};
        flex-shrink: ${this.flexShrink};
      ">
        ${this.children.map(child => child.getHTML()).join('')}
      </div>
    `
  }

  public getNode(): TreeNode {
    const node = {
      key: this.id.toString(),
      label: this.name,
      children: this.children.length === 0
        ? []
        : this.children.map(child => child.getNode()),
    }
    return node
  }

  public static reviver(key: string, value: any) {
    if (key === '') {
      // At the root level, transform the object into an instance of BlockClass using the depth value
      const depth = value.depth || 0
      return Object.assign(new Block(depth), value)
    }
    if (key === 'children' && Array.isArray(value)) {
      // If the key is 'children' and the value is an array, recursively transform each element
      return value.map(child => JSON.parse(JSON.stringify(child), Block.reviver))
    }
    // For all other levels, return the value as is
    return value
  }

  public static resetRoot() {
    const root = new Block(0)
    root.name = 'Root'
    return root
  }
}
