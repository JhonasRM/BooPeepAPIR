import { PostRepository } from "../../../Service/Repositories/PostRepository";

describe('UserRepository function getAllPosts to return a Array List of Posts from Firebase', () => {
    let postRepository: PostRepository

    beforeAll(() => {
        postRepository = new PostRepository()
    });
    test('Deleting Non existing Post By ID returning error', async () => {
        const nonExistingID = '1'
        const WantedPost = await postRepository.DeletePost(nonExistingID)
    expect(WantedPost).toEqual('Erro ao deletar documento: Post Não Encontrado')
    }, 100000);
    test('Delete  existing Post By ID returning error', async () => {
      const ExistingID = '2EFlzO3EXQwcfSBbSfSa'
      const WantedPost = await postRepository.findByID(ExistingID)
      expect(WantedPost).not.toBeNull()
    }, 100000);
})