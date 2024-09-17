export function postRequestValidator(req, res, next) {
  const { firstName, lastName, email, hobby } = req.body;
  const emailregex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (typeof firstName !== "string" || !firstName || !firstName.trim() ) {
    res
      .status(400)
      .json({ message: "firstName is required and must be a non-empty string" });
      
  } else if (typeof lastName !== "string" || !lastName || !lastName.trim() ) {
    res
      .status(400)
      .json({ message: "lastName is required and must be a non-empty string" });
  } else if (!email || !email.trim() || !emailregex.test(email)) {
    res
      .status(400)
      .json({ message: "email is required and must be a valid email format" });
  } else if (typeof hobby !== "string" || !hobby || !hobby.trim()) {
    res
      .status(400)
      .json({ message: "hobby is required and must be a non-empty string" });
  } else {
    next();
  }
}

export function putRequestValidator(req, res, next) {
  const { firstName, lastName, email, hobby } = req.body;
  const emailregex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  // Validating first name if present (must be a non-empty string)
  if (req.body.hasOwnProperty("firstName")) {
    if (typeof firstName !== "string" || firstName.trim() === "") {
      res.status(400).json({
        message: "Invalid 'firstName'. It must be a non-empty string.",
      });
      return;
    }
  }

  // Validating last name if present (must be a non-empty string)
  if (req.body.hasOwnProperty("lastName")) {
    if (typeof lastName !== "string" || lastName.trim() === "") {
      res
        .status(400)
        .json({
          message: "Invalid 'lastName'. It must be a non-empty string.",
        });
        return;
    }
  }

  // Validating email if present (must be a non-empty string and valid email format)
  if (req.body.hasOwnProperty("email")) {
    if (
      typeof email !== "string" ||
      email.trim() === "" ||
      !emailregex.test(email)
    ) {
      res
        .status(400)
        .json({ message: "Invalid 'email'. It must be a non-empty string." });
      return;
    }
  }

  //validating hobby if present (must be a non-empty string)
  if (req.body.hasOwnProperty("hobby")) {
    if (typeof hobby !== "string" || hobby.trim() === "") {
      res
        .status(400)
        .json({ message: "Invalid 'hobby'. It must be a non-empty string." });
      return;
    }
  }

  next();
}
