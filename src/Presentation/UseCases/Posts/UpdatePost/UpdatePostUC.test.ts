import { Request, Response } from 'express';
import { UpdatePostUC } from "./UpdatePostUC";
import { UpdatePostController } from "./UpdatePostController";
import { PostRepository } from "../../../../Service/Repositories/PostRepository";
import { IUpdatePostRequestDTO } from "./UpdatePostDTO";
import { IReturnAdapter } from "../../../../utils/Interfaces/IReturnAdapter";
import { Post } from "../../../../Service/Model/Post";

jest.mock("../../../../Service/Repositories/PostRepository");

const mockRequest = (body: any): Request => ({
  body,
} as unknown as Request);

const mockResponse = (): Response => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe('UpdatePostController', () => {
  let postRepository: jest.Mocked<PostRepository>;
  let updatePostUC: UpdatePostUC;
  let updatePostController: UpdatePostController;

  beforeEach(() => {
    postRepository = new PostRepository() as jest.Mocked<PostRepository>;
    updatePostUC = new UpdatePostUC(postRepository);
    updatePostController = new UpdatePostController(updatePostUC);
  });

  test('deve lidar com ID de post inexistente', async () => {
    const req = mockRequest({ postId: 'nonExistingID', fieldToUpdate: 'description', newValue: 'Nova Descrição' });
    const res = mockResponse();

    postRepository.updatePostField.mockResolvedValue({
      val: false,
      erro: 'Documento não encontrado',
    } as IReturnAdapter);

    await updatePostController.handle(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith('Erro: postagem não encontrada');
  });

  test('deve lidar com campo inexistente', async () => {
    const req = mockRequest({ postId: 'existingID', fieldToUpdate: 'nonExistingField', newValue: 'Novo Valor' });
    const res = mockResponse();

    postRepository.updatePostField.mockResolvedValue({
      val: false,
      erro: 'O campo requerido não existe no documento',
    } as IReturnAdapter);

    await updatePostController.handle(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('Erro de requisição: verifique os campos e valores preenchidos');
  });

  test('deve lidar com tipo de valor de campo incorreto', async () => {
    const req = mockRequest({ postId: 'existingID', fieldToUpdate: 'description', newValue: 123 });
    const res = mockResponse();

    postRepository.updatePostField.mockResolvedValue({
      val: false,
      erro: 'O tipo do valor anterior do campo requerido não corresponde ao tipo do novo valor',
    } as IReturnAdapter);

    await updatePostController.handle(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('Erro de requisição: verifique os campos e valores preenchidos');
  });

  test('deve atualizar post com sucesso', async () => {
    const req = mockRequest({ postId: 'existingID', fieldToUpdate: 'description', newValue: 'Descrição Atualizada' });
    const res = mockResponse();

    postRepository.updatePostField.mockResolvedValue({
      val: true,
      data: 'Campo atualizado com sucesso',
    } as IReturnAdapter);

    await updatePostController.handle(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith('Campo atualizado com sucesso');
  });
});
