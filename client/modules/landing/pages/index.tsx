import React from "react";
import { Header } from "../components";
import Link from "next/link";
import { DollarSign, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {};

const Landing = (props: Props) => {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between">
        <Link
          href="#"
          className="flex items-center justify-center"
          prefetch={false}
        >
          <DollarSign className="h-6 w-6" />
          <span className="sr-only">Fintech App</span>
        </Link>
        <div className="flex items-center gap-4">
          <Button variant="outline">
            <UserIcon className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Manage Your Finances with Ease
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Our finance app helps you track your income, expenses, and
                    investments all in one place.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
              <img
                src="/placeholder.svg"
                width="550"
                height="550"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container space-y-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Powerful Tools for Your Finances
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our finance app offers a suite of features to help you manage
                  your money with confidence.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-sm items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Budgeting</h3>
                <p className="text-sm text-muted-foreground">
                  Create and track your monthly budgets to stay on top of your
                  spending.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Expense Tracking</h3>
                <p className="text-sm text-muted-foreground">
                  Easily categorize and monitor your expenses to identify areas
                  for savings.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Investment Management</h3>
                <p className="text-sm text-muted-foreground">
                  Manage your investment portfolio and track your returns in one
                  place.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Bill Pay</h3>
                <p className="text-sm text-muted-foreground">
                  Never miss a payment with our integrated bill pay feature.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Reporting</h3>
                <p className="text-sm text-muted-foreground">
                  Generate detailed financial reports to gain insights into your
                  spending and savings.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Mobile App</h3>
                <p className="text-sm text-muted-foreground">
                  Stay on top of your finances with our user-friendly mobile
                  app.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; 2024 Fintech App. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Privacy Policy
          </Link>
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Contact Us
          </Link>
        </nav>
      </footer>
    </div>
  );
};

export default Landing;
