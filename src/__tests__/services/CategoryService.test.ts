import { describe, it, expect, vi } from "vitest";
import { CategoryService } from "../../services/CategoryService";

describe("CategoryService", () => {
  it("should throw 409 if category already exists", async () => {
    const repo: any = {
      findByName: vi.fn().mockResolvedValue({ id: 1, name: "Test", userId: 1 }),
      create: vi.fn(),
    };

    const service = new CategoryService(repo);

    await expect(
      service.createCategory({ name: "Test", userId: 1 }),
    ).rejects.toMatchObject({ status: 409 });
  });

  it("should throw 404 when no categories found", async () => {
    const repo: any = {
      findAllByUserId: vi.fn().mockResolvedValue(null),
    };

    const service = new CategoryService(repo);

    await expect(service.getAllCategories(1)).rejects.toMatchObject({
      status: 404,
    });
  });

  it("should return category by id", async () => {
    const expected = { id: 1, name: "Cat", userId: 1 };
    const repo: any = {
      findById: vi.fn().mockResolvedValue(expected),
    };

    const service = new CategoryService(repo);

    const result = await service.getCategoryById(1, 1);

    expect(result).toEqual(expected);
  });
});
