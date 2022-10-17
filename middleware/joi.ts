import Joi, {ObjectSchema} from 'joi'
import {NextFunction, Response, Request} from 'express'
import {Data} from '../models/interfaces'
import {BadRequestError} from '../errors/bad-request'

export const Validate = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body)
            next()
        } catch (err) {
            throw new BadRequestError(`Validation failed: ${err}`)
        }
    }
}

export const Schemas = {
    data: {
        create: Joi.object<Data>({
            string: Joi.string().required()
        }),
        update: Joi.object<Data>({
            string: Joi.string().required()
        })
    }
}
