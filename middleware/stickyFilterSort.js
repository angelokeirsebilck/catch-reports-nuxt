export default function ({ $fire, store, redirect, $ScrollTrigger, $gsap }) {
  if (window) {
    const st = $ScrollTrigger.create({
      trigger: '.sticky-nav',
      start: 'top top',
      pin: true,
      endTrigger: '.sticky-end',
      end: 'bottom top',
      scrub: true,
      pinSpacing: false,
    })
    let tl = $gsap.timeline()
    tl.scrollTrigger = st
  }
}
