const User = require('../models/User')

const get_users = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * pageSize;
    const total = await User.countDocuments();

    const pages = Math.ceil(total / pageSize);
    query = await User.find().skip(skip).limit(pageSize);

    if (page > pages) {
      return res.status(404).json({
        status: "fail",
        message: "No page found",
      });
    }
    const result = {
      total: total,
      data: query
    }
    res.status(200).send(result);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Server Error",
    });
  }
};

const get_user = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id })
    res.status(200).send(user)
  }
  catch (error) {
    console.log(error)
    res.status(400).send(error)
  }

}

const add_user = async (req, res) => {
  console.log('body: ', req.body)
  const { name, password } = req.body
  try {
    const user = await User.findOne({ name: name })
    if (user) {
      return res.status(400).json({
        error: name,
        message: `An account already exists with ${name}`,
      })
    }
    // Create user
    const newUser = new User({ name: name, password: password })
    await newUser.save()
    res.status(200).send(newUser)
  }
  catch (error) {
    console.error(error)
    return res.status(500).send()
  }
}

const update_user = async (req, res) => {
  try {
    const { name, password } = req.body;
    const isUser = await User.findOne({ name: name })
    if (isUser && isUser.id !== req.params.id)
      res.status(400).json('The name is already chosen. Please choose another name.');
    else {
      const user = await User.findOne({ _id: req.params.id });
      user.name = req.body.name;
      user.password = req.body.password;
      await user.save();
      res.status(200).send('success')
    }
  }
  catch (error) {
    res.json(error);
  }
}

const delete_user = async (req, res) => {
  const id = req.params.id
  try {
    await User.deleteOne({ _id: id })
    res.status(200).send('success')
  }
  catch (error) {
    console.log(error)
    res.json(error)
  }
}

module.exports = {
  get_users,
  get_user,
  add_user,
  update_user,
  delete_user
}
