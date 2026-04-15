"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginSchema, loginTypeSchemas } from "@/schemas/auth.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import Link from 'next/link';
import Image from "next/image";

export default function Login() {
  const router = useRouter()
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handelLogin(data: loginTypeSchemas) {
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    })

    if (response?.ok) {
      router.push("/")
      router.refresh()
      toast.success("Welcome back! Login successful")
    } else {
      toast.error(response?.error || "Login failed. Please check your credentials.")
    }
  }

  return (
    <main className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link className="inline-flex items-center gap-1.5 mb-6" href="/">
            <div className='flex items-center justify-center text-primary'>
              <Image src="/images/logo.svg" alt="Logo" width={180} height={100} />
            </div>

          </Link>
          <h2 className="text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <Link href="/register" className="font-bold text-primary hover:text-emerald-700 transition-colors">
              create a new account
            </Link>
          </p>
        </div>

        <Card className="p-8 border-gray-100 shadow-xl rounded-3xl bg-white">
          <form className="space-y-6" onSubmit={form.handleSubmit(handelLogin)}>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name} className="text-gray-700 font-bold text-xs uppercase tracking-wider">Email Address</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="john@example.com"
                    type="email"
                    className="h-12 rounded-xl bg-gray-50 border-gray-100 focus:bg-white focus:ring-primary/20"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex justify-between items-center mb-1">
                    <FieldLabel htmlFor={field.name} className="text-gray-700 font-bold text-xs uppercase tracking-wider">Password</FieldLabel>
                    <Link href="/" className="text-xs font-bold text-primary hover:text-emerald-700">Forgot password?</Link>
                  </div>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="••••••••"
                    type="password"
                    className="h-12 rounded-xl bg-gray-50 border-gray-100 focus:bg-white focus:ring-primary/20"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Button className="w-full h-12 rounded-xl bg-primary hover:bg-emerald-700 text-white font-bold text-lg transition-all shadow-lg shadow-primary/20" type="submit">
              Sign In
            </Button>
          </form>
        </Card>
      </div>
    </main>
  );
}
