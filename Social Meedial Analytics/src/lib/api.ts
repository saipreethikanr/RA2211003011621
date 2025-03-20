
import { User, Post, Comment, UsersResponse, PostsResponse, CommentsResponse } from '@/types/social';

const BASE_URL = 'http://20.244.56.144/test';

// Common fetch utility with error handling and timeout
const fetchWithTimeout = async (url: string, timeout = 5000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timed out');
    }
    console.error('Fetch error:', error);
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
};

// Social Media API
export const getUsers = async (): Promise<Record<string, string>> => {
  try {
    const data: UsersResponse = await fetchWithTimeout(`${BASE_URL}/users`);
    return data.users || {};
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getUserPosts = async (userId: string): Promise<Post[]> => {
  try {
    const data: PostsResponse = await fetchWithTimeout(`${BASE_URL}/users/${userId}/posts`);
    return data.posts || [];
  } catch (error) {
    console.error(`Error fetching posts for user ${userId}:`, error);
    throw error;
  }
};

export const getPostComments = async (postId: number): Promise<Comment[]> => {
  try {
    const data: CommentsResponse = await fetchWithTimeout(`${BASE_URL}/posts/${postId}/comments`);
    return data.comments || [];
  } catch (error) {
    console.error(`Error fetching comments for post ${postId}:`, error);
    throw error;
  }
};

// Helper functions for combining data
export const getAllPosts = async (): Promise<Post[]> => {
  try {
    // Get all users
    const users = await getUsers();
    
    // For each user, get their posts and concatenate
    const postsPromises = Object.keys(users).map(async (userId) => {
      try {
        const userPosts = await getUserPosts(userId);
        // Add the username to each post
        return userPosts.map(post => ({
          ...post,
          userName: users[userId],
          // Add timestamp if not provided by API
          timestamp: post.timestamp || new Date().toISOString()
        }));
      } catch (error) {
        console.error(`Error fetching posts for user ${userId}:`, error);
        return [];
      }
    });
    
    const postsArrays = await Promise.all(postsPromises);
    return postsArrays.flat();
  } catch (error) {
    console.error('Error fetching all posts:', error);
    throw error;
  }
};

// Get post with comment counts
export const getPostsWithCommentCounts = async (): Promise<Post[]> => {
  try {
    const posts = await getAllPosts();
    
    // For each post, get its comments to determine comment count
    const postsWithCommentsPromises = posts.map(async (post) => {
      try {
        const comments = await getPostComments(post.id);
        return {
          ...post,
          commentCount: comments.length
        };
      } catch (error) {
        console.error(`Error fetching comments for post ${post.id}:`, error);
        return {
          ...post,
          commentCount: 0
        };
      }
    });
    
    return await Promise.all(postsWithCommentsPromises);
  } catch (error) {
    console.error('Error getting posts with comment counts:', error);
    throw error;
  }
};

// Average Calculator API
export enum NumberType {
  PRIME = 'p',
  FIBONACCI = 'f',
  EVEN = 'e',
  RANDOM = 'r'
}

export const getNumbers = async (type: NumberType): Promise<number[]> => {
  const endpoints = {
    [NumberType.PRIME]: 'primes',
    [NumberType.FIBONACCI]: 'fibo',
    [NumberType.EVEN]: 'even',
    [NumberType.RANDOM]: 'rand'
  };
  
  try {
    const data = await fetchWithTimeout(`${BASE_URL}/${endpoints[type]}`);
    return data.numbers || [];
  } catch (error) {
    console.error(`Error fetching ${endpoints[type]} numbers:`, error);
    throw error;
  }
};
