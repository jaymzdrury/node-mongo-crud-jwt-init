import {Request, Response} from 'express'
import {postData, getData, getDataById, updateById, deleteById} from '../services/services'

const get = async (req: Request, res: Response) => {
    const result = await getData()
    return res.send(result)
}

const getId = async (req: Request, res: Response) => {
    const result = await getDataById(req.params.id)
    return res.send(result)
}

const post = async (req: Request, res: Response) => {
    const result = await postData(req.body)
    return res.send(result)
}

const updateId = async (req: Request, res: Response) => {
    const result = await updateById(req.params.id, req.body)
    return res.send(result)
}

const deleteId = async (req: Request, res: Response) => {
    const result = await deleteById(req.params.id)
    return res.send(result)
}

export default {get, getId, post, updateId, deleteId}