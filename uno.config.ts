import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
} from 'unocss'

import type { PrimitiveDesignTokens } from '@primevue/themes/aura'
import Aura from '@primevue/themes/aura'

const theme = Aura as {
  primitive: PrimitiveDesignTokens
}
const { borderRadius, ...colors } = theme.primitive
interface UpdatedPaletteDesignToken extends Aura.PaletteDesignToken {
  DEFAULT?: string
}

const unoColors: { [key: string]: UpdatedPaletteDesignToken } = {
  primary: { ...colors.emerald } as UpdatedPaletteDesignToken,
  ...colors,
}
for (const key in unoColors) {
  if (unoColors[key]['500']) {
    unoColors[key].DEFAULT = unoColors[key]['500']
  }
}

export default defineConfig({
  rules: [
    // ['custom-rule', { color: 'red' }],
  ],
  shortcuts: {
    // 'custom-shortcut': 'text-lg text-orange hover:text-teal',
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      cdn: 'https://esm.sh/',
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    presetWebFonts({
      provider: 'bunny',
      fonts: {
        sans: 'Aldrich',
        title: 'Bruno Ace',

      },
    }),
  ],
  theme: {
    colors: unoColors,
  },
})
