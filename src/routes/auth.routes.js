const express = require('express');
const authController = require("../controllers/auth.controller");
const router = express.Router();

// #region agent log
fetch('http://127.0.0.1:7445/ingest/215e0bef-298b-4889-aae0-85681d4bf530',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'edeb11'},body:JSON.stringify({sessionId:'edeb11',runId:'pre-fix',hypothesisId:'H1-H4',location:'src/routes/auth.routes.js:4',message:'Auth controller import shape',data:{controllerKeys:Object.keys(authController||{}),registerType:typeof authController?.userRegistrationController,registerCanonicalType:typeof authController?.userRegisterController,loginType:typeof authController?.userLoginController},timestamp:Date.now()})}).catch(()=>{});
// #endregion

function getRouteHandler(handlerName, hypothesisId) {
    const handler = authController?.[handlerName];
    const isFunction = typeof handler === "function";
    // #region agent log
    fetch('http://127.0.0.1:7445/ingest/215e0bef-298b-4889-aae0-85681d4bf530',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'edeb11'},body:JSON.stringify({sessionId:'edeb11',runId:'pre-fix',hypothesisId,location:'src/routes/auth.routes.js:11',message:'Route handler resolution',data:{handlerName,handlerType:typeof handler,isFunction},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    if (isFunction) {
        return handler;
    }
    return function unresolvedAuthHandler(req, res) {
        return res.status(500).json({ message: `Invalid auth handler: ${handlerName}` });
    };
}

// POST: /api/auth/register
router.post("/register", getRouteHandler("userRegistrationController", "H1"));

// POST: /api/auth/login
router.post("/login", getRouteHandler("userLoginController", "H2"));
module.exports = router;