"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface FormData {
  email: string;
  password: string;
}

export function SigninForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  
  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        throw error;
      }

      toast.success("Successfully signed in!");
      router.push('/admin');
      router.refresh();
    } catch (error) {
      toast.error("Error signing in. Please check your credentials.");
      console.error('Sign in error:', error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email", { required: true })}
              />
              {errors.email && <p className="text-sm text-red-500">Email is required</p>}
            </Field>
            <Field>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <a href="#" className="text-sm font-medium text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password", { required: true })}
              />
              {errors.password && <p className="text-sm text-red-500">Password is required</p>}
            </Field>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center text-sm">
        <span className="text-muted-foreground">
          Don't have an account?{' '}
          <Link href="/auth/signup" className="font-medium text-primary hover:underline">
            Sign up
          </Link>
        </span>
      </CardFooter>
    </Card>
  );
}
