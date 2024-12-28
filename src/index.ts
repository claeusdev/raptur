import { RapturRequest } from "./request";
import { RapturResponse } from "./response";
import { Raptur } from "./router";

const router: Raptur = new Raptur()

router
  .get('/api/users', async (req: RapturRequest, res: RapturResponse) => {
    res.json({ users: ['John', 'Jane'] });
  })
  .get('/api/users/:id', async (req: RapturRequest, res: RapturResponse) => {
    const { id } = req.params;
    res.json({ userId: id });
  })
  .post('/api/users', async (req: RapturRequest, res: RapturResponse) => {
    const body = await req.json();
    res.status(201).json({ message: 'User created', data: body });
  });

router.start()
