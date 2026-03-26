"use client"

import * as React from "react"
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

const menuItems = [
    { name: 'Features', href: '#features' },
    { name: 'Analytics', href: '#analytics' },
    { name: 'Pricing', href: '#checkout' },
    { name: 'FAQ', href: '#faq' },
]

export const HeroSection = () => {
    const [menuState, setMenuState] = React.useState(false)
    return (
        <div>
            <header>
                <nav
                    data-state={menuState && 'active'}
                    className="group fixed z-20 w-full border-b bg-background/95 backdrop-blur md:relative">
                    <div className="m-auto max-w-6xl px-6">
                        <div className="flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                            <div className="flex w-full justify-between lg:w-auto">
                                <Link
                                    href="/"
                                    aria-label="home"
                                    className="flex items-center space-x-2">
                                    <Logo />
                                </Link>

                                <button
                                    onClick={() => setMenuState(!menuState)}
                                    aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                                    className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                    <Menu className="group-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                    <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                                </button>
                            </div>

                            <div className="bg-background group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-2xl border p-6 shadow-xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none">
                                <div className="lg:pr-4">
                                    <ul className="space-y-6 text-base lg:flex lg:gap-8 lg:space-y-0 lg:text-sm">
                                        {menuItems.map((item, index) => (
                                            <li key={index}>
                                                <Link
                                                    href={item.href}
                                                    className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                                    <span>{item.name}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit lg:border-l lg:pl-6">
                                    <Button
                                        asChild
                                        variant="outline"
                                        size="sm">
                                        <Link href="#checkout">
                                            <span>See Plan</span>
                                        </Link>
                                    </Button>
                                    <Button
                                        asChild
                                        size="sm">
                                        <Link href="#checkout">
                                            <span>Start 8000 DA</span>
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            <main>
                <div
                    aria-hidden
                    className="z-[2] absolute inset-0 pointer-events-none isolate opacity-50 contain-strict hidden lg:block">
                    <div className="w-[35rem] h-[80rem] -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
                    <div className="h-[80rem] absolute left-0 top-0 w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
                    <div className="h-[80rem] -translate-y-87.5 absolute left-0 top-0 w-56 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
                </div>

                <section className="overflow-hidden bg-background">
                    <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-28 md:pb-24 lg:pt-24">
                        <div className="relative z-10 mx-auto max-w-2xl text-center">
                            <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">lokyforPerfum ERP for clone and original fragrance stores</h1>
                            <p className="mx-auto my-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">Manage perfume inventory in ml, run clone and original sales flows, track margins automatically, and launch stores with built-in paid onboarding.</p>

                            <Button
                                asChild
                                size="lg">
                                <Link href="#checkout">
                                    <span className="btn-label">Start Your 8000 DA Plan</span>
                                </Link>
                            </Button>
                        </div>
                    </div>

                    <div className="mx-auto -mt-10 max-w-7xl [mask-image:linear-gradient(to_bottom,black_50%,transparent_100%)]">
                        <div className="[perspective:1200px] [mask-image:linear-gradient(to_right,black_50%,transparent_100%)] -mr-16 pl-16 lg:-mr-56 lg:pl-56">
                            <div className="[transform:rotateX(20deg);]">
                                <div className="lg:h-[44rem] relative skew-x-[.36rad]">
                                    <img
  className="rounded-[--radius] z-[2] relative border dark:hidden"
  src="/images/white.png"
  alt="Perfum dashboard preview"
  width={2880}
  height={2074}
/>

<img
  className="rounded-[--radius] z-[2] relative hidden border dark:block"
  src="/images/dark.png"
  alt="Perfum dashboard preview"
  width={2880}
  height={2074}
/>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="bg-background relative z-10 border-t py-16 md:py-20">
  <div className="m-auto max-w-6xl px-6">
    <h2 className="text-center text-base font-medium text-muted-foreground">
      Built on a production-ready stack
    </h2>

    <div className="mx-auto mt-12 flex max-w-5xl flex-wrap items-center justify-center gap-x-10 gap-y-8 sm:gap-x-14 sm:gap-y-10">

      <img
        className="h-5 w-fit dark:invert"
        src="https://cdn.simpleicons.org/laravel"
        alt="Laravel Logo"
      />

      <img
        className="h-5 w-fit dark:invert"
        src="https://cdn.simpleicons.org/php"
        alt="PHP Logo"
      />

      <img
        className="h-5 w-fit dark:invert"
        src="https://cdn.simpleicons.org/mysql"
        alt="MySQL Logo"
      />

      <img
        className="h-5 w-fit dark:invert"
        src="https://cdn.simpleicons.org/redis"
        alt="Redis Logo"
      />

      <img
        className="h-5 w-fit dark:invert"
        src="https://cdn.simpleicons.org/nextdotjs"
        alt="Next.js Logo"
      />

      <img
        className="h-5 w-fit dark:invert"
        src="https://cdn.simpleicons.org/react"
        alt="React Logo"
      />

      <img
        className="h-5 w-fit dark:invert"
        src="https://cdn.simpleicons.org/tailwindcss"
        alt="Tailwind CSS Logo"
      />

      <img
        className="h-6 w-fit dark:invert"
        src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/openai.svg"
        alt="OpenAI Logo"
      />

      <img
        className="h-5 w-fit dark:invert"
        src="https://cdn.simpleicons.org/docker"
        alt="Docker Logo"
      />

      <img
        className="h-5 w-fit dark:invert"
        src="https://cdn.simpleicons.org/nginx"
        alt="Nginx Logo"
      />

    </div>
  </div>
</section>
            </main>
        </div>
    )
}


export const Logo = ({ className }: { className?: string }) => {
    return (
        <div className={cn("flex items-center gap-2", className)}>
            <img
                src="/perfum-logo.svg"
                alt="Perfum logo"
                className="h-7 w-7 rounded-md"
            />
            <span className="text-base font-semibold tracking-tight">
                LokyforPerfum
            </span>
        </div>
    )
}
