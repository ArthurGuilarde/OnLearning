import "bootstrap/dist/css/bootstrap.css";
import "../styles/global.scss";
import "../styles/pages/links.scss";

import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="container d-flex vh-100 p-2 mx-auto flex-column">
      {/* {router.pathname !== "/links" && (
        <Navbar id="h-main-s" color="light" light expand="lg">
          <Link href="/">
            <NavbarBrand href="/">Go Further</NavbarBrand>
          </Link>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar tabs>
              <NavItem>
                <Link href="/">
                  <NavLink href="/" active={router.pathname === "/"}>
                    Home
                  </NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/links">
                  <NavLink href="/links" active={router.pathname === "/links"}>
                    links
                  </NavLink>
                </Link>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Home</DropdownItem>
                  <Link href="/start">
                    <DropdownItem href="/start">Start</DropdownItem>
                  </Link>
                  <DropdownItem divider />
                  <DropdownItem>Reset</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
            <NavbarText>Simple Text</NavbarText>
          </Collapse>
        </Navbar>
      )} */}

      <main role="main" className="inner cover">
        <Component {...pageProps} />
      </main>

      <footer id="footer" className="mastfoot mt-auto">
        <Link href="https://www.instagram.com/arthurguilarde/">
          <div>Copyright © 2021 Rootzie Inc. All rights reserved.</div>
        </Link>
      </footer>
    </div>
  );
}
