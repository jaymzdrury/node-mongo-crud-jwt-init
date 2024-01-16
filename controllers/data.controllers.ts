import {Request, Response} from 'express';
import {get, post, put, remove} from '../services/data.services';
import {DataModel} from '../models/data.model'

const getData = async (req: Request, res: Response) => {
    const data = await get()
    return res.send(data)
}

const postData = async (req: Request, res: Response) => {
    const data = await post(req.body)
    return res.send(data)
}

const putData = async (req: Request<DataModel['userId']>, res: Response) => {
    const data = await put(req.params.id, req.body, {new: true})
    return res.send(data)
}

const deleteData = async (req: Request<DataModel['userId']>, res: Response) => {
    const data = await remove(req.params.id)
    return res.send(data)
}

export default {getData, postData, putData, deleteData}