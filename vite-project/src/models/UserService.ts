import axios from 'axios';
import { Participant } from './Participant';

const API_URL = 'https://fakeapi.platzi.com/en/rest/users/';

class UserService {
    async getParticipants(): Promise<Participant[]> {
      const response = await axios.get<Participant[]>(API_URL);
      return response.data;
    }
  }

export default new UserService();
