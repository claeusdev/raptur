# 🦖 Raptur

<!--[![npm version](https://img.shields.io/npm/v/raptor-router.svg)](https://www.npmjs.com/package/raptor-router)-->
<!--[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)-->
<!--[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)-->
<!--[![Build Status](https://img.shields.io/github/workflow/status/yourusername/raptor-router/CI)](https://github.com/yourusername/raptor-router/actions)-->

```
     __    _                   
    / _)  / \        /\  /\    
   /(_)(  \_/       /  \/  \   
  (____)\  _    ___/   /\   \  
       U  (_)  (___/   \/   /  
           _    _  \_      /   
          (____(__  \_____/    
```

Raptur Router is a lightning-fast, TypeScript-first HTTP router for Node.js. Built with performance and developer experience in mind, it provides a clean, chainable API for building web applications.

## Features

- 🚀 Simple routing
- 💪 Built with TypeScript
- 🎯 Type safety
- ⚡️ Async/await support
- 🔍 URL parameter parsing
- 📦 Zero dependencies
- 🛠 Chainable API
- 🦕 Prehistoric power!

## Installation

```bash
npm install raptur
```

## Quick Start

```typescript
import { Raptur } from 'raptur';

const app = new Raptur();

app
  .get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from Raptur! 🦖' });
  })
  .get('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    res.json({ userId: id });
  })
  .post('/api/users', async (req, res) => {
    const body = await req.json();
    res.status(201).json({ message: 'User created', data: body });
  });

app.listen(3000, () => {
  console.log('🦖 Raptur is hunting on port 3000');
});
```

## API Reference

### Creating a Router

```typescript
import { Raptur } from 'raptur';
const app = new Raptur();
```

### Route Methods

```typescript
app.get(path: string, handler: RouteHandler);
app.post(path: string, handler: RouteHandler);
app.put(path: string, handler: RouteHandler);
app.delete(path: string, handler: RouteHandler);
```

### Request Object

```typescript
interface RapturRequest {
  params: Record<string, string>;    // URL parameters
  query: Record<string, string>;     // Query string parameters
  headers: http.IncomingHttpHeaders; // Request headers
  json(): Promise<any>;              // Parse JSON body
}
```

### Response Object

```typescript
interface RapturResponse {
  status(code: number): RapturResponse;
  json(data: any): void;
  send(data: string): void;
  setHeader(name: string, value: string): RapturResponse;
}
```

## URL Parameters

Raptur supports dynamic URL parameters with the `:param` syntax:

```typescript
app.get('/api/users/:id/posts/:postId', (req, res) => {
  const { id, postId } = req.params;
  res.json({ userId: id, postId });
});
```

## Query Parameters

Access query parameters through the `query` object:

```typescript
// GET /api/search?q=raptor&sort=desc
app.get('/api/search', (req, res) => {
  const { q, sort } = req.query;
  res.json({ searchTerm: q, sortOrder: sort });
});
```

## Body Parsing

Parse JSON request bodies with the `json()` method:

```typescript
app.post('/api/data', async (req, res) => {
  const body = await req.json();
  res.json({ received: body });
});
```

## Error Handling

Raptur automatically handles route errors:

```typescript
app.get('/api/error', async (req, res) => {
  throw new Error('Something went wrong');
  // Automatically returns 500 Internal Server Error
});
```

## Examples

### Basic REST API

```typescript
app
  .get('/api/items', async (req, res) => {
    const items = await getItems();
    res.json(items);
  })
  .post('/api/items', async (req, res) => {
    const body = await req.json();
    const newItem = await createItem(body);
    res.status(201).json(newItem);
  })
  .get('/api/items/:id', async (req, res) => {
    const item = await getItem(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  })
  .delete('/api/items/:id', async (req, res) => {
    await deleteItem(req.params.id);
    res.status(204).send('');
  });
```

## Contributing

We welcome contributions! Please feel free to submit a Pull Request. Check out our contributing guidelines for more information.

## License

MIT © [Nana Adjei Manu]

## Credits

ASCII art logo generated with love and prehistoric power! 🦖

---

Happy routing with Raptur! 🦕
