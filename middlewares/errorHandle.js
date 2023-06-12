const errorHendle = (err, req, res, next) => {
    if(err.name === "SequelizeUniqueConstraintError" || err.name === "SequelizeValidationError"){
      res.status(400).json({ message: err.errors[0].message })
    }else if(err.name === "JsonWebTokenError" || err.name === "Unauthorized"){
      res.status(401).json({message: "invalid token"})
    }else if(err.name === "invalidInput"){
      res.status(401).json({message: "email/password invalid "})
    }else if(err.name === "noToken"){   
      res.status(401).json({message: "Please Login"})
    }else if(err.name === "Forbidden"){
      res.status(403).json({ message: "Forbidden" })
    }else if(err.name === "notFound"){
      res.status(404).json({ message: "Data not found" })
    }else {
      res.status(500).json({ message: "internal server error" })
    }
  }

module.exports = errorHendle