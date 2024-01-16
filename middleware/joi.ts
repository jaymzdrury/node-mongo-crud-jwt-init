import Joi, {ObjectSchema} from 'joi'
import {NextFunction, Response, Request} from 'express'
import {UserModel} from '../models/interfaces'
import {DataModel} from '../models/data.model'
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
    user: {
        create: Joi.object<UserModel>({
            email: Joi.string().email().required(),
            name: Joi.string().required(),
            password: Joi.string().min(6).required()
        })
    },
    session: {
        create: Joi.object<UserModel>({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        })
    },
    data: {
        create: Joi.object<DataModel>({
            data: Joi.string().min(2).required()
        })
    }
}
