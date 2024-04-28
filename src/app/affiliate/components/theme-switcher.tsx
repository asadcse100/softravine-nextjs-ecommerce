import Button from "@/shared/Button/Button";
import { CheckIcon, Palette } from "lucide-react"   ;
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@radix-ui/react-dropdown-menu";
import { useTheme } from "next-themes";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="rounded-full p-0 bg-foreground hover:bg-muted text-background hover:text-muted-foreground border-0 outline-none"
        >
            <Palette className="w-6 h-6"></Palette>
        </Button>
        <DropdownMenuContent align="end" className="z-[99998]">
            <DropdownMenuItem onClick={() => setTheme('light')}>
            <span>Light</span>
          {theme === "light" && <CheckIcon className="ml-2 h-4 w-4" />}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('dark')}>
            <span>Dark</span>
          {theme === "dark" && <CheckIcon className="ml-2 h-4 w-4" />}
            </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
}
