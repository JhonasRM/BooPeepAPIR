// // import { ReadAllPostUC } from './ReadAllPostUC';
// import { PostRepository } from '../../../../Service/Repositories/PostRepository';
// import { IReturnAdapter } from '../../../../utils/Interfaces/IReturnAdapter';
// import { Post } from '../../../../Service/Model/Post';

// jest.mock('../../../../Service/Repositories/PostRepository');

// describe('ReadAllPostUC', () => {
//   let postRepository: jest.Mocked<PostRepository>;
//   let readAllPostUC: ReadAllPostUC;

//   beforeEach(() => {
//     postRepository = new PostRepository() as jest.Mocked<PostRepository>;
//     readAllPostUC = new ReadAllPostUC(postRepository);
//   });

//   test('should return an array of posts', async () => {
//     const mockPosts: Post[] = [
//       { id: '1', description: 'Post 1', local: 'Location 1', status: 1, UserID: 'user1' },
//       { id: '2', description: 'Post 2', local: 'Location 2', status: 2, UserID: 'user2' },
//     ];

//     postRepository.getPosts.mockResolvedValue({
//       val: true,
//       data: mockPosts,
//     } as IReturnAdapter);

//     const result = await readAllPostUC.execute();

//     expect(result.val).toBe(true);
//     expect(result.data).toEqual(mockPosts);
//   });

//   test('should handle no posts found', async () => {
//     postRepository.getPosts.mockResolvedValue({
//       val: false,
//       erro: 'Nenhuma postagem encontrada',
//     } as IReturnAdapter);

//     const result = await readAllPostUC.execute();

//     expect(result.val).toBe(false);
//     expect(result.erro).toBe('Nenhuma postagem encontrada');
//   });

//   test('should handle errors from the repository', async () => {
//     postRepository.getPosts.mockRejectedValue(new Error('Some other error'));

//     const result = await readAllPostUC.execute();

//     expect(result.val).toBe(false);
//     expect(result.erro).toBe('Some other error');
//   });
// });
