import request from "supertest";
import server, { connectDB } from "../server";
import db from "../config/db";

jest.mock("../config/db");

describe("connect DB", () => {
  it("Should handle database connection error", async () => {
    jest
      .spyOn(db, "authenticate")
      .mockRejectedValueOnce(new Error("Hubo un error al conectar la BD"));

    const spy = jest.spyOn(console, "log");
    await connectDB();
    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining("Hubo un error al conectar la BD")
    );
  });
});
