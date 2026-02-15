"use client";
import { MenuIcon, ShoppingCart, Heart, LogOut, User } from "lucide-react";
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
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useContext, useMemo } from "react";
import { CountContext } from "src/CountProvider";
import { WishContext } from "src/WishProvider";
import Link from "next/link";
import Image from "next/image";
import { DarkModeToggle } from "./DarkModeToggle";
import { Badge } from "src/components/ui/badge";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { data, status } = useSession();
  const { count } = useContext(CountContext);
  const { wishCount } = useContext(WishContext);

  const LeftMenu = useMemo(() => [
    { path: "/products", content: "Products", protected: false },
    { path: "/category", content: "Category", protected: false },
    { path: "/brands", content: "Brands", protected: false },
    { path: "/allorders", content: "Orders", protected: true },
  ], []);

  const RightMenu = [
    { path: "/login", content: "Login" },
    { path: "/register", content: "Register" },
  ];

  // دالة الخروج مع تنظيف كامل للـ Cache
  async function handleLogout() {
    await signOut({ redirect: false });
    router.push("/");
    router.refresh();
  }

  return (
    <section className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur-md dark:bg-gray-950/90 dark:border-gray-800 shadow-sm transition-all">
      <div className="container mx-auto px-4 lg:px-8">
        <nav className="flex h-20 items-center justify-between">
          
          {/* 1. Logo */}
          <Link href="/" className="flex items-center transition-transform hover:scale-105 shrink-0">
            <Image src={'/image/freshcart-logo.svg'} alt='logo' width={140} height={40} className="w-auto h-8 md:h-10" priority />
          </Link>

          {/* 2. Desktop Menu */}
          <div className="hidden lg:flex items-center justify-center flex-1 mx-4">
            <NavigationMenu viewport={false}>
              <NavigationMenuList className="gap-1">
                {LeftMenu.map((item) => (
                  <NavigationMenuItem key={item.path}>
                    {((item.protected && status === "authenticated") || !item.protected) && (
                      <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link
                          href={item.path}
                          className={`relative px-3 py-2 text-sm font-medium transition-colors hover:text-main ${
                            pathname === item.path ? 'text-main' : 'text-gray-600 dark:text-gray-300'
                          }`}
                        >
                          {item.content}
                          {pathname === item.path && (
                            <span className="absolute bottom-0 left-0 h-[2px] w-full bg-main animate-in fade-in slide-in-from-left-1" />
                          )}
                        </Link>
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* 3. Action Icons & Auth */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            {status === "authenticated" ? (
              <>
                <div className="flex items-center gap-1 border-r pr-4 border-gray-200 dark:border-gray-700">
                  {/* Wishlist Icon */}
                  <Link href="/wishlist" className="relative p-2 text-gray-600 hover:text-main dark:text-gray-300 transition-all">
                    <Heart className={`h-6 w-6 ${pathname === '/wishlist' ? 'fill-main text-main' : ''}`} />
                    {wishCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-emerald-500 text-[10px] animate-bounce">
                        {wishCount}
                      </Badge>
                    )}
                  </Link>

                  {/* Cart Icon */}
                  <Link href="/cart" className="relative p-2 text-gray-600 hover:text-main dark:text-gray-300 transition-all">
                    <ShoppingCart className={`h-6 w-6 ${pathname === '/cart' ? 'text-main' : ''}`} />
                    {count > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-main text-[10px] animate-in zoom-in">
                        {count}
                      </Badge>
                    )}
                  </Link>
                </div>

                <div className="flex items-center gap-4 pl-2">
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] uppercase text-gray-400 font-extrabold tracking-widest">User</span>
                    <span className="text-sm font-bold dark:text-white">{data?.user?.name?.split(' ')[0]}</span>
                  </div>
                  <DarkModeToggle />
                  <Button 
                    onClick={handleLogout} 
                    variant="ghost" 
                    size="icon"
                    className="text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30"
                  >
                    <LogOut className="h-5 w-5" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <DarkModeToggle />
                {RightMenu.map((item) => (
                  <Link 
                    key={item.path} 
                    href={item.path}
                    className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                      pathname === item.path ? 'bg-main text-white shadow-lg' : 'hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800'
                    }`}
                  >
                    {item.content}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* 4. Mobile Menu */}
          <div className="lg:hidden flex items-center gap-3">
            <DarkModeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <MenuIcon className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] p-0">
                <div className="p-6 border-b flex items-center justify-between">
                  <Image src={'/image/freshcart-logo.svg'} alt='logo' width={100} height={30} />
                  {status === "authenticated" && <Badge variant="outline" className="border-main text-main">Online</Badge>}
                </div>
                
                <div className="flex flex-col p-4 gap-1">
                  {LeftMenu.map((item) => (
                    ((item.protected && status === "authenticated") || !item.protected) && (
                      <Link 
                        key={item.path}
                        href={item.path} 
                        className={`flex items-center p-4 rounded-2xl text-base font-semibold transition-all ${
                          pathname === item.path ? 'bg-main text-white' : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                      >
                        {item.content}
                      </Link>
                    )
                  ))}
                </div>

                <div className="mt-auto p-6 bg-gray-50 dark:bg-gray-900">
                  {status === "authenticated" ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-2">
                        <div className="h-10 w-10 rounded-full bg-main/20 flex items-center justify-center"><User className="text-main" /></div>
                        <p className="font-bold truncate">{data?.user?.name}</p>
                      </div>
                      <Button onClick={handleLogout} className="w-full bg-red-500 hover:bg-red-600 h-12 rounded-2xl">Logout</Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      {RightMenu.map((item) => (
                        <Link key={item.path} href={item.path} className="text-center py-3 bg-white dark:bg-gray-800 rounded-xl font-bold text-sm shadow-sm border">
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