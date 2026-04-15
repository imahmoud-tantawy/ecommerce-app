"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { registerSchema, registerTypeSchemas } from "@/schemas/auth.schemas";
import { registerUser } from "@/services/auth.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import Link from 'next/link';
import Image from "next/image";

export default function Register() {
  const router = useRouter()
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });

  async function handelRegister(data: registerTypeSchemas) {
    const response = await registerUser(data);
    if (response.message === "success") {
      router.push("/login")
      toast.success("Account created successfully! Please sign in.")
    } else {
      toast.error(response.message || "Registration failed. Please try again.")
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link className="inline-flex items-center gap-1.5 mb-6" href="/">
            <div className='flex items-center justify-center text-primary'>
              <Image src="/images/logo.svg" alt="Logo" width={180} height={100} />

            </div>
          </Link>
          <h2 className="text-3xl font-extrabold text-gray-900">Create an account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="font-bold text-primary hover:text-emerald-700 transition-colors">
              Sign In
            </Link>
          </p>
        </div>

        <Card className="p-8 border-gray-100 shadow-xl rounded-3xl bg-white">
          <form className="space-y-4" onSubmit={form.handleSubmit(handelRegister)}>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name} className="text-gray-700 font-bold text-xs uppercase tracking-wider">Full Name</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="John Doe"
                    type="text"
                    className="h-11 rounded-xl bg-gray-50 border-gray-100 focus:bg-white focus:ring-primary/20"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

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
                    className="h-11 rounded-xl bg-gray-50 border-gray-100 focus:bg-white focus:ring-primary/20"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name} className="text-gray-700 font-bold text-xs uppercase tracking-wider">Phone Number</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="01xxxxxxxxx"
                    type="text"
                    className="h-11 rounded-xl bg-gray-50 border-gray-100 focus:bg-white focus:ring-primary/20"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name} className="text-gray-700 font-bold text-xs uppercase tracking-wider">Password</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="••••••••"
                      type="password"
                      className="h-11 rounded-xl bg-gray-50 border-gray-100 focus:bg-white focus:ring-primary/20"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="rePassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name} className="text-gray-700 font-bold text-xs uppercase tracking-wider">Confirm</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="••••••••"
                      type="password"
                      className="h-11 rounded-xl bg-gray-50 border-gray-100 focus:bg-white focus:ring-primary/20"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <Button className="w-full h-12 rounded-xl bg-primary hover:bg-emerald-700 text-white font-bold text-lg transition-all shadow-lg shadow-primary/20 mt-4" type="submit">
              Register Now
            </Button>

            <p className="text-[10px] text-gray-400 text-center mt-4 px-4 line-clamp-2">
              By clicking Register Now, you agree to our <Link href="/" className="text-primary hover:underline">Terms of Service</Link> and <Link href="/" className="text-primary hover:underline">Privacy Policy</Link>.
            </p>
          </form>
        </Card>
      </div>
    </main>
  );
}
