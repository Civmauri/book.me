import express from "express";
import * as errorHandling from "../utils/errorHandling.js";
import * as common from "../api/utils/common.js";
import * as auth from "../api/auth/auth.js";

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

const _register = async (req, res, next) => {
    try {
        const result = await auth.register(req.body);
        
        if (result.success) {
            return res.status(201).json(result);
        } else {
            return res.status(400).json(result);
        }
    } catch (err) {
        console.log(`[ERROR] Registration: ${err}`);
        return res.status(500).json({
            success: false,
            message: 'Internal server error during registration'
        });
    }
};
  //auth methods
  router.post('/register',
    _register
  );


const _login = async (req, res, next) => {
    try {
        const result = await auth.login(req.body);
        
        if (result.success) {
            return res.status(200).json(result);
        } else {
            return res.status(401).json(result);
        }
    } catch (err) {
        console.log(`[ERROR] Login: ${err}`);
        return res.status(500).json({
            success: false,
            message: 'Internal server error during login'
        });
    }
};



  router.post('/login',
    _login
  );

export default router;
