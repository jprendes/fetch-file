# fetch-file-monkeypatch

Patch node's fetch implementation to handle the `file://`` schema.

## Usage

```js
import "fetch-file-monkeypatch"

const response = await fetch("./README.md");
console.log(await response.text());
```