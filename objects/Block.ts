import type { FlexAlignContent, FlexAlignItems, FlexAlignSelf, FlexBasisUnit, FlexColumnGapUnit, FlexDirection, FlexJustifyContent, FlexRowGapUnit, FlexWrap, HeightUnit, WidthUnit } from '~/types/BlockProperties'

export class Block {
  // Properties
  public id: number
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
    const { getId } = useSequence()
    this.id = getId()
    this.depth = depth
    this.name = `Block ${this.id}`

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

  public removeChild(id: number): void {
    this.children = this.children.filter(child => child.id !== id)
  }
}
