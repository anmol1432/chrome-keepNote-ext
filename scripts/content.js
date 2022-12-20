(() => {
  async function factory(elem) {
    let bootstrapCss = await fetch(chrome.runtime.getURL('scripts/bootstrap.min.css')).then(res => res.url);
    let indexCss = await fetch(chrome.runtime.getURL('scripts/index.css')).then(res => res.url);
    let bootstrapJs = await fetch(chrome.runtime.getURL('scripts/bootstrap.min.js')).then(res => res.url);
    let pooper = await fetch(chrome.runtime.getURL('scripts/popper.min.js')).then(res => res.url);
    let jQuery = await fetch(chrome.runtime.getURL('scripts/jquery-3.5.1.slim.min.js')).then(res => res.url);

    let array = [indexCss, bootstrapCss, bootstrapJs, pooper, jQuery]
    array.map((item) => {
      // console.log(item)
      if (item.includes('css')) {
        elem.insertAdjacentHTML('afterbegin', `<link rel="stylesheet" href="${item}" crossorigin="anonymous"></link>`)
      } else {
        elem.insertAdjacentHTML('afterbegin', `<script src="${item}" type='text/javascript' crossorigin="anonymous"></script>`)
      }
    })
  }

  let container = document.createElement('div');
  factory(container);
  container.id = 'RootNote';
  container.classList.add('container');
  container.setAttribute('draggable', true);
  document.body.appendChild(container)
  fetch(chrome.runtime.getURL('scripts/index.html')).then((res) => {
    return res.text();
  }).then(async (res) => {
    await container.insertAdjacentHTML('beforeend', res)
    return 'htmlinjected'
  }).then(async (res) => {
    console.log(res)
    await fetch(chrome.runtime.getURL('scripts/script.js'))
      .then(res => res.url)
      .then((res) => {
        container.insertAdjacentHTML('beforeend', `<script src="${res}" type='text/javascript' crossorigin="anonymous"></script>`);
      })
  })
})();