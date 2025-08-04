export function debounce(func, delay) {
    return function (args) {
        let that = this
        let _args = args
        clearTimeout(func.id)
        func.id = setTimeout(function () {
            func.call(that, _args)
        }, delay)
    }
}