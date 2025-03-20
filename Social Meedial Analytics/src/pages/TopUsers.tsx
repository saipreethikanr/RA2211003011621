
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getTopUsers } from "@/data/mockData";
import { User } from "@/types/social";

const TopUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        const data = getTopUsers(5);
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout title="Top Users">
      <div className="max-w-4xl mx-auto">
        <p className="text-muted-foreground mb-6">
          The top 5 users with the highest number of posts
        </p>

        <div className="space-y-4">
          {loading ? (
            // Loading skeletons
            Array(5).fill(0).map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Skeleton className="w-12 h-12 rounded-full" />
                      <Skeleton className="h-6 w-32" />
                    </div>
                    <Skeleton className="h-8 w-20" />
                  </div>
                </CardHeader>
              </Card>
            ))
          ) : (
            // Actual user data
            users.map((user, index) => (
              <Card key={user.id} className="overflow-hidden transition-all duration-200 hover:shadow-md">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-lg">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">#{index + 1} Top User</p>
                        <CardTitle>{user.name}</CardTitle>
                      </div>
                    </div>
                    <div className="px-4 py-1 bg-primary/10 text-primary rounded-full font-medium">
                      {user.postCount} Posts
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default TopUsers;
