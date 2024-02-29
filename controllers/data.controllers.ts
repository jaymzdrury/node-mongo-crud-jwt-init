import { Request, Response } from "express";
import { get, getOne, post, put, remove } from "../services/data.services";
import { DataModel } from "../models/data.model";
import timeoutHandler from "../utils/timeout";

const getData = async (req: Request, res: Response) => {
  timeoutHandler(null, res);
  const data = await get();
  return res.send(data);
};

const getOneData = async (req: Request<DataModel["userId"]>, res: Response) => {
  timeoutHandler(req, res);
  const data = await getOne(req.params.id);
  return res.send(data);
};

const postData = async (req: Request, res: Response) => {
  timeoutHandler(req, res);
  const data = await post(req.body);
  return res.send(data);
};

const putData = async (req: Request<DataModel["userId"]>, res: Response) => {
  timeoutHandler(req, res);
  const data = await put(req.params.id, req.body, { new: true });
  return res.send(data);
};

const deleteData = async (req: Request<DataModel["userId"]>, res: Response) => {
  timeoutHandler(req, res);
  const data = await remove(req.params.id);
  return res.send(data);
};

export default { getData, postData, putData, deleteData, getOneData };
