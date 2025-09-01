const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
     it("Testea que la ruta GET /cafes devuelve un status code 200 y el tipo de dato recibido es un arreglo con por lo menos 1 objeto", async () => {
    const response = await request(server).get("/cafes");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(typeof response.body[0]).toBe("object");
  });

  it("Comprueba que se obtiene un código 404 al intentar eliminar un café con un id que no existe", async () => {
    const response = await request(server)
      .delete("/cafes/8").send()
      .set("Authorization", "Bearer token_valido");

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe(`No se encontró ningún cafe con ese id`);
  });

  it("Prueba que la ruta POST /cafes agrega un nuevo café y devuelve un código 201", async () => {
    const newCafe = {
      id: 5,
      nombre: "Matcha Latte",
    };

    const response = await request(server).post("/cafes").send(newCafe);
    expect(response.statusCode).toBe(201);
    expect(response.body).toContainEqual(newCafe);
  });

  it("Prueba que la ruta PUT /cafes devuelve un status code 400 si intentas actualizar un café enviando un id en los parámetros que sea diferente al id dentro del payload", async () => {
    const updateCafe = {
      id: 1,
      nombre: "Chai Latte",
    };
    
    const response = await request(server).put("/cafes/2").send(updateCafe);
    expect(response.statusCode).toBe(400);
  });
});
