
const handler = function(req, res) {

  // res.status(200).json({ hello: `world` })
  // res.status(200).json({req.body})

  // req.body has the form values
  // console.log(req.body)
  
  // Here is where you would validate the form values and
  // do any other actions with it you need (e.g. save it somewhere or
  // trigger an action for the user).
  //
  // e.g.
  if (!req.body) {
    return res.status(422).json("Name field is required")
  }
  return res.json(req.body)

}

export default handler