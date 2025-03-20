
import { useQuery } from "@tanstack/react-query";
import { getUsers, getUserPosts, getAllPosts, getPostsWithCommentCounts } from "@/lib/api";
import { User, Post, SocialResponse } from "@/types/social";

export const useUsers = (): SocialResponse<User[]> => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const usersObj = await getUsers();
      
      // Convert the response object to an array of users with IDs
      const usersArray = Object.entries(usersObj).map(([id, name]) => ({
        id,
        name: name as string,
      }));
      
      // Get post counts for each user
      const usersWithPostCounts = await Promise.all(
        usersArray.map(async (user) => {
          try {
            const posts = await getUserPosts(user.id);
            return {
              ...user,
              postCount: posts.length,
            };
          } catch (error) {
            console.error(`Error getting posts for user ${user.id}:`, error);
            return {
              ...user,
              postCount: 0,
            };
          }
        })
      );
      
      return usersWithPostCounts;
    },
    retry: 2,
    retryDelay: 1000,
  });

  return {
    data: data || [],
    isLoading,
    isError,
    error: error as Error | null,
  };
};

export const useTopUsers = (limit: number = 5): SocialResponse<User[]> => {
  const { data, isLoading, isError, error } = useUsers();
  
  const sortedUsers = [...(data || [])].sort((a, b) => 
    (b.postCount || 0) - (a.postCount || 0)
  ).slice(0, limit);
  
  return {
    data: sortedUsers,
    isLoading,
    isError,
    error,
  };
};

export const usePosts = (): SocialResponse<Post[]> => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: getAllPosts,
    retry: 2,
    retryDelay: 1000,
  });

  return {
    data: data || [],
    isLoading,
    isError,
    error: error as Error | null,
  };
};

export const useTrendingPosts = (): SocialResponse<Post[]> => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["trending-posts"],
    queryFn: getPostsWithCommentCounts,
    retry: 2,
    retryDelay: 1000,
  });
  
  const sortedPosts = [...(data || [])].sort((a, b) => 
    (b.commentCount || 0) - (a.commentCount || 0)
  );
  
  return {
    data: sortedPosts,
    isLoading,
    isError,
    error,
  };
};
