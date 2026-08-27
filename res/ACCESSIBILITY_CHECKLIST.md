# Guzolink Accessibility Verification Checklist

The following focused checks were completed for the current preview frontend. They are a practical baseline, not a substitute for an independent accessibility audit before launch.

| Check | Evidence in the current application | Status |
|---|---|---|
| Keyboard-visible focus | Global `:focus-visible` styling applies a 3px ochre focus outline to links, buttons, inputs, selects, textareas, and disclosure controls. | Implemented |
| Keyboard interactions | Sidebar open/close, language switching, merchant approval, payment outcomes, notification controls, and governance reminders have direct interaction coverage or semantic button/switch controls. | Implemented |
| Dialog semantics | Marketplace navigation uses an `aria-modal` dialog with escape-key close; existing management modals use labelled dialogs. | Implemented |
| Form labels | Account, checkout, support, growth, policy, and merchant operation controls use visible labels or descriptive button names. | Implemented |
| Motion preference | The reduced-motion media query disables animation/transition and smooth scrolling for visitors who request less motion. | Implemented |
| Contrast baseline | The primary paper/ink text pairing and solid ochre action controls are used consistently; visual checks completed at desktop and mobile sizes. | Implemented baseline |
| Pre-launch audit | Complete manual screen-reader testing, independent WCAG contrast measurements, user testing in English and Amharic, and device/browser QA. | Required before launch |
