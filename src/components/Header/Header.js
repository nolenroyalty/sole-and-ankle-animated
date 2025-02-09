import React from "react";
import styled from "styled-components/macro";

import { QUERIES, WEIGHTS } from "../../constants";
import Logo from "../Logo";
import Icon from "../Icon";
import UnstyledButton from "../UnstyledButton";
import SuperHeader from "../SuperHeader";
import MobileMenu from "../MobileMenu";
import VisuallyHidden from "../VisuallyHidden";
import NavLink from "../NavLink";

const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);

  return (
    <header>
      <SuperHeader />
      <MainHeader>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
        <DesktopNav>
          <NavLink animation="rotate" href="/sale">
            Sale
          </NavLink>
          <NavLink href="/new">New&nbsp;Releases</NavLink>
          <NavLink href="/men">Men</NavLink>
          <NavLink href="/women">Women</NavLink>
          <NavLink href="/kids">Kids</NavLink>
          <NavLink href="/collections">Collections</NavLink>
        </DesktopNav>
        <MobileActions>
          <ShoppingBagButton>
            <Icon id="shopping-bag" />
            <VisuallyHidden>Open cart</VisuallyHidden>
          </ShoppingBagButton>
          <UnstyledButton>
            <Icon id="search" />
            <VisuallyHidden>Search</VisuallyHidden>
          </UnstyledButton>
          <UnstyledButton onClick={() => setShowMobileMenu(true)}>
            <Icon id="menu" />
            <VisuallyHidden>Open menu</VisuallyHidden>
          </UnstyledButton>
        </MobileActions>
        <Filler />
      </MainHeader>

      <MobileMenu
        isOpen={showMobileMenu}
        onDismiss={() => setShowMobileMenu(false)}
      />
    </header>
  );
};

const MainHeader = styled.div`
  display: flex;
  align-items: baseline;
  padding: 18px 32px;
  border-bottom: 1px solid var(--color-gray-300);
  overflow: auto;

  @media ${QUERIES.tabletAndSmaller} {
    justify-content: space-between;
    align-items: center;
    border-top: 4px solid var(--color-gray-900);
  }

  @media ${QUERIES.phoneAndSmaller} {
    padding-left: 16px;
    padding-right: 16px;
  }
`;

const DesktopNav = styled.nav`
  display: flex;
  gap: clamp(1rem, 9.2vw - 4.5rem, 3.5rem);
  margin: 0px 48px;

  @media ${QUERIES.tabletAndSmaller} {
    display: none;
  }
`;

const MobileActions = styled.div`
  display: none;

  @media ${QUERIES.tabletAndSmaller} {
    gap: 32px;
    display: flex;
  }

  @media ${QUERIES.phoneAndSmaller} {
    gap: 16px;
  }
`;

const LogoWrapper = styled.div`
  flex: 1;

  @media ${QUERIES.tabletAndSmaller} {
    flex: revert;
  }
`;

const ShoppingBagButton = styled(UnstyledButton)`
  transform: translateX(-2px);
`;

const Filler = styled.div`
  flex: 1;

  @media ${QUERIES.tabletAndSmaller} {
    display: none;
  }
`;

const NavLinkContainer = ({
  animation = "dropdown",
  children,
  ...delegated
}) => {
  if (animation === "dropdown") {
    return (
      <NavLinkContainerAux {...delegated}>
        <NavLinkUnselected>{children}</NavLinkUnselected>
        <NavLinkSelected>{children}</NavLinkSelected>
      </NavLinkContainerAux>
    );
  } else if (animation === "rotate") {
    return (
      <NavLinkContainerAux {...delegated}>
        <NavLinkRotationUnselected>{children}</NavLinkRotationUnselected>
        <NavLinkRotationSelected>{children}</NavLinkRotationSelected>
      </NavLinkContainerAux>
    );
  }
  return null;
};

const NavLinkContainerAux = styled.a`
  display: grid;
  perspective: 1000px;
  grid-template-areas: "sole-area";
  overflow: hidden;
  font-size: 1.125rem;
  display: inine-block;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--color-gray-900);

  &:first-of-type {
    color: var(--color-secondary);
  }
`;

const NavLinkSelection = styled.span`
  grid-area: sole-area;

  display: inline-block;
  will-change: transform;
  transition: transform 1s ease;

  ${NavLinkContainerAux}:hover &, ${NavLinkContainerAux}:focus & {
    transition: transform 0.3s ease-in-out 0.1s;
  }
`;

const NavLinkRotationUnselected = styled(NavLinkSelection)`
  transform: rotateX(0deg);
  perspective: inherit;
  transform-style: preserve-3d;
  background-color: green;
  transform-origin: 50% 0%;
  font-weight: ${WEIGHTS.medium};

  ${NavLinkContainerAux}:hover &, ${NavLinkContainerAux}:focus & {
    /* transform: rotateX(90deg); */
  }
`;

const NavLinkRotationSelected = styled(NavLinkSelection)`
  transform: rotateX(-90deg);
  perspective: inherit;
  transform-style: preserve-3d;
  background-color: slategrey;
  transform-origin: 50% 100%;
  font-weight: ${WEIGHTS.bold};

  ${NavLinkContainerAux}:hover &, ${NavLinkContainerAux}:focus & {
    /* transform: rotateX(0deg); */
  }
`;

const NavLinkUnselected = styled(NavLinkSelection)`
  transform: translateY(0%);
  font-weight: ${WEIGHTS.medium};

  ${NavLinkContainerAux}:hover &, ${NavLinkContainerAux}:focus & {
    transform: translateY(-150%);
  }
`;

const NavLinkSelected = styled(NavLinkSelection)`
  transform: translateY(150%);
  font-weight: ${WEIGHTS.bold};

  ${NavLinkContainerAux}:hover &, ${NavLinkContainerAux}:focus & {
    transform: translateY(0%);
  }
`;

export default Header;
