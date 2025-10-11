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

export function SigninForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [isSignup, setIsSignup] = useState(true);

  const { register, handleSubmit } = useForm<FormData>();
  
  const onSubmit = async (data: FormData) => {
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    toast.success("Account signed in successfully");
    if (signInError) {
      console.error(signInError);
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
                <Button type="submit" onClick={() => setIsSignup(true)}>Sign In</Button>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
