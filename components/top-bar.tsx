import { Search, Plus, Bell, HelpCircle, Settings, ChevronLeft } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function TopBar() {
  return (
    <div className="flex h-16 items-center px-4 border-b bg-white">
      <div className="flex items-center gap-2 mr-8">
        <Button variant="ghost" size="icon" className="mr-2">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-lg font-medium">Reservations</h2>
      </div>
      <div className="flex items-center gap-2 w-full max-w-sm">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for anything here..."
            className="w-full bg-gray-50 pl-8 rounded-full"
          />
        </div>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <Button size="icon" variant="ghost" className="rounded-full bg-blue-600 text-white">
          <Plus className="h-5 w-5" />
        </Button>
        <Button size="icon" variant="ghost" className="rounded-full">
          <Bell className="h-5 w-5" />
        </Button>
        <Button size="icon" variant="ghost" className="rounded-full">
          <HelpCircle className="h-5 w-5" />
        </Button>
        <Button size="icon" variant="ghost" className="rounded-full">
          <Settings className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2 ml-4 border rounded-full px-1 py-1">
          <div className="flex flex-col items-end mr-2">
            <p className="text-sm font-medium">Administrador 1</p>
            <p className="text-xs text-muted-foreground">Administrator</p>
          </div>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder-user.jpg" alt="Administrador 1" />
            <AvatarFallback>A1</AvatarFallback>
          </Avatar>
          <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
            <ChevronLeft className="h-4 w-4 rotate-270" />
          </Button>
        </div>
      </div>
    </div>
  )
}
