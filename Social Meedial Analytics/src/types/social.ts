
export interface User {
  id: string;
  name: string;
  postCount?: number;
}

export interface UsersResponse {
  users: Record<string, string>;
}

export interface Post {
  id: number;
  userId: number;
  content: string;
  userName?: string;
  commentCount?: number;
  timestamp?: string;
}

export interface PostsResponse {
  posts: Post[];
}

export interface Comment {
  id: number;
  postId: number;
  content: string;
  userId?: number;
  userName?: string;
}

export interface CommentsResponse {
  comments: Comment[];
}

export interface SocialResponse<T> {
  data: T;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}
