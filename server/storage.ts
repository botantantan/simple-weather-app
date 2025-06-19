import { users, searchHistory, type User, type InsertUser, type SearchHistory, type InsertSearchHistory } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getSearchHistory(): Promise<SearchHistory[]>;
  addToSearchHistory(search: InsertSearchHistory): Promise<SearchHistory>;
  clearSearchHistory(): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private searchHistoryData: Map<number, SearchHistory>;
  private currentUserId: number;
  private currentHistoryId: number;

  constructor() {
    this.users = new Map();
    this.searchHistoryData = new Map();
    this.currentUserId = 1;
    this.currentHistoryId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getSearchHistory(): Promise<SearchHistory[]> {
    return Array.from(this.searchHistoryData.values())
      .sort((a, b) => b.searchedAt.getTime() - a.searchedAt.getTime())
      .slice(0, 10); // Return last 10 searches
  }

  async addToSearchHistory(search: InsertSearchHistory): Promise<SearchHistory> {
    const id = this.currentHistoryId++;
    const historyItem: SearchHistory = {
      id,
      cityName: search.cityName,
      country: search.country || null,
      lat: search.lat,
      lon: search.lon,
      temperature: search.temperature || null,
      weatherCondition: search.weatherCondition || null,
      searchedAt: new Date(),
    };
    this.searchHistoryData.set(id, historyItem);
    return historyItem;
  }

  async clearSearchHistory(): Promise<void> {
    this.searchHistoryData.clear();
  }
}

export const storage = new MemStorage();
