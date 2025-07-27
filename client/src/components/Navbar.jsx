import { Menu, School } from "lucide-react";
import React, { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import DarkMode from "@/DarkMode";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "User logged out successfully");
      navigate("/login");
    }
  }, [isSuccess]);

  return (
    <div className="h-16 dark:bg-[#16213E] bg-[#F0F7F4] border-b dark:border-b-[#2D3748] border-b-[#D8F3DC] fixed top-0 left-0 right-0 duration-300 z-10 shadow-sm">
      {/* Desktop */}
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full px-4">
        <div className="flex items-center gap-2">
          <School size={30} className="text-[#537D5D] dark:text-[#D8F3DC]" />
          <Link to="/">
            <h1 className="hidden md:block font-extrabold text-2xl text-[#1B4332] dark:text-[#E2E8F0]">
              TEACH DEX
            </h1>
          </Link>
        </div>

        {/* User icons and dark mode */}
        <div className="flex items-center gap-6">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="border-2 border-[#537D5D] dark:border-[#D8F3DC] cursor-pointer hover:scale-105 transition-transform">
                  <AvatarImage
                    src={user?.photoUrl || "https://github.com/shadcn.png"}
                    alt="@shadcn"
                  />
                  <AvatarFallback className="bg-[#D8F3DC] dark:bg-[#2D6A4F] text-[#1B4332] dark:text-[#E2E8F0]">
                    {user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className="w-56 bg-[#F0F7F4] dark:bg-[#16213E] border-[#D8F3DC] dark:border-[#2D3748]"
                align="end"
              >
                <DropdownMenuLabel className="text-[#1B4332] dark:text-[#E2E8F0]">
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-[#D8F3DC] dark:bg-[#2D3748]" />
                <DropdownMenuGroup>
                  <DropdownMenuItem 
                    className="focus:bg-[#D8F3DC] dark:focus:bg-[#2D6A4F] focus:text-[#1B4332] dark:focus:text-[#E2E8F0]"
                    asChild
                  >
                    <Link to="my-learning">My Learning</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="focus:bg-[#D8F3DC] dark:focus:bg-[#2D6A4F] focus:text-[#1B4332] dark:focus:text-[#E2E8F0]"
                    asChild
                  >
                    <Link to="profile">Edit Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="focus:bg-[#D8F3DC] dark:focus:bg-[#2D6A4F] focus:text-[#1B4332] dark:focus:text-[#E2E8F0]"
                    onClick={logoutHandler}
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                {user?.role === "instructor" && (
                  <>
                    <DropdownMenuSeparator className="bg-[#D8F3DC] dark:bg-[#2D3748]" />
                    <DropdownMenuItem 
                      className="focus:bg-[#D8F3DC] dark:focus:bg-[#2D6A4F] focus:text-[#1B4332] dark:focus:text-[#E2E8F0]"
                      asChild
                    >
                      <Link to="/admin/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                onClick={() => navigate("/login")}
                className="border-[#537D5D] text-[#1B4332] hover:bg-[#D8F3DC] dark:border-[#D8F3DC] dark:text-[#E2E8F0] dark:hover:bg-[#2D6A4F]"
              >
                Login
              </Button>
              <Button 
                onClick={() => navigate("/signup")}
                className="bg-[#537D5D] hover:bg-[#3A5A40] text-white dark:bg-[#D8F3DC] dark:text-[#1B4332] dark:hover:bg-[#B7E4C7]"
              >
                Sign Up
              </Button>
            </div>
          )}
          <DarkMode />
        </div>
      </div>

      {/* Mobile */}
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <div className="flex items-center gap-2">
          <School size={30} className="text-[#537D5D] dark:text-[#D8F3DC]" />
          <h1 className="font-extrabold text-2xl text-[#1B4332] dark:text-[#E2E8F0]">
            TEACH DEX
          </h1>
        </div>
        <MobileNavbar user={user} />
      </div>
    </div>
  );
};

const MobileNavbar = ({ user }) => {
  const navigate = useNavigate();
  const [logoutUser] = useLogoutUserMutation();

  const logoutHandler = async () => {
    await logoutUser();
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="rounded-full border-[#537D5D] text-[#537D5D] hover:bg-[#D8F3DC] dark:border-[#D8F3DC] dark:text-[#D8F3DC] dark:hover:bg-[#2D6A4F]"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col bg-[#F0F7F4] dark:bg-[#16213E] border-l-[#D8F3DC] dark:border-l-[#2D3748]">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle className="text-[#1B4332] dark:text-[#E2E8F0]">
            <Link to="/">TEACH DEX</Link>
          </SheetTitle>
          <DarkMode />
        </SheetHeader>
        
        <Separator className="my-4 h-[1px] bg-[#D8F3DC] dark:bg-[#2D3748]" />

        <nav className="flex-1 flex flex-col space-y-4">
          <Link 
            to="/my-learning" 
            className="px-4 py-2 rounded-md text-[#1B4332] dark:text-[#E2E8F0] hover:bg-[#D8F3DC] dark:hover:bg-[#2D6A4F]"
          >
            My Learning
          </Link>
          <Link 
            to="/profile" 
            className="px-4 py-2 rounded-md text-[#1B4332] dark:text-[#E2E8F0] hover:bg-[#D8F3DC] dark:hover:bg-[#2D6A4F]"
          >
            Edit Profile
          </Link>
          <button 
            onClick={logoutHandler}
            className="px-4 py-2 rounded-md text-left text-[#1B4332] dark:text-[#E2E8F0] hover:bg-[#D8F3DC] dark:hover:bg-[#2D6A4F]"
          >
            Log out
          </button>
        </nav>

        {user?.role === "instructor" && (
          <SheetFooter className="mt-auto">
            <SheetClose asChild>
              <Button 
                onClick={() => navigate("/admin/dashboard")}
                className="w-full bg-[#537D5D] hover:bg-[#3A5A40] text-white dark:bg-[#D8F3DC] dark:text-[#1B4332] dark:hover:bg-[#B7E4C7]"
              >
                Dashboard
              </Button>
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Navbar;