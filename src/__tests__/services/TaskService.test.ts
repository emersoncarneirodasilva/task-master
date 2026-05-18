import { describe, it, expect, vi } from "vitest";
import { TaskService } from "../../services/TaskService";

describe("TaskService", () => {
  it("should throw 400 for invalid deadline string", async () => {
    const repo: any = {
      create: vi.fn(),
    };

    const service = new TaskService(repo);

    await expect(
      service.createTask(1, {
        title: "t",
        priority: "LOW",
        status: "TODO",
        deadline: "invalid-date",
      } as any),
    ).rejects.toMatchObject({ status: 400 });
  });

  it("should create task and return result", async () => {
    const created = { id: 1, title: "t" };
    const repo: any = {
      create: vi.fn().mockResolvedValue(created),
    };

    const service = new TaskService(repo);

    const result = await service.createTask(1, {
      title: "t",
      priority: "LOW",
      status: "TODO",
      deadline: new Date(),
    } as any);

    expect(result).toEqual(created);
  });

  it("should throw 404 when getAllTasks returns falsy", async () => {
    const repo: any = {
      findAllByUserId: vi.fn().mockResolvedValue(null),
    };

    const service = new TaskService(repo);

    await expect(service.getAllTasks(1, {} as any)).rejects.toMatchObject({
      status: 404,
    });
  });
});
