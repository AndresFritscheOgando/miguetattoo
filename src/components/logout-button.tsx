"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase/client";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast.success("Successfully signed out");
      router.push('/auth/signin');
      router.refresh();
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error("Error signing out. Please try again.");
    }
  };

  return (
    <Button 
      variant="outline" 
      onClick={handleLogout}
      className="w-full"
    >
      Sign Out
    </Button>
  );
}
