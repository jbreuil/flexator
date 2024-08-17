export function useOptions() {
  const directionOptions = [
    { value: 'row', icon: 'i-ph-arrow-right' },
    { value: 'row-reverse', icon: 'i-ph-arrow-left' },
    { value: 'column', icon: 'i-ph-arrow-down' },
    { value: 'column-reverse', icon: 'i-ph-arrow-up' },
  ]

  const wrapOptions = [
    { value: 'nowrap', icon: 'i-ph-arrow-line-right' },
    { value: 'wrap', icon: 'i-ph-arrow-elbow-down-left' },
    { value: 'wrap-reverse', icon: 'i-ph-arrow-elbow-up-left' },
  ]

  const justifyContentOptions = [
    { value: 'flex-start', icon: 'i-material-symbols-align-justify-flex-start' },
    { value: 'flex-end', icon: 'i-material-symbols-align-justify-flex-end' },
    { value: 'center', icon: 'i-material-symbols-align-justify-center' },
    { value: 'space-between', icon: 'i-material-symbols-align-justify-space-between' },
    { value: 'space-around', icon: 'i-material-symbols-align-justify-space-around' },
    { value: 'space-evenly', icon: 'i-material-symbols-align-justify-space-even' },
  ]

  const alignItemsOptions = [
    { value: 'stretch', icon: 'i-material-symbols-align-items-stretch' },
    { value: 'flex-start', icon: 'i-material-symbols-align-start' },
    { value: 'flex-end', icon: 'i-material-symbols-align-end' },
    { value: 'center', icon: 'i-material-symbols-align-center' },
    { value: 'baseline', icon: 'i-material-symbols-format-color-text' },
  ]

  const alignContentOptions = [
    { value: 'normal', icon: 'i-material-symbols-border-all' },
    { value: 'stretch', icon: 'i-material-symbols-align-items-stretch' },
    { value: 'flex-start', icon: 'i-material-symbols-align-start' },
    { value: 'flex-end', icon: 'i-material-symbols-align-end' },
    { value: 'center', icon: 'i-material-symbols-align-center' },
    { value: 'space-between', icon: 'i-material-symbols-align-justify-space-between' },
    { value: 'space-around', icon: 'i-material-symbols-align-justify-space-around' },
    { value: 'space-evenly', icon: 'i-material-symbols-align-justify-space-even' },
  ]

  const alignSelfOptions = [
    { value: 'auto', icon: 'i-material-symbols-square-outline-rounded' },
    { value: 'flex-start', icon: 'i-material-symbols-align-start' },
    { value: 'flex-end', icon: 'i-material-symbols-align-end' },
    { value: 'center', icon: 'i-material-symbols-align-center' },
    { value: 'baseline', icon: 'i-material-symbols-format-color-text' },
    { value: 'stretch', icon: 'i-material-symbols-align-items-stretch' },
  ]

  return {
    directionOptions,
    wrapOptions,
    justifyContentOptions,
    alignItemsOptions,
    alignContentOptions,
    alignSelfOptions,
  }
}
