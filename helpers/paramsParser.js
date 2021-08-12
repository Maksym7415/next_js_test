export default function paramsParser(params) {
    return params.split('&').reduce((a, c) => {
        const [property, value] = c.split('=')
        a[property] = value
        return a
    }, {});
}