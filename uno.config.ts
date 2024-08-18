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
    ['text-muted', { color: 'var(--p-text-muted-color)' }],
    ['bg-surface-9', { 'background-color': 'var(--p-surface-900)' }],
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
  content: {
    pipeline: {
      include: [
        // the default
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        // include js/ts files
        '**/*.{js,ts}',
      ],
    },
  },
})
