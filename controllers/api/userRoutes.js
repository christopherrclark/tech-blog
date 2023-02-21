const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
// const withAuth = require('../../utils/auth');


// get all users
router.get('/', async (req, res) => {
  try {
    //password security
    let getAllUsers = await User.findAll({ attributes: { exclude: ['password'] } });
    
    res.status(200).json(getAllUsers);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get individual user
router.get('/:id', async (req, res) => {
  const individualUser = req.params.id;
  try {
    const getIndividualUser = await User.findone({
    attributes: { exclude: ['password'] },
    where: { id: individualUser },
    include: [
        {
          model: Post,
          attributes: ['id', 'title', 'content', 'created_at']
        },
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: Post,
            attributes: ['title']
          }
        },
        {
          model: Post,
          attributes: ['title']
   }]});
  if (!getIndividualUser) {
    res.status(404).json({ message: 'No user found with this id' });
    return;
  } else {
    res.status(200).json(getIndividualUser);
  }
} catch (err) {
    res.status(500).json(err);
    console.log(err);
    return;
  }  
});

//update a individual user
router.put('/:id', async (req, res) => {
  const individualUser = req.params.id;
  try {
    let updateIndividualUser = await User.update({
      individualHooks: true,
      where: {
        id: individualUser
      }
    })
    if(!updateIndividualUser[0]) {
      res.status(404).send("Sorry, no user found!")
      return
    } else {
      res.json(updateIndividualUser);
    }
  } catch (err) {
    console.log(err);
    res.statusMessage(500).json(err)
  }
});

//delete a individual user
router.delete('/:id', async (req, res) => {
  const findIndividualUser = req.params.id;
  try {
    let getIndividualUser = User.destroy({
      where: {
        id: findIndividualUser
      }
    })
      if (!getIndividualUser) {
        res.status(404).send("Sorry, no user found!")
      } else {
        res.json(getIndividualUser)
      }
    } catch (err) {
      console.log(err);
      res.statusMessage(500).json(err)
    }
});

// create a new user
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);
    
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  }  catch (err) {
      res.status(400).json(err);
      console.log(err);
  }
});

//user login validation
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

//user logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
