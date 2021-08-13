import paramsParser from "../../helpers/paramsParser"

const delay = (ms) => new Promise((res, rej) => setTimeout(() => res(), ms))
export default async (req, res) => {
    try {
        let [url, params] = req.url.split('?')
        const { offset, limit } = paramsParser(params);
        await delay(2000);
        const urls = new Array(18).fill().map((_ ,i) => ({id: i, url: 'https://images.unsplash.com/photo-1592853285454-34691b7b74c4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGljdHVyZSUyMG9mJTIwdGhlJTIwZGF5fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80'}));
        return res.json({
            pagination: {
                offset,
                limit: 9,
                total: urls.length
            },
            data: urls.slice(offset, +limit + +offset)
        })

    } catch (error) {
        console.log(error)
    }
}