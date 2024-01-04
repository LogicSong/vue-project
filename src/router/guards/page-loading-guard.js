import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })
export function createPageLoadingGuard(router) {
  router.beforeEach(() => {
    NProgress.start()
  })

  router.afterEach(() => {
    setTimeout(() => {
      NProgress.done()
    }, 200)
  })

  router.onError(() => {
    NProgress.done()
  })
}
