type JestMock<T extends (...args: any[]) => any> = T & jest.Mock;
