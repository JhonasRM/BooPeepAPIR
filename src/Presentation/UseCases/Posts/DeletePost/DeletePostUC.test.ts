import { DeletePostController } from './DeletePostController';
import { DeletePostUC } from './DeletePostUC';
import { Request, Response } from 'express';
import { PostRepository } from '../../../../Service/Repositories/PostRepository';
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

describe('DeletePostController', () => {
  let deletePostUC: DeletePostUC;
  let deletePostController: DeletePostController;

  beforeEach(() => {
    const postRepository = new PostRepository();
    deletePostUC = new DeletePostUC(postRepository);
    deletePostController = new DeletePostController(deletePostUC);
  });

  test('Successfully deleting an existing post', async () => {
    const req = mockRequest({ postID: 'existingPostID' });
    const res = mockResponse();

    jest.spyOn(deletePostUC, 'execute').mockResolvedValue({
      val: true,
      data: 'Post deleted successfully'
    } as IReturnAdapter);

    await deletePostController.handle(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith('Post deleted successfully');
  });

  test('Attempting to delete a non-existing post', async () => {
    const req = mockRequest({ postID: 'nonExistingPostID' });
    const res = mockResponse();

    jest.spyOn(deletePostUC, 'execute').mockResolvedValue({
      val: false,
      erro: 'Postagem não encontrada'
    } as IReturnAdapter);

    await deletePostController.handle(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith('Erro: Postagem não encontrada');
  });

  test('Handling other errors during post deletion', async () => {
    const req = mockRequest({ postID: 'existingPostID' });
    const res = mockResponse();

    jest.spyOn(deletePostUC, 'execute').mockResolvedValue({
      val: false,
      erro: 'Some other error'
    } as IReturnAdapter);

    await deletePostController.handle(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('Erro: Erro de requisição: Some other error');
  });
});
