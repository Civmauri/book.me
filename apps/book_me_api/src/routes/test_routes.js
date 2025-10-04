import express from "express";
import * as errorHandling from "../utils/errorHandling.js";
import * as common from "../api/utils/common.js";

const router = express.Router();

const _echo = (req, res, next) => {
    try {
      return errorHandling.handleErrorAsync(req, res, next, common.echo);
    }
    catch (err) {
      console.log(`[ERROR] ${err}`);
  
      return res.status(500).json({
        success: false,
        message: err
      });
    }
  }
  
  //test methods
  router.post('/echo',
    _echo
  );

export default router;
