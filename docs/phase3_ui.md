# MirrorSoul Phase 3 - UI Prototype (Quiet Luxury)

## Delivered files
- `tailwind.config.js`: quiet-luxury palette, serif/sans font pairing, airy letter spacing.
- `src/styles/breathing-background.css`: breathing gradient, paper-noise texture, ripple/nebula keyframes.
- `src/ui/LandingPage.jsx`: ritual entrance page with focus ripple + smooth validation state.
- `src/ui/QuestionCard.jsx`: immersive option card UI (frosted glass) + top 1px light progress + auto-select flow.
- `src/ui/LoadingAnimation.jsx`: nebula-like transition page with rotating copy lines.
- `src/ui/PosterGenerator.jsx`: canvas 3:4 poster generation with JPEG compression.
- `src/ui/AssessmentFlow.jsx`: AnimatePresence orchestration for page transition lifecycle.

## Interaction details
- Uses `min-h-[100svh]` plus `env(safe-area-inset-bottom)` padding for iOS/Android in-app browser bottom bars.
- Uses optional `navigator.vibrate(8)` as haptic micro-feedback when selecting options.
- No previous/next button in question UI; click option directly advances state.

## Integration hint
Import CSS once at app entry:
```js
import './styles/breathing-background.css';
```
