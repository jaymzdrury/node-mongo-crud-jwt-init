import {DocumentDefinition} from 'mongoose'
import { DataModel } from '../models/interfaces'
import Model from '../models/model'
import timer from '../utils/timer'
import logger from '../utils/logger'
import {NotFoundError} from '../errors/not-found'
const {start, end, responseTime} = timer

export async function getData(){
    start
    try {
        const result = await Model.find().setOptions({sanitizeFilter: true})
        end
        logger.info(`GET: ${responseTime}`)
        return result
    } catch (e: any) {
        throw new NotFoundError()
    }
}

export async function getDataById(id: string){
    start
    try {
        const result = await Model.findById(id).setOptions({sanitizeFilter: true})
        end
        logger.info(`GETID: ${responseTime}`)
        return result
    } catch (e: any) {
        throw new NotFoundError()
    }
}

export async function postData(input: DocumentDefinition<DataModel>){
    start
    try {
        const result = await Model.create(input)
        end
        logger.info(`POST: ${responseTime}`)
        return result
    } catch (e: any) {
        throw new NotFoundError()
    }
}

export async function updateById(id: string, input: DocumentDefinition<DataModel>){
    start
    try {
        const result = await Model.findByIdAndUpdate(id, input, {new:true}).setOptions({sanitizeFilter: true})
        end
        logger.info(`UPDATE: ${responseTime}`)
        return result
    } catch (e: any) {
        throw new NotFoundError()
    }
}

export async function deleteById(id: string) {
    start
    try {
        const result = await Model.findByIdAndDelete(id).setOptions({sanitizeFilter: true}) 
        end
        logger.info(`DELETE: ${responseTime}`)
        return result 
    } catch (e: any) {
        throw new NotFoundError()
    }
}