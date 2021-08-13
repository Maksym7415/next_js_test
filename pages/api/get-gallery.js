import paramsParser from "../../helpers/paramsParser"
import fs from 'fs';

export default async (req, res) => {
    try {
        let [url, params] = req.url.split('?')
        const { offset, limit } = paramsParser(params);
        let data = null
        const files = fs.readdirSync('public/uploads').map((file) => ({url: file}));
        if(!fs.existsSync('public/gallery.json')) data = '{}'
        else  data = fs.readFileSync('public/gallery.json', 'utf-8');

        return res.json({
            pagination: {
                offset,
                limit: 9,
                total: files.length
            },
            data: {
              files:  files.slice(offset, +limit + +offset),
              data: JSON.parse(data)
            }
        })

    } catch (error) {
        console.log(error)
    }
}