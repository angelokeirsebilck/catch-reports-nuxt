import { extend, configure } from 'vee-validate'
import { required, email, confirmed } from 'vee-validate/dist/rules'

// Install required rule.
extend('required', {
  ...required,
  message: 'Dit veld is verplicht.',
})

// Install email rule.
extend('email', {
  ...email,
  message: 'Gelieve een correct emailadres in te vullen.',
})

// Install confirm rule.
extend('confirmed', {
  ...confirmed,
  message: 'Gelieve hetzelfde paswoord te herhalen.',
})

configure({
  classes: {
    valid:
      'h-16 focus:ring-1 focus:ring-green-600 focus:outline-green-600 focus:border-green-600 text-base w-full',
    invalid:
      'h-16 border-red-700 focus:ring-1 focus:ring-red-700 focus:outline-red-700 focus:border-red-700 text-base w-full',
    untouched:
      'h-16 focus:ring-1 focus:ring-green-600 focus:outline-green-600 focus:border-green-600 text-base w-full',
    passed:
      'h-16 focus:ring-1 border-green-600 focus:ring-green-600 focus:outline-green-600 focus:border-green-600 text-base w-full',
    pristine:
      'h-16 focus:ring-1 focus:ring-green-600 focus:outline-green-600 focus:border-green-600 text-base w-full',
  },
})
