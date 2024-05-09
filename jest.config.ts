import type { JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    './src/Presentation/UseCases/CreateUser/CreateUserUC.test.ts',
    './src/Presentation/UseCases/ReadUser/ReadUserUC.test.ts',
    './src/Presentation/UseCases/ReadAllUsers/ReadAllUserUC.test.ts',
    './src/Presentation/UseCases/DeleteUser/DeleteUserUC.test.ts',
    // './src/Presentation/UseCases/UpdateUser/UpdateUserUC.test.ts',
    './src/Presentation/UseCases/CreatePost/CreatePostUC.test.ts',
    './src/Presentation/UseCases/ReadPost/ReadPostUC.test.ts',
    './src/Presentation/UseCases/ReadAllPost/ReadAllPostUC.test.ts',
    './src/Presentation/UseCases/UpdatePost/UpdatePostUC.test.ts',
    './src/Presentation/UseCases/DeletePost/DeletePostUC.test.ts',

  ],
};

export default jestConfig;
