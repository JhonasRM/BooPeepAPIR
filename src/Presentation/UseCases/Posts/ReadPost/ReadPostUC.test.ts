import { PostRepository } from "../../../../Service/Repositories/PostRepository";
import { ReadPostUC } from "./ReadPostUC";
import { ReadPostController } from "./ReadPostController";
import { Request, Response } from 'express';
import { IReturnAdapter } from "../../../../utils/Interfaces/IReturnAdapter";
import { Post } from "../../../../Service/Model/Post";

jest.mock("../../../../Service/Repositories/PostRepository");

const mockRequest = (params: any): Request => ({
  params,
} as unknown as Request);

const mockResponse = (): Response => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe('ReadPostController', () => {
  let postRepository: jest.Mocked<PostRepository>;
  let readPostUC: ReadPostUC;
  let readPostController: ReadPostController;

  beforeEach(() => {
    postRepository = new PostRepository() as jest.Mocked<PostRepository>;
    readPostUC = new ReadPostUC(postRepository);
    readPostController = new ReadPostController(readPostUC);
  });

  test('should return a post', async () => {
    const req = mockRequest({ postId: '2EFlzO3EXQwcfSBbSfSa' });
    const res = mockResponse();

    const mockPost: Post = {
      postId: '2EFlzO3EXQwcfSBbSfSa',
      description: 'NewPost',
      local: 'Etec Zona Leste',
      status: 0,
      UserID: 'user1',
      createdAt: 1712280874172
    };

    postRepository.getPost.mockResolvedValue({
      val: true,
      data: mockPost,
    } as IReturnAdapter);

    await readPostController.handle(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockPost);
  });

  test('should handle post not found', async () => {
    const req = mockRequest({ postId: '1' });
    const res = mockResponse();

    postRepository.getPost.mockResolvedValue({
      val: false,
      erro: 'Postagem não encontrada',
    } as IReturnAdapter);

    await readPostController.handle(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith('Postagem não encontrada');
  });

  test('should handle other errors', async () => {
    const req = mockRequest({ postId: '2EFlzO3EXQwcfSBbSfSa' });
    const res = mockResponse();

    postRepository.getPost.mockResolvedValue({
      val: false,
      erro: 'Some other error',
    } as IReturnAdapter);

    await readPostController.handle(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('Erro de requisição: Some other error');
  });
});
