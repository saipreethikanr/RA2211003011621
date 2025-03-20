
import { User, Post } from "../types/social";

// Mock Users
export const users: User[] = [
  { id: 1, name: "John Doe", postCount: 42 },
  { id: 2, name: "Jane Smith", postCount: 38 },
  { id: 3, name: "Robert Johnson", postCount: 31 },
  { id: 4, name: "Emily Brown", postCount: 27 },
  { id: 5, name: "Michael Davis", postCount: 24 },
  { id: 6, name: "Sarah Wilson", postCount: 19 },
  { id: 7, name: "David Taylor", postCount: 17 },
  { id: 8, name: "Lisa Anderson", postCount: 15 },
];

// Mock Posts
export const posts: Post[] = [
  {
    id: 1,
    userId: 1,
    userName: "John Doe",
    content: "Just released a new project! Check out my portfolio for more details.",
    commentCount: 28,
    timestamp: "2023-06-15T14:30:00Z"
  },
  {
    id: 2,
    userId: 2,
    userName: "Jane Smith",
    content: "Beautiful sunset at the beach today. Nature is truly amazing! #sunset #beachlife",
    commentCount: 24,
    timestamp: "2023-06-15T18:45:00Z"
  },
  {
    id: 3,
    userId: 3,
    userName: "Robert Johnson",
    content: "Learning a new programming language is always exciting. Starting with Rust today!",
    commentCount: 19,
    timestamp: "2023-06-16T09:15:00Z"
  },
  {
    id: 4,
    userId: 4,
    userName: "Emily Brown",
    content: "Just finished reading an amazing book. Highly recommend 'Project Hail Mary'!",
    commentCount: 16,
    timestamp: "2023-06-16T12:00:00Z"
  },
  {
    id: 5,
    userId: 5,
    userName: "Michael Davis",
    content: "Finally got my hands on the new gadget everyone's talking about. Initial impressions: WOW!",
    commentCount: 15,
    timestamp: "2023-06-16T15:30:00Z"
  },
  {
    id: 6,
    userId: 1,
    userName: "John Doe",
    content: "Working on a major update for my app. Can't wait to share it with everyone!",
    commentCount: 14,
    timestamp: "2023-06-17T08:45:00Z"
  },
  {
    id: 7,
    userId: 6,
    userName: "Sarah Wilson",
    content: "Just completed my first marathon! Exhausted but feeling accomplished. #running #marathon",
    commentCount: 21,
    timestamp: "2023-06-17T16:20:00Z"
  },
  {
    id: 8,
    userId: 2,
    userName: "Jane Smith",
    content: "Trying out a new recipe for dinner tonight. Wish me luck! #cooking #foodie",
    commentCount: 13,
    timestamp: "2023-06-18T17:45:00Z"
  },
  {
    id: 9,
    userId: 7,
    userName: "David Taylor",
    content: "Just adopted a rescue puppy! Meet Luna, the newest member of our family. #dogsofinstagram",
    commentCount: 32,
    timestamp: "2023-06-18T19:30:00Z"
  },
  {
    id: 10,
    userId: 3,
    userName: "Robert Johnson",
    content: "Attended an amazing tech conference this weekend. Got so many new ideas!",
    commentCount: 18,
    timestamp: "2023-06-19T10:15:00Z"
  },
];

// Get Top Users
export const getTopUsers = (limit: number = 5): User[] => {
  return [...users]
    .sort((a, b) => b.postCount - a.postCount)
    .slice(0, limit);
};

// Get Trending Posts
export const getTrendingPosts = (): Post[] => {
  return [...posts]
    .sort((a, b) => b.commentCount - a.commentCount);
};

// Get Feed (newest first)
export const getFeed = (): Post[] => {
  return [...posts]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

// Simulate adding a new post
let nextPostId = posts.length + 1;
export const addNewPost = (userId: number, content: string): Post => {
  const user = users.find(u => u.id === userId);
  if (!user) throw new Error("User not found");
  
  const newPost: Post = {
    id: nextPostId++,
    userId,
    userName: user.name,
    content,
    commentCount: 0,
    timestamp: new Date().toISOString()
  };
  
  posts.unshift(newPost);
  user.postCount += 1;
  
  return newPost;
};
