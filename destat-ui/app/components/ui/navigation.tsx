import { Link } from "react-router";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./navigation-menu";
import { Button } from "./button";
import { rabbykit } from "~/root";

//--navigation
//  --dashboard
//  --survey
//      --all survey
//      --create survey
//  --archive
//      --finished surveys
//  --profile   
//      --my survey
//      --my responses

//- wallet connector kits
//    -rainbowkit
//    -appkit
//    -rabbykit
//    -..

export default function Navigation() {
  return (
    <nav className="fixed top-0 right-0 left-0">
      <div className="flex w-screen items-center justify-between py-5 px-5">
        <Link to="/" className="text-lg font-bold">DESTAT</Link>

      <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink>Dashboard</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Survey</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
  <li className="row-span-2">
    <NavigationMenuLink asChild>
      <a
        className="flex h-full w-full select-none flex-col justify-center rounded-md bg-gradient-to-b from-muted/50 to-muted no-underline outline-none focus:shadow-md"
        href="/"
      >
        <div className="text-lg font-medium">
          shadcn/ui
        </div>
        <p className="text-sm leading-tight text-muted-foreground">
          Beautifully designed components built with Tailwind CSS.
        </p>
      </a>
    </NavigationMenuLink>
      </li>
    <li>
      <NavigationMenuLink asChild>
        <Link to="/survey/all">
          <div className="flex flex-col gap-1 text-sm">
            <div className="leading-none font-medium">All surveys</div>
            <div className="line-clamp-2 text-muted-foreground">List all surveys</div>
          </div>
        </Link>
      </NavigationMenuLink>
      </li>
    <li>
      <NavigationMenuLink asChild>
        <Link to="/survey/create">
          <div className="flex flex-col gap-1 text-sm">
            <div className="leading-none font-medium">Create survey</div>
            <div className="line-clamp-2 text-muted-foreground">Create survey</div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Archive</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
  <li className="row-span-2">
    <NavigationMenuLink asChild>
      <a
        className="flex h-full w-full select-none flex-col justify-center rounded-md bg-gradient-to-b from-muted/50 to-muted no-underline outline-none focus:shadow-md"
        href="/"
      >
        <div className="text-lg font-medium">
          shadcn/ui
        </div>
        <p className="text-sm leading-tight text-muted-foreground">
          Beautifully designed components built with Tailwind CSS.
        </p>
      </a>
    </NavigationMenuLink>
      </li>
    <li>
      <NavigationMenuLink asChild>
        <Link to="/survey/finished">
          <div className="flex flex-col gap-1 text-sm">
            <div className="leading-none font-medium">Finished surveys</div>
            <div className="line-clamp-2 text-muted-foreground">Finished surveys</div>
          </div>
        </Link>
      </NavigationMenuLink>
      </li>
  </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Profile</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
  <li className="row-span-2">
    <NavigationMenuLink asChild>
      <a
        className="flex h-full w-full select-none flex-col justify-center rounded-md bg-gradient-to-b from-muted/50 to-muted no-underline outline-none focus:shadow-md"
        href="/"
      >
        <div className="text-lg font-medium">
          shadcn/ui
        </div>
        <p className="text-sm leading-tight text-muted-foreground">
          Beautifully designed components built with Tailwind CSS.
        </p>
      </a>
    </NavigationMenuLink>
      </li>
    <li>
      <NavigationMenuLink asChild>
        <Link to="/survey/my">
          <div className="flex flex-col gap-1 text-sm">
            <div className="leading-none font-medium">My surveys</div>
            <div className="line-clamp-2 text-muted-foreground">My surveys</div>
          </div>
        </Link>
      </NavigationMenuLink></li>
    <li>
      <NavigationMenuLink asChild>
        <Link to="/survey/response">
          <div className="flex flex-col gap-1 text-sm">
            <div className="leading-none font-medium">My responses</div>
            <div className="line-clamp-2 text-muted-foreground">My responses</div>
          </div>
        </Link>
      </NavigationMenuLink>
     </li>
  </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
       <Button onClick={() =>{rabbykit.open()}}>Connect</Button>
     </div>
    </nav>
  );
}