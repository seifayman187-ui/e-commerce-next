"use client";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useContext } from "react";
import { CountContext } from "src/CountProvider";
import { WishContext } from "src/WishProvider";
import Link from "next/link";
import Image from "next/image";
import { DarkModeToggle } from "./DarkModeToggle";
import { Badge } from "src/components/ui/badge";

const Navbar = () => {
  const pathname: string = usePathname();
  const { data, status } = useSession();
  const { count } = useContext(CountContext);
  const { wishCount } = useContext(WishContext);

  const LeftMenu: { path: string; content: string; protected: boolean }[] = [
    { path: "/products", content: "Products", protected: false },
    { path: "/category", content: "Category", protected: false },
    { path: "/brands", content: "Brands", protected: false },
    { path: "/allorders", content: "Orders", protected: true },
  ];

  const RightMenu: { path: string; content: string }[] = [
    { path: "/login", content: "Login" },
    { path: "/register", content: "Register" },
  ];

  function logOut() {
    signOut({
      callbackUrl: "/",
    });
  }

  return (
    <section className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md dark:bg-gray-950/80 dark:border-gray-800 shadow-sm transition-all">
      <div className="container mx-auto px-4 lg:px-8">
        <nav className="flex h-20 items-center justify-between">
          
          {/* 1. Logo Section */}
          <Link href="/" className="flex items-center transition-transform hover:scale-105 shrink-0">
            <Image src={'/image/freshcart-logo.svg'} alt='logo' width={140} height={40} className="w-auto h-8 md:h-10" />
          </Link>

          {/* 2. Desktop Navigation (Center Menu) */}
          <div className="hidden lg:flex items-center justify-center flex-1">
            <NavigationMenu viewport={false}>
              <NavigationMenuList className="gap-1">
                {LeftMenu.map((item) => (
                  <NavigationMenuItem key={item.path}>
                    {((item.protected && status === "authenticated") || !item.protected) && (
                      <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link
                          href={item.path}
                          className={`relative px-3 py-2 text-sm font-medium transition-colors hover:text-main ${
                            pathname === item.path 
                            ? 'text-main after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-main' 
                            : 'text-gray-600 dark:text-gray-300'
                          }`}
                        >
                          {item.content}
                        </Link>
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* 3. Action Icons (Cart, Wishlist, Auth) */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            {status === "authenticated" && (
              <div className="flex items-center gap-1 mr-2 border-r pr-4 border-gray-200 dark:border-gray-700">
                
                {/* Wishlist Link with Functional Badge */}
                <Link href="/wishlist" className="group relative p-3 text-gray-600 hover:text-main transition-colors dark:text-gray-300">
                  <span className={`text-sm font-medium ${pathname === '/wishlist' ? 'text-main' : ''}`}>Wishlist</span>
                  {wishCount > 0 && (
                    <span className="absolute top-1 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-gray-950 animate-in zoom-in">
                      {wishCount}
                    </span>
                  )}
                </Link>

                {/* Cart Link with Functional Badge */}
                <Link href="/cart" className="group relative p-3 text-gray-600 hover:text-main transition-colors dark:text-gray-300">
                  <span className={`text-sm font-medium ${pathname === '/cart' ? 'text-main' : ''}`}>Cart</span>
                  {count > 0 && (
                    <span className="absolute top-1 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-main text-[10px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-gray-950 animate-in zoom-in">
                      {count}
                    </span>
                  )}
                </Link>
              </div>
            )}

            <div className="flex items-center gap-3">
              <DarkModeToggle />
              
              {status === "authenticated" ? (
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end leading-tight">
                    <span className="text-[10px] uppercase text-gray-400 font-bold tracking-tighter">Welcome</span>
                    <span className="text-sm font-semibold dark:text-white truncate max-w-[80px]">
                      {data?.user?.name?.split(' ')[0]}
                    </span>
                  </div>
                  <Button 
                    onClick={logOut} 
                    variant="outline" 
                    className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-red-900/50 dark:hover:bg-red-950/30"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  {RightMenu.map((item) => (
                    <Link 
                      key={item.path} 
                      href={item.path}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        pathname === item.path 
                        ? 'bg-main text-white shadow-md' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white'
                      }`}
                    >
                      {item.content}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 4. Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center gap-3">
            <DarkModeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-xl border-gray-200">
                  <MenuIcon className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] flex flex-col p-6">
                <SheetHeader className="border-b pb-4 mb-4">
                  <SheetTitle>
                    <Image src={'/image/freshcart-logo.svg'} alt='logo' width={120} height={35} />
                  </SheetTitle>
                </SheetHeader>
                
                <div className="flex flex-col gap-2">
                  {LeftMenu.map((item) => (
                    ((item.protected && status === "authenticated") || !item.protected) && (
                      <Link 
                        key={item.path}
                        href={item.path} 
                        className={`text-base font-medium p-3 rounded-xl transition-colors ${
                          pathname === item.path ? 'bg-main/10 text-main font-bold' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                      >
                        {item.content}
                      </Link>
                    )
                  ))}
                  
                  {status === "authenticated" && (
                    <div className="mt-4 pt-4 border-t space-y-2">
                      <Link href="/cart" className="flex justify-between items-center p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800">
                        <span className="font-medium dark:text-white">Shopping Cart</span>
                        <Badge className="bg-main font-bold">{count}</Badge>
                      </Link>
                      <Link href="/wishlist" className="flex justify-between items-center p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800">
                        <span className="font-medium dark:text-white">Wishlist</span>
                        <Badge className="bg-emerald-500 font-bold">{wishCount}</Badge>
                      </Link>
                    </div>
                  )}
                </div>

                <div className="mt-auto pt-6 border-t">
                  {status === "authenticated" ? (
                    <div className="space-y-4 text-center">
                      <p className="text-sm text-gray-500">Logged in as <span className="font-bold text-gray-900 dark:text-white">{data?.user?.name}</span></p>
                      <Button onClick={logOut} className="w-full bg-red-500 hover:bg-red-600 text-white rounded-xl h-12">Logout</Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      {RightMenu.map((item) => (
                        <Link 
                          key={item.path} 
                          href={item.path} 
                          className={`text-center py-3 rounded-xl font-bold text-sm transition-colors ${
                            pathname === item.path ? 'bg-main text-white' : 'bg-gray-100 dark:bg-gray-800 dark:text-white'
                          }`}
                        >
                          {item.content}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </section>
  );
};

export { Navbar };