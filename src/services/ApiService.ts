import axios, { AxiosInstance } from 'axios';
import { GroupInterface } from '../interfaces/GroupInterface';

export class ApiService {
  private static instance: ApiService;
  private axiosInstance: AxiosInstance;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'http://192.168.1.167:3000', 
      timeout: 5000
    });
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  async fetchGroups(): Promise<GroupInterface[]> {
    try {
      const response = await this.axiosInstance.get<GroupInterface[]>('/items');
      return response.data;
    } catch (error) {
      console.error('Error fetching groups:', error);
      return [];
    }
  }

  async updateGroups(groups: GroupInterface[]): Promise<GroupInterface[]> {
    try {
      const response = await this.axiosInstance.post<GroupInterface[]>('/items', groups);
      return response.data;
    } catch (error) {
      console.error('Error updating groups:', error);
      return groups;
    }
  }
}