
import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, Check } from "lucide-react";

const UIKitShowcase = () => {
  return (
    <section className="py-16 px-6 md:px-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#333]">
            Beautiful, Accessible Components
          </h2>
          <p className="text-xl text-[#666] max-w-3xl mx-auto">
            Explore some of our components in action. Every component is designed with
            accessibility and usability in mind.
          </p>
        </div>

        <div className="mt-12">
          <Tabs defaultValue="components" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="components">Components</TabsTrigger>
              <TabsTrigger value="forms">Forms</TabsTrigger>
              <TabsTrigger value="cards">Cards</TabsTrigger>
            </TabsList>
            
            <TabsContent value="components" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="space-y-4 p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-lg font-medium">Buttons</h3>
                  <Separator />
                  <div className="space-y-2">
                    <Button>Primary Button</Button>
                    <div className="flex gap-2 flex-wrap">
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="outline">Outline</Button>
                      <Button variant="ghost">Ghost</Button>
                    </div>
                    <Button variant="destructive">Destructive</Button>
                  </div>
                </div>
                
                <div className="space-y-4 p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-lg font-medium">Badges</h3>
                  <Separator />
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <Badge>Default</Badge>
                      <Badge variant="secondary">Secondary</Badge>
                      <Badge variant="outline">Outline</Badge>
                      <Badge variant="destructive">Destructive</Badge>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-green-500 hover:bg-green-600">Success</Badge>
                      <Badge className="bg-yellow-500 hover:bg-yellow-600">Warning</Badge>
                      <Badge className="bg-blue-500 hover:bg-blue-600">Info</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4 p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-lg font-medium">Toggle</h3>
                  <Separator />
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch id="airplane-mode" />
                      <Label htmlFor="airplane-mode">Airplane Mode</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="notifications" defaultChecked />
                      <Label htmlFor="notifications">Enable Notifications</Label>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="forms" className="space-y-8">
              <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Login Form</h3>
                  <Separator />
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" placeholder="Email address" type="email" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" placeholder="Password" type="password" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="remember" />
                      <Label htmlFor="remember">Remember me</Label>
                    </div>
                    <Button className="w-full">Log in</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="cards" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Starter Plan</CardTitle>
                    <CardDescription>Perfect for small projects</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold mb-4">$9<span className="text-sm font-normal text-gray-500">/month</span></div>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        <span>Core components</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        <span>Basic themes</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">Get Started</Button>
                  </CardFooter>
                </Card>
                
                <Card className="border-primary">
                  <CardHeader className="bg-primary text-primary-foreground">
                    <div className="text-xs font-bold uppercase tracking-wide mb-2">Most Popular</div>
                    <CardTitle>Pro Plan</CardTitle>
                    <CardDescription className="text-primary-foreground/90">For growing businesses</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold mb-4">$29<span className="text-sm font-normal text-gray-500">/month</span></div>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        <span>All core components</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        <span>Premium themes</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        <span>Advanced templates</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Get Started</Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Enterprise Plan</CardTitle>
                    <CardDescription>For large organizations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold mb-4">$99<span className="text-sm font-normal text-gray-500">/month</span></div>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        <span>All Pro features</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        <span>Priority support</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        <span>Custom integration</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">Contact Sales</Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="text-center mt-12">
          <Button className="bg-[#6A9D80] hover:bg-[#5D8B72]">
            View Documentation
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default UIKitShowcase;
