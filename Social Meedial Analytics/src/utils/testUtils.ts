
/**
 * Utility functions for testing API responses and data structures
 */

import { User, Post, Comment } from "@/types/social";

// Test if the users object structure is valid
export const validateUsersResponse = (users: Record<string, string>): boolean => {
  if (!users || typeof users !== 'object') return false;
  
  // Check if it's a key-value object with string values
  return Object.entries(users).every(([key, value]) => 
    typeof key === 'string' && typeof value === 'string'
  );
};

// Test if a user object is valid
export const validateUser = (user: User): boolean => {
  return (
    typeof user.id === 'string' &&
    typeof user.name === 'string' &&
    (user.postCount === undefined || typeof user.postCount === 'number')
  );
};

// Test if a post object is valid
export const validatePost = (post: Post): boolean => {
  return (
    typeof post.id === 'number' &&
    typeof post.userId === 'number' &&
    typeof post.content === 'string' &&
    (post.userName === undefined || typeof post.userName === 'string') &&
    (post.commentCount === undefined || typeof post.commentCount === 'number') &&
    (post.timestamp === undefined || typeof post.timestamp === 'string')
  );
};

// Test if a comment object is valid
export const validateComment = (comment: Comment): boolean => {
  return (
    typeof comment.id === 'number' &&
    typeof comment.postId === 'number' &&
    typeof comment.content === 'string' &&
    (comment.userId === undefined || typeof comment.userId === 'number') &&
    (comment.userName === undefined || typeof comment.userName === 'string')
  );
};

// Sort users by post count
export const sortUsersByPostCount = (users: User[]): User[] => {
  return [...users].sort((a, b) => (b.postCount || 0) - (a.postCount || 0));
};

// Sort posts by comment count
export const sortPostsByCommentCount = (posts: Post[]): Post[] => {
  return [...posts].sort((a, b) => (b.commentCount || 0) - (a.commentCount || 0));
};

// Check if API responses match expected formats
export const testApiResponses = async (
  getApiFunction: () => Promise<any>,
  validateFunction: (data: any) => boolean
): Promise<{ success: boolean; message?: string; data?: any }> => {
  try {
    const data = await getApiFunction();
    const isValid = validateFunction(data);
    
    if (isValid) {
      return { 
        success: true, 
        data 
      };
    } else {
      return { 
        success: false, 
        message: 'Invalid data structure',
        data
      };
    }
  } catch (error) {
    return { 
      success: false, 
      message: error.message || 'Unknown error'
    };
  }
};
