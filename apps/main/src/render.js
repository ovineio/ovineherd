const renderSubApp = (props) => {
  const container = document.getElementById('main-container')

  const { loading } = props

  const renderLoading = () => (!loading ? '' : '<h4 class="app-loading">loading....</h4>')

  if (container.innerHTML) {
    container.querySelector('.app-loading').outerHTML = renderLoading()
  } else {
    container.innerHTML = `
      ${renderLoading()}
      <div id="main-viewport" ></div>
    `
  }
}

export default renderSubApp
