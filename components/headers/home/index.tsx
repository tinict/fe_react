"use client";

import { faBell, faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  Navbar,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
import { Avatar, Button, User } from "@nextui-org/react";
import Link from "next/link";
import NextLink from "next/link";

import { Logo } from "@/components/icons";
import { useEffect, useState } from "react";

const menuItemsAuthTrue = [
  <p onClick={() => console.log(1)}>Home</p>,
  "Profile",
  "Setting",
];

const menuItemsAuthFalse = ["Create", "Login"];

export const HeaderHome = () => {
  const [isAuth, setIsAuth] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuItems, setMenuItems] = useState<any>([]);

  useEffect(() => {
    if (isAuth) setMenuItems([...menuItemsAuthTrue]);
    else setMenuItems([...menuItemsAuthFalse]);
  }, [isAuth]);

  return (
    <>
      <NextUINavbar
        maxWidth="2xl"
        position="sticky"
        className="w-full bg-white flex items-center justify-between "
      >
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <NextLink
              className="flex justify-start items-center gap-1"
              href="/"
            >
              <Logo />
              <p className="font-bold text-inherit">Zeal Bio</p>
            </NextLink>
          </NavbarBrand>
          {isAuth && (
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
              <NavbarItem>
                <Link
                  className="font-manrope text-[14px]"
                  color="foreground"
                  href="/"
                >
                  Home
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link
                  className="font-manrope text-[14px]"
                  color="foreground"
                  href="/profiles"
                >
                  List Profile
                </Link>
              </NavbarItem>
            </NavbarContent>
          )}
        </NavbarContent>
        <div>
          <Navbar onMenuOpenChange={setIsMenuOpen} className="">
            <NavbarMenuToggle
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="sm:hidden"
            />

            <NavbarMenu>
              {menuItems.map((item: any, index: number) => (
                <NavbarMenuItem key={`${item}-${index}`}>
                  <Link
                    color={
                      index === 2
                        ? "primary"
                        : index === menuItems.length - 1
                          ? "danger"
                          : "foreground"
                    }
                    className="w-full"
                    href="#"
                  >
                    {item}
                  </Link>
                </NavbarMenuItem>
              ))}
            </NavbarMenu>
            {!isAuth ? (
              <div className="sm:block hidden">
                <Button className="bg-transparent text-blue-600 text-[14px] font-medium">
                  + Create
                </Button>
                <Button className="bg-blue-600 text-white text-[14px] font-medium rounded-lg ml-4">
                  Login
                </Button>
              </div>
            ) : (
              <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem className="flex h-[22px] w-[22px] items-center justify-center">
                  <FontAwesomeIcon
                    className=" w-ful h-full text-[rgb(104,101,131)] cursor-pointer"
                    icon={faGear}
                  />
                </NavbarItem>
              </NavbarContent>
            )}
            {isAuth && (
              <NavbarContent className="flex gap-4" justify="center">
                <NavbarItem className="flex h-[22px] w-[22px] items-center justify-center">
                  <FontAwesomeIcon
                    className="w-ful h-full text-[rgb(104,101,131)] cursor-pointer"
                    icon={faBell}
                  />
                </NavbarItem>
                <NavbarItem>
                  <Dropdown placement="bottom-start">
                    <DropdownTrigger>
                      <Avatar
                        className="h-8 w-8"
                        src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                      />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="User Actions" variant="flat">
                      <DropdownItem key="profile" className="h-14 gap-2">
                        <User
                          as="button"
                          avatarProps={{
                            isBordered: false,
                            src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                          }}
                          className="transition-transform"
                          description="@tonyreichert"
                          name="Tony Reichert"
                        />
                      </DropdownItem>
                      <DropdownItem key="settings">My Profile</DropdownItem>
                      <DropdownItem key="logout" color="danger">
                        Log Out
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </NavbarItem>
              </NavbarContent>
            )}
          </Navbar>
        </div>
      </NextUINavbar>
    </>
  );
};
