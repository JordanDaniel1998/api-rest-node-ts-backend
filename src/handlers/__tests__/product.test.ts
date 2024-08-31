import request from "supertest";
import server from "../../server";

describe("POST /api/products", () => {
  it("Should display validation errors", async () => {
    const response = await request(server).post("/api/products").send({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(4);
  });

  it("Should validate that the price is greater than 0", async () => {
    const response = await request(server).post("/api/products").send({
      name: "Puerba de Test",
      price: 0,
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
  });

  it("Should validate that the price is a number and greater than 0", async () => {
    const response = await request(server).post("/api/products").send({
      name: "Puerba de Test",
      price: "Hola",
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
  });

  it("Should create a new product", async () => {
    const response = await request(server).post("/api/products").send({
      name: "Mouses Testing",
      price: "300",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("data");
  });
});

describe("GET /api/products", () => {
  it("GET a JSON response with products", async () => {
    const response = await request(server).get("/api/products");
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toHaveProperty("data");
  });
});

describe("GET /api/products", () => {
  it("Should return a 404 response fo a non-existent product", async () => {
    const productId = 9999;
    const response = await request(server).get(`/api/products/${productId}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
  });

  it("Should return a 404 response fo a non-existent product", async () => {
    const productId = 9999;
    const response = await request(server).get(`/api/products/${productId}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
  });

  it("Should check a valid ID in the URL", async () => {
    const response = await request(server).get(`/api/products/not-valid-url`);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
  });

  it("get a JSON response for a single product", async () => {
    const response = await request(server).get(`/api/products/1`);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("data");
  });
});

describe("PUT /api/products", () => {
  it("Should display validation error messages when updating a product", async () => {
    const productId = 1;
    const response = await request(server)
      .put(`/api/products/${productId}`)
      .send({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toBeTruthy();
  });

  it("Should check a valid ID in the URL", async () => {
    const response = await request(server)
      .put(`/api/products/not-valid-url`)
      .send({
        name: "Monitor Nuevo - Actualizado",
        price: "950",
        availability: true,
      });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
  });

  it("Should validate that the price is greater than 0", async () => {
    const productId = 1;
    const response = await request(server)
      .put(`/api/products/${productId}`)
      .send({
        name: "Monitor Nuevo - Actualizado",
        price: "0",
        availability: true,
      });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toBeTruthy();
  });

  it("Should validate that availability is boolean", async () => {
    const productId = 1;
    const response = await request(server)
      .put(`/api/products/${productId}`)
      .send({
        name: "Monitor Nuevo - Actualizado",
        price: "0",
        availability: "no-true",
      });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toBeTruthy();
  });

  it("Should return 404 response for a non-existent product", async () => {
    const productId = 1000;
    const response = await request(server)
      .put(`/api/products/${productId}`)
      .send({
        name: "Monitor Nuevo - Actualizado",
        price: "300",
        availability: true,
      });
    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Producto no encontrado");
  });

  it("Should update an existing product with valid data", async () => {
    const productId = 1;
    const response = await request(server)
      .put(`/api/products/${productId}`)
      .send({
        name: "Monitor Nuevo - Actualizado",
        price: "300",
        availability: true,
      });
    expect(response.status).toBe(200);
    expect(response.body).not.toHaveProperty("errors");
  });
});

describe("PATCH /api/products", () => {
  it("Should return a 404 response for a non-existing product", async () => {
    const productId = 1000;
    const response = await request(server).patch(`/api/products/${productId}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBeTruthy();
  });

  it("Should check a valid ID in the URL", async () => {
    const response = await request(server).patch(`/api/products/not-valid-url`);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
  });

  it("Should update the product availability", async () => {
    const productId = 1;
    const response = await request(server).patch(`/api/products/${productId}`);
    expect(response.status).toBe(200);
  });
});

describe("DELETE /api/products", () => {
  it("Should check a valid Id", async () => {
    const response = await request(server).delete(
      `/api/products/not-valid-url`
    );
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
  });

  it("Should return 404 response for a non-existent product", async () => {
    const productId = 1000;
    const response = await request(server).delete(`/api/products/${productId}`);
    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Producto no encontrado");
  });

  it("Should delete an existing product", async () => {
    const productId = 1;
    const response = await request(server).delete(`/api/products/${productId}`);
    expect(response.status).toBe(200);
    expect(response.body).not.toHaveProperty("errors");
  });
});
