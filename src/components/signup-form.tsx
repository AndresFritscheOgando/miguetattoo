"use client";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useForm } from "react-hook-form";
import { Field, FieldGroup, FieldLabel, FieldDescription } from "./ui/field";
import { Input } from "./ui/input";
import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import {toast} from "sonner";

interface FormData {
  email: string;
  password: string;
  name?: string; // Optional since it's only used in signup
}

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [isSignup, setIsSignup] = useState(true);

  const { register, handleSubmit } = useForm<FormData>();
  
  const onSubmit = async (data: FormData) => {
    if (isSignup) {
      const { error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });
      toast.success("Account created successfully");
      if (signUpError) {
        console.error(signUpError);
      }
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      if (signInError) {
        console.error(signInError);
      }
      toast.success("Account signed in successfully");
    }
  };


  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input id="name" {...register("name", { required: true })} type="text" placeholder="John Doe" />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                {...register("email", { required: true })}
                type="email"
                placeholder="m@example.com"
              />
              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" {...register("password", { required: true })} type="password" placeholder="John Doe" />
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button onClick={() => setIsSignup(true)} type="submit">Create Account</Button>
                <Button variant="outline" onClick={() => setIsSignup(false)} type="button">
                  Sign up with Google
                </Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <a href="#">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
