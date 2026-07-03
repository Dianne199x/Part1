import { test, expect } from '@playwright/test';

// Define the shape of the object for type safety
interface ObjectData {
  year: number;
  price: number;
  "CPU model": string;
  "Hard disk size"?: string;
}

interface ApiObject {
  id: string;
  name: string;
  data: ObjectData;
}

test.describe('API CRUD Operations (TypeScript)', () => {
  let objectId: string;

  // 1. Create (POST)
  test('should create a new object', async ({ request }) => {
    const response = await request.post('https://api.restful-api.dev/objects', {
      data: {
        name: "Apple MacBook Pro 16",
        data: { year: 2026, price: 2499.99, "CPU model": "Apple M4 Pro" }
      }
    });
    
    expect(response.ok()).toBeTruthy();
    const body: ApiObject = await response.json();
    objectId = body.id;
    expect(body.name).toBe("Apple MacBook Pro 16");
  });

  // 2. Read (GET)
  test('should read the created object', async ({ request }) => {
    const response = await request.get(`https://api.restful-api.dev/objects/${objectId}`);
    expect(response.status()).toBe(200);
    
    const body: ApiObject = await response.json();
    expect(body.id).toBe(objectId);
  });

  // 3. Update (PUT)
  test('should update the object', async ({ request }) => {
    const response = await request.put(`https://api.restful-api.dev/objects/${objectId}`, {
      data: {
        name: "Apple MacBook Pro 16",
        data: { 
          year: 2026, 
          price: 2399.99, 
          "CPU model": "Apple M4 Pro", 
          "Hard disk size": "1 TB" 
        }
      }
    });
    
    expect(response.status()).toBe(200);
    const body: ApiObject = await response.json();
    expect(body.data.price).toBe(2399.99);
  });

  // 4. Delete (DELETE)
  test('should delete the object', async ({ request }) => {
    const response = await request.delete(`https://api.restful-api.dev/objects/${objectId}`);
    expect(response.status()).toBe(200);
  });

  // 5. Negative Case (GET Invalid ID)
  test('should return 404 for invalid ID', async ({ request }) => {
    const response = await request.get('https://api.restful-api.dev/objects/invalid-id-999');
    expect(response.status()).toBe(404);
  });
});