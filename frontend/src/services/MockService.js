class MockService {
  createGame = async () => {
    return 'abc';
  }

  getBaseUrl = () => {
    return 'localhost:3000';
  }
}

export default MockService;