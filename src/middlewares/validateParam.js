export default function validateParam(paramName) {
  return function (req, res, next) {
    const id = req.params[paramName];
    if (!id) return res.status(400).json({ success: false, message: `Missing ${paramName} param` });
    if (!/^[a-fA-F0-9]{24}$/.test(id)) return res.status(400).json({ success: false, message: `Invalid ${paramName} format` });
    next();
  };
}
