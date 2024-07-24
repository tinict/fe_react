'use client';

import { Logo } from "@/components/icons";
import { faBell, faBriefcase, faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import {
    Navbar as NextUINavbar,
    NavbarContent,
    NavbarBrand,
    NavbarItem,
} from "@nextui-org/navbar";
import { Avatar, User } from "@nextui-org/react";
import Link from "next/link";
import NextLink from "next/link";

export const HeaderHome = () => {
    return (
        <>
            <NextUINavbar
                maxWidth="xl"
                position="sticky"
                style={{
                    backgroundColor: '#ffffff'
                }}
            >
                <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
                    <NavbarBrand as="li" className="gap-3 max-w-fit">
                        <NextLink className="flex justify-start items-center gap-1" href="/">
                            <Logo />
                            <p className="font-bold text-inherit">Zeal Bio</p>
                        </NextLink>
                    </NavbarBrand>
                    <NavbarContent className="hidden sm:flex gap-4" justify="center">
                        <NavbarItem>
                            <Link color="foreground" href="#" className='font-manrope text-[14px]'>
                                Home
                            </Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Link color="foreground" href="#" className='font-manrope text-[14px]'  >
                                List Profile
                            </Link>
                        </NavbarItem>
                    </NavbarContent>
                </NavbarContent>
                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    <NavbarItem className="flex h-[22px] w-[22px] items-center justify-center">
                        <FontAwesomeIcon
                            icon={faBell}
                            className="text-gray-700 w-ful h-full text-[rgb(104,101,131)] cursor-pointer"
                        />
                    </NavbarItem>
                    <NavbarItem className="flex h-[22px] w-[22px] items-center justify-center">
                        <FontAwesomeIcon
                            icon={faGear}
                            className="text-gray-700 w-ful h-full text-[rgb(104,101,131)] cursor-pointer"
                        />
                    </NavbarItem>
                    <NavbarItem>
                        <Dropdown placement="bottom-start">
                            <DropdownTrigger>
                                <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" className="h-8 w-8" />
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
                                <DropdownItem key="settings">
                                    My Profile
                                </DropdownItem>
                                <DropdownItem key="logout" color="danger">
                                    Log Out
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </NavbarItem>
                </NavbarContent>
            </NextUINavbar>
        </>
    );
};
