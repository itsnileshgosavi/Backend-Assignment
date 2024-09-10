export default function requestValidator(req, res, next) {
  const { name, email, hobby } = req.body;
  const emailregex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!name || !name.trim()) {
    res.status(400).json({ message: "name is required" });
  } else if (!email || !email.trim() || !emailregex.test(email)) {
    res.status(400).json({ message: "email is invalid" });
  } else if (!hobby || !hobby.trim()) {
    res.status(400).json({ message: "hobby is required" });
  } else {
    next();
  }
}
