import { describe, it, expect, vi, beforeEach } from "vitest";
import { UserService } from "../../services/UserService";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

beforeEach(() => {
  vi.restoreAllMocks();
});

describe("UserService", () => {
  it("should throw 409 when registering existing user", async () => {
    const repo: any = {
      findByEmail: vi.fn().mockResolvedValue({ id: 1, email: "a@b.com" }),
    };

    const service = new UserService(repo);

    await expect(
      service.register({ name: "a", email: "a@b.com", password: "p" }),
    ).rejects.toMatchObject({ status: 409 });
  });

  it("login should throw 404 when user not found", async () => {
    const repo: any = {
      findByEmail: vi.fn().mockResolvedValue(null),
    };

    const service = new UserService(repo);

    await expect(service.login("a@b.com", "p")).rejects.toMatchObject({
      status: 404,
    });
  });

  it("login should throw 401 when password invalid", async () => {
    const repo: any = {
      findByEmail: vi.fn().mockResolvedValue({
        id: 1,
        email: "a@b.com",
        password: "hash",
        name: "n",
      }),
    };

    vi.spyOn(bcrypt, "compare").mockResolvedValue(false as any);

    const service = new UserService(repo);

    await expect(service.login("a@b.com", "wrong")).rejects.toMatchObject({
      status: 401,
    });
  });

  it("login should return token and user on success", async () => {
    const repo: any = {
      findByEmail: vi.fn().mockResolvedValue({
        id: 1,
        email: "a@b.com",
        password: "hash",
        name: "n",
      }),
    };

    vi.spyOn(bcrypt, "compare").mockResolvedValue(true as any);
    vi.spyOn(jwt, "sign").mockReturnValue("tok" as any);

    process.env.JWT_SECRET = "secret";

    const service = new UserService(repo);

    const result = await service.login("a@b.com", "pwd");

    expect(result).toHaveProperty("token", "tok");
    expect(result.user).toEqual({ id: 1, name: "n", email: "a@b.com" });
  });

  it("getUserById should throw 404 when not found", async () => {
    const repo: any = { findById: vi.fn().mockResolvedValue(null) };
    const service = new UserService(repo);

    await expect(service.getUserById(1)).rejects.toMatchObject({ status: 404 });
  });

  it("getUserById should return user without password", async () => {
    const repo: any = {
      findById: vi.fn().mockResolvedValue({
        id: 1,
        name: "n",
        email: "a@b.com",
        password: "x",
      }),
    };
    const service = new UserService(repo);

    const result = await service.getUserById(1);

    expect(result).toEqual({ id: 1, name: "n", email: "a@b.com" });
  });

  it("changePassword should throw 401 when old password invalid", async () => {
    const repo: any = {
      findById: vi.fn().mockResolvedValue({ id: 1, password: "hash" }),
    };
    vi.spyOn(bcrypt, "compare").mockResolvedValue(false as any);

    const service = new UserService(repo);

    await expect(service.changePassword(1, "new", "old")).rejects.toMatchObject(
      { status: 401 },
    );
  });

  it("changePassword should update password on success", async () => {
    const repo: any = {
      findById: vi.fn().mockResolvedValue({ id: 1, password: "oldhash" }),
      update: vi.fn().mockResolvedValue({ id: 1, password: "newhash" }),
    };

    vi.spyOn(bcrypt, "compare").mockResolvedValue(true as any);
    vi.spyOn(bcrypt, "hash").mockResolvedValue("newhash" as any);

    const service = new UserService(repo);

    const result = await service.changePassword(1, "new", "old");

    expect(result).toEqual({ id: 1, password: "newhash" });
  });
});
