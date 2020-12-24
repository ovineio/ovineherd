export function switchPageClassName(type, appName) {
  const $html = document.querySelector('html')
  const appCls = `qiankun-${appName}`
  const hasCls = ($html.className || '').indexOf(appCls) > -1

  if (type === 'add' && !hasCls) {
    $html.classList.add(appCls)
  }
  if (type === 'remove') {
    $html.classList.add(appCls)
  }
}
