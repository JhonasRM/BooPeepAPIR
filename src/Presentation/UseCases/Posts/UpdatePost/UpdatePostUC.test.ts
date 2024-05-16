import { PostRepository } from "../../../../Service/Repositories/PostRepository";

describe('UserRepository function getAllPosts to return a Array List of Posts from Firebase', () => {
    let postRepository: PostRepository

    beforeAll(() => {
        postRepository = new PostRepository()
    });
    test('Update a Post with a non existing postID', async () => {
        const updatedPost = await postRepository.updatePostField('sdasdada', 'description', 'Post do Jhonas Lindão')
        expect(updatedPost).toEqual('Documento não encontrado')
    }, 100000);
    test('Update a Post with a non existing field', async () => {
        const updatedPost = await postRepository.updatePostField('2EFlzO3EXQwcfSBbSfSa', 'email', 'Post do Jhonas Lindão')
        expect(updatedPost).toEqual('O campo requerido não existe no documento')
    }, 100000);
    test('Update a Post with a value that do not agree with the fields value', async () => {
        const updatedPost = await postRepository.updatePostField('2EFlzO3EXQwcfSBbSfSa', 'description', 12)
        expect(updatedPost).toEqual('O tipo do valor anterior do campo requerido não corresponde ao tipo do novo valor')
    }, 100000);
    test('Update a Post with correct data', async () => {
        const updatedPost = await postRepository.updatePostField('2EFlzO3EXQwcfSBbSfSa', 'description', 'Post do Jhonas Lindão')
        expect(updatedPost).toEqual('Campo atualizado com sucesso')
    }, 100000);
})