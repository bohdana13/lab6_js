import axios from 'axios';
import { User } from '../models/User';

const BASE_URL = 'https://api.escuelajs.co/api/v1/users';

export default {
  async fetchParticipants(): Promise<User[]> {
    try {
      const response = await axios.get<User[]>(BASE_URL);
      return response.data.map((user: User) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password || '',
        role: user.role || 'user',
        avatar: user.avatar || '',
      }));
    } catch (error) {
      console.error("error while loading users data:", error);
      return [];
    }
  },
};
