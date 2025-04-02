
import React from "react";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { AnimatedGradientBackground } from "@/components/ui/animated-gradient-background";
import { Spotlight } from "@/components/ui/spotlight";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type PlanFeature = {
  text: string;
  included: boolean;
};

type Plan = {
  name: string;
  price: number | string;
  description: string;
  buttonText: string;
  features: PlanFeature[];
  highlighted?: boolean;
};

const plans: Plan[] = [
  {
    name: "Starter",
    price: 0,
    description: "Best for personal projects and learning",
    buttonText: "Get Started",
    features: [
      { text: "40+ Components", included: true },
      { text: "Tailwind CSS Support", included: true },
      { text: "Basic Customization", included: true },
      { text: "Responsive Design", included: true },
      { text: "Community Support", included: true },
      { text: "TypeScript Support", included: false },
      { text: "Advanced Theming", included: false },
      { text: "Premium Components", included: false },
      { text: "Priority Support", included: false },
      { text: "Commercial License", included: false },
    ],
  },
  {
    name: "Pro",
    price: 49,
    description: "For professional developers and teams",
    buttonText: "Purchase License",
    features: [
      { text: "40+ Components", included: true },
      { text: "Tailwind CSS Support", included: true },
      { text: "Advanced Customization", included: true },
      { text: "Responsive Design", included: true },
      { text: "Community Support", included: true },
      { text: "TypeScript Support", included: true },
      { text: "Advanced Theming", included: true },
      { text: "Premium Components", included: true },
      { text: "Priority Support", included: false },
      { text: "Commercial License", included: true },
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Contact Us",
    description: "Custom solutions for large organizations",
    buttonText: "Contact Sales",
    features: [
      { text: "40+ Components", included: true },
      { text: "Tailwind CSS Support", included: true },
      { text: "Advanced Customization", included: true },
      { text: "Responsive Design", included: true },
      { text: "Community Support", included: true },
      { text: "TypeScript Support", included: true },
      { text: "Advanced Theming", included: true },
      { text: "Premium Components", included: true },
      { text: "Priority Support", included: true },
      { text: "Commercial License", included: true },
    ],
  },
];

const faqs = [
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, PayPal, and bank transfers for team plans. We don't store your payment information on our servers.",
  },
  {
    question: "Can I cancel my subscription at any time?",
    answer:
      "Yes, you can cancel your subscription at any time from your account settings. You'll continue to have access until the end of your billing period.",
  },
  {
    question: "Do you offer discounts for students or non-profits?",
    answer:
      "Yes, we offer special pricing for students, educational institutions, and non-profit organizations. Please contact our support team for more information.",
  },
  {
    question: "How often do you release updates?",
    answer:
      "We release updates and new components regularly, typically every 2-3 weeks. All updates are included in your subscription at no additional cost.",
  },
  {
    question: "Can I use the components in multiple projects?",
    answer:
      "For the Starter plan, you can use components in personal projects only. Pro and Enterprise plans allow usage in multiple commercial projects based on the license terms.",
  },
];

const PricingPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground pb-16">
      <AnimatedGradientBackground>
        <div className="container px-4 md:px-6 pt-16 pb-16">
          <div className="relative">
            <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" />
            <div className="relative z-10 mx-auto max-w-4xl text-center">
              <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                Pricing Plans
              </div>
              <h1 className="mt-6 text-4xl font-bold sm:text-5xl md:text-6xl tracking-tight">
                Simple, transparent pricing
              </h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground">
                Choose the plan that's right for your project. All plans include access to all components.
              </p>
            </div>

            {/* Pricing Cards */}
            <div className="mx-auto mt-16 grid grid-cols-1 gap-8 md:max-w-5xl md:grid-cols-3">
              {plans.map((plan, i) => (
                <div
                  key={i}
                  className={cn(
                    "relative rounded-2xl border bg-card shadow-sm transition-shadow hover:shadow-md",
                    plan.highlighted
                      ? "border-primary/50 ring-1 ring-primary/20"
                      : "border-border"
                  )}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-5 right-0 left-0 mx-auto w-32 rounded-full bg-primary px-3 py-1 text-center text-xs font-medium text-primary-foreground">
                      Most Popular
                    </div>
                  )}

                  <div className="p-6">
                    <h3 className="text-2xl font-bold">{plan.name}</h3>

                    <div className="mt-4 flex items-baseline">
                      {typeof plan.price === "number" ? (
                        <>
                          <span className="text-4xl font-bold">${plan.price}</span>
                          <span className="ml-1 text-sm text-muted-foreground">/month</span>
                        </>
                      ) : (
                        <span className="text-3xl font-bold">{plan.price}</span>
                      )}
                    </div>

                    <p className="mt-2 text-muted-foreground">{plan.description}</p>

                    <Button
                      className={cn(
                        "mt-6 w-full",
                        plan.highlighted ? "" : "bg-muted hover:bg-muted/80"
                      )}
                      variant={plan.highlighted ? "default" : "outline"}
                    >
                      {plan.buttonText}
                    </Button>
                  </div>

                  <Separator className="my-0" />

                  <div className="p-6">
                    <p className="font-medium">Features included:</p>
                    <ul className="mt-4 space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          {feature.included ? (
                            <div className="rounded-full bg-primary/10 p-1">
                              <Check className="h-4 w-4 text-primary" />
                            </div>
                          ) : (
                            <div className="rounded-full bg-muted p-1">
                              <X className="h-4 w-4 text-muted-foreground" />
                            </div>
                          )}
                          <span
                            className={
                              feature.included ? "" : "text-muted-foreground"
                            }
                          >
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Feature comparison */}
            <div className="mx-auto mt-24 max-w-5xl">
              <h2 className="text-center text-3xl font-bold">Compare Plans</h2>
              <p className="mt-4 text-center text-muted-foreground">
                A detailed look at what's included in each plan
              </p>

              <div className="mt-12 overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="py-4 text-left font-medium">Features</th>
                      {plans.map((plan) => (
                        <th
                          key={plan.name}
                          className="py-4 px-6 text-left font-medium"
                        >
                          {plan.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-4 font-medium">Components Access</td>
                      <td className="py-4 px-6">
                        <span className="text-primary">40+ components</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-primary">50+ components</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-primary">All components</span>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-4 font-medium">Use in Projects</td>
                      <td className="py-4 px-6">Personal only</td>
                      <td className="py-4 px-6">Unlimited</td>
                      <td className="py-4 px-6">Unlimited</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-4 font-medium">Support</td>
                      <td className="py-4 px-6">Community</td>
                      <td className="py-4 px-6">Email</td>
                      <td className="py-4 px-6">Priority</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-4 font-medium">Advanced Theming</td>
                      <td className="py-4 px-6">
                        <X className="h-5 w-5 text-muted-foreground" />
                      </td>
                      <td className="py-4 px-6">
                        <Check className="h-5 w-5 text-primary" />
                      </td>
                      <td className="py-4 px-6">
                        <Check className="h-5 w-5 text-primary" />
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-4 font-medium">Private Slack</td>
                      <td className="py-4 px-6">
                        <X className="h-5 w-5 text-muted-foreground" />
                      </td>
                      <td className="py-4 px-6">
                        <X className="h-5 w-5 text-muted-foreground" />
                      </td>
                      <td className="py-4 px-6">
                        <Check className="h-5 w-5 text-primary" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mx-auto mt-24 max-w-3xl">
              <h2 className="text-center text-3xl font-bold">
                Frequently Asked Questions
              </h2>
              <div className="mt-12 grid gap-6">
                {faqs.map((faq, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-border/50 bg-card p-6 shadow-sm"
                  >
                    <h3 className="text-lg font-semibold">{faq.question}</h3>
                    <p className="mt-2 text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <div className="mx-auto mt-24 max-w-3xl rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center">
              <h2 className="text-3xl font-bold">Need a custom solution?</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Contact us for enterprise-grade support, custom development, and
                dedicated resources for your organization.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg">Contact Sales</Button>
                <Button size="lg" variant="outline">
                  <Link to="/components">View Components</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </AnimatedGradientBackground>
    </div>
  );
};

export default PricingPage;
