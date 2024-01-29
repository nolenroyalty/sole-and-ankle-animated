/* eslint-disable no-unused-vars */
import React from "react";
// import styled from "styled-components/macro";
import styled, { keyframes, css } from "styled-components";

import { DialogOverlay, DialogContent } from "@reach/dialog";

import { QUERIES, WEIGHTS } from "../../constants";

import UnstyledButton from "../UnstyledButton";
import Icon from "../Icon";
import VisuallyHidden from "../VisuallyHidden";

const MobileMenu = ({ isOpen, onDismiss }) => {
  return (
    <Overlay isOpen={isOpen} onDismiss={onDismiss}>
      <Background />
      <Content aria-label="Menu">
        <CloseButton onClick={onDismiss}>
          <Icon id="close" />
          <VisuallyHidden>Dismiss menu</VisuallyHidden>
        </CloseButton>
        <Filler />
        <NavWrapper></NavWrapper>
        <Footer>
          <SubLink href="/terms">Terms and Conditions</SubLink>
          <SubLink href="/privacy">Privacy Policy</SubLink>
          <SubLink href="/contact">Contact Us</SubLink>
        </Footer>
      </Content>
    </Overlay>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to { opacity: 1; }
`;

const NavWrapper = ({ props, ...rest }) => {
  const links = [
    ["/sale", "Sale"],
    ["/new", "New Releases"],
    ["/men", "Men"],
    ["/women", "Women"],
    ["/kids", "Kids"],
    ["/collections", "Collections"],
  ];

  return (
    <Nav {...props}>
      {links.map(([href, text], i) => {
        return (
          <NavLink
            key={href}
            href={href}
            style={{ "--slide-in-delay": `${0.1 + i * 0.05}s` }}
          >
            {text}
          </NavLink>
        );
      })}
    </Nav>
  );
};

const NavLinkWrapper = ({ props, children, ...rest }) => {
  return <NavLink {...props}>{children}</NavLink>;
};

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Overlay = styled(DialogOverlay)`
  position: fixed;
  will-change: opacity;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: flex-end;
`;

const Background = styled.div`
  position: fixed;
  will-change: opacity;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--color-backdrop);

  animation: ${fadeIn} 0.3s ease-in forwards;
`;

const slideIn = keyframes(css`
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(0%);
  }
`);

const Content = styled(DialogContent)`
  background: white;
  opacity: 1;
  position: absolute;
  will-change: transform;
  width: 300px;
  height: 100%;
  padding: 24px 32px;
  display: flex;
  flex-direction: column;

  animation: ${slideIn} 0.5s cubic-bezier(0.04, 0.91, 0.91, 1) both 0.1s;
  /* animation: ${slideIn} 0.5s linear both 0.1s; */
`;

const CloseButton = styled(UnstyledButton)`
  position: absolute;
  top: 10px;
  right: 0;
  padding: 16px;
`;

const NavLink = styled.a`
  display: inline-block;
  color: var(--color-gray-900);
  font-weight: ${WEIGHTS.medium};
  will-change: transform, opacity;
  text-decoration: none;
  font-size: 1.125rem;
  text-transform: uppercase;

  animation: ${fadeIn} 0.3s ease-in both calc(0s + var(--slide-in-delay)),
    ${slideIn} 0.5s cubic-bezier(0.04, 0.91, 0.91, 1) both var(--slide-in-delay);

  &:first-of-type {
    color: var(--color-secondary);
  }
`;

const Filler = styled.div`
  flex: 1;
`;
const Footer = styled.footer`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 14px;
  justify-content: flex-end;
`;

const SubLink = styled.a`
  color: var(--color-gray-700);
  font-size: 0.875rem;
  text-decoration: none;

  animation: ${fadeIn} 0.3s ease-in both 0.2s;
`;

export default MobileMenu;
