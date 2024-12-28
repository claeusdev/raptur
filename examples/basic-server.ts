import { Raptur } from "../dist/router";

const router = new Raptur();

router
  .get('/api/users', async (req, res) => {
    res.json({ users: ['John', 'Jane'] });
  })
  .get('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    res.json({ userId: id });
  })
  .post('/api/users', async (req, res) => {
    const body = await req.json();
    res.status(201).json({ message: 'User created', data: body });
  });

router.start();

