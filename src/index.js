let mainWasmUrl =
  'https://fintax-web-1257122416.cos.ap-shanghai.myqcloud.com/static-resource/encrypted-transmission/main.wasm'
//   https://fintax-web-1257122416.cos.ap-shanghai.myqcloud.com/static-resource/encrypted-transmission/main.wasm
fetch(mainWasmUrl)
  .then((response) => response.arrayBuffer())
  .then((bytes) => WebAssembly.instantiate(bytes))
  .then((results) => {
    window.mainWasm = results.instance.exports
  })
