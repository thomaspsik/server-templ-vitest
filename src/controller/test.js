import asyncHandler from 'express-async-handler';
import * as model from '../model/test.js';

export const getTest = asyncHandler(async (req, res) => {
  res.status(200).json(await model.getTest());
});
