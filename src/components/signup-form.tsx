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
import { Field, FieldGroup, FieldLabel, FieldDescription } from "./ui/field";
import { Input } from "./ui/input";
import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { 
    register, 
    handleSubmit, 
    watch,
    formState: { errors } 
  } = useForm<FormData>();
  
  const password = watch('password', '');
  
  const onSubmit = async (data: FormData) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.name,
          },
        },
      });

      if (error) throw error;

      toast.success("Account created successfully! Please check your email to confirm your account.");
      router.push('/auth/signin');
    } catch (error) {
      console.error('Signup error:', error);
      toast.error("Error creating account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input 
                id="name" 
                type="text" 
                placeholder="John Doe" 
                {...register("name", { 
                  required: "Name is required",
                  minLength: { value: 2, message: "Name must be at least 2 characters" }
                })} 
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </Field>
            
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
              <FieldDescription>
                We'll use this to contact you. We will not share your email with anyone else.
              </FieldDescription>
            </Field>
            
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                {...register("password", { 
                  required: "Password is required",
                  minLength: { 
                    value: 8, 
                    message: "Password must be at least 8 characters" 
                  }
                })} 
              />
              {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>
            
            <Field>
              <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
              <Input 
                id="confirmPassword" 
                type="password" 
                placeholder="••••••••" 
                {...register("confirmPassword", { 
                  required: "Please confirm your password",
                  validate: value => value === password || "Passwords do not match"
                })} 
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
              )}
            </Field>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center text-sm">
        <span className="text-muted-foreground">
          Already have an account?{' '}
          <Link href="/auth/signin" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </span>
      </CardFooter>
    </Card>
  )
}
