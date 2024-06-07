import type { JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    'src/Presentation/UseCases/Posts/CreatePost/CreatePostUC.test.ts',
    'src/Presentation/UseCases/Posts/DeletePost/DeletePostUC.test.ts',
    'src/Presentation/UseCases/Posts/ReadAllPost/ReadAllPostUC.test.ts',
    'src/Presentation/UseCases/Posts/ReadPost/ReadPostUC.test.ts',
    'src/Presentation/UseCases/Posts/UpdatePost/UpdatePostUC.test.ts',
    'src/Presentation/UseCases/Users/CreateUser/CreateUserUC.test.ts',
    'src/Presentation/UseCases/Users/LoginUser/LoginUserUC.test.ts',
    'src/Presentation/UseCases/Users/DeleteUser/DeleteUserUC.test.ts',
    'src/Presentation/UseCases/Users/ReadAllUsers/ReadAllUserUC.test.ts',
    'src/Presentation/UseCases/Users/ReadUser/ReadUserUC.test.ts',
    // 'src/Presentation/UseCases/Users/UpdateUser/UpdateUserUC.test.ts',
    'src/Presentation/UseCases/Users/ResetPwdUser/ResetPwdUserUC.test.ts',
    'src/Presentation/UseCases/Chat/CreateChat/CreateChatUC.test.ts',
    'src/Presentation/UseCases/Chat/CreateMessage/CreateMessageUC.test.ts',
    'src/Presentation/UseCases/Chat/ReadMessage/ReadMessageUC.test.ts'
  ],
};

export default jestConfig;
