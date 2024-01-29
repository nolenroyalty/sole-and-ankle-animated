import React from "react";
import styled from "styled-components/macro";
import { WEIGHTS } from "../../constants";

function NavLink({ children, animation = "slide-up", ...rest }) {
  if (animation === "slide-up") {
    return (
      <Wrapper {...rest}>
        <MainText>{children}</MainText>
        <HoverText>{children}</HoverText>
      </Wrapper>
    );
  }

  if (animation === "rotate") {
    return (
      <Wrapper {...rest}>
        <RotationWrapper>
          <MainRotation>{children}</MainRotation>
          <HoverRotation>{children}</HoverRotation>
        </RotationWrapper>
      </Wrapper>
    );
  }

  return <Wrapper>{children}</Wrapper>;
}

const Wrapper = styled.a`
  display: block;
  position: relative;
  grid-template-areas: "sole-area";
  overflow: hidden;
  font-size: 1.125rem;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--color-gray-900);
  font-weight: ${WEIGHTS.medium};

  &:first-of-type {
    color: var(--color-secondary);
  }
`;

const RotationWrapper = styled.div`
  display: block;
  position: relative;
  perspective: 100px;
  transform-style: preserve-3d;
  transition: transform 0.5s;

  width: 100%;
  height: 100%;
`;

const RotationLink = styled.span`
  display: block;
  transform-style: preserve-3d;
  transition: transform 0.5s, opacity 0.5s;
`;

const MainRotation = styled(RotationLink)`
  transform-style: preserve-3d;
  transform-origin: 50% 100%;

  ${RotationWrapper}:hover & {
    transform: rotateX(90deg);
    opacity: 0;
  }
`;

const HoverRotation = styled(RotationLink)`
  transform-style: preserve-3d;
  transform: rotateX(-90deg) translateY(100%);
  transform-origin: 50% 100%;
  opacity: 0;

  font-weight: ${WEIGHTS.bold};

  ${RotationWrapper}:hover & {
    transform: rotateX(0deg);
    opacity: 1;
  }

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const LinkText = styled.span`
  transform: translateY(var(--translate-from));
  display: block;

  transition: transform 0.5s ease-in-out 0.1s;

  ${Wrapper}:hover & {
    transition: transform 0.2s ease-in-out 0.1s;
    transform: translateY(var(--translate-to));
  }
`;

const MainText = styled(LinkText)`
  --translate-from: 0%;
  --translate-to: -100%;
`;

const HoverText = styled(LinkText)`
  --translate-from: 100%;
  --translate-to: 0%;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  font-weight: ${WEIGHTS.bold};
`;

export default NavLink;
