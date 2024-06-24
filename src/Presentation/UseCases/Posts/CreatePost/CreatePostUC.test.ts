import { Request, Response } from 'express';
import { CreatePostController } from './CreatePostController';
import { CreatePostUC } from './CreatePostUC';
import { ICreatePostRequestDTO } from './CreatePostDTO';
import { PostRepository } from '../../../../Service/Repositories/PostRepository';
import { UserFireStoreRepository } from '../../../../Service/Repositories/UserFireStoreRepository';
import { UserAuthRepository } from '../../../../Service/Repositories/UserAuthRepository';
import { IReturnAdapter } from '../../../../utils/Interfaces/IReturnAdapter';

const mockRequest = (body: any): Request => ({
  body,
} as Request);

const mockResponse = (): Response => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe('CreatePostController', () => {
  let createPostUC: CreatePostUC;
  let createPostController: CreatePostController;

  beforeEach(() => {
    const postRepository = new PostRepository();
    const userFireStoreRepository = new UserFireStoreRepository();
    const userAuthRepository = new UserAuthRepository();

    createPostUC = new CreatePostUC(postRepository, userFireStoreRepository, userAuthRepository);
    createPostController = new CreatePostController(createPostUC);
  });

  it('should create a post successfully', async () => {
    const req = mockRequest({
      description: 'Test description',
      local: 'Test location',
      status: 1,
      UserID: '12345'
    });
    const res = mockResponse();

    jest.spyOn(createPostUC, 'execute').mockResolvedValue({
      val: true,
      data: { id: '1', description: 'Test description', local: 'Test location', status: 1, UserID: '12345' }
    } as IReturnAdapter);

    await createPostController.handle(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith({
      id: '1',
      description: 'Test description',
      local: 'Test location',
      status: 1,
      UserID: '12345'
    });
  });

  it('should return 404 if user not found', async () => {
    const req = mockRequest({
      description: 'Test description',
      local: 'Test location',
      status: 1,
      UserID: '12345'
    });
    const res = mockResponse();

    jest.spyOn(createPostUC, 'execute').mockResolvedValue({
      val: false,
      erro: 'Usuário não encontrado'
    } as IReturnAdapter);

    await createPostController.handle(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith('Usuário não encontrado');
  });

  it('should return 400 for other errors', async () => {
    const req = mockRequest({
      description: 'Test description',
      local: 'Test location',
      status: 1,
      UserID: '12345'
    });
    const res = mockResponse();

    jest.spyOn(createPostUC, 'execute').mockResolvedValue({
      val: false,
      erro: 'Some other error'
    } as IReturnAdapter);

    await createPostController.handle(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('Some other error');
  });
});

