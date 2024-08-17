import { Block } from '~/objects/Block'

export function usePreset() {
  function empty() {
    return new Block(0)
  }

  function adminPanel() {
    const parent = new Block(0)
    parent.addChild()
    return parent
  }

  return {
    empty,
    adminPanel,
  }
}
