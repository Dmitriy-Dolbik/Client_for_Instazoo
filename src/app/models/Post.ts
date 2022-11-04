import {Comment} from './Comment';

export interface Post{
  id?: number;//Знак "?" означает, что id не обязателен
  title: string;
  caption: string;
  location: string;
  image?: File;
  likes?: number;
  likedUsers?: string[];
  comments?: Comment [];
  username: string;
}
