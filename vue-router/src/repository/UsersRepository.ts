// src/repository/UsersRepository.ts
import axios from 'axios';
import { Participant } from '../models/Participant';
import { User } from '../models/User';

const BASE_URL = 'https://api.escuelajs.co/api/v1/users';

export default {
  async fetchParticipants(): Promise<Participant[]> {
    try {
      const response = await axios.get<User[]>(BASE_URL); // Указываем, что ожидаем массив User
      return response.data.map((user: User) => ({
        name: user.name,
        dateOfBirth: 'N/A',
        email: user.email,
        phoneNumber: 'N/A',
        password: '',
        avatar: user.avatar || '',
      }));
    } catch (error) {
      console.error("Ошибка при загрузке данных участников:", error);
      return [];
    }
  },
};
