# DVA TYPESCRIPT Generator

### install
```shell
npm start
npm run build
```

## set up antd

change babelrc like:
```javascript
"plugins": [
    "transform-runtime",
    "transform-decorators-legacy", 
    [
        "import",
        {
            "libraryName": "antd",
            "style": "css"
        }
    ]
],
```